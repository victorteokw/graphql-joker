const updateJSON = require('../utils/fs/updateJSON');
const install = require('../utils/install');

module.exports = ({ args, options, projDir }) => {
  const destination = require('../utils/destination')(projDir);
  install('dobukulbira', true);
  updateJSON(destination('package.json'), (data) => {
    if (!data.scripts) data.scripts = {};
    data.scripts.console = "dobukulbira";
    return data;
  });
};
