const argsToSchemaDefs = require('../parsers/argsToSchemaDefs');
const generateMongooseSchema = require('../generators/generateMongooseSchema');
const generateGraphQLSchema = require('../generators/generateGraphQLSchema');
const generateResolver = require('../generators/generateResolver');
const rm = require('../utils/fs/rm');
const writeToFile = require('../utils/fs/writeToFile');

module.exports = ({ args, options, projDir }) => {
  const schemaDefs = argsToSchemaDefs(args);
  const destination = require('../utils/destination')(projDir);
  if (options.destroy) {
    rm(destination(`${options.modelDir}/${schemaDefs.varName}Schema.js`));
    rm(destination(`${options.schemaDir}/${schemaDefs.modelName}.gql`));
    rm(destination(`${options.resolverDir}/${schemaDefs.modelName}.js`));
  } else {
    writeToFile(
      generateMongooseSchema(schemaDefs, 'schema'),
      destination(`${options.modelDir}/${schemaDefs.varName}Schema.js`)
    );
    writeToFile(
      generateGraphQLSchema(schemaDefs, 'schema'),
      destination(`${options.schemaDir}/${schemaDefs.modelName}.gql`)
    );
    writeToFile(
      generateResolver(schemaDefs, 'schema'),
      destination(`${options.resolverDir}/${schemaDefs.modelName}.js`)
    );
  }
};
