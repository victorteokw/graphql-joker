const supportedAdaptors = require('./supportedAdaptors');

module.exports = (opts) => {
  if (!supportedAdaptors.includes(opts.adaptor)) {
    throw `Unknown sequelize adaptor: ${opts.adaptor}`;
  }
};
