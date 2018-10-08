const minimist = require('minimist');
const camelCase = require('camelcase');

module.exports = () => {

  // Get user terminal input with default options applied
  const argv = minimist(process.argv.slice(2), {
    alias: {
      'v': 'version',
      'd': 'destroy',
      'h': 'help'
    }
  });

  Object.keys(argv).forEach((k) => {
    if (k.match(/^[a-zA-Z]$/)) {
      delete argv[k];
    } else if (k.match(/-/)) {
      argv[camelCase(k)] = argv[k];
      delete argv[k];
    }
  });

  const { _: [ command, ...args ], ...options } = argv;
  return { command, args, options };
};
