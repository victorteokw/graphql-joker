const orms = require('../orms');
const minimist = require('minimist');
const camelCase = require('camelcase');
const defaultOpts = require('./defaultOpts');
const findDominantFile = require('find-dominant-file');
const merge = require('lodash.merge');

module.exports = () => {

  // Get user terminal input with default options applied
  let argv = minimist(process.argv.slice(2), {
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

  // Merge with customization file
  const customizationFile = findDominantFile(process.cwd(), '.amurrc.json');
  if (customizationFile) {
    const customization = require(customizationFile);
    merge(argv, customization);
  }

  // Apply orm specific options
  const orm = orms[argv.orm];
  argv = merge({}, orm.defaultOpts, argv);
  orm.validateOpts(argv);

  // Passing non default options, for app to generate .amurrc file
  const nonDefaultOptions = Object.assign({}, argv);
  delete nonDefaultOptions['_'];
  const pureDefaultOpts = Object.assign({}, defaultOpts, orm.defaultOpts);
  Object.keys(nonDefaultOptions).forEach((k) => {
    if (nonDefaultOptions[k] === pureDefaultOpts[k]) {
      delete nonDefaultOptions[k];
    }
  });
  argv.nonDefaultOptions = nonDefaultOptions;

  return argv;
};
