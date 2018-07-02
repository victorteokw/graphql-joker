const argsToSchemaDefs = require('../parsers/argsToSchemaDefs');
const generateMongooseSchema = require('../generators/generateMongooseSchema');
const generateGraphQLSchema = require('../generators/generateGraphQLSchema');
const generateResolver = require('../generators/generateResolver');
const generateModelTest = require('../generators/generateModelTest');
const rm = require('../utils/fs/rm');
const writeToFile = require('../utils/fs/writeToFile');

module.exports = ({ args, options, projDir, variant = 'model' }) => {
  const schemaDefs = argsToSchemaDefs(args);
  const destination = require('../utils/destination')(projDir);
  if (options.destroy) {
    rm(destination(`${options.modelDir}/${variant === 'model' ? schemaDefs.modelName : schemaDefs.varName.concat('Schema')}.js`));
    rm(destination(`${options.schemaDir}/${schemaDefs.modelName}.gql`));
    rm(destination(`${options.resolverDir}/${schemaDefs.modelName}.js`));
    rm(destination(`tests/models/${schemaDefs.modelName}Test.js`));
  } else {
    if (options.test) {
      writeToFile(
        generateModelTest(schemaDefs, variant),
        destination(`tests/models/${variant === 'model' ? schemaDefs.modelName : schemaDefs.varName.concat('Schema')}Test.js`)
      );
    }
    writeToFile(
      generateMongooseSchema(schemaDefs, variant),
      destination(`${options.modelDir}/${variant === 'model' ? schemaDefs.modelName : schemaDefs.varName.concat('Schema')}.js`)
    );
    writeToFile(
      generateGraphQLSchema(schemaDefs, variant),
      destination(`${options.schemaDir}/${schemaDefs.modelName}.gql`)
    );
    writeToFile(
      generateResolver(schemaDefs, variant),
      destination(`${options.resolverDir}/${schemaDefs.modelName}.js`)
    );
  }
};
