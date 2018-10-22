const {
  createCommand,
  executeCommand,
  queryCommandOption,
  getCommandCommandLineOptions
} = require('./command');

const {
  pushInstruction,
  pushInstructions,
  executeAllInstructions
} = require('./executor');

const {
  createApp,
  startApp,
  runApp
} = require('./app');

module.exports = {
  createCommand,
  executeCommand,
  queryCommandOption,
  getCommandCommandLineOptions,
  pushInstruction,
  pushInstructions,
  executeAllInstructions,
  createApp,
  startApp,
  runApp
};
