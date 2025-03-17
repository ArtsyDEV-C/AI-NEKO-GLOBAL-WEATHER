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

// Example usage
sendWeatherAlert('+19876543210', 'Severe Storm Warning in your area!');

module.exports = sendWeatherAlert;
