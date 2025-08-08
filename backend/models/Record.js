const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  name: String,
  gender: String,
  aadhar: String,
  age: Number,
  date: Date,
  dose: Number,
  area: String,
  vaccine: String
});

module.exports = mongoose.model('Record', recordSchema);
