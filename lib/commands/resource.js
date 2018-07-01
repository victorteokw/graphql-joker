const modelDescriptor = require('../modelDescriptor');
const generateMongooseSchema = require('../generators/generateMongooseSchema');
const generateGraphQLSchema = require('../generators/generateGraphQLSchema');
const generateResolver = require('../generators/generateResolver');
const generateModelTest = require('../generators/generateModelTest');
const copyTpl = require('../utils/fs/copyTpl');
const rm = require('../utils/fs/rm');
const writeToFile = require('../utils/fs/writeToFile');

module.exports = ({ args, options, projDir }) => {
  const descriptor = modelDescriptor(args);
  const context = Object.assign({}, descriptor, {
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
    writeToFile(
      generateGraphQLSchema(descriptor, 'model'),
      destination(`${options.schemaDir}/${context.modelName}.gql`)
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
