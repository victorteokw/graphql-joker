module.exports = {
  Post: {
    async comments(root, _, { Comment }) {
      return await Comment.find({ _id: { $in: root.comments }});
    },
    async author(root, _, { Author }) {
      return await Author.findById(root.author);
    }
  }
};
