const flat = require('mongoose-flat');

module.exports = {
  User: {
    async posts(root, _, ctx) {
      const { Post } = ctx.models;
      return await Post.find({ 'staffs.author': root._id });
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
      return await User.findOneAndUpdate({ _id }, flat(input, User), { new: true });
    },
    async deleteUser(root, { _id }, ctx) {
      const { User } = ctx.models;
      return await User.findByIdAndDelete(_id);
    }
  }
};
