const execute = require('./execute');

module.exports = ({ createCommand }) =>
  createCommand('uploader', {
    execute,
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
