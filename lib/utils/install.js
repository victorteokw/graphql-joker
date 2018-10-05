const { spawnSync } = require('child_process');
const chalk = require('chalk');
const path = require('path');
const updateJSON = require('./fs/updateJSON');

module.exports = (dep, ver, isDev, isMock) => {

  const pkgFile = path.join(process.cwd(), 'package.json');
  const pkg = require(pkgFile);

  let msg = chalk.green('installing');
  if (isDev ? pkg.devDependencies[dep] : pkg.dependencies[dep]) {
    msg = chalk.yellow('installed');
    console.log(`  ${msg} ${dep}`);
    return;
  }
  console.log(`  ${msg} ${dep}`);
  if (isMock) {
    updateJSON(pkgFile, (j) => {
      j[isDev ? 'devDependencies' : 'dependencies'][dep] = ver;
      return j;
    });
  } else {
    const obj = spawnSync('npm', ['install', dep + '@' + ver, isDev ? '--save-dev' : '--save']);
    if (obj.signal === 'SIGINT') {
      console.log('');
      process.exit(0);
    }
  }
};
