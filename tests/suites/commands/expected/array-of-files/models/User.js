const mongoose = require('mongoose');
const { Schema } = mongoose;
const { File } = Schema.Types;
const PhotoUploader = require('../uploaders/PhotoUploader');

const userSchema = new Schema({
  photos: [{ type: File, uploader: PhotoUploader }]
}, {
  timestamps: true,
  collection: 'users'
});

module.exports = mongoose.model('User', userSchema);
