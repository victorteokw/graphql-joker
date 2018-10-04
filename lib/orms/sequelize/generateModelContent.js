const snakeCase = require('snake-case');
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
  } else if (typeof data === 'object') {
    return `{ ${formatModifiers(data)} }`;
  } else {
    return data.toString();
  }
};

const transformModifiers = (modifiers) => {
  const newModifiers = {};
  if (modifiers.required) {
    newModifiers.allowNull = false;
  }
  if (modifiers.unique) {
    newModifiers.unique = true;
  }
  if (modifiers.autoIncrement) {
    newModifiers.autoIncrement = true;
  }
  if (modifiers.default) {
    newModifiers.defaultValue = modifiers.default;
  }
  if (modifiers.match) {
    if (!newModifiers.validate) newModifiers.validate = {};
    newModifiers.validate.is = modifiers.match;
  }
  if (modifiers.min) {
    if (!newModifiers.validate) newModifiers.validate = {};
    newModifiers.validate.min = modifiers.min;
  }
  if (modifiers.max) {
    if (!newModifiers.validate) newModifiers.validate = {};
    newModifiers.validate.max = modifiers.max;
  }
  if (modifiers.minlength && modifiers.maxlength) {
    if (!newModifiers.validate) newModifiers.validate = {};
    newModifiers.validate.len = [modifiers.minlength, modifiers.maxlength];
  }
  // Implement index another section
  return newModifiers;
};

const formatModifiers = (modifiers) => {
  const keys = Object.keys(modifiers);
  return keys.map((k) => `${k}: ${formatData(modifiers[k])}`).join(', ');
};

const schemaLine = (field, indentLevel = 1, indentSpace = 2) => {
  let line = '';
  line += ' '.repeat(indentLevel * indentSpace);
  line += field.name;
  if (field.reference) {
    line += 'Id';
  }
  line += ': ';

  if (field.primitive) {
    if (Object.keys(field.modifiers).length === 0) {
      line += `Sequelize.${field.jsType}`;
    } else {
      line += `{ type: Sequelize.${field.jsType}, ${formatModifiers(transformModifiers(field.modifiers))} }`.replace(/} }/g, '}}');
    }
  } else if (field.isSchema) {
    throw `Sequelize don't support reusable schema '${field.name}'.`;
  } else {
    if (Object.keys(field.modifiers).length === 0) {
      line += `{ type: Sequelize.INTEGER, model: '${field.jsType}' }`;
    } else {
      line += `{ type: Sequelize.INTEGER, model: '${field.jsType}', ${formatModifiers(transformModifiers(field.modifiers))} }`.replace(/} }/g, '}}');
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
    final += `  tableName: '${snakeCase(schemaDefs.modelName)}',\n`;
    final += '  freezeTableName: true\n';
    final += '});';
  }
  return final;
};

const referenceBlock = (schemaDefs) =>
  concatBlocks([
    `${schemaDefs.modelName}.associate = (models) => {`,
    concatBlocks(schemaDefs.fields.map((f) => {
      if (f.reference) {
        if (f.foreignKey) {
          return `  ${schemaDefs.modelName}.hasMany(models.${f.jsType}, { as: '${f.name}', foreignKey: '${f.foreignKey}Id' });`;
        } else {
          return `  ${schemaDefs.modelName}.belongsTo(models.${f.jsType}, { as: '${f.name}' });`;
        }
      } else return undefined;
    })),
    '};'
  ]);

// variant: model, schema
const generateModelContent = (schemaDefs, variant) =>
  concatBlocks([
    topOfHeader,
    '\n',
    schemaBlock(schemaDefs, variant),
    '\n',
    referenceBlock(schemaDefs),
    '\n',
    exportLine(schemaDefs, variant)
  ]);

module.exports = generateModelContent;
