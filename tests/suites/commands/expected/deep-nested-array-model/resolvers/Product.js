module.exports = {
  Query: {
    async product(root, { _id }, { Product }) {
      return await Product.findById(_id);
    },
    async products(root, { _ }, { Product }) {
      return await Product.find();
    }
  },
  Mutation: {
    async createProduct(root, { input }, { Product }) {
      return await Product.create(input);
    },
    async updateProduct(root, { _id, input }, { Product }) {
      return await (await Product.findById(_id)).set(input).save();
    },
    async deleteProduct(root, { _id }, { Product }) {
      return await (await Product.findById(_id)).remove();
    }
  }
};
