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
    ['seedgoose', '^2.0.0'],
    ['db-console', '^1.0.0']
  ],
  scripts: {
    'console': 'db-console',
    'seed': 'seedgoose seed',
    'reseed': 'seedgoose reseed',
    'unseed': 'seedgoose unseed'
  },
  createFiles: [
    [path.join(__dirname, 'templates/_.seedgooserc.js'), '.seedgooserc.js'],
    [path.join(__dirname, 'templates/_.dbconsolerc.js'), '.dbconsolerc.js'],
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
