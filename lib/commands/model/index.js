const execute = require('./execute');
const { createCommand } = require('scaffold-kit');

module.exports = createCommand({
  execute,
  description: 'Create a model file.',
  executeInProjectRootDirectory: true,
  options: [
    {
      name: 'modelDir',
      type: String,
      description: 'where database model files are located.',
      defaultValue: 'models',
      saveToPreference: true
    },
    {
      name: 'uploaderDir',
      type: String,
      description: 'where uploader files are located.',
      defaultValue: 'uploaders',
      saveToPreference: true
    }
  ]
});
