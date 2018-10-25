const { createCommand } = require('scaffold-kit');

module.exports = createCommand({
  description: 'Destroy generated content.',
  composedOf: ['model', 'schema', 'resolver'],
  composingParams: { variant: 'schema' },
  options: {
    executeInProjectRootDirectory: true
  }
});
