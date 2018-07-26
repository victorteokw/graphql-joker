module.exports = {
  Query: {
    async product(root, { _id }, ctx) {
      const { Product } = ctx.models;
      return await Product.findById(_id);
    },
    async products(root, { _ }, ctx) {
      const { Product } = ctx.models;
      return await Product.find();
    }
  },
  Mutation: {
    async createProduct(root, { input }, ctx) {
      const { Product } = ctx.models;
      return await Product.create(input);
    },
    async updateProduct(root, { _id, input }, ctx) {
      const { Product } = ctx.models;
      return await (await Product.findById(_id)).set(input).save();
    },
    async deleteProduct(root, { _id }, ctx) {
      const { Product } = ctx.models;
      return await (await Product.findById(_id)).remove();
    }
  }
};
