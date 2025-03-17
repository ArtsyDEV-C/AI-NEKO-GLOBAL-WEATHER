const twilio = require('twilio');
const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const sendWeatherAlert = (phoneNumber, alertMessage) => {
    client.messages.create({
        body: alertMessage,
        to: phoneNumber,  // Recipient's phone number
        from: '+1234567890',  // Twilio phone number
    })
    .then(message => console.log("Alert sent:", message.sid))
    .catch(error => console.error("Error sending alert:", error));
};

// Function to send SMS alerts
exports.sendAlert = (req, res) => {
    const { message } = req.body;  // Get message from the request body

    client.messages
        .create({
            body: message,
            to: "+0987654321",  // Destination phone number (can be dynamic)
            from: process.env.TWILIO_PHONE_NUMBER,  // Your Twilio phone number
        })
        .then((message) => {
            res.json({ success: true, message: "Alert sent successfully", sid: message.sid });
        })
        .catch((error) => {
            res.status(500).json({ success: false, message: "Error sending alert", error });
        });
};

exports.sendWeatherAlert = (req, res) => {
    const { phoneNumber, alertMessage } = req.query; // Get phone number and message from query

    client.messages.create({
        body: alertMessage,
        to: phoneNumber,  // Recipient's phone number
        from: '+1234567890',  // Your Twilio phone number
    })
    .then(message => {
        res.json({ message: 'Alert sent successfully', sid: message.sid });
    })
    .catch(error => {
        res.status(500).json({ error: 'Error sending alert', details: error });
    });
};

module.exports = sendWeatherAlert;
