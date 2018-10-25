const findDominantFile = require('find-dominant-file');

module.exports = (command, cwd = process.cwd()) => {
  const jumpToRoot = command.options.executeInProjectRootDirectory;
  if (jumpToRoot) {
    return findDominantFile(cwd, 'package.json', true);
  } else {
    return cwd;
  }
};
