const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  title: String
});

module.exports = postSchema;
