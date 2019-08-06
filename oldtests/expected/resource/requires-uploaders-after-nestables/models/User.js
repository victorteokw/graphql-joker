const mongoose = require('mongoose');
const { Schema } = mongoose;
const { File } = Schema.Types;
const experienceSchema = require('./experienceSchema');
const AvatarUploader = require('../uploaders/AvatarUploader');

const userSchema = new Schema({
  experience: experienceSchema,
  avatar: { type: File, uploader: AvatarUploader }
}, {
  timestamps: true,
  collection: 'users'
});

module.exports = mongoose.model('User', userSchema);
