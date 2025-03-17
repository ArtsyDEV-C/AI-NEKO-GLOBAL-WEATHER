const express = require('express');
const businessController = require('../controllers/businessController');
const router = express.Router();

// Route for fetching industry-specific weather data
router.get('/weather', businessController.getIndustryWeatherData);

// Route for fetching industry-specific weather analytics
router.get('/weather/analytics', businessController.getIndustryWeatherAnalytics);

module.exports = router;
