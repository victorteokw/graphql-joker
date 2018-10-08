const findDominantFile = require('find-dominant-file');
const merge = require('lodash.merge');
const defaultOptions = require('./defaultOptions');
const getCurrentWorkingDirectory = require('./getCurrentWorkingDirectory');
const orms = require('../orms');

module.exports = ({ command, args, options }) => {

  const commandLineOptions = options;

  const projDir = options.forceCwd ? process.cwd() : getCurrentWorkingDirectory();

  // Get project options
  const projectOptionsFile = findDominantFile(projDir, '.amurrc.json');
  const projectOptions = projectOptionsFile ? require(projectOptionsFile) : {};

  // Get orm options
  const orm = commandLineOptions.orm ||
    projectOptions.orm ||
    defaultOptions.orm;
  const ormDefaultOptions = orms[orm].defaultOpts;

  // Merge options
  const allDefaultOptions = merge({}, defaultOptions, ormDefaultOptions);
  const finalOptions = merge({},
    allDefaultOptions,
    projectOptions,
    commandLineOptions
  );

  orms[orm].validateOpts(finalOptions);

  // Figuring out non default options
  const nonDefaultOptions = Object.assign({}, finalOptions);
  Object.keys(nonDefaultOptions).forEach((k) => {
    if (nonDefaultOptions[k] === allDefaultOptions[k]) {
      delete nonDefaultOptions[k];
    }
  });
  finalOptions.nonDefaultOptions = nonDefaultOptions;

  return { command, args, options: finalOptions, projDir };
};
