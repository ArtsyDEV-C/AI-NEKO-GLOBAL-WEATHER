const express = require('express');
const weatherController = require('../controllers/weatherController');
const router = express.Router();

// Route to get current weather data
router.get('/current', weatherController.getWeatherData);

// Route to get weather forecast data
router.get('/forecast', weatherController.getWeatherForecast);

module.exports = router;
