const capitalize = require('./capitalize');
const { singular } = require('pluralize');

const primitiveGraphQLTypes = [
  'String',
  'Boolean',
  'Float',
  'Int',
  'ID',
  'Date'
];

const schemaBody = (modelName, fields, input, indentSpace = 2) => {
  if (input) {
    fields = fields.filter((f) => !f.foreignKey);
  }
  let final = '';
  fields.forEach((f, i) => {
    if (i > 0) {
      final = final + '\n';
    }
    final = final + ' '.repeat(indentSpace);
    final = final + f.name + ": ";
    if (f.isArray) final = final + '[';
    if (f.isObject) {
      if (!input) {
        if (f.isArray) {
          final += modelName + capitalize(singular(f.name));
        } else {
          final += modelName + capitalize(f.name);
        }
      } else {
        if (f.isArray) {
          final += modelName + capitalize(singular(f.name)) + 'Input';
        } else {
          final += modelName + capitalize(f.name) + 'Input';
        }
      }
    } else if (primitiveGraphQLTypes.includes(f.graphQLType)) {
      final = final + f.graphQLType;
    } else {
      if (input) {
        final = final + 'ID';
      } else {
        final = final + f.graphQLType;
      }
    }
    if (f.isArray) final = final + ']';
  });
  return final;
};

module.exports = schemaBody;
