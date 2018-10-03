const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const userSchema = new Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
});

const User = mongoose.model('User', userSchema);

module.exports = User;
