const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  favorites: {
    type: Array,
    required: true,
  },
});

module.exports = User = mongoose.model('user', UserSchema, 'users');
