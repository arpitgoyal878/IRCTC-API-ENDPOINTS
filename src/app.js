
const express = require('express');
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { connectDB } = require("./config/database.js");



// Import the route modules
const authRoutes = require('./routes/authRoutes');
const trainRoutes = require('./routes/trainRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

require("dotenv").config();




const app = express();
// Middleware setup
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json()); // Body parser for JSON
app.use(express.urlencoded({ extended: true })); // Support URL-encoded bodies

// Connect to the database
connectDB();


// Mount API Routes
app.use('/api/auth', authRoutes);
app.use('/api/trains', trainRoutes);
app.use('/api/bookings', bookingRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('Welcome to the IRCTC API 🚀 ');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});


module.exports = app;
