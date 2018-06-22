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
  age: Number
}, {
  timestamps: true,
  collection: 'users'
});

module.exports = mongoose.model('User', userSchema);
