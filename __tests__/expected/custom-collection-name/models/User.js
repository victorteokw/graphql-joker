const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String
}, {
  timestamps: true,
  collection: 'people'
});

module.exports = mongoose.model('User', userSchema);
