const ejs = require('ejs');
const fs = require('fs');

module.exports = (src, options) =>
  ejs.render(fs.readFileSync(src).toString(), options);
