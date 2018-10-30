const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const postSchema = new Schema({
  comments: [{ type: ObjectId, ref: 'Comment' }],
  author: { type: ObjectId, ref: 'Author' },
  title: String,
  content: String,
  subtitle: String
});

module.exports = postSchema;
