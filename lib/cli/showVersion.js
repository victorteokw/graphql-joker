const path = require('path');

module.exports = () => {
  const { version } = require(path.join(__dirname, '../../package.json'));
  process.stdout.write(`Amur version ${version}.\n`);
};
