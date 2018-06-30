const modelDescriptor = require('../utils/modelDescriptor');
const mongooseSchemaBody = require('../utils/mongooseSchemaBody');
const graphQLSchemaBody = require('../utils/graphQLSchemaBody');
const graphQLExtraSchemaTypes = require('../utils/graphQLExtraSchemaTypes');
const resolverBody = require('../utils/resolverBody');
const copyTpl = require('../utils/copyTpl');
const rm = require('../utils/rm');

module.exports = ({ args, options, projDir }) => {
  const descriptor = modelDescriptor(args);
  const context = Object.assign({}, descriptor, {
    mongooseSchemaBody: mongooseSchemaBody(descriptor.fields),
    schemaBody: graphQLSchemaBody(descriptor.modelName, descriptor.fields),
    schemaInputBody: graphQLSchemaBody(descriptor.modelName, descriptor.fields, true),
    extraSchemaTypes: graphQLExtraSchemaTypes(descriptor.modelName, descriptor.fields),
    resolverModelBody: resolverBody(descriptor.modelName, descriptor.fields)
  });

  const template = require('../utils/template')('schema');
  const destination = require('../utils/destination')(projDir);

  if (options.destroy) {
    rm(destination(`${options.modelDir}/${context.varName}Schema.js`));
    rm(destination(`${options.schemaDir}/${context.modelName}.gql`));
    rm(destination(`${options.resolverDir}/${context.modelName}.js`));
  } else {
    copyTpl(
      template('models/_baseSchema.js'),
      destination(`${options.modelDir}/${context.varName}Schema.js`),
      context
    );
    copyTpl(
      template('schemas/_Base.gql'),
      destination(`${options.schemaDir}/${context.modelName}.gql`),
      context
    );
    if (context.sideEffects.needsResolverModelBody) {
      copyTpl(
        template('resolvers/_Base.js'),
        destination(`${options.resolverDir}/${context.modelName}.js`),
        context
      );
    }
  }
};
