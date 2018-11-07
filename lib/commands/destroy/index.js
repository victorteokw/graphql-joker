const reverse = require('lodash/reverse');
const map = require('lodash/map');
const {
  createCommand,
  loadCommand,
  executeCommand
} = require('scaffold-kit/command');
const {
  getInstructions,
  revertInstruction,
  replaceInstructions
} = require('scaffold-kit/executor');
const app = require('../../app');

module.exports = createCommand({
  description: 'Destroy generated content.',
  options: ({ args }) => {
    const command = loadCommand(app, args[0]);
    return command.options;
  },
  executeInProjectRootDirectory: true,
  execute: async ({ args, options }) => {
    const [commandName, ...commandArgs] = args;
    await executeCommand(
      app,
      loadCommand(app, commandName),
      { args: commandArgs, options }
    );
    replaceInstructions(reverse(map(getInstructions(), revertInstruction)));
  }
});
