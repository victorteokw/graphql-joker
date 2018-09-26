const kebabCase = require('lodash.kebabcase');

module.exports = (obj, env, options) => {
  if (env === 'prod') {
    obj.database = {
      url: 'process.env.MONGO!'
    };
  } else {
    obj.database = {
      url: `mongodb://127.0.0.1:27017/${kebabCase(options.name)}-${env}`
    };
  }
};
