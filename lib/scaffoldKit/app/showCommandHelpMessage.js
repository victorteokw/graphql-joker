const mapValues = require('lodash.mapvalues');
const map = require('lodash.map');
const kebabCase = require('lodash.kebabcase');

module.exports = (app, commandName, command) => {
  const appOptionDescs = mapValues(app.appLevelCommandLineOptions, 'description');
  const commandOptionDescs = mapValues(command.commandLineOptions, 'description');
  console.log('');
  console.log(`${app.appName} ${app.version}`);
  console.log('');
  console.log(`Command: ${app.commandName} ${commandName}`);
  console.log('');
  console.log(`Description: ${command.description}`);
  console.log('');
  if (command.usage) {
    console.log('Usage:');
    console.log('');
    console.log(`${command.usage}`);
    console.log('');
  }
  console.log('Options:');
  console.log('');
  map(commandOptionDescs, (o, k) => {
    console.log(`  --${kebabCase(k).padEnd(14)}\t${o}`);
  });
  map(appOptionDescs, (o, k) => {
    console.log(`  --${kebabCase(k).padEnd(14)}\t${o}`);
  });
  console.log('');
};
