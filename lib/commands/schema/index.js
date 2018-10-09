const execute = require('./execute');

module.exports = ({ createCommand }) =>
  createCommand('schema', {
    execute,
    options: {
      executeInProjectRootDirectory: true
    }
  });
