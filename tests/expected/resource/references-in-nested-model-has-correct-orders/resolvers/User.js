module.exports = {
  UserSettingsMobile: {
    async ios(root, _, { IOSSetting }) {
      return await IOSSetting.findById(root.ios);
    },
    async android(root, _, { AndroidSetting }) {
      return await AndroidSetting.findById(root.android);
    }
  },
  UserSettings: {
    async push(root, _, { PushSetting }) {
      return await PushSetting.findById(root.push);
    }
  },
  UserArticlesCommentsContent: {
    async commentor(root, _, { User }) {
      return await User.findById(root.commentor);
    }
  },
  UserArticles: {
    async titles(root, _, { Title }) {
      return await Title.find({ _id: { $in: root.titles }});
    },
    async posts(root, _, { Post }) {
      return await Post.find({ _id: { $in: root.posts }});
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
