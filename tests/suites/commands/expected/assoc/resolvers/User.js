module.exports = {
  User: {
    async courses(root, _, ctx) {
      const { Favorite, Course } = ctx.models;
      const favorites = await Favorite.find({ user: root._id });
      return await Course.find({ _id: { $in: favorites.map((f) => f.course) }});
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
