const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const userSchema = new Schema({
  article: {
    post: { type: ObjectId, ref: 'Post' },
    comments: [{ type: ObjectId, ref: 'Comment' }]
  }
}, {
  timestamps: true,
  collection: 'users'
});

module.exports = mongoose.model('User', userSchema);
