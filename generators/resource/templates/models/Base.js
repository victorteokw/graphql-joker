const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const <%= mongooseSchemaName %> = new Schema({



}, {
  timestamps: true,
  collection: '<%= collectionName %>'
});

module.exports = mongoose.model('<%= modelName %>', <%= mongooseSchemaName %>);
