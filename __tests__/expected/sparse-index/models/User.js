const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, unique: true, sparse: true }
}, {
  timestamps: true,
  collection: 'users'
});

module.exports = mongoose.model('User', userSchema);
