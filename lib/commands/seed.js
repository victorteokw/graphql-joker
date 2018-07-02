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
  install('nonula', true);
  updateJSON(destination('package.json'), (data) => {
    if (!data.scripts) data.scripts = {};
    data.scripts.seed = "nonula seed";
    data.scripts.drop = "nonula drop";
    return data;
  });
  softCopyTpl(
    template('seed')('.nonularc'),
    destination('.nonularc')
  );
  console.log(`
  Please edit ${chalk.magenta.bold('./.nonularc')} to match your project settings.
  Run ${chalk.blue.bold('npm run seed')} to seed the database.
  Run ${chalk.blue.bold('npm run drop')} to drop the database.
  For documentation of it, see ${chalk.underline.blue('https://github.com/zhangkaiyulw/nonula')}
  `);
};
