const execute = require('./execute');

module.exports = ({ createCommand }) =>
  createCommand('app', {
    execute,
    description: 'Create an GraphQL application.',
    options: {
      executeInProjectRootDirectory: false
    }
  });
