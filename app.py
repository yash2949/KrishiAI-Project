import os
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
from google import genai

load_dotenv()

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 1 * 1024 * 1024  # 1 MB request limit

api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key) if api_key else None

SYSTEM_PROMPT = """
You are KrishiAI, a helpful agricultural information assistant for farmers in India.
- Reply in the language used by the farmer (Hindi or English).
- Use simple, clear language and organized steps.
- Ask for missing details such as crop, location, soil type, or crop stage when needed.
- Do not invent live weather, mandi prices, government scheme details, or local advisories.
- Do not claim that a crop disease is confirmed from a text description alone.
- Fertilizer and crop-protection recommendations depend on soil tests, crop stage,
  local conditions, and product labels. Encourage users to consult a local
  Krishi Vigyan Kendra or qualified agricultural officer for important decisions.
- For urgent crop disease or pesticide questions, recommend local expert guidance.
"""

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json(silent=True) or {}
    message = str(data.get("message", "")).strip()

    if not message:
        return jsonify({"reply": "Please enter a farming question."}), 400
    if len(message) > 2000:
        return jsonify({"reply": "Please keep your question under 2,000 characters."}), 400
    if client is None:
        return jsonify({
            "reply": "The AI service is not configured yet. Add your Gemini API key to the .env file and restart KrishiAI."
        }), 503

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=message,
            config={
                "system_instruction": SYSTEM_PROMPT,
                "temperature": 0.4,
            },
        )
        answer = response.text or "Sorry, I could not generate an answer. Please try again."
        return jsonify({"reply": answer})
    except Exception:
        app.logger.exception("Gemini API request failed")
        return jsonify({
            "reply": "The AI service could not respond right now. Check your API key and internet connection, then try again."
        }), 502


if __name__ == "__main__":
    # Debug mode is for local development only. Do not expose this server publicly.
    app.run(host="127.0.0.1", port=5000, debug=True)
