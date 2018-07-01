const modelDescriptor = require('../modelDescriptor');
const generateMongooseSchema = require('../generators/generateMongooseSchema');
const generateGraphQLSchema = require('../generators/generateGraphQLSchema');
const graphQLExtraSchemaTypes = require('../generators/graphQLExtraSchemaTypes');
const generateResolver = require('../generators/generateResolver');
const generateModelTest = require('../generators/generateModelTest');
const copyTpl = require('../utils/fs/copyTpl');
const rm = require('../utils/fs/rm');
const writeToFile = require('../utils/fs/writeToFile');

module.exports = ({ args, options, projDir }) => {
  const descriptor = modelDescriptor(args);
  const context = Object.assign({}, descriptor, {
    schemaBody: generateGraphQLSchema(descriptor.modelName, descriptor.fields),
    schemaInputBody: generateGraphQLSchema(descriptor.modelName, descriptor.fields, true),
    extraSchemaTypes: graphQLExtraSchemaTypes(descriptor.modelName, descriptor.fields),
    resolverModelBody: generateResolver(descriptor.modelName, descriptor.fields)
  });

  const template = require('../utils/template')('resource');
  const destination = require('../utils/destination')(projDir);

  if (options.destroy) {
    rm(destination(`${options.modelDir}/${context.modelName}.js`));
    rm(destination(`${options.schemaDir}/${context.modelName}.gql`));
    rm(destination(`${options.resolverDir}/${context.modelName}.js`));
    rm(destination(`tests/models/${descriptor.modelName}Test.js`));
  } else {
    writeToFile(
      generateMongooseSchema(descriptor, 'model'),
      destination(`${options.modelDir}/${context.modelName}.js`)
    );
    copyTpl(
      template('schemas/_Base.gql'),
      destination(`${options.schemaDir}/${context.modelName}.gql`),
      context
    );
    copyTpl(
      template('resolvers/_Base.js'),
      destination(`${options.resolverDir}/${context.modelName}.js`),
      context
    );
    writeToFile(
      generateModelTest(descriptor),
      destination(`tests/models/${descriptor.modelName}Test.js`)
    );
  }
};
