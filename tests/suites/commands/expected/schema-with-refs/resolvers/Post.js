module.exports = {
  Post: {
    async comments(root, _, ctx) {
      const { Comment } = ctx.models;
      return await Comment.find({ _id: { $in: root.comments }});
    },
    async author(root, _, ctx) {
      const { Author } = ctx.models;
      return await Author.findById(root.author);
    }
  }
};
