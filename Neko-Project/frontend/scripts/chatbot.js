// chatbot.js - Interact with the chatbot and get responses

async function getChatbotResponse(message) {
    try {
        // Fetch chatbot response from the backend
        const response = await fetch(`/api/chatbot?message=${message}`);
        const data = await response.json();

        // Display chatbot response
        document.getElementById("chatbot-response").innerText = data.response;
    } catch (error) {
        console.error("Error fetching chatbot response:", error);
    }
}

// Event listener for sending messages
document.getElementById("send-message-btn").addEventListener("click", () => {
    const message = document.getElementById("chatbot-input").value;
    getChatbotResponse(message);
});
