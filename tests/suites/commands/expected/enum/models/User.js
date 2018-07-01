const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  gender: { type: String, enum: ['male', 'female'], required: true }
}, {
  timestamps: true,
  collection: 'users'
});

module.exports = mongoose.model('User', userSchema);
