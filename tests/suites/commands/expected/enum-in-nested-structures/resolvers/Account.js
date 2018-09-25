module.exports = {
  Query: {
    async account(root, { _id }, { Account }) {
      return await Account.findById(_id);
    },
    async accounts(root, { _ }, { Account }) {
      return await Account.find();
    }
  },
  Mutation: {
    async createAccount(root, { input }, { Account }) {
      return await Account.create(input);
    },
    async updateAccount(root, { _id, input }, { Account }) {
      return await (await Account.findById(_id)).set(input).save();
    },
    async deleteAccount(root, { _id }, { Account }) {
      return await (await Account.findById(_id)).remove();
    }
  }
};
