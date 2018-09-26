const kebabCase = require('lodash.kebabcase');

module.exports = (obj, env, options) => {
  if (env === 'prod') {
    obj.database = {
      url: 'process.env.POSTGRES!'
    };
  } else {
    obj.database = {
      url: `postgres://127.0.0.1:5432/${kebabCase(options.name)}-${env}`
    };
  }
  return obj;
};
