const path = require('path');

module.exports = ({ args, projDir }) => {
  if (!args[0]) return projDir;
  return path.join(projDir, args[0]);
};
