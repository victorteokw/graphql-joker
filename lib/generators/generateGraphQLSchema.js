const capitalize = require('../utils/string/capitalize');
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
    final += ' '.repeat(indentSpace);
    final += f.name + ": ";
    if (f.isArray) final += '[';
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
      final += f.graphQLType;
    } else if (f.isSchema) {
      final += f.graphQLType + (input ? 'Input' : '');
    } else if (f.modifiers && f.modifiers.enum) {
      final += f.graphQLType;
    } else {
      final += input ? 'ID' : f.graphQLType;
    }
    if (f.isArray) final += ']';
  });
  return final;
};

module.exports = schemaBody;
