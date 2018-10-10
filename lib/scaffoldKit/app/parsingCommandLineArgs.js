const minimist = require('minimist');
const camelCase = require('camelcase');

module.exports = (argv = process.argv) => {

  const parsed = minimist(argv.slice(2), {
    alias: { 'v': 'version', 'h': 'help' }
  });

  Object.keys(parsed).forEach((k) => {
    if (k.match(/^[a-zA-Z]$/)) {
      delete parsed[k];
    } else if (k.match(/-/)) {
      parsed[camelCase(k)] = parsed[k];
      delete parsed[k];
    }
  });

  const { _: [ command, ...args ], ...options } = parsed;
  return { command, args, options };
};
