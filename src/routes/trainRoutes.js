// src/routes/trainRoutes.js
const express = require('express');
const router = express.Router();
const trainController = require('../controllers/trainController');

const userAuthorize = require('../middleware/authMiddleware');
const adminAuthorize = require('../middleware/adminMiddleware');

// Admin endpoint to add a new train (ensure API key middleware is added as needed)
router.post('/',adminAuthorize, trainController.addTrain);

// Endpoint to get train seat availability (query: ?source=...&destination=. ..)
router.get('/availability',userAuthorize, trainController.getAvailability);

module.exports = router;


