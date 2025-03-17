const express = require('express');
const alertsController = require('../controllers/alertsController');
const router = express.Router();

// Route to trigger weather alerts via Twilio
router.post('/sendAlert', alertsController.sendAlert);

module.exports = router;
