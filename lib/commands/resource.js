const argsToSchemaDefs = require('../parsers/argsToSchemaDefs');
const generateModel = require('../generators/generateModel');
const generateSchema = require('../generators/generateSchema');
const generateResolver = require('../generators/generateResolver');
const rm = require('../utils/fs/rm');
const writeToFile = require('../utils/fs/writeToFile');
const orms = require('../orms');

module.exports = ({ args, options, projDir, variant = 'model' }) => {
  const orm = orms[options.orm];
  const schemaDefs = argsToSchemaDefs(args, orm);
  const destination = require('../utils/destination')(projDir);
  if (options.destroy) {
    rm(destination(`${options.modelDir}/${variant === 'model' ? schemaDefs.modelName : schemaDefs.varName.concat('Schema')}.js`));
    rm(destination(`${options.schemaDir}/${schemaDefs.modelName}.gql`));
    rm(destination(`${options.resolverDir}/${schemaDefs.modelName}.js`));
  } else {
    writeToFile(
      generateModel(schemaDefs, variant, options.orm),
      destination(`${options.modelDir}/${variant === 'model' ? schemaDefs.modelName : schemaDefs.varName.concat('Schema')}.js`)
    );
    writeToFile(
      generateSchema(schemaDefs, variant),
      destination(`${options.schemaDir}/${schemaDefs.modelName}.gql`)
    );
    writeToFile(
      generateResolver(schemaDefs, variant, orm, options.primaryKey),
      destination(`${options.resolverDir}/${schemaDefs.modelName}.js`)
    );
  }
};
