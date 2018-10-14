const parsingSchemaDefinitions = require('./parsingSchemaDefinitions');
const generateModel = require('./generateModel');
const orms = require('../../orms');
const { pushCommands } = require('../../scaffoldKit');

module.exports = ({ args, options, variant = 'model' }) => {
  const orm = orms[options.orm];
  const schemaDefs = parsingSchemaDefinitions(args, orm);

  pushCommands([{
    createFile: {
      content: generateModel(schemaDefs, variant, options.orm),
      dest: `${options.modelDir}/${variant === 'model' ? schemaDefs.modelName : schemaDefs.varName.concat('Schema')}.js`
    }
  }, {
    ensureDirectory: {
      name: options.modelDir
    }
  }]);
};
