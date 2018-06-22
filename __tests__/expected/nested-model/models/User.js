const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  settings: {
    sms: Boolean,
    email: Boolean,
    push: {
      first: Boolean,
      second: Boolean
    }
  },
  age: Number,
  address: {
    city: String,
    province: String,
    region: String,
    address: {
      one: String,
      two: String
    }
  }
}, {
  timestamps: true,
  collection: 'users'
});

module.exports = mongoose.model('User', userSchema);
