const parsingSchemaDefinitions = require('./parsingSchemaDefinitions');
const generateModel = require('./generators/generateModel');
const generateSchema = require('./generators/generateSchema');
const generateResolver = require('./generators/generateResolver');
const orms = require('../../orms');
const {
  pushCommand,
  pushCommands
} = require('../../scaffoldKit');

module.exports = ({ args, options, projDir, variant = 'model' }) => {
  const orm = orms[options.orm];
  const schemaDefs = parsingSchemaDefinitions(args, orm);
  if (options.destroy) {
    pushCommands([{
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
    const resolverContent = generateResolver(schemaDefs, variant, orm, options);
    if (resolverContent) {
      pushCommand({
        createFile: {
          content: resolverContent,
          dest: `${options.resolverDir}/${schemaDefs.modelName}.js`,
          overwrite: true
        }
      });
    }
    pushCommands([{
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
};
