const path = require('path');
const os = require('os');
const crypto = require('crypto');
const defaultOpts = require('../../lib/cli/defaultOpts');
const orms = require('../../lib/orms');
const merge = require('lodash.merge');

module.exports = (generatorName, args = [], options = {}) => {
  const generatorFile = path.resolve(
    __dirname,
    '../../lib/commands',
    generatorName + '.js'
  );
  const generator = require(generatorFile);
  const projDir = path.join(
    os.tmpdir(),
    crypto.randomBytes(16).toString('hex')
  );
  options = Object.assign({}, defaultOpts, options);
  options = merge({}, orms[options.orm].defaultOpts, options);
  generator({
    args,
    options,
    projDir
  });
  return projDir;
};
