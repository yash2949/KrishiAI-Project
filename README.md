# KrishiAI – Smart Farming Assistant

A beginner-friendly bilingual (Hindi/English) BTech mini project. The first version includes a responsive website and a Gemini-powered farming information chatbot.

## Features in this version

- Responsive home page
- Hindi and English interface switching
- Chatbot interface
- Flask backend
- Gemini API integration
- Basic safety guidance in the assistant prompt

The crop recommendation model, image-based disease detection, live weather and mandi prices are **future extensions**, not implemented in this starter version.

## Requirements

- Python 3.10 or newer
- Internet connection for Gemini API calls
- A Gemini API key

## Setup on Windows

1. Extract the ZIP file.
2. Open the extracted `KrishiAI` folder in Visual Studio Code.
3. Open Terminal in VS Code.
4. Create a virtual environment:

   ```powershell
   python -m venv .venv
   .venv\Scripts\activate
   ```

5. Install dependencies:

   ```powershell
   pip install -r requirements.txt
   ```

6. Copy `.env.example` to a new file named `.env`.
7. Open `.env` and replace the placeholder with your own Gemini API key:

   ```env
   GEMINI_API_KEY=your_real_key_here
   ```

8. Start the application:

   ```powershell
   python app.py
   ```

9. Open http://127.0.0.1:5000 in your browser.

## Setup on macOS / Linux

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Add your API key to `.env`, then run:

```bash
python app.py
```

Open http://127.0.0.1:5000.

## API key safety

- Never share your API key or upload `.env` to GitHub.
- `.env` is excluded by `.gitignore`.
- API access may have usage limits or costs depending on the provider and account.
- Do not expose Flask's development server publicly.

## Troubleshooting

- **AI key not configured:** Confirm the file is named `.env` (not `.env.txt`) and contains `GEMINI_API_KEY=...`. Restart Flask after editing it.
- **Module not found:** Activate the virtual environment and run `pip install -r requirements.txt`.
- **AI request fails:** Check your internet connection, API key, account access, and model availability.
- **Port already in use:** Close the other local Flask process or change the port in `app.py`.

## Academic note

This project uses a hosted Generative AI model through an API. The prompt configures the assistant's role; it is not a newly trained foundation model. For a stronger later version, add a retrieval-augmented generation (RAG) knowledge base with trusted agricultural documents, plus separately evaluated ML models for crop recommendation and disease classification.

## Project tree

```text
KrishiAI/
├── app.py
├── requirements.txt
├── .env.example
├── .gitignore
├── README.md
├── templates/
│   └── index.html
└── static/
    ├── style.css
    └── script.js
```
