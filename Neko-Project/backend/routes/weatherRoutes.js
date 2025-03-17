const express = require("express");
const axios = require("axios");
const router = express.Router();

// Get weather data
router.get("/current", async (req, res) => {
    const { city } = req.query; // Get city name from query params

    try {
        const weatherAPIKey = process.env.WEATHER_API_KEY;
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPIKey}&units=metric`;

        // Fetch data from OpenWeather API
        const response = await axios.get(weatherUrl);

        if (response.status === 200) {
            const data = response.data;
            const weatherData = {
                temperature: data.main.temp,
                description: data.weather[0].description,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            };
            res.json(weatherData);
        } else {
            res.status(404).json({ message: "City not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching weather data" });
    }
});

module.exports = router;
