const mongoose = require('mongoose');
const { Schema } = mongoose;
<% if(sideEffects.requiresObjectId) { -%>
const { ObjectId } = Schema.Types;
<% } -%>

const <%= varName %>Schema = new Schema({
<%- mongooseSchemaBody %>
}, {
  timestamps: true,
  collection: '<%= collectionName %>'
});

module.exports = mongoose.model('<%= modelName %>', <%= varName %>Schema);
