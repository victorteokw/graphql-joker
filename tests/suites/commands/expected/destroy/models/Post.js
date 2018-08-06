const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  title: String
}, {
  timestamps: true,
  collection: 'posts'
});

module.exports = mongoose.model('Post', postSchema);
