const execute = require('./execute');
const relocateProjDir = require('./relocateProjDir');
const { createCommand } = require('scaffold-kit');

module.exports = createCommand({
  description: 'Create an GraphQL application.',
  usage: 'amur app path_to_dir [options...]',
  executeInProjectRootDirectory: false,
  commandLineOptions: {
    'eslintConfig': {
      type: 'string',
      default: 'man',
      description: 'the eslint configuration to use.',
      saveToPreference: false
    },
    'gitInit': {
      type: 'boolean',
      default: false,
      description: "whether running 'git init' after creating the project.",
      saveToPreference: false
    },
    'skipInstall': {
      type: 'boolean',
      default: false,
      description: 'whether skipping installation of dependencies.',
      saveToPreference: false
    },
    'port': {
      type: 'number',
      default: 4000,
      description: 'the port number that the app is listening to.',
      saveToPreference: false
    },
    'main': {
      type: 'string',
      default: 'server',
      description: 'the entry file name.',
      saveToPreference: false
    },
    'modelDir': {
      type: 'string',
      default: 'models',
      description: 'where database model files are located.',
      saveToPreference: true
    },
    'schemaDir': {
      type: 'string',
      default: 'schemas',
      description: 'where GraphQL schema files are located.',
      saveToPreference: true
    },
    'resolverDir': {
      type: 'string',
      default: 'resolvers',
      description: 'where GraphQL resolver files are located.',
      saveToPreference: true
    },
    'dataDir': {
      type: 'string',
      default: 'data',
      description: 'where seeding data files are located.',
      saveToPreference: true
    }
  },
  relocateProjDir,
  execute
});
