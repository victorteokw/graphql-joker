const path = require('path');
const mkdirp = require('mkdirp');
const chalk = require('chalk');
const fs = require('fs');

module.exports = (dest) => {
  let message = chalk.green('directory');
  if (fs.existsSync(dest)) {
    message = chalk.yellow('dir exist');
  } else {
    mkdirp.sync(dest);
  }

  console.log(`  ${message} ${path.relative(process.cwd(), dest)}`);
};
