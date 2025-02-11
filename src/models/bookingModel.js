// src/models/bookingModel.js
const supabase = require('../config/supabaseClient');

async function createBooking({ train_id, user_id }) {
  const { data, error } = await supabase
    .from('bookings')
    .insert([{ train_id, user_id }]);
  if (error) throw error;
  return data[0];
}

async function getBookingById(bookingId) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', bookingId)
    .single();
  if (error) throw error;
  return data;
}

module.exports = { createBooking, getBookingById };
