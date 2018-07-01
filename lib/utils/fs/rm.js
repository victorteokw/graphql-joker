const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

module.exports = (fileName) => {
  let message;
  if (fs.existsSync(fileName)) {
    fs.unlinkSync(fileName);
    message = chalk.green('delete');
  } else {
    message = chalk.yellow('not exist');
  }
  console.log(`  ${message} ${path.relative(process.cwd(), fileName)}`);
};
