const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const chalk = require('chalk');

module.exports = (content, dest, opts = {}) => {
  if (!content) return;
  mkdirp.sync(path.dirname(dest));
  let message = chalk.green('create');
  if (fs.existsSync(dest)) {
    if (opts.soft) {
      message = chalk.yellow('exist');
    } else {
      message = chalk.yellow('overwrite');
    }
  }
  if (!(fs.existsSync(dest) && opts.soft)) {
    fs.writeFileSync(dest, content);
  }
  console.log(`  ${message} ${path.relative(process.cwd(), dest)}`);
};
