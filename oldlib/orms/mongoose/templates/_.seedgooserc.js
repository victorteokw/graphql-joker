const config = require('noenv');

module.exports = {
  modelBaseDirectory: '<%- modelDir %>',
  models: '*.js',
  data: '<%- dataDir %>',
  db: config.database.url
};
