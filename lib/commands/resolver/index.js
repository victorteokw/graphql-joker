const execute = require('./execute');
const { createCommand } = require('scaffold-kit');

module.exports = createCommand({
  execute,
  description: 'Create a GraphQL resolver file.',
  executeInProjectRootDirectory: true,
  options: [
    {
      name: 'resolverDir',
      type: String,
      description: 'where GraphQL resolver files are located.',
      defaultValue: 'resolvers',
      saveToPreference: true
    }
  ]
});
