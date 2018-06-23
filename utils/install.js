const { spawnSync } = require('child_process');
const chalk = require('chalk');
const path = require('path');

module.exports = (dep, dev) => {

  const pkg = require(path.join(process.cwd(), 'package.json'));
  console.log(pkg);
  let msg = chalk.green('installing');
  if (pkg.dependencies[dep]) {
    msg = chalk.yellow('installed');
    console.log(`  ${msg} ${dep}`);
    return;
  }
  console.log(`  ${msg} ${dep}`);
  const obj = spawnSync('npm', ['install', dep, dev ? '--save-dev' : '--save']);
  if (obj.signal === 'SIGINT') {
    console.log('');
    process.exit(0);
  }
};
