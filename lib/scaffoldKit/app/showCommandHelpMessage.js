const mapValues = require('lodash.mapvalues');
const map = require('lodash.map');
const kebabCase = require('lodash.kebabcase');

module.exports = (app, commandName, command) => {
  const appOptionDescs = mapValues(app.appLevelCommandLineOptions, 'description');
  const commandOptionDescs = mapValues(command.commandLineOptions, 'description');
  console.log(`${app.appName} ${app.version}`);
  console.log(`Command: ${app.commandName} ${commandName}`);
  map(appOptionDescs, (o, k) => {
    console.log(`  --${kebabCase(k).padEnd(14)}\t${o}`);
  });
  map(commandOptionDescs, (o, k) => {
    console.log(`  --${kebabCase(k).padEnd(14)}\t${o}`);
  });
};
