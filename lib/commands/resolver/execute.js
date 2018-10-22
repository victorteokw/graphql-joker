const parsingSchemaDefinitions = require('../../shared/parsingSchemaDefinitions');
const generateResolver = require('./generateResolver');
const orms = require('../../orms');
const {
  pushInstructions
} = require('../../scaffoldKit');

module.exports = ({ args, options, variant = 'model' }) => {
  const orm = orms[options.orm];
  const schemaDefs = parsingSchemaDefinitions(args, orm);
  const resolverContent = generateResolver(schemaDefs, variant, orm, options);

  if (resolverContent) {
    pushInstructions([{
      createFile: {
        content: resolverContent,
        dest: `${options.resolverDir}/${schemaDefs.modelName}.js`
      }
    }, {
      ensureDirectory: {
        name: options.resolverDir
      }
    }]);
  }
};
