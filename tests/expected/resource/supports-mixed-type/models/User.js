const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Mixed } = Schema.Types;

const userSchema = new Schema({
  experience: Mixed
}, {
  timestamps: true,
  collection: 'users'
});

module.exports = mongoose.model('User', userSchema);
