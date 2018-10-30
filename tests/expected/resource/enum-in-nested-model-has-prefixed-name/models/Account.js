const mongoose = require('mongoose');
const { Schema } = mongoose;

const accountSchema = new Schema({
  email: { type: String, match: /.*@wtf\.com/, required: true },
  info: {
    name: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female'] }
  },
  password: { type: String, required: true }
}, {
  timestamps: true,
  collection: 'accounts'
});

module.exports = mongoose.model('Account', accountSchema);
