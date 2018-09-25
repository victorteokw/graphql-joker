module.exports = {
  generateModelContent: require('./generateModelContent'),
  primaryKey: '_id',
  supportedPrimitiveTypes: require('./supportedPrimitiveTypes'),
  packageRequirements: [
    ['mongoose', '^5.0.0'],
    ['mongoose-uploader', '0.0.4']
  ],
  devPackageRequirements: [
    ['nonula', '0.2.1'],
    ['dobukulbira', '0.0.5'],
  ]
};
