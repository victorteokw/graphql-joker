module.exports = {
  // App
  'eslintConfig': 'man', // changing eslint configuration
  'gitInit': false, // Run 'git init' after installing dependencies

  // Resource & Schema
  'modelDir': 'models', // Where to put model files
  'schemaDir': 'schemas', // Where to put gql schema files
  'resolverDir': 'resolvers', // Where to put gql resolver files
  'test': false, // Whether including tests

  // Shared
  'forceCwd': false, // force generating to current directory
};
