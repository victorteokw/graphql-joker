const path = require('path');

module.exports = (dir) => (file) => {
  return path.join(dir, file);
};
