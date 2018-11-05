const { loadCommand } = require('scaffold-kit');
const app = require('../../app');

module.exports = ({ args }) => {
  const command = loadCommand(app, args[0]);
  return command.options;
};
