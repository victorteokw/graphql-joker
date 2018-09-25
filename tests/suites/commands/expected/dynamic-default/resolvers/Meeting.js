module.exports = {
  Query: {
    async meeting(root, { _id }, { Meeting }) {
      return await Meeting.findById(_id);
    },
    async meetings(root, { _ }, { Meeting }) {
      return await Meeting.find();
    }
  },
  Mutation: {
    async createMeeting(root, { input }, { Meeting }) {
      return await Meeting.create(input);
    },
    async updateMeeting(root, { _id, input }, { Meeting }) {
      return await (await Meeting.findById(_id)).set(input).save();
    },
    async deleteMeeting(root, { _id }, { Meeting }) {
      return await (await Meeting.findById(_id)).remove();
    }
  }
};
