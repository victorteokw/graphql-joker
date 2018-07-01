const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const userSchema = new Schema({
  settings: {
    push: { type: ObjectId, ref: 'PushSetting' },
    mobile: {
      ios: { type: ObjectId, ref: 'IOSSetting' },
      android: { type: ObjectId, ref: 'AndroidSetting' }
    }
  },
  articles: {
    titles: [{ type: ObjectId, ref: 'Title' }],
    posts: [{ type: ObjectId, ref: 'Post' }],
    comments: {
      contents: [{
        commentor: { type: ObjectId, ref: 'User' }
      }]
    }
  }
}, {
  timestamps: true,
  collection: 'users'
});

module.exports = mongoose.model('User', userSchema);
