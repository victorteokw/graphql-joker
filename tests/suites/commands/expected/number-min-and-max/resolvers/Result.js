module.exports = {
  Query: {
    async result(root, { _id }, { Result }) {
      return await Result.findById(_id);
    },
    async results(root, { _ }, { Result }) {
      return await Result.find();
    }
  },
  Mutation: {
    async createResult(root, { input }, { Result }) {
      return await Result.create(input);
    },
    async updateResult(root, { _id, input }, { Result }) {
      return await (await Result.findById(_id)).set(input).save();
    },
    async deleteResult(root, { _id }, { Result }) {
      return await (await Result.findById(_id)).remove();
    }
  }
};
