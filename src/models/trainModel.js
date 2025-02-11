// src/models/trainModel.js
const supabase = require('../config/supabaseClient');

async function addTrain({ train_name, source, destination, total_seats }) {
  const { data, error } = await supabase
    .from('trains')
    .insert([{ train_name, source, destination, total_seats, available_seats: total_seats }]);
  if (error) throw error;
  return data[0];
}

async function getTrainsByRoute({ source, destination }) {
  const { data, error } = await supabase
    .from('trains')
    .select('*')
    .eq('source', source)
    .eq('destination', destination);
  if (error) throw error;
  return data;
}

async function getTrainById(train_id) {
  const { data, error } = await supabase
    .from('trains')
    .select('*')
    .eq('id', train_id)
    .single();
  if (error) throw error;
  return data;
}

async function decrementSeat(train_id, available_seats) {
  // Update available seats if more than 0 (optimistic concurrency control)
  const { data, error } = await supabase
    .from('trains')
    .update({ available_seats: available_seats - 1 })
    .eq('id', train_id)
    .gt('available_seats', 0);
  if (error) throw error;
  return data;
}

module.exports = { addTrain, getTrainsByRoute, getTrainById, decrementSeat };
