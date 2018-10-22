const { createCommand } = require('../../scaffoldKit');

module.exports = createCommand({
  composedOf: ['model', 'schema', 'resolver'],
  conposingParams: { variant: 'schema' },
  commandLineOptions: {
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
    'uploaderDir': {
      type: 'string',
      default: 'uploaders',
      description: 'where uploader files are located.',
      saveToPreference: true
    }
  },
  options: {
    executeInProjectRootDirectory: true
  }
});
