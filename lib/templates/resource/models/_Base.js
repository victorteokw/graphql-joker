const mongoose = require('mongoose');
const { Schema } = mongoose;
<% if(sideEffects.requiresObjectId) { -%>
const { ObjectId } = Schema.Types;
<% } -%>
<% if (sideEffects.schemaRequirements.length > 0) { -%>
<% sideEffects.schemaRequirements.map((r) => { -%>
const <%- r %> = require('./<%- r %>');
<% }) -%>
<% } -%>

const <%= varName %>Schema = new Schema({
<%- mongooseSchemaBody %>
}, {
  timestamps: true,
  collection: '<%= collectionName %>'
});

module.exports = mongoose.model('<%= modelName %>', <%= varName %>Schema);
