const config = require('noenv');

module.exports = {
  'models': '<%- modelDir %>',
  'data': '<%- dataDir %>',
  'mongourl': config.database.url
};
