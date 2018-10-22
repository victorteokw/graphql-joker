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
  // App
  createCommand,
  executeCommand,
  queryCommandOption,
  getCommandCommandLineOptions,

  // Execution
  pushInstruction,
  pushInstructions,
  executeAllInstructions,

  // Command
  createApp,
  startApp,
  runApp
};
