module.exports = {
  Query: {
    async post(root, { _id }, { Post }) {
      return await Post.findById(_id);
    },
    async posts(root, { _ }, { Post }) {
      return await Post.find();
    }
  },
  Mutation: {
    async createPost(root, { input }, { Post }) {
      return await Post.create(input);
    },
    async updatePost(root, { _id, input }, { Post }) {
      return await (await Post.findById(_id)).set(input).save();
    },
    async deletePost(root, { _id }, { Post }) {
      return await (await Post.findById(_id)).remove();
    }
  }
};
