module.exports = {
  UserArticle: {
    async post(root, _, ctx) {
      const { Post } = ctx.models;
      return await Post.findById(root.post);
    },
    async comments(root, _, ctx) {
      const { Comment } = ctx.models;
      return await Comment.find({ _id: { $in: root.comments }});
    }
  },
  Query: {
    async user(root, { _id }, ctx) {
      const { User } = ctx.models;
      return await User.findById(_id);
    },
    async users(root, { _ }, ctx) {
      const { User } = ctx.models;
      return await User.find();
    }
  },
  Mutation: {
    async createUser(root, { input }, ctx) {
      const { User } = ctx.models;
      return await User.create(input);
    },
    async updateUser(root, { _id, input }, ctx) {
      const { User } = ctx.models;
      return await User.findOneAndUpdate({ _id }, input, { new: true });
    },
    async deleteUser(root, { _id }, ctx) {
      const { User } = ctx.models;
      return await User.findByIdAndDelete(_id);
    }
  }
};
