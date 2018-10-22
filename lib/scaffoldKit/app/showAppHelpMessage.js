const map = require('lodash.map');

module.exports = (app) => {
  console.log('');
  console.log(`${app.appName} ${app.version}`);
  console.log('');
  console.log(`${app.description}`);
  console.log('');
  console.log('Commands:');
  console.log('');
  map(app.commandsMap, (c, n) => {
    const command = require(c);
    console.log(`  ${n.padEnd(14)}${command.description || 'Description not provided.'}`);
  });
  console.log('');
};
