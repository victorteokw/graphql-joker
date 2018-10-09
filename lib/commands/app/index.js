const execute = require('./execute');

module.exports = ({ createCommand }) =>
  createCommand('app', {
    execute,
    options: {
      executeInProjectRootDirectory: false
    }
  });
