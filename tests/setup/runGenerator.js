const path = require('path');
const os = require('os');
const crypto = require('crypto');
const defaultOpts = require('../../cli/defaultOpts');

module.exports = (generatorName, args = [], options = {}) => {
  const generatorFile = path.resolve(
    __dirname,
    '../../generators',
    generatorName + '.js'
  );
  const generator = require(generatorFile);
  const projDir = path.join(
    os.tmpdir(),
    crypto.randomBytes(16).toString("hex")
  );
  generator({
    args,
    options: Object.assign({}, defaultOpts, options),
    projDir
  });
  return projDir;
};
