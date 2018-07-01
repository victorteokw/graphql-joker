const mongoose = require('mongoose');
const { Schema } = mongoose;
const addressSchema = require('./addressSchema');

const userSchema = new Schema({
  name: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female'] },
  age: { type: Number, min: 0, max: 200 },
  addresses: [addressSchema],
  phoneNo: { type: String, match: /1[358]\d{9,10}/ },
  email: { type: String, match: /.*@.*\..*/ }
}, {
  timestamps: true,
  collection: 'users'
});

module.exports = mongoose.model('User', userSchema);
