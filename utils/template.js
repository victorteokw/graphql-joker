const path = require('path');

module.exports = (group) => (file) => {
  return path.join(__dirname, '../templates', group, file);
};
