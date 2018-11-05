const execute = require('./execute');
const { createCommand } = require('scaffold-kit');

module.exports = createCommand({
  execute,
  description: 'Create an uploader.',
  executeInProjectRootDirectory: true,
  options: [
    {
      name: 'uploaderDir',
      type: String,
      description: 'where uploader files are located.',
      defaultValue: 'uploaders',
      saveToPreference: true
    }
  ]
});
