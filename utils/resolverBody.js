const capitalize = require('./capitalize');
const { singular } = require('pluralize');

const primitiveJsTypes = [
  'String',
  'Boolean',
  'Number',
  'ObjectId',
  'Date'
];

const rootsThatRequiresBody = (modelName, fields) => {
  let retval = [], nested = [];
  const methodsFields = fields.filter((f) => !f.primitive && !f.isObject);
  const nestedFields = fields.filter((f) => f.isObject);
  nestedFields.forEach((f) => {
    nested = [
      ...nested,
      ...rootsThatRequiresBody(modelName + capitalize(f.isArray ? singular(f.name) : f.name), f.fields)
    ];
  });
  retval = [
    ...nested,
    ...methodsFields.length > 0 ? [{ modelName, fields: methodsFields }] : []
  ];
  return retval;
};

const resolverBody = (modelName, fields, indentSpace = 2) => {
  let final = '';
  final += `${' '.repeat(indentSpace)}${modelName}: {\n`;
  fields.forEach((f, i) => {
    if (primitiveJsTypes.includes(f.jsType)) return;
    final += `${' '.repeat(indentSpace * 2)}async ${f.name}(root, _, ctx) {\n`;
    final += `${' '.repeat(indentSpace * 3)}const { ${f.jsType} } = ctx.models;\n`;
    if (f.foreignKey) {
      if (f.foreignKeyIsArray) {
        if (f.isArray) {
          final += `${' '.repeat(indentSpace * 3)}return await ${f.jsType}.find({ ${f.foreignKey}: root._id });\n`;
        } else {
          final += `${' '.repeat(indentSpace * 3)}return await ${f.jsType}.findOne({ ${f.foreignKey}: root._id });\n`;
        }
      } else {
        if (f.isArray) {
          final += `${' '.repeat(indentSpace * 3)}return await ${f.jsType}.find({ ${f.foreignKey}: root._id });\n`;
        } else {
          final += `${' '.repeat(indentSpace * 3)}return await ${f.jsType}.findOne({ ${f.foreignKey}: root._id });\n`;
        }
      }
    } else {
      if (f.isArray) {
        final += `${' '.repeat(indentSpace * 3)}return await ${f.jsType}.find({ _id: { $in: root.${f.name} }});\n`;
      } else {
        final += `${' '.repeat(indentSpace * 3)}return await ${f.jsType}.findById(root.${f.name});\n`;
      }
    }
    if (i !== fields.length - 1) {
      final += `${' '.repeat(indentSpace * 2)}},\n`;
    } else {
      final += `${' '.repeat(indentSpace * 2)}}\n`;
    }
  });
  final += `${' '.repeat(indentSpace)}}`;
  return final;
};

const resolverBodies = (modelName, fields, indentSpace = 2) => {
  const roots = rootsThatRequiresBody(modelName, fields, indentSpace);
  return roots.map(({ modelName, fields }) =>
    resolverBody(modelName, fields, indentSpace)).join(',\n');
};

module.exports = resolverBodies;
