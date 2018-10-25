const {
  createCommand,
  executeCommand
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

  // Execution
  pushInstruction,
  pushInstructions,
  executeAllInstructions,

  // Command
  createApp,
  startApp,
  runApp
};
