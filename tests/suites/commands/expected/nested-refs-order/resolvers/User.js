module.exports = {
  UserSettingsMobile: {
    async ios(root, _, ctx) {
      const { IOSSetting } = ctx.models;
      return await IOSSetting.findById(root.ios);
    },
    async android(root, _, ctx) {
      const { AndroidSetting } = ctx.models;
      return await AndroidSetting.findById(root.android);
    }
  },
  UserSettings: {
    async push(root, _, ctx) {
      const { PushSetting } = ctx.models;
      return await PushSetting.findById(root.push);
    }
  },
  UserArticlesCommentsContent: {
    async commentor(root, _, ctx) {
      const { User } = ctx.models;
      return await User.findById(root.commentor);
    }
  },
  UserArticles: {
    async titles(root, _, ctx) {
      const { Title } = ctx.models;
      return await Title.find({ _id: { $in: root.titles }});
    },
    async posts(root, _, ctx) {
      const { Post } = ctx.models;
      return await Post.find({ _id: { $in: root.posts }});
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
      return await User.findByIdAndDelete(_id);
    }
  }
};
