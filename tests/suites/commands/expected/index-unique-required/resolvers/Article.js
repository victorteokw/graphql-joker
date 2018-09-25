module.exports = {
  Query: {
    async article(root, { _id }, { Article }) {
      return await Article.findById(_id);
    },
    async articles(root, { _ }, { Article }) {
      return await Article.find();
    }
  },
  Mutation: {
    async createArticle(root, { input }, { Article }) {
      return await Article.create(input);
    },
    async updateArticle(root, { _id, input }, { Article }) {
      return await (await Article.findById(_id)).set(input).save();
    },
    async deleteArticle(root, { _id }, { Article }) {
      return await (await Article.findById(_id)).remove();
    }
  }
};
