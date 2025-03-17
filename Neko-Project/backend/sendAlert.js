// sendAlert.js - Send SMS notifications using Twilio API

const twilio = require('twilio');
require('dotenv').config();

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

async function sendAlert(message) {
    try {
        const response = await client.messages.create({
            body: message,
            from: '+1234567890', // Your Twilio phone number
            to: '+0987654321' // Recipient's phone number
        });
        console.log("Alert sent successfully:", response.sid);
    } catch (error) {
        console.error("Error sending alert:", error);
    }
}

module.exports = sendAlert;
