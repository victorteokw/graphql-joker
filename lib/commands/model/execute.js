const parsingSchemaDefinitions = require('../../shared/parsingSchemaDefinitions');
const generateModel = require('./generateModel');
const orms = require('../../orms');
const { createFile, keepDirectoryInGit } = require('scaffold-kit/executor');

module.exports = ({ args, options, variant = 'model' }) => {
  const orm = orms[options.orm];
  const schemaDefs = parsingSchemaDefinitions(args, orm);

  createFile({
    content: generateModel(schemaDefs, variant, options.orm),
    at: `${options.modelDir}/${variant === 'model' ? schemaDefs.modelName : schemaDefs.varName.concat('Schema')}.js`
  });

  keepDirectoryInGit({
    at: options.modelDir
  });
};
