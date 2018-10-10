const findDominantFile = require('find-dominant-file');
const error = require('../error');

module.exports = (app, cwd = process.cwd()) => {
  if (!app.rcFile) return {};
  const optionsFile = findDominantFile(cwd, app.rcFile);
  if (!optionsFile) return {};
  try {
    return require(optionsFile);
  } catch(e) {
    throw error(`'${optionsFile}' malformed.`);
  }
};
