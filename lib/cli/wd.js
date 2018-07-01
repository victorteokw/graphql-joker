const findDominantFile = require('find-dominant-file');

module.exports = (command) => {
  if (command !== 'app') {
    const projRoot = findDominantFile(process.cwd(), 'package.json', true);
    return projRoot || process.cwd();
  } else {
    return process.cwd();
  }
};
