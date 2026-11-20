const translations = {
  en: {
    navHome: "Home", navFeatures: "Features", navAssistant: "AI Assistant",
    tag: "🌱 Smart agriculture with AI",
    heroTitle: "Grow smarter with artificial intelligence",
    heroDescription: "Your farming information assistant. Ask questions about crops, soil, and farm practices in Hindi or English.",
    heroButton: "Ask AI assistant",
    eyebrow: "WHAT KRISHIAI CAN HELP WITH",
    featureTitle: "Smart farming support",
    featureIntro: "Explore the information tools planned for this student project.",
    f1: "AI farming chatbot", d1: "Ask farming questions and receive AI-generated explanations.",
    f2: "Crop guidance", d2: "Learn about crops, soil conditions, and growing practices.",
    f3: "Soil and fertilizer basics", d3: "Understand soil nutrients and why soil testing matters.",
    f4: "Disease information", d4: "Learn general information about common crop diseases.",
    chatEyebrow: "YOUR DIGITAL FARMING HELPER", chatTitle: "Ask KrishiAI",
    chatDescription: "Type your question in Hindi or English.",
    assistantLabel: "AI assistant", welcome: "Namaste! Welcome to KrishiAI. How can I help with farming today?",
    placeholder: "Ask your farming question...", send: "Send",
    disclaimer: "AI answers can be inaccurate. Verify important crop, fertilizer, and plant-protection decisions with a local agricultural expert.",
    footer: "Supporting informed farming through artificial intelligence.",
    loading: "KrishiAI is preparing an answer...", error: "Sorry, the service is unavailable. Please try again."
  },
  hi: {
    navHome: "होम", navFeatures: "सुविधाएँ", navAssistant: "AI सहायक",
    tag: "🌱 AI के साथ स्मार्ट खेती",
    heroTitle: "कृत्रिम बुद्धिमत्ता से बेहतर खेती करें",
    heroDescription: "आपका कृषि जानकारी सहायक। फसल, मिट्टी और खेती से जुड़े सवाल हिंदी या अंग्रेज़ी में पूछें।",
    heroButton: "AI सहायक से पूछें",
    eyebrow: "KRISHIAI आपकी कैसे मदद कर सकता है",
    featureTitle: "स्मार्ट खेती में सहायता",
    featureIntro: "इस छात्र परियोजना में शामिल जानकारी की सुविधाएँ देखें।",
    f1: "AI कृषि चैटबॉट", d1: "खेती के सवाल पूछें और AI से जवाब पाएँ।",
    f2: "फसल मार्गदर्शन", d2: "फसलों, मिट्टी और खेती के तरीकों के बारे में जानें।",
    f3: "मिट्टी और खाद की जानकारी", d3: "मिट्टी के पोषक तत्वों और मिट्टी जाँच का महत्व समझें।",
    f4: "फसल रोग की जानकारी", d4: "फसलों के सामान्य रोगों के बारे में सामान्य जानकारी पाएँ।",
    chatEyebrow: "आपका डिजिटल कृषि सहायक", chatTitle: "KrishiAI से पूछें",
    chatDescription: "अपना सवाल हिंदी या अंग्रेज़ी में लिखें।",
    assistantLabel: "AI सहायक", welcome: "नमस्ते! KrishiAI में आपका स्वागत है। खेती में मैं आपकी कैसे मदद कर सकता हूँ?",
    placeholder: "खेती से जुड़ा सवाल लिखें...", send: "भेजें",
    disclaimer: "AI के जवाब गलत हो सकते हैं। फसल, खाद और पौध संरक्षण से जुड़े महत्वपूर्ण फैसलों के लिए स्थानीय कृषि विशेषज्ञ से सलाह लें।",
    footer: "कृत्रिम बुद्धिमत्ता के माध्यम से खेती की सही जानकारी में सहायता।",
    loading: "KrishiAI जवाब तैयार कर रहा है...", error: "सेवा अभी उपलब्ध नहीं है। कृपया दोबारा कोशिश करें।"
  }
};

let currentLanguage = "en";

function setLanguage(language) {
  currentLanguage = language;
  const t = translations[language] || translations.en;
  document.documentElement.lang = language;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (t[key]) element.textContent = t[key];
  });
  document.getElementById("userInput").placeholder = t.placeholder;
  document.getElementById("chatMessages").replaceChildren();
  addMessage(t.welcome, "bot-message");
}

function addMessage(text, className) {
  const messages = document.getElementById("chatMessages");
  const bubble = document.createElement("div");
  bubble.className = `message ${className}`;
  bubble.textContent = text;
  messages.appendChild(bubble);
  messages.scrollTop = messages.scrollHeight;
  return bubble;
}

async function sendMessage(event) {
  if (event) event.preventDefault();
  const input = document.getElementById("userInput");
  const button = document.getElementById("sendButton");
  const message = input.value.trim();
  if (!message || button.disabled) return;

  addMessage(message, "user-message");
  input.value = "";
  button.disabled = true;
  button.textContent = currentLanguage === "hi" ? "रुकें..." : "Wait...";
  const loading = addMessage(translations[currentLanguage].loading, "bot-message");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });
    const data = await response.json();
    loading.remove();
    if (!response.ok) throw new Error(data.reply || "Request failed");
    addMessage(data.reply || translations[currentLanguage].error, "bot-message");
  } catch (error) {
    loading.remove();
    addMessage(error.message || translations[currentLanguage].error, "bot-message");
  } finally {
    button.disabled = false;
    button.textContent = translations[currentLanguage].send;
    input.focus();
  }
}

document.getElementById("language").addEventListener("change", (event) => {
  setLanguage(event.target.value);
});
document.getElementById("chatForm").addEventListener("submit", sendMessage);
setLanguage("en");
