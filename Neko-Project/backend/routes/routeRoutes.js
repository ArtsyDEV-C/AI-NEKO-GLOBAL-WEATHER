const express = require('express');
const routeController = require('../controllers/routeController');
const router = express.Router();

// Route to get optimized route based on weather and traffic
router.get('/optimize', routeController.getOptimizedRoute);

module.exports = router;
