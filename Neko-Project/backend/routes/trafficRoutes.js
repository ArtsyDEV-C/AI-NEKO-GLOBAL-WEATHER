const express = require('express');
const trafficController = require('../controllers/trafficController');
const router = express.Router();

// Route to get traffic data
router.get('/data', trafficController.getTrafficData);

module.exports = router;
