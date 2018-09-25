const generateModelContent = require('./generateModelContent');
const supportedPrimitiveTypes = require('./supportedPrimitiveTypes');

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
    ['nonula', '0.2.1'],
    ['dobukulbira', '0.0.5'],
  ],
  scripts: {
    'console': 'dobukulbira',
    'seed': 'nonula seed',
    'drop': 'nonula drop'
  }
};
