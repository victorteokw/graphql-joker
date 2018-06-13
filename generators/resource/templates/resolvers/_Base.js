module.exports = {
<% if(needsResolverModelBody) { -%>
<%- resolverModelBody %>
<% } -%>
  Query: {
    async <%- svarName %>(root, { _id }, ctx) {
      const { <%- modelName %> } = ctx.models;
      return await <%- modelName %>.findById(_id);
    },
    async <%- pvarName %>(root, { _ }, ctx) {
      const { <%- modelName %> } = ctx.models;
      return await <%- modelName %>.find();
    }
  },
  Mutation: {
    async create<%- modelName %>(root, { input }, ctx) {
      const { <%- modelName %> } = ctx.models;
      return await <%- modelName %>.create(input);
    },
    async update<%- modelName %>(root, { _id, input }, ctx) {
      const { <%- modelName %> } = ctx.models;
      return await <%- modelName %>.findOneAndUpdate({ _id }, input, { new: true });
    },
    async delete<%- modelName %>(root, { _id }, ctx) {
      const { <%- modelName %> } = ctx.models;
      return await <%- modelName %>.findByIdAndDelete(_id);
    }
  }
};
