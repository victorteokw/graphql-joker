const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  age: Number
}, {
  timestamps: true,
  collection: 'users'
});

module.exports = mongoose.model('User', userSchema);
