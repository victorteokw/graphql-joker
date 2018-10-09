const error = require('./error');

const commandRegistry = {};

const createCommand = (commandName, descriptor) => {
  if (!commandName) {
    throw error('command name required.');
  }
  if (commandRegistry[commandName]) {
    throw error(`duplicate creating command '${commandName}'.`);
  }
  if (!descriptor) {
    throw error(`no descriptor provided for command '${commandName}'.`);
  }

  if (!descriptor.options) descriptor.options = {};
  commandRegistry[commandName] = descriptor;
};

const checkCommandExistance = (commandName) => {
  if (!commandRegistry[commandName]) {
    throw error(`command '${commandName}' not exist.`);
  }
};

const executeCommand = (commandName, params) => {
  checkCommandExistance(commandName);
  commandRegistry[commandName].execute(params);
};

const queryCommand = (commandName, optionName) => {
  checkCommandExistance(commandName);
  return commandRegistry[commandName].options[optionName];
};

module.exports = {
  createCommand,
  executeCommand,
  queryCommand
};
