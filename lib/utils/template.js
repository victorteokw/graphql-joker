const path = require('path');

module.exports = (group) => (file) =>
  path.join(__dirname, '../templates', group, file);
