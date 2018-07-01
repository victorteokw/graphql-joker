const capitalize = require('../utils/string/capitalize');
const { singular } = require('pluralize');
const unquote = require('../utils/string/unquote');
const concatBlocks = require('../utils/string/concatBlocks');

const primitiveGraphQLTypes = [
  'String',
  'Boolean',
  'Float',
  'Int',
  'ID',
  'Date'
];

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
          t += f.graphQLType;
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

const selfTypeDefinition = (modelDescriptor, variant) => {
  const lines = [
    `type ${modelDescriptor.modelName} {`,
    `  _id: ID!`,
    schemaBody(modelDescriptor.modelName, modelDescriptor.fields),
    variant === 'model' ? '  createdAt: Date\n  updatedAt: Date' : undefined,
    '}',
    '\n',
    `input ${modelDescriptor.modelName}Input {`,
    schemaBody(modelDescriptor.modelName, modelDescriptor.fields, true),
    '}'
  ];
  return concatBlocks(lines);
};

const extraQueryAndMutationDefs = (modelDescriptor) =>
  concatBlocks([
    'type Query {',
    `  ${modelDescriptor.varName}(_id: ID!): ${modelDescriptor.modelName}`,
    `  ${modelDescriptor.pluralVarName}: [${modelDescriptor.modelName}]`,
    '}',
    '\n',
    'type Mutation {',
    `  create${modelDescriptor.modelName}(input: ${modelDescriptor.modelName}Input): ${modelDescriptor.modelName}`,
    `  update${modelDescriptor.modelName}(_id: ID!, input: ${modelDescriptor.modelName}Input): ${modelDescriptor.modelName}`,
    `  delete${modelDescriptor.modelName}(_id: ID!): ${modelDescriptor.modelName}`,
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
const generateGraphQLSchema = (modelDescriptor, variant) => {
  return concatBlocks([
    needsExtraSchemaTypes(modelDescriptor.fields) ? extraSchemaTypes(modelDescriptor.modelName, modelDescriptor.fields) + '\n' : undefined,
    selfTypeDefinition(modelDescriptor, variant),
    variant === 'model' ? '\n' : undefined,
    variant === 'model' ? extraQueryAndMutationDefs(modelDescriptor) : undefined
  ]);
};

module.exports = generateGraphQLSchema;
