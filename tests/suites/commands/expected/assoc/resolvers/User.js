module.exports = {
  User: {
    async courses(root, _, { Favorite, Course }) {
      const favorites = await Favorite.find({ user: root._id });
      return await Course.find({ _id: { $in: favorites.map((f) => f.course) }});
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
