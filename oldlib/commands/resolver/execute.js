const parsingSchemaDefinitions = require('../../shared/parsingSchemaDefinitions');
const generateResolver = require('./generateResolver');
const orms = require('../../orms');
const { createFile, keepDirectoryInGit } = require('scaffold-kit/executor');

module.exports = ({ args, options, variant = 'model' }) => {
  const orm = orms[options.orm];
  const schemaDefs = parsingSchemaDefinitions(args, orm);
  const resolverContent = generateResolver(schemaDefs, variant, orm, options);

  if (resolverContent) {
    createFile({
      content: resolverContent,
      at: `${options.resolverDir}/${schemaDefs.modelName}.js`
    });
    keepDirectoryInGit({
      at: options.resolverDir
    });
  }
};
