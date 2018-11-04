const parsingSchemaDefinitions = require('../../shared/parsingSchemaDefinitions');
const generateSchema = require('./generateSchema');
const orms = require('../../orms');
const { createFile, keepDirectoryInGit } = require('scaffold-kit/executor');

module.exports = ({ args, options, variant = 'model' }) => {
  const orm = orms[options.orm];
  const schemaDefs = parsingSchemaDefinitions(args, orm);
  createFile({
    content: generateSchema(schemaDefs, variant, options),
    at: `${options.schemaDir}/${schemaDefs.modelName}.gql`
  });
  keepDirectoryInGit({
    at: options.schemaDir
  });
};
