// src/models/userModel.js
const supabase = require('../config/supabaseClient');

async function createUser({ username, email, password, role = 'user' }) {
  const { data, error } = await supabase
    .from('users')
    .insert([{ username, email, password, role }]);
  if (error) throw error;
  return data[0];
}

async function findUserByEmail(email) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email);
  if (error) throw error;
  return data;
}

module.exports = { createUser, findUserByEmail };
