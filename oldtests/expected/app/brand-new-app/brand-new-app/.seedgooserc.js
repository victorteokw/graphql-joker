const config = require('noenv');

module.exports = {
  modelBaseDirectory: 'models',
  models: '*.js',
  data: 'data',
  db: config.database.url
};
