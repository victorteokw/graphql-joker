const { createCommand } = require('scaffold-kit');

module.exports = createCommand({
  description: 'Create a group of API resource.',
  composedOf: ['model', 'schema', 'resolver'],
  executeInProjectRootDirectory: true
});
