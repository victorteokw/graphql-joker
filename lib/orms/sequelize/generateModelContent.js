const concatBlocks = require('../../utils/string/concatBlocks');

const topOfHeader = [
  "const Sequelize = require('sequelize');",
  "const sequelize = require('./sequelize');",
].join('\n');

const exportLine = (schemaDefs, _variant) =>
  `module.exports = ${schemaDefs.modelName};`;

const formatData = (data) => {
  if (Array.isArray(data)) {
    return `[${data.map(formatData).join(', ')}]`;
  }
  return data.toString();
};

const formatModifiers = (modifiers) => {
  const keys = Object.keys(modifiers);
  return keys.map((k) => `${k}: ${formatData(modifiers[k])}`).join(', ');
};

const schemaLine = (field, indentLevel = 1, indentSpace = 2) => {
  let line = '';
  line += ' '.repeat(indentLevel * indentSpace);
  line += field.name;
  line += ': ';

  if (field.primitive) {
    if (Object.keys(field.modifiers).length === 0) {
      line += `Sequelize.${field.jsType}`;
    } else {
      line += `{ type: Sequelize.${field.jsType}, ${formatModifiers(field.modifiers)} }`;
    }
  } else if (field.isSchema) {
    line += field.jsType;
  } else {
    if (Object.keys(field.modifiers).length === 0) {

      line += `{ type: Sequelize.INTEGER, model: '${field.jsType}' }`;
    } else {
      line += `{ type: Sequelize.INTEGER, model: '${field.jsType}', ${formatModifiers(field.modifiers)} }`;
    }
  }
  return line;
};

const schemaBody = (fields, indentLevel = 1, indentSpace = 2) => {
  fields = fields.filter((f) => !f.foreignKey && !f.assocModel);
  const lines = fields.map((field) => {
    if (field.isObject) {
      throw 'Nested field not supported by sequelize.';
    } else {
      return schemaLine(field, indentLevel, indentSpace);
    }
  });
  return lines.join(',\n');
};

// variant: model, schema
const schemaBlock = (schemaDefs, variant) => {
  let final = `const ${schemaDefs.modelName} = sequelize.define('${schemaDefs.modelName}', {\n`;
  final += schemaBody(schemaDefs.fields);
  final += '\n';
  if (variant === 'schema') {
    final += '});';
  } else if (variant === 'model') {
    final += '}, {\n';
    final += '  timestamps: true,\n';
    final += '  underscored: true,\n';
    final += '  freezeTableName: true,\n';
    final += '});';
  }
  return final;
};

// variant: model, schema
const generateModelContent = (schemaDefs, variant) =>
  concatBlocks([
    topOfHeader,
    '\n',
    schemaBlock(schemaDefs, variant),
    '\n',
    exportLine(schemaDefs, variant)
  ]);

module.exports = generateModelContent;
