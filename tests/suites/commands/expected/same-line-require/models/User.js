const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId, Mixed, File } = Schema.Types;
const AvatarUploader = require('../uploaders/AvatarUploader');

const userSchema = new Schema({
  experience: Mixed,
  post: { type: ObjectId, ref: 'Post' },
  avatar: { type: File, uploader: AvatarUploader }
}, {
  timestamps: true,
  collection: 'users'
});

module.exports = mongoose.model('User', userSchema);
