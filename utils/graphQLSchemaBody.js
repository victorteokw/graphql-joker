const capitalize = require('./capitalize');

const primitiveGraphQLTypes = [
  'String',
  'Boolean',
  'Float',
  'Int',
  'ID',
  'Date'
];

const schemaBody = (modelName, fields, input, indentLevel = 1, indentSpace = 2) => {
  if (input) {
    fields = fields.filter((f) => !f.foreignKey);
  }
  let final = '';
  fields.forEach((f, i) => {
    if (i > 0) {
      final = final + '\n';
    }
    final = final + '  ';
    final = final + f.name + ": ";
    if (f.isArray) final = final + '[';
    if (f.isObject) {
      final += modelName + capitalize(f.name);
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
