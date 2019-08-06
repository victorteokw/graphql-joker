const config = require('noenv');

module.exports = {
  orm: 'mongoose',
  db: config.database.url,
  models: '*.js',
  modelBaseDirectory: 'models'
};
