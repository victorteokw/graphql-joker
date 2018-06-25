const capitalize = require('./capitalize');
const { singular } = require('pluralize');
const unquote = require('./unquote');

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



module.exports = extraSchemaTypes;
