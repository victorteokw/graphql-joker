module.exports = {
  Query: {
    async account(root, { _id }, ctx) {
      const { Account } = ctx.models;
      return await Account.findById(_id);
    },
    async accounts(root, { _ }, ctx) {
      const { Account } = ctx.models;
      return await Account.find();
    }
  },
  Mutation: {
    async createAccount(root, { input }, ctx) {
      const { Account } = ctx.models;
      return await Account.create(input);
    },
    async updateAccount(root, { _id, input }, ctx) {
      const { Account } = ctx.models;
      return await Account.findOneAndUpdate({ _id }, input, { new: true });
    },
    async deleteAccount(root, { _id }, ctx) {
      const { Account } = ctx.models;
      return await Account.findByIdAndDelete(_id);
    }
  }
};
