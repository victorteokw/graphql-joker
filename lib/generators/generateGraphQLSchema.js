const capitalize = require('../utils/string/capitalize');
const { singular } = require('pluralize');
const unquote = require('../utils/string/unquote');
const concatBlocks = require('../utils/string/concatBlocks');
const primitiveGraphQLTypes = require('../parsers/primitiveGraphQLTypes');

const extraSchemaDesc = (modelName, fields) => {

  let sections = [];

  fields.forEach((field) => {
    if (field.isObject) {
      sections = [
        ...sections,
        ...extraSchemaDesc(modelName + capitalize(field.isArray ? singular(field.name) : field.name), field.fields),
        {
          name: modelName + capitalize(field.isArray ? singular(field.name) : field.name),
          fields: field.fields
        }
      ];
    }
    if (field.modifiers && field.modifiers.enum) {
      sections = [
        ...sections,
        {
          enum: field.graphQLType,
          values: field.modifiers.enum
        }
      ];
    }
  });

  return sections;
};

const extraSchemaTypes = (modelName, fields, indentSpace = 2) => {
  const descs = extraSchemaDesc(modelName, fields);
  let t = '';
  descs.forEach((desc, i) => {
    if (desc.enum) {
      t += `enum ${desc.enum} {\n`;
      desc.values.forEach((n) => {
        t += `${' '.repeat(indentSpace)}${unquote(n)}\n`;
      });
      t += '}\n';
    } else {
      t += `type ${desc.name} {\n`;
      desc.fields.forEach((f) => {
        t += `${' '.repeat(indentSpace)}${f.name}: `;
        if (f.isArray) t += '[';
        if (f.isObject) {
          if (f.isArray) {
            t += `${desc.name}${capitalize(singular(f.name))}`;
          } else {
            t += `${desc.name}${capitalize(f.name)}`;
          }
        } else {
          t += f.graphQLType;
        }
        if (f.isArray) t += ']';
        t += '\n';
      });
      t += '}\n\n';
      t += `input ${desc.name}Input {\n`;
      desc.fields.forEach((f) => {
        t += `${' '.repeat(indentSpace)}${f.name}: `;
        if (f.isArray) t += '[';
        if (f.isObject) {
          if (f.isArray) {
            t += `${desc.name}${capitalize(singular(f.name))}Input`;
          } else {
            t += `${desc.name}${capitalize(f.name)}Input`;
          }
        } else if (f.primitive) {
          t += f.graphQLType === 'File' ? 'Upload' : f.graphQLType;
        } else {
          t += 'ID';
        }
        if (f.isArray) t += ']';
        t += '\n';
      });
      t += '}\n';
    }
    if (i < descs.length - 1) {
      t += '\n';
    }
  });
  return t;
};

const schemaBody = (modelName, fields, input, indentSpace = 2) => {
  if (input) {
    fields = fields.filter((f) => !f.foreignKey && !f.assocModel);
  }
  let final = '';
  fields.forEach((f, i) => {
    if (i > 0) {
      final = final + '\n';
    }
    final += ' '.repeat(indentSpace);
    final += f.name + ': ';
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
      if (input && f.graphQLType === 'File') {
        final += 'Upload';
      } else {
        final += f.graphQLType;
      }
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

const selfTypeDefinition = (schemaDefs, variant) => {
  const lines = [
    `type ${schemaDefs.modelName} {`,
    '  _id: ID!',
    schemaBody(schemaDefs.modelName, schemaDefs.fields),
    variant === 'model' ? '  createdAt: Date\n  updatedAt: Date' : undefined,
    '}',
    '\n',
    `input ${schemaDefs.modelName}Input {`,
    schemaBody(schemaDefs.modelName, schemaDefs.fields, true),
    '}'
  ];
  return concatBlocks(lines);
};

const extraQueryAndMutationDefs = (schemaDefs) =>
  concatBlocks([
    'type Query {',
    `  ${schemaDefs.varName}(_id: ID!): ${schemaDefs.modelName}`,
    `  ${schemaDefs.pluralVarName}: [${schemaDefs.modelName}]`,
    '}',
    '\n',
    'type Mutation {',
    `  create${schemaDefs.modelName}(input: ${schemaDefs.modelName}Input): ${schemaDefs.modelName}`,
    `  update${schemaDefs.modelName}(_id: ID!, input: ${schemaDefs.modelName}Input): ${schemaDefs.modelName}`,
    `  delete${schemaDefs.modelName}(_id: ID!): ${schemaDefs.modelName}`,
    '}'
  ]);

const needsExtraSchemaTypes = (fields) => {
  let needs = false;
  for (const f of fields) {
    if (f.fields) {
      needs = true;
    } else if (f.modifiers && f.modifiers.enum) {
      needs = true;
    }
    if (needs) return true;
  }
  return needs;
};

// model, schema
const generateGraphQLSchema = (schemaDefs, variant) =>
  concatBlocks([
    needsExtraSchemaTypes(schemaDefs.fields) ? extraSchemaTypes(schemaDefs.modelName, schemaDefs.fields) + '\n' : undefined,
    selfTypeDefinition(schemaDefs, variant),
    variant === 'model' ? '\n' : undefined,
    variant === 'model' ? extraQueryAndMutationDefs(schemaDefs) : undefined
  ]);

module.exports = generateGraphQLSchema;
