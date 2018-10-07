const argsToSchemaDefs = require('../parsers/argsToSchemaDefs');
const generateModel = require('../generators/generateModel');
const generateSchema = require('../generators/generateSchema');
const generateResolver = require('../generators/generateResolver');
const orms = require('../orms');
const {
  pushCommands,
  executeAllCommands
} = require('../executor');

module.exports = ({ args, options, projDir, variant = 'model' }) => {
  const orm = orms[options.orm];
  const schemaDefs = argsToSchemaDefs(args, orm);
  if (options.destroy) {
    pushCommands('resource', [{
      deleteFiles: [
        {
          path: `${options.modelDir}/${variant === 'model' ? schemaDefs.modelName : schemaDefs.varName.concat('Schema')}.js`
        },
        {
          path: `${options.schemaDir}/${schemaDefs.modelName}.gql`
        },
        {
          path: `${options.resolverDir}/${schemaDefs.modelName}.js`
        }
      ]
    }, {
      ensureDirectories: [
        {
          name: options.modelDir
        },
        {
          name: options.schemaDir
        },
        {
          name: options.resolverDir
        }
      ]
    }]);
  } else {
    pushCommands('resource', [{
      createFiles: [
        {
          content: generateModel(schemaDefs, variant, options.orm),
          dest: `${options.modelDir}/${variant === 'model' ? schemaDefs.modelName : schemaDefs.varName.concat('Schema')}.js`,
          overwrite: true
        },
        {
          content: generateSchema(schemaDefs, variant, options),
          dest: `${options.schemaDir}/${schemaDefs.modelName}.gql`,
          overwrite: true
        },
        {
          content: generateResolver(schemaDefs, variant, orm, options),
          dest: `${options.resolverDir}/${schemaDefs.modelName}.js`,
          overwrite: true
        }
      ]
    }, {
      ensureDirectories: [
        {
          name: options.modelDir
        },
        {
          name: options.schemaDir
        },
        {
          name: options.resolverDir
        }
      ]
    }]);
  }
  executeAllCommands('resource', projDir);
};
