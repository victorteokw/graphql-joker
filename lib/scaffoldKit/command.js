const error = require('./error');

const createCommand = (descriptor) => {
  if (!descriptor) {
    throw error('please provide command descriptor.');
  }
  if (!descriptor.options) descriptor.options = {};
  return descriptor;
};

const executeCommand = (command, params) => {
  command.execute(params);
};

module.exports = {
  createCommand,
  executeCommand
};
