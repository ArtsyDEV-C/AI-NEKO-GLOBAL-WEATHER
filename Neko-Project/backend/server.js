require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const passport = require("passport");
const connectDB = require("./config/db");
require("./config/passport");
const sendWeatherAlert = require('./sendAlert');
const trafficRoutes = require("./routes/trafficRoutes");
const axios = require('axios');

// Import Routes
const authRoutes = require("./routes/authRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");

// Initialize Express App
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(passport.initialize());

// Serve Leaflet.js library
app.use('/leaflet', express.static(__dirname + '/node_modules/leaflet/dist'));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/traffic", trafficRoutes);

// Google Authentication Route
app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/api/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const token = req.user.generateJwt(); // Ensure generateJwt() is defined in the User model
    res.redirect(`http://localhost:3000/dashboard?token=${token}`);
  });

// Endpoint to handle alert requests
app.post('/api/send-alert', async (req, res) => {
    const { message } = req.body;
    try {
        await sendWeatherAlert(message);
        res.json({ success: true, message: 'Alert sent successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error sending alert', error });
    }
});

// Endpoint to fetch weather data
app.get('/api/weather', async (req, res) => {
    const { lat, lon } = req.query;
    const weatherAPIKey = process.env.OPENWEATHERMAP_API_KEY;

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                lat,
                lon,
                appid: weatherAPIKey,
                units: 'metric'
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching weather data', error });
    }
});

// Connect to MongoDB
connectDB();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
