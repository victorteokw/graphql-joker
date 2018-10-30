const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  posts: [{
    title: String,
    kind: { type: String, enum: ['science', 'math', 'english'] }
  }]
}, {
  timestamps: true,
  collection: 'users'
});

module.exports = mongoose.model('User', userSchema);
