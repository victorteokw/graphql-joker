const formatModifiers = (modifiers) => {
  const keys = Object.keys(modifiers);
  return keys.map((k) => `${k}: ${modifiers[k].toString()}`).join(', ');
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
      line += ': ';
      if (field.isArray) line += '[';
      line += '{\n';
      line += schemaBody(fields, indentLevel + 1, indentSpace);
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

module.exports = schemaBody;
