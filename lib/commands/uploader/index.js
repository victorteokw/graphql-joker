const execute = require('./execute');

module.exports = ({ createCommand }) =>
  createCommand('uploader', {
    execute,
    options: {
      executeInProjectRootDirectory: true
    }
  });
