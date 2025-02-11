// src/controllers/trainController.js
const supabase = require('../config/supabaseClient');

const addTrain = async (req, res) => {
  const { train_name, source, destination, total_seats } = req.body;
  if (!train_name || !source || !destination || !total_seats) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    // Insert new train with available_seats initialized to total_seats (using .select() to return inserted data)
    const { data, error } = await supabase
      .from('trains')
      .insert([{ train_name, source, destination, total_seats, available_seats: total_seats }])
      .select();
    if (error) throw error;
    res.status(201).json({ message: 'Train added successfully', train: data[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAvailability = async (req, res) => {
  const { source, destination } = req.query;
  if (!source || !destination) {
    return res.status(400).json({ error: 'Source and destination are required' });
  }
  try {
    const { data, error } = await supabase
      .from('trains')
      .select('*')
      .eq('source', source)
      .eq('destination', destination);
    if (error) throw error;
    res.json({ trains: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addTrain, getAvailability };
