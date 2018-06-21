module.exports = {
  Query: {
    async meeting(root, { _id }, ctx) {
      const { Meeting } = ctx.models;
      return await Meeting.findById(_id);
    },
    async meetings(root, { _ }, ctx) {
      const { Meeting } = ctx.models;
      return await Meeting.find();
    }
  },
  Mutation: {
    async createMeeting(root, { input }, ctx) {
      const { Meeting } = ctx.models;
      return await Meeting.create(input);
    },
    async updateMeeting(root, { _id, input }, ctx) {
      const { Meeting } = ctx.models;
      return await Meeting.findOneAndUpdate({ _id }, input, { new: true });
    },
    async deleteMeeting(root, { _id }, ctx) {
      const { Meeting } = ctx.models;
      return await Meeting.findByIdAndDelete(_id);
    }
  }
};
