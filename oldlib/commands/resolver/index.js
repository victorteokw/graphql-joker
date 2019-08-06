const execute = require('./execute');
const { createCommand } = require('scaffold-kit/command');

module.exports = createCommand({
  description: 'Create a GraphQL resolver file.',
  options: [
    {
      name: 'resolverDir',
      type: String,
      description: 'where GraphQL resolver files are located.',
      defaultValue: 'resolvers',
      saveToPreference: true
    }
  ],
  executeInProjectRootDirectory: true,
  execute
});
