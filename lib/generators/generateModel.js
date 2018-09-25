const orms = require('../orms');

module.exports = (schemaDefs, variant, orm) => {
  if (!orms[orm]) {
    throw `Unknown orm: ${orm}`;
  }
  return orms[orm].generateModelContent(schemaDefs, variant);
};
