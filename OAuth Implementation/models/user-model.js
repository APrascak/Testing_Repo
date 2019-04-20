const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defines user schema.
const userSchema = new Schema({
  username: String,
  googleID: String,
  thumbnail: String
});

const User = mongoose.model('user', userSchema);

module.exports = User;
