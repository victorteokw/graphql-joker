const execute = require('./execute');
const { createCommand } = require('scaffold-kit');

module.exports = createCommand({
  execute,
  description: 'Create an uploader.',
  executeInProjectRootDirectory: true,
  commandLineOptions: {
    'uploaderDir': {
      type: 'string',
      default: 'uploaders',
      description: 'where uploader files are located.',
      saveToPreference: true
    }
  }
});
