const execute = require('./execute');
const { createCommand } = require('scaffold-kit');

module.exports = createCommand({
  execute,
  description: 'Create a model file.',
  commandLineOptions: {
    'modelDir': {
      type: 'string',
      default: 'models',
      description: 'where database model files are located.',
      saveToPreference: true
    },
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
