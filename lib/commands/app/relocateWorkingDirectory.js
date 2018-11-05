const path = require('path');

module.exports = ({ args, cwd }) => {
  if (!args[0]) return cwd;
  return path.join(cwd, args[0]);
};
