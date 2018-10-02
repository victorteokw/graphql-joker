const path = require('path');
const os = require('os');
const crypto = require('crypto');
const defaultOpts = require('../../lib/cli/defaultOpts');
const orms = require('../../lib/orms');
const merge = require('lodash.merge');

module.exports = (generators) => {
  const projDir = path.join(
    os.tmpdir(),
    crypto.randomBytes(16).toString('hex')
  );
  generators.forEach((g) => {
    const generatorFile = path.resolve(
      __dirname,
      '../../lib/commands',
      g[0] + '.js'
    );
    const generator = require(generatorFile);
    let options = Object.assign({}, defaultOpts, g[2] || {});
    options = merge({}, orms[options.orm].defaultOpts, options);
    generator({
      args: g[1] || [],
      options,
      projDir
    });
  });

  return projDir;
};
