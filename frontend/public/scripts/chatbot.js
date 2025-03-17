// ...existing code...
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

// Function to clear the chatbot input and response fields
function clearChatbot() {
    document.getElementById("chatbot-input").value = "";
    document.getElementById("chatbot-response").innerText = "";
}

// Event listener for the send message button
document.getElementById("send-message-btn").addEventListener("click", () => {
    const message = document.getElementById("chatbot-input").value;
    getChatbotResponse(message);
});

// Event listener for the clear button
document.getElementById("clear-chatbot-btn").addEventListener("click", clearChatbot);