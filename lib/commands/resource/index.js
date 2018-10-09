const execute = require('./execute');

module.exports = ({ createCommand }) =>
  createCommand('resource', {
    execute,
    description: 'Create a group of API resource.',
    options: {
      executeInProjectRootDirectory: true
    }
  });
