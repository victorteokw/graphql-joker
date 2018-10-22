const { createCommand } = require('../../scaffoldKit');

module.exports = createCommand({
  description: 'Destroy generated content.',
  composedOf: ['model', 'schema', 'resolver'],
  composingParams: { variant: 'schema' },
  options: {
    executeInProjectRootDirectory: true
  }
});
