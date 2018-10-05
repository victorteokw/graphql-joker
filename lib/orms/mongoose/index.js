const path = require('path');
const fs = require('fs');
const generateModelContent = require('./generateModelContent');
const supportedPrimitiveTypes = require('./supportedPrimitiveTypes');
const updateConfigJson = require('./updateConfigJson');
const graphQLTypeFromORMType = require('./graphQLTypeFromORMType');
const ormTypeFromGraphQLType = require('./ormTypeFromGraphQLType');
const resolverFunctions = require('./resolverFunctions');
const renderTemplate = require('./renderTemplate');

module.exports = {
  generateModelContent,
  defaultOpts: {
    'primaryKey': '_id',
    'polymorphicReference': true
  },
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
    [path.join(__dirname, 'templates/_nonularc.js'), '.nonularc.js'],
    [path.join(__dirname, 'templates/_dobukulbirarc.js'), '.dobukulbirarc.js'],
  ],
  appendFiles: [
    [path.join(__dirname, 'templates/.git_ignore'), '.gitignore']
  ],
  mainFileRequires: fs.readFileSync(path.join(__dirname, 'templates/mainFileRequires.js')),
  mainFileSetup: (o) => renderTemplate(path.join(__dirname, 'templates/_mainFileSetup.js'), o),
  mainFileContext: '(o) => Object.assign({}, o, mongoose.models)',
  mainConnect: 'mongoose.connect(config.database.url, { useNewUrlParser: true });\n',
  updateConfigJson,
  primaryKey: '_id',
  supportedPrimitiveTypes,
  graphQLTypeFromORMType,
  ormTypeFromGraphQLType,
  resolverFunctions
};
