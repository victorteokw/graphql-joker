const fs = require('fs');
const updateJSON = require('../utils/fs/updateJSON');
const install = require('../utils/install');
const softCopyTpl = require('../utils/fs/softCopyTpl');
const template = require('../utils/template');
const chalk = require('chalk');

module.exports = ({ args, options, projDir }) => {
  const destination = require('../utils/destination')(projDir);
  if (!fs.existsSync(destination('package.json'))) {
    throw 'Not inside a project.';
  }
  install('dobukulbira', true);
  updateJSON(destination('package.json'), (data) => {
    if (!data.scripts) data.scripts = {};
    data.scripts.console = 'dobukulbira';
    return data;
  });
  softCopyTpl(
    template('console')('dobukulbira.config.js'),
    destination('dobukulbira.config.js')
  );
  console.log(`
  Please edit ${chalk.magenta.bold('./dobukulbira.config.js')} to match your project settings.
  Run ${chalk.blue.bold('npm run console')} to start database console.
  For documentation of it, see ${chalk.underline.blue('https://github.com/zhangkaiyulw/dobukulbira')}
  `);
};
