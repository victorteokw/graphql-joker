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

const queryCommandOption = (command, optionName) => {
  return command.options[optionName];
};

const getCommandCommandLineOptions = (command) => {
  return command.commandLineOptions;
};

module.exports = {
  createCommand,
  executeCommand,
  queryCommandOption,
  getCommandCommandLineOptions
};
