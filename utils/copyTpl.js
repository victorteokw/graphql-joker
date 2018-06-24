const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const ejs = require('ejs');
const chalk = require('chalk');

module.exports = (src, dest, ctx) => {
  mkdirp.sync(path.dirname(dest));
  let message = chalk.green('create');
  if (fs.existsSync(dest)) {
    message = chalk.yellow('overwrite');
  }
  if (ctx) {
    fs.writeFileSync(dest, ejs.render(fs.readFileSync(src).toString(), ctx));
  } else {
    fs.copyFileSync(src, dest);
  }
  console.log(`  ${message} ${path.relative(process.cwd(), dest)}`);
};
