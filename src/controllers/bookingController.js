// src/controllers/bookingController.js
const supabase = require('../config/supabaseClient');

const bookSeat = async (req, res) => {
  const { train_id, user_id } = req.body;
  if (!train_id || !user_id) {
    return res.status(400).json({ error: 'Train ID and User ID are required' });
  }
  try {
    // Check current seat availability
    const { data: trainData, error: trainError } = await supabase
      .from('trains')
      .select('*')
      .eq('id', train_id)
      .single();
    if (trainError) throw trainError;
    if (trainData.available_seats <= 0) {
      return res.status(400).json({ error: 'No seats available' });
    }
    // Atomically update available seats (optimistic concurrency control)
    const { data: updatedTrain, error: updateError } = await supabase
      .from('trains')
      .update({ available_seats: trainData.available_seats - 1 })
      .eq('id', train_id)
      .gt('available_seats', 0);
    if (updateError) throw updateError;
    if (!updatedTrain || updatedTrain.length === 0) {
      return res.status(400).json({ error: 'Booking failed due to race condition. Please try again.' });
    }
    // Create a booking record (using .select() to return inserted data)
    const { data: bookingData, error: bookingError } = await supabase
      .from('bookings')
      .insert([{ train_id, user_id }])
      .select();
    if (bookingError) throw bookingError;
    res.status(201).json({ message: 'Seat booked successfully', booking: bookingData[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getBooking = async (req, res) => {
  const { bookingId } = req.params;
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', bookingId)
      .single();
    if (error) throw error;
    res.json({ booking: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { bookSeat, getBooking };
