mongoose.Types.ObjectId.prototype.valueOf = function () {
  return this.toString();
};
mongoose.plugin(mongooseUploader);
const modelDir = path.join(__dirname, 'models');
map(glob.sync(path.join(modelDir, '**/*.js')), require);
