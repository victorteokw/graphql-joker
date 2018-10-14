const execute = require('./execute');
const { createCommand } = require('../../scaffoldKit');

module.exports = createCommand({
  execute,
  description: 'Create a GraphQL schema file.',
  commandLineOptions: {
    'schemaDir': {
      type: 'string',
      default: 'schemas',
      description: 'where GraphQL schema files are located.',
      saveToPreference: true
    }
  },
  options: {
    executeInProjectRootDirectory: true
  }
});
