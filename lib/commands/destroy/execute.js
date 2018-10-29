const { editInstructions, executeCommand, loadCommand } = require('scaffold-kit');
const app = require('../../app');
module.exports = ({ args, options }) => {
  const [commandName, ...commandArgs] = args;
  executeCommand(
    app,
    loadCommand(app, commandName),
    { args: commandArgs, options }
  );
  editInstructions((instruction) => {
    console.log(instruction);
    return undefined;
  });
};
