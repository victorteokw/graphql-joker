const minimist = require('minimist');
const camelCase = require('camelcase');

module.exports = () => {
  const argv = minimist(process.argv.slice(2), {
    alias: {
      'v': 'version',
      'd': 'destroy',
      'h': 'help'
    },
    default: {
      'modelDir': 'models',
      'schemaDir': 'schemas',
      'resolverDir': 'resolvers',
      indent: 2
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

  return argv;
};
