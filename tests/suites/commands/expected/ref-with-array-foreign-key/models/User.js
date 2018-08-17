const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({

}, {
  timestamps: true,
  collection: 'users'
});

module.exports = mongoose.model('User', userSchema);
