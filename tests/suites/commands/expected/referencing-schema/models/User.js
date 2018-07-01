const mongoose = require('mongoose');
const { Schema } = mongoose;
const addressSchema = require('./addressSchema');

const userSchema = new Schema({
  address: addressSchema,
  addresses: [addressSchema]
}, {
  timestamps: true,
  collection: 'users'
});

module.exports = mongoose.model('User', userSchema);
