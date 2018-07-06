const minimist = require('minimist');
const camelCase = require('camelcase');
const defaultOpts = require('./defaultOpts');
const findDominantFile = require('find-dominant-file');
const merge = require('lodash.merge');

module.exports = () => {
  const argv = minimist(process.argv.slice(2), {
    alias: {
      'v': 'version',
      'd': 'destroy',
      'h': 'help'
    },
    default: defaultOpts
  });

  Object.keys(argv).forEach((k) => {
    if (k.match(/^[a-zA-Z]$/)) {
      delete argv[k];
    } else if (k.match(/-/)) {
      argv[camelCase(k)] = argv[k];
      delete argv[k];
    }
  });

  const customizationFile = findDominantFile(process.cwd(), '.amurrc.json');
  if (customizationFile) {
    const customization = require(customizationFile);
    merge(argv, customization);
  }

  return argv;
};
