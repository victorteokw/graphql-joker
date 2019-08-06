const path = require('path');
const generateModelContent = require('./generateModelContent');
const supportedPrimitiveTypes = require('./supportedPrimitiveTypes');
const packageRequirements = require('./packageRequirements');
const validateOpts = require('./validateOpts');
const createSequelizeCliConfigFile = require('./createSequelizeCliConfigFile');
const updateConfigJson = require('./updateConfigJson');
const graphQLTypeFromORMType = require('./graphQLTypeFromORMType');
const ormTypeFromGraphQLType = require('./ormTypeFromGraphQLType');
const resolverFunctions = require('./resolverFunctions');
const renderTemplate = require('./renderTemplate');

module.exports = {
  generateModelContent,
  defaultOpts: {
    'adaptor': 'postgres',
    'primaryKey': 'id',
    'polymorphicReference': false
  },
  validateOpts,
  packageRequirements: (opts) =>
    [
      ['sequelize', 'next'],
      ['sequelize-cli', 'latest']
    ].concat(packageRequirements[opts.adaptor]),
  devPackageRequirements: () => [],
  scripts: {
    'create': 'sequelize db:create',
    'sync': 'node ./scripts/sync.js',
    'seed': 'sequelize db:seed:all',
    'drop': 'sequelize db:drop'
  },
  createFiles: [
    [path.join(__dirname, 'templates/models/sequelize.js'), (o) => `${o.modelDir}/sequelize.js`],
    [path.join(__dirname, 'templates/_sequelizerc.js'), '.sequelizerc'],
    [path.join(__dirname, 'templates/scripts/_sync.js'), 'scripts/sync.js'],
    [createSequelizeCliConfigFile, 'config/sequelize.js']
  ],
  appendFiles: [],
  mainFileRequires: (o) => renderTemplate(path.join(__dirname, 'templates/_mainFileRequires.js'), o),
  mainFileSetup: (o) => renderTemplate(path.join(__dirname, 'templates/_mainFileSetup.js'), o),
  mainFileContext: '(o) => Object.assign({}, o, sequelize.models)',
  mainConnect: '',
  updateConfigJson,
  primaryKey: 'id',
  supportedPrimitiveTypes,
  graphQLTypeFromORMType,
  ormTypeFromGraphQLType,
  resolverFunctions
};
