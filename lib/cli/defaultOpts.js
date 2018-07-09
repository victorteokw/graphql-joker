module.exports = {
  // App
  'eslintConfig': 'man', // Changing eslint configuration
  'gitInit': false, // Run 'git init' after installing dependencies
  'skipInstall': false, // Do not install dependencies
  'port': 4000, // Default port number

  // Resource & Schema
  'modelDir': 'models', // Where to put model files
  'schemaDir': 'schemas', // Where to put gql schema files
  'resolverDir': 'resolvers', // Where to put gql resolver files

  // Shared
  'test': false, // Whether including tests
  'forceCwd': false, // force generating to current directory
};
