const execute = require('./execute');
const { createCommand } = require('scaffold-kit');

module.exports = createCommand({
  execute,
  description: 'Create a GraphQL schema file.',
  executeInProjectRootDirectory: true,
  options: [
    {
      name: 'schemaDir',
      type: String,
      description: 'where GraphQL schema files are located.',
      defaultValue: 'schemas',
      saveToPreference: true
    }
  ]
});
