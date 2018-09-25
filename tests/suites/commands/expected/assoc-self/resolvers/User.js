module.exports = {
  User: {
    async followers(root, _, { Follow, User }) {
      const follows = await Follow.find({ followee: root._id });
      return await User.find({ _id: { $in: follows.map((f) => f.follower) }});
    },
    async followees(root, _, { Follow, User }) {
      const follows = await Follow.find({ follower: root._id });
      return await User.find({ _id: { $in: follows.map((f) => f.followee) }});
    }
  },
  Query: {
    async user(root, { _id }, { User }) {
      return await User.findById(_id);
    },
    async users(root, { _ }, { User }) {
      return await User.find();
    }
  },
  Mutation: {
    async createUser(root, { input }, { User }) {
      return await User.create(input);
    },
    async updateUser(root, { _id, input }, { User }) {
      return await (await User.findById(_id)).set(input).save();
    },
    async deleteUser(root, { _id }, { User }) {
      return await (await User.findById(_id)).remove();
    }
  }
};
