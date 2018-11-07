const path = require('path');

module.exports = (params) => {
  if (!params.args[0]) return params;
  return { wd: path.join(params.wd, params.args[0]) };
};
