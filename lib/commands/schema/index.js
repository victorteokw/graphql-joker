const execute = require('./execute');
const { createCommand } = require('scaffold-kit/command');

module.exports = createCommand({
  description: 'Create a GraphQL schema file.',
  options: [
    {
      name: 'schemaDir',
      type: String,
      description: 'where GraphQL schema files are located.',
      defaultValue: 'schemas',
      saveToPreference: true
    }
  ],
  executeInProjectRootDirectory: true,
  execute
});
