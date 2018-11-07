const { createCommand } = require('scaffold-kit/command');
const execute = require('./execute');
const dynamicOptions = require('./dynamicOptions');

module.exports = createCommand({
  description: 'Destroy generated content.',
  dynamicOptions,
  executeInProjectRootDirectory: true,
  execute
});
