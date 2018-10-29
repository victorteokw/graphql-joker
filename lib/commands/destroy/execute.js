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
    const instructionName = Object.keys(instruction)[0];
    const instructionDetail = instruction[instructionName];
    if (instructionName === 'ensureDirectory') {
      return instruction;
    } else if (instructionName === 'createFile') {
      return {
        deleteFile: {
          path: instructionDetail.dest
        }
      };
    } else if (instructionName === 'installDependency') {
      return {
        removeDependency: {
          package: instructionDetail.package
        }
      };
    }
    return undefined;
  });
};
