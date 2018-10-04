const path = require('path');
const fs = require('fs');
const generateModelContent = require('./generateModelContent');
const supportedPrimitiveTypes = require('./supportedPrimitiveTypes');
const packageRequirements = require('./packageRequirements');
const validateOpts = require('./validateOpts');
const createSequelizeCliConfigFile = require('./createSequelizeCliConfigFile');
const updateConfigJson = require('./updateConfigJson');
const graphQLTypeFromORMType = require('./graphQLTypeFromORMType');
const ormTypeFromGraphQLType = require('./ormTypeFromGraphQLType');
const resolverFunctions = require('./resolverFunctions');

module.exports = {
  generateModelContent,
  defaultOpts: {
    'adaptor': 'postgres',
    'primaryKey': 'id',
    'polymorphicReference': false
  },
  validateOpts,
  packageRequirements: (opts) => [
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
    [path.join(__dirname, 'templates/models/sequelize.js'), 'models/sequelize.js'],
    [path.join(__dirname, 'templates/.sequelizerc.js'), '.sequelizerc'],
    [path.join(__dirname, 'templates/scripts/sync.js'), 'scripts/sync.js'],
    [createSequelizeCliConfigFile, 'config/sequelize.js']
  ],
  appendFiles: [],
  mainFileRequires: fs.readFileSync(path.join(__dirname, 'templates/mainFileRequires.js')),
  mainFileSetup: fs.readFileSync(path.join(__dirname, 'templates/mainFileSetup.js')),
  mainFileContext: '(o) => Object.assign({}, o, sequelize.models)',
  mainConnect: '',
  updateConfigJson,
  primaryKey: 'id',
  supportedPrimitiveTypes,
  graphQLTypeFromORMType,
  ormTypeFromGraphQLType,
  resolverFunctions
};
