const config = require('noenv');

module.exports = {
  'models': 'models',
  'data': 'data',
  'mongourl': config.database.url
};
