module.exports = {
  Query: {
    async result(root, { _id }, ctx) {
      const { Result } = ctx.models;
      return await Result.findById(_id);
    },
    async results(root, { _ }, ctx) {
      const { Result } = ctx.models;
      return await Result.find();
    }
  },
  Mutation: {
    async createResult(root, { input }, ctx) {
      const { Result } = ctx.models;
      return await Result.create(input);
    },
    async updateResult(root, { _id, input }, ctx) {
      const { Result } = ctx.models;
      return await Result.findOneAndUpdate({ _id }, input, { new: true });
    },
    async deleteResult(root, { _id }, ctx) {
      const { Result } = ctx.models;
      return await Result.findByIdAndDelete(_id);
    }
  }
};
