// src/routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
// Import the authorization middleware
const authorize = require('../middleware/authMiddleware');

// Protected endpoint: Book a seat
router.post('/', authorize, bookingController.bookSeat);

// Protected endpoint: Get specific booking details
router.get('/:bookingId', authorize, bookingController.getBooking);

module.exports = router;
