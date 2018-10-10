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
      },
      'overwrite': {
        type: 'boolean',
        default: false,
        description: 'whether overwrite existing file.',
        saveToPreference: false
      },
      'mockInstall': {
        type: 'boolean',
        default: false,
        description: 'update dependency list without installing.',
        saveToPreference: false
      }
    },
    options: {
      executeInProjectRootDirectory: true
    }
  });
