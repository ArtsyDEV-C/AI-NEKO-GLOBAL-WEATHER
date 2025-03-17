// Placeholder for chatbot functionality (you can integrate an AI service here)
exports.getChatbotResponse = (req, res) => {
    const userMessage = req.query.message;  // Get message from query

    // Simple bot response for now, but can be replaced with an AI-based response
    const botResponse = `You said: "${userMessage}". How can I assist you further?`;

    res.json({ response: botResponse });
};
