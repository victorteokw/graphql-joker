const generateModelContent = require('./generateModelContent');
const supportedPrimitiveTypes = require('./supportedPrimitiveTypes');
const packageRequirements = require('./packageRequirements');
const validateOpts = require('./validateOpts');

module.exports = {
  generateModelContent,
  primaryKey: 'id',
  supportedPrimitiveTypes,
  defaultOpts: {
    'adaptor': 'postgresql'
  },
  validateOpts,
  packageRequirements: (opts) => [
    ['sequelize', 'next']
  ].concat(packageRequirements[opts.adaptor]),
  devPackageRequirements: () => [],
  scripts: {
    'seed': 'sequelize db:seed:all',
    'drop': 'sequelize db:seed:undo:all'
  },
  createFiles: [],
  appendFiles: []
};
