// src/routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
// Import the authorization middleware
const authorize = require('../middleware/authMiddleware');

// Protected endpoint: Book a seat
// Resolved this issue
// there is an issue because we have defined the userId and trainId as a long integear value.
router.post('/', authorize, bookingController.bookSeat);

// Protected endpoint: Get specific booking details
router.get('/:bookingId', authorize, bookingController.getBooking);

module.exports = router;
