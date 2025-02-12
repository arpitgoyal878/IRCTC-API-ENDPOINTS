const Train = require('../models/trainModel');

// Add Train Function
const addTrain = async (req, res) => {
  const { train_name, source, destination, total_seats } = req.body;
  
  if (!train_name || !source || !destination || !total_seats) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  try {
    // Create a new train record, setting availableSeats equal to total_seats
    const train = await Train.create({
      name: train_name,          // mapping "train_name" to "name"
      source,
      destination,
      totalSeats: total_seats,   // mapping "total_seats" to "totalSeats"
      availableSeats: total_seats
    });
    
    res.status(201).json({ message: 'Train added successfully', train });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Availability Function
const getAvailability = async (req, res) => {
  const { source, destination } = req.query;
  
  if (!source || !destination) {
    return res.status(400).json({ error: 'Source and destination are required' });
  }
  
  try {
    // Find all trains that match the provided source and destination
    const trains = await Train.findAll({
      where: { source, destination }
    });
    
    res.json({ trains });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addTrain, getAvailability };
