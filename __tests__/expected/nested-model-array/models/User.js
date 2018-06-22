const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  age: String,
  roles: [{
    name: String,
    permissions: [String]
  }],
  name: String
}, {
  timestamps: true,
  collection: 'users'
});

module.exports = mongoose.model('User', userSchema);
