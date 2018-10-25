const execute = require('./execute');
const { createCommand } = require('scaffold-kit');

module.exports = createCommand({
  execute,
  description: 'Create a GraphQL resolver file.',
  commandLineOptions: {
    'resolverDir': {
      type: 'string',
      default: 'resolvers',
      description: 'where GraphQL resolver files are located.',
      saveToPreference: true
    }
  },
  options: {
    executeInProjectRootDirectory: true
  }
});
