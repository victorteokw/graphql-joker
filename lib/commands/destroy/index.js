const reverse = require('lodash/reverse');
const map = require('lodash/map');
const {
  createCommand,
  loadCommand,
  executeCommand,
  getCommandOptions
} = require('scaffold-kit/command');
const {
  getInstructions,
  reverseInstruction,
  replaceInstructions
} = require('scaffold-kit/executor');
const app = require('../../app');

module.exports = createCommand({
  description: 'Destroy generated content.',
  options: (input) => {
    const command = loadCommand(app, input.args[0]);
    return getCommandOptions(app, command, input);
  },
  executeInProjectRootDirectory: true,
  execute: async ({ args, options, wd }) => {
    const [commandName, ...commandArgs] = args;
    await executeCommand(
      app,
      loadCommand(app, commandName),
      { args: commandArgs, options, wd }
    );
    replaceInstructions(reverse(map(getInstructions(), reverseInstruction)));
  }
});
