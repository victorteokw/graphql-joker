const { createCommand } = require('scaffold-kit/command');

module.exports = createCommand({
  description: 'Create a group of API resource.',
  composedOf: ['model', 'schema', 'resolver'],
  composeOptions: true,
  executeInProjectRootDirectory: true
});
