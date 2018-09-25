const { spawnSync } = require('child_process');
const chalk = require('chalk');
const path = require('path');

module.exports = (dep, ver, dev) => {

  const pkg = require(path.join(process.cwd(), 'package.json'));

  let msg = chalk.green('installing');
  if (dev ? pkg.devDependencies[dep] : pkg.dependencies[dep]) {
    msg = chalk.yellow('installed');
    console.log(`  ${msg} ${dep}`);
    return;
  }
  console.log(`  ${msg} ${dep}`);
  const obj = spawnSync('npm', ['install', dep + '@' + ver, dev ? '--save-dev' : '--save']);
  if (obj.signal === 'SIGINT') {
    console.log('');
    process.exit(0);
  }
};
