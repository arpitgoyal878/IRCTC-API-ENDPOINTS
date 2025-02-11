const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Map endpoints to controller functions
router.post('/register', authController.registerUser); // Updated function name
router.post('/login', authController.loginUser); // Updated function name

module.exports = router;