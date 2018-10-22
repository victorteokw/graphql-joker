const parsingSchemaDefinitions = require('../../shared/parsingSchemaDefinitions');
const generateSchema = require('./generateSchema');
const orms = require('../../orms');
const {
  pushInstructions
} = require('../../scaffoldKit');

module.exports = ({ args, options, variant = 'model' }) => {
  const orm = orms[options.orm];
  const schemaDefs = parsingSchemaDefinitions(args, orm);
  pushInstructions([{
    createFile: {
      content: generateSchema(schemaDefs, variant, options),
      dest: `${options.schemaDir}/${schemaDefs.modelName}.gql`
    }
  }, {
    ensureDirectory: {
      name: options.schemaDir
    }
  }]);
};
