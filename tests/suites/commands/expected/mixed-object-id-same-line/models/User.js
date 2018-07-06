const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId, Mixed } = Schema.Types;

const userSchema = new Schema({
  experience: Mixed,
  post: { type: ObjectId, ref: 'Post' }
}, {
  timestamps: true,
  collection: 'users'
});

module.exports = mongoose.model('User', userSchema);
