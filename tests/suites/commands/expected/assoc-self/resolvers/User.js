module.exports = {
  User: {
    async followers(root, _, ctx) {
      const { Follow, User } = ctx.models;
      const follows = await Follow.find({ followee: root._id });
      return await User.find({ _id: { $in: follows.map((f) => f.follower) }});
    },
    async followees(root, _, ctx) {
      const { Follow, User } = ctx.models;
      const follows = await Follow.find({ follower: root._id });
      return await User.find({ _id: { $in: follows.map((f) => f.followee) }});
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
      return await (await User.findById(_id)).set(input).save();
    },
    async deleteUser(root, { _id }, ctx) {
      const { User } = ctx.models;
      return await (await User.findById(_id)).remove();
    }
  }
};
