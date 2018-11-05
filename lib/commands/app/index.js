const execute = require('./execute');
const relocateWorkingDirectory = require('./relocateWorkingDirectory');
const { createCommand } = require('scaffold-kit');

module.exports = createCommand({
  description: 'Create an GraphQL application.',
  usage: 'amur app path_to_dir [options...]',
  options: [
    {
      name: 'eslintConfig',
      type: String,
      description: 'the eslint configuration to use.',
      defaultValue: 'man',
      saveToPreference: false
    },
    {
      name: 'gitInit',
      type: Boolean,
      description: "whether running 'git init' after creating the project.",
      defaultValue: false,
      saveToPreference: false
    },
    {
      name: 'port',
      type: Number,
      description: 'the port number that the app is listening to.',
      defaultValue: 4000,
      saveToPreference: false
    },
    {
      name: 'main',
      type: String,
      description: 'the entry file name.',
      defaultValue: 'server',
      saveToPreference: false
    },
    {
      name: 'modelDir',
      type: String,
      description: 'where database model files are located.',
      defaultValue: 'models',
      saveToPreference: true
    },
    {
      name: 'schemaDir',
      type: String,
      description: 'where GraphQL schema files are located.',
      defaultValue: 'schemas',
      saveToPreference: true
    },
    {
      name: 'resolverDir',
      type: String,
      description: 'where GraphQL resolver files are located.',
      defaultValue: 'resolvers',
      saveToPreference: true
    },
    {
      name: 'dataDir',
      type: String,
      description: 'where seeding data files are located.',
      defaultValue: 'data',
      saveToPreference: true
    }
  ],
  executeInProjectRootDirectory: false,
  relocateWorkingDirectory,
  execute
});
