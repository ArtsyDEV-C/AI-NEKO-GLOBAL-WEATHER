const express = require("express");
const chatbotController = require("../controllers/chatbotController");
const router = express.Router();

// Route for getting chatbot responses
router.get("/", chatbotController.getChatbotResponse);

module.exports = router;
