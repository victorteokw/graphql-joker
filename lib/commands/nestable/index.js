const { createCommand } = require('scaffold-kit');

module.exports = createCommand({
  description: 'Create a group of nestable data structure.',
  composedOf: ['model', 'schema', 'resolver'],
  composingParams: { variant: 'schema' },
  composeOptions: true,
  executeInProjectRootDirectory: true
});
