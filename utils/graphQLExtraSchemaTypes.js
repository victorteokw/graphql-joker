const capitalize = require('./capitalize');

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
    if (!field.isObject) return;
    sections = [
      ...sections,
      ...extraSchemaDesc(modelName + capitalize(field.name), field.fields),
      {
        name: modelName + capitalize(field.name),
        fields: field.fields
      }
    ];
  });

  return sections;
};

const extraSchemaTypes = (modelName, fields, indentSpace = 2) => {
  const descs = extraSchemaDesc(modelName, fields);
  let t = '';
  descs.forEach((desc, i) => {
    t += `type ${desc.name} {\n`;
    desc.fields.forEach((f) => {
      t += `${' '.repeat(indentSpace)}${f.name}: `;
      if (f.isArray) t += '[';
      if (f.isObject) {
        t += `${desc.name}${capitalize(f.name)}`;
      } else {
        t += f.graphQLType;
      }
      if (f.isArray) t += ']';
      t += '\n';
    });
    t += '}\n';
    if (i < descs.length - 1) {
      t += '\n';
    }
  });
  return t;
};



module.exports = extraSchemaTypes;
