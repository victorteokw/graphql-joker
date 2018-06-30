const modelDescriptor = require('../utils/modelDescriptor');
const mongooseSchemaBody = require('../utils/mongooseSchemaBody');
const graphQLSchemaBody = require('../utils/graphQLSchemaBody');
const graphQLExtraSchemaTypes = require('../utils/graphQLExtraSchemaTypes');
const resolverBody = require('../utils/resolverBody');
const generateModelTest = require('../utils/generateModelTest');
const copyTpl = require('../utils/copyTpl');
const rm = require('../utils/rm');
const writeToFile = require('../utils/fs/writeToFile');

module.exports = ({ args, options, projDir }) => {
  const descriptor = modelDescriptor(args);
  const context = Object.assign({}, descriptor, {
    mongooseSchemaBody: mongooseSchemaBody(descriptor.fields),
    schemaBody: graphQLSchemaBody(descriptor.modelName, descriptor.fields),
    schemaInputBody: graphQLSchemaBody(descriptor.modelName, descriptor.fields, true),
    extraSchemaTypes: graphQLExtraSchemaTypes(descriptor.modelName, descriptor.fields),
    resolverModelBody: resolverBody(descriptor.modelName, descriptor.fields)
  });

  const template = require('../utils/template')('resource');
  const destination = require('../utils/destination')(projDir);

  if (options.destroy) {
    rm(destination(`${options.modelDir}/${context.modelName}.js`));
    rm(destination(`${options.schemaDir}/${context.modelName}.gql`));
    rm(destination(`${options.resolverDir}/${context.modelName}.js`));
  } else {
    copyTpl(
      template('models/_Base.js'),
      destination(`${options.modelDir}/${context.modelName}.js`),
      context
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
