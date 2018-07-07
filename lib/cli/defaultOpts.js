module.exports = {
  // App
  'eslintConfig': 'man', // Changing eslint configuration
  'gitInit': false, // Run 'git init' after installing dependencies
  'port': 6000, // Default port number

  // Resource & Schema
  'modelDir': 'models', // Where to put model files
  'schemaDir': 'schemas', // Where to put gql schema files
  'resolverDir': 'resolvers', // Where to put gql resolver files
  'test': false, // Whether including tests

  // Shared
  'forceCwd': false, // Force generating to current directory
};
