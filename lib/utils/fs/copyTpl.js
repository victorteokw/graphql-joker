const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const ejs = require('ejs');
const chalk = require('chalk');

module.exports = (src, dest, ctx, opts = {}) => {
  mkdirp.sync(path.dirname(dest));
  let message = chalk.green('create');
  if (fs.existsSync(dest)) {
    if (opts.soft) {
      message = chalk.yellow('exist');
    } else {
      message = chalk.yellow('overwrite');
    }
  }
  if (!(opts.soft && fs.existsSync(dest))) {
    if (ctx) {
      fs.writeFileSync(dest, ejs.render(fs.readFileSync(src).toString(), ctx));
    } else {
      fs.copyFileSync(src, dest);
    }
  }

  console.log(`  ${message} ${path.relative(process.cwd(), dest)}`);
};
