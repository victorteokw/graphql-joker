const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const chalk = require('chalk');

module.exports = (content, dest) => {
  if (!content) return;
  mkdirp.sync(path.dirname(dest));
  let message = chalk.green('create');
  if (fs.existsSync(dest)) {
    message = chalk.yellow('overwrite');
  }
  fs.writeFileSync(dest, content);
  console.log(`  ${message} ${path.relative(process.cwd(), dest)}`);
};
