const mongoose = require('mongoose');
const { Schema } = mongoose;

const articleSchema = new Schema({
  title: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  keyName: { type: String, required: true, index: true, unique: true }
}, {
  timestamps: true,
  collection: 'articles'
});

module.exports = mongoose.model('Article', articleSchema);
