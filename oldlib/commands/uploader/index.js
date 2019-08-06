const execute = require('./execute');
const { createCommand } = require('scaffold-kit/command');

module.exports = createCommand({
  description: 'Create an uploader.',
  options: [
    {
      name: 'uploaderDir',
      type: String,
      description: 'where uploader files are located.',
      defaultValue: 'uploaders',
      saveToPreference: true
    }
  ],
  executeInProjectRootDirectory: true,
  execute,
});
