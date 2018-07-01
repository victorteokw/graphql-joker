const minimist = require('minimist');
const camelCase = require('camelcase');
const defaultOpts = require('./defaultOpts');

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

  return argv;
};
