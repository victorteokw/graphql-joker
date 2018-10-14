const parsingSchemaDefinitions = require('./parsingSchemaDefinitions');
const generateSchema = require('./generateSchema');
const orms = require('../../orms');
const {
  pushCommands
} = require('../../scaffoldKit');

module.exports = ({ args, options, variant = 'model' }) => {
  const orm = orms[options.orm];
  const schemaDefs = parsingSchemaDefinitions(args, orm);
  pushCommands([{
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
