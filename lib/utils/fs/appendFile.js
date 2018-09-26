const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const chalk = require('chalk');

module.exports = (content, dest) => {
  if (!content) return;
  mkdirp.sync(path.dirname(dest));
  let message = chalk.green('append');
  if (fs.existsSync(dest) && fs.readFileSync(dest).toString().includes(content)) {
    message = chalk.yellow('appended');
  } else {
    fs.appendFileSync(dest, content);
  }
  console.log(`  ${message} ${path.relative(process.cwd(), dest)}`);
};
