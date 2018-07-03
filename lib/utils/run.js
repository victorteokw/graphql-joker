const { spawnSync } = require('child_process');
const chalk = require('chalk');

module.exports = (command) => {
  const [name, ...args] = command.split(' ');
  console.log(`  ${chalk.green('run')} ${command}`);
  const obj = spawnSync(name, args);
  if (obj.signal === 'SIGINT') {
    console.log('');
    process.exit(0);
  }
};
