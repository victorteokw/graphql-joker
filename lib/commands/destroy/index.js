const { createCommand } = require('scaffold-kit');
const execute = require('./execute');

module.exports = createCommand({
  description: 'Destroy generated content.',
  executeInProjectRootDirectory: true,
  execute
});
