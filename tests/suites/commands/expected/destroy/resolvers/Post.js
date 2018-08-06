module.exports = {
  Query: {
    async post(root, { _id }, ctx) {
      const { Post } = ctx.models;
      return await Post.findById(_id);
    },
    async posts(root, { _ }, ctx) {
      const { Post } = ctx.models;
      return await Post.find();
    }
  },
  Mutation: {
    async createPost(root, { input }, ctx) {
      const { Post } = ctx.models;
      return await Post.create(input);
    },
    async updatePost(root, { _id, input }, ctx) {
      const { Post } = ctx.models;
      return await (await Post.findById(_id)).set(input).save();
    },
    async deletePost(root, { _id }, ctx) {
      const { Post } = ctx.models;
      return await (await Post.findById(_id)).remove();
    }
  }
};
