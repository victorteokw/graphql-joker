const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  rate: Number
}, {
  timestamps: true,
  collection: 'users'
});

module.exports = mongoose.model('User', userSchema);
