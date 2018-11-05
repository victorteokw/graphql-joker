const { createCommand } = require('scaffold-kit');
const execute = require('./execute');
const dynamicOptions = require('./dynamicOptions');

module.exports = createCommand({
  description: 'Destroy generated content.',
  dynamicOptions,
  executeInProjectRootDirectory: true,
  execute
});
