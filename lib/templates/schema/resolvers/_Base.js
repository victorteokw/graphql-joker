module.exports = {
<% if(sideEffects.needsResolverModelBody) { -%>
<%- resolverModelBody %>
<% } -%>
};
