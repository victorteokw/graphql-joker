const modelDescriptor = require('../modelDescriptor');
const generateMongooseSchema = require('../generators/generateMongooseSchema');
const generateGraphQLSchema = require('../generators/generateGraphQLSchema');
const generateResolver = require('../generators/generateResolver');
const copyTpl = require('../utils/fs/copyTpl');
const rm = require('../utils/fs/rm');
const writeToFile = require('../utils/fs/writeToFile');

module.exports = ({ args, options, projDir }) => {
  const descriptor = modelDescriptor(args);
  const context = Object.assign({}, descriptor, {
    resolverModelBody: generateResolver(descriptor.modelName, descriptor.fields)
  });

  const template = require('../utils/template')('schema');
  const destination = require('../utils/destination')(projDir);

  if (options.destroy) {
    rm(destination(`${options.modelDir}/${context.varName}Schema.js`));
    rm(destination(`${options.schemaDir}/${context.modelName}.gql`));
    rm(destination(`${options.resolverDir}/${context.modelName}.js`));
  } else {
    writeToFile(
      generateMongooseSchema(descriptor, 'schema'),
      destination(`${options.modelDir}/${context.varName}Schema.js`)
    );
    writeToFile(
      generateGraphQLSchema(descriptor, 'schema'),
      destination(`${options.schemaDir}/${context.modelName}.gql`)
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
