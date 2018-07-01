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

  const template = require('../utils/template')('resource');
  const destination = require('../utils/destination')(projDir);

  if (options.destroy) {
    rm(destination(`${options.modelDir}/${descriptor.modelName}.js`));
    rm(destination(`${options.schemaDir}/${descriptor.modelName}.gql`));
    rm(destination(`${options.resolverDir}/${descriptor.modelName}.js`));
    rm(destination(`tests/models/${descriptor.modelName}Test.js`));
  } else {
    writeToFile(
      generateMongooseSchema(descriptor, 'model'),
      destination(`${options.modelDir}/${descriptor.modelName}.js`)
    );
    writeToFile(
      generateGraphQLSchema(descriptor, 'model'),
      destination(`${options.schemaDir}/${descriptor.modelName}.gql`)
    );
    copyTpl(
      template('resolvers/_Base.js'),
      destination(`${options.resolverDir}/${descriptor.modelName}.js`),
      Object.assign({}, descriptor, {
        resolverModelBody: generateResolver(descriptor.modelName, descriptor.fields)
      })
    );
    writeToFile(
      generateModelTest(descriptor),
      destination(`tests/models/${descriptor.modelName}Test.js`)
    );
  }
};
