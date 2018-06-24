const path = require('path');
const fs = require('fs');
const assert = require('assert');

module.exports = (dest) => (relativeName, content) => {
  const fileName = path.resolve(dest, relativeName);
  assert(fs.existsSync(fileName), `File not exist ${fileName}`);
  assert.equal(fs.readFileSync(fileName).toString(), content);
};
