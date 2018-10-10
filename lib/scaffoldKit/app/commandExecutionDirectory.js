const findDominantFile = require('find-dominant-file');
const { queryCommandOption } = require('../command');

module.exports = (command) => {
  const jumpToRoot = queryCommandOption(command, 'executeInProjectRootDirectory');
  if (jumpToRoot) {
    return findDominantFile(process.cwd(), 'package.json', true);
  } else {
    return process.cwd();
  }
};
