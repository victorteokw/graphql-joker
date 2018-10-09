const execute = require('./execute');

module.exports = ({ createCommand }) =>
  createCommand('resource', {
    execute,
    options: {
      executeInProjectRootDirectory: true
    }
  });
