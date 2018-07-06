const concatBlocks = require('../utils/string/concatBlocks');

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
  if (field.isArray) line += '[';
  if (field.primitive) {
    if (Object.keys(field.modifiers).length === 0) {
      line += field.jsType;
    } else {
      line += `{ type: ${field.jsType}, ${formatModifiers(field.modifiers)} }`;
    }
  } else if (field.isSchema) {
    line += field.jsType;
  } else {
    if (Object.keys(field.modifiers).length === 0) {
      line += `{ type: ObjectId, ref: '${field.jsType}' }`;
    } else {
      line += `{ type: ObjectId, ref: '${field.jsType}', ${formatModifiers(field.modifiers)} }`;
    }
  }
  if (field.isArray) line += ']';
  return line;
};

const schemaBody = (fields, indentLevel = 1, indentSpace = 2) => {
  fields = fields.filter((f) => !f.foreignKey);
  const lines = fields.map((field) => {
    if (field.isObject) {
      let line = '';
      line += ' '.repeat(indentLevel * indentSpace);
      line += field.name;
      line += ': ';
      if (field.isArray) line += '[';
      line += '{\n';
      line += schemaBody(field.fields, indentLevel + 1, indentSpace);
      line += '\n';
      line += ' '.repeat(indentLevel * indentSpace);
      line += '}';
      if (field.isArray) line += ']';
      return line;
    } else {
      return schemaLine(field, indentLevel, indentSpace);
    }
  });
  return lines.join(',\n');
};

const topOfHeader = [
  "const mongoose = require('mongoose');",
  'const { Schema } = mongoose;'
].join('\n');

const requiringSchemaTypes = ({ objectId, mixed }) => {
  if (!objectId && !mixed) return undefined;
  const types = [];
  if (objectId) types.push('ObjectId');
  if (mixed) types.push('Mixed');
  return `const { ${types.join(', ')} } = Schema.Types;`;
};

const schemaRequirement = (schemaName) =>
  `const ${schemaName} = require('./${schemaName}');`;

const schemaRequirements = (schemaNames) =>
  schemaNames.map(schemaRequirement).join('\n');

// variant: model, schema
const schemaBlock = (schemaDefs, variant) => {
  let final = `const ${schemaDefs.varName}Schema = new Schema({\n`;
  final += schemaBody(schemaDefs.fields);
  final += '\n';
  if (variant === 'schema') {
    final += '});';
  } else if (variant === 'model') {
    final += '}, {\n';
    final += '  timestamps: true,\n';
    final += `  collection: '${schemaDefs.collectionName}'\n`;
    final += '});';
  }
  return final;
};

const exportLine = (schemaDefs, variant) => {
  if (variant === 'model') {
    return `module.exports = mongoose.model('${schemaDefs.modelName}', ${schemaDefs.varName}Schema);`;
  } else if (variant === 'schema') {
    return `module.exports = ${schemaDefs.varName}Schema;`;
  }
};

const requiresObjectId = (fields) => {
  let requires = false;
  for (const f of fields) {
    if (f.fields) {
      requires = requiresObjectId(f.fields);
    } else if (!f.primitive && !f.foreignKey && !f.isObject && !f.isSchema) {
      requires = true;
    }
    if (requires) return true;
  }
  return requires;
};

const requiresMixed = (fields) => {
  let requires = false;
  for (const f of fields) {
    if (f.fields) {
      requires = requiresMixed(f.fields);
    } else if (f.primitive && f.jsType === 'Mixed') {
      requires = true;
    }
    if (requires) return true;
  }
  return requires;
};

const requiredSchemas = (fields) => {
  const retval = [];
  const _requiredSchemas = (fields) => {
    fields.forEach((field) => {
      field.fields && _requiredSchemas(field.fields);
      field.isSchema && !retval.includes(field.jsType) && retval.push(field.jsType);
    });
  };
  _requiredSchemas(fields);
  return retval;
};

// variant: model, schema
const generateMongooseSchema = (schemaDefs, variant) =>
  concatBlocks([
    topOfHeader,
    requiringSchemaTypes({ objectId: requiresObjectId(schemaDefs.fields), mixed: requiresMixed(schemaDefs.fields) }),
    schemaRequirements(requiredSchemas(schemaDefs.fields)),
    '\n',
    schemaBlock(schemaDefs, variant),
    '\n',
    exportLine(schemaDefs, variant)
  ]);

module.exports = generateMongooseSchema;
