const mongoose = require('mongoose');
const { Schema } = mongoose;
<% if(requiresObjectId) { -%>
const { ObjectId } = Schema.Types;
<% } -%>

const <%= mongooseSchemaName %> = new Schema({
<%- mongooseSchemaBody %>
}, {
  timestamps: true,
  collection: '<%= collectionName %>'
});

module.exports = mongoose.model('<%= modelName %>', <%= mongooseSchemaName %>);
