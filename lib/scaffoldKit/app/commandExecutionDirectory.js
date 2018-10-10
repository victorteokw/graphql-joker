const findDominantFile = require('find-dominant-file');
const { queryCommandOption } = require('../command');

module.exports = (command, cwd = process.cwd()) => {
  const jumpToRoot = queryCommandOption(command, 'executeInProjectRootDirectory');
  if (jumpToRoot) {
    return findDominantFile(cwd, 'package.json', true);
  } else {
    return cwd;
  }
};
