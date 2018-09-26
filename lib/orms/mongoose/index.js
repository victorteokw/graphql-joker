const path = require('path');
const fs = require('fs');
const generateModelContent = require('./generateModelContent');
const supportedPrimitiveTypes = require('./supportedPrimitiveTypes');
const updateConfigJson = require('./updateConfigJson');

module.exports = {
  generateModelContent,
  primaryKey: '_id',
  supportedPrimitiveTypes,
  defaultOpts: {},
  validateOpts: () => {},
  packageRequirements: () => [
    ['mongoose', '^5.0.0'],
    ['mongoose-uploader', '0.0.4']
  ],
  devPackageRequirements: () => [
    ['nonula', '0.2.2'],
    ['dobukulbira', '0.0.8'],
  ],
  scripts: {
    'console': 'dobukulbira',
    'seed': 'nonula seed',
    'drop': 'nonula drop'
  },
  createFiles: [
    [path.join(__dirname, 'templates/.nonularc.js'), '.nonularc.js'],
    [path.join(__dirname, 'templates/.dobukulbirarc.js'), '.dobukulbirarc.js'],
  ],
  appendFiles: [
    [path.join(__dirname, 'templates/.git_ignore'), '.gitignore']
  ],
  mainFileRequires: fs.readFileSync(path.join(__dirname, 'templates/mainFileRequires.js')),
  mainFileSetup: fs.readFileSync(path.join(__dirname, 'templates/mainFileSetup.js')),
  mainFileContext: '(o) => Object.assign({}, o, mongoose.models)',
  mainConnect: 'mongoose.connect(config.database.url, { useNewUrlParser: true });\n',
  updateConfigJson
};
