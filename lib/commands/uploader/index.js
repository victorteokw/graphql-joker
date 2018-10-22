const execute = require('./execute');
const { createCommand } = require('../../scaffoldKit');

module.exports = createCommand({
  execute,
  description: 'Create an uploader.',
  commandLineOptions: {
    'uploaderDir': {
      type: 'string',
      default: 'uploaders',
      description: 'where uploader files are located.',
      saveToPreference: true
    }
  },
  options: {
    executeInProjectRootDirectory: true
  }
});
