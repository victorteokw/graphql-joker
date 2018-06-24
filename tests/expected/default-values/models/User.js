const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true, index: true, unique: true, default: "Untitled" },
  disabled: { type: Boolean, required: true, default: false },
  age: { type: Number, required: true, default: 18 }
}, {
  timestamps: true,
  collection: 'users'
});

module.exports = mongoose.model('User', userSchema);
