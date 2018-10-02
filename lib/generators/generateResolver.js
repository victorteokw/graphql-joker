const capitalize = require('../utils/string/capitalize');
const uncapitalize = require('../utils/string/uncapitalize');
const pluralize = require('pluralize');
const { singular } = pluralize;
const concatBlocks = require('../utils/string/concatBlocks');
const indentEveryLine = require('../utils/string/indentEveryLine');
const primitiveGraphQLTypes = require('../parsers/primitiveGraphQLTypes');

const rootsThatRequiresBody = (modelName, fields) => {
  let retval = [], nested = [];
  const methodsFields = fields.filter((f) => !f.primitive && !f.isObject && !f.isSchema);
  const nestedFields = fields.filter((f) => f.isObject); // f.isObject || f.isSchema and parsing schema from schema file
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

const appendAssocResolver = (modelName, f, indentSpace = 2, appendComma = true) => {
  let final = '';
  final += `${' '.repeat(indentSpace * 2)}async ${f.name}(root, _, { ${f.assocModel}, ${f.jsType} }) {\n`;
  final += `${' '.repeat(indentSpace * 3)}const ${pluralize(uncapitalize(f.assocModel))} = await ${f.assocModel}.find({ ${f.selfKey}: root._id });\n`;
  final += `${' '.repeat(indentSpace * 3)}return await ${f.jsType}.find({ _id: { $in: ${pluralize(uncapitalize(f.assocModel))}.map((f) => f.${f.destKey}) }});\n`;
  final += `${' '.repeat(indentSpace * 2)}}${appendComma ? ',' : ''}\n`;
  return final;
};

const resolverBody = (modelName, fields, indentSpace = 2) => {
  let final = '';
  final += `${' '.repeat(indentSpace)}${modelName}: {\n`;
  fields.forEach((f, i) => {
    if (primitiveGraphQLTypes.includes(f.graphQLType)) return;
    if (f.assocModel) {
      final += appendAssocResolver(modelName, f, indentSpace, i !== fields.length - 1);
      return;
    }
    final += `${' '.repeat(indentSpace * 2)}async ${f.name}(root, _, { ${f.jsType} }) {\n`;
    if (f.foreignKey) {
      const foreignKey = f.foreignKey.includes('.') ? `'${f.foreignKey}'` : f.foreignKey;
      if (f.foreignKeyIsArray) {
        if (f.isArray) {
          final += `${' '.repeat(indentSpace * 3)}return await ${f.jsType}.find({ ${foreignKey}: root._id });\n`;
        } else {
          final += `${' '.repeat(indentSpace * 3)}return await ${f.jsType}.findOne({ ${foreignKey}: root._id });\n`;
        }
      } else {
        if (f.isArray) {
          final += `${' '.repeat(indentSpace * 3)}return await ${f.jsType}.find({ ${foreignKey}: root._id });\n`;
        } else {
          final += `${' '.repeat(indentSpace * 3)}return await ${f.jsType}.findOne({ ${foreignKey}: root._id });\n`;
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

const resolverBodies = (modelName, fields, variant, indentSpace = 2) => {
  const roots = rootsThatRequiresBody(modelName, fields, indentSpace);
  let str = roots.map(({ modelName, fields }) =>
    resolverBody(modelName, fields, indentSpace)).join(',\n');
  if (variant === 'model') str += ',';
  return str;
};

const wrapper = (contents) =>
  concatBlocks(['module.exports = {', ...contents, '};']);

const queryBody = (schemaDefs) =>
  indentEveryLine(concatBlocks([
    'Query: {',
    `  async ${schemaDefs.varName}(root, { _id }, { ${schemaDefs.modelName} }) {`,
    `    return await ${schemaDefs.modelName}.findById(_id);`,
    '  },',
    `  async ${schemaDefs.pluralVarName}(root, { _ }, { ${schemaDefs.modelName} }) {`,
    `    return await ${schemaDefs.modelName}.find();`,
    '  }',
    '},'
  ]));

const mutationBody = (schemaDefs) =>
  indentEveryLine(concatBlocks([
    'Mutation: {',
    `  async create${schemaDefs.modelName}(root, { input }, { ${schemaDefs.modelName} }) {`,
    `    return await ${schemaDefs.modelName}.create(input);`,
    '  },',
    `  async update${schemaDefs.modelName}(root, { _id, input }, { ${schemaDefs.modelName} }) {`,
    `    return await (await ${schemaDefs.modelName}.findById(_id)).set(input).save();`,
    '  },',
    `  async delete${schemaDefs.modelName}(root, { _id }, { ${schemaDefs.modelName} }) {`,
    `    return await (await ${schemaDefs.modelName}.findById(_id)).remove();`,
    '  }',
    '}'
  ]));

const needsModelBody = (fields) => {
  let needs = false;
  for (const f of fields) {
    if (f.fields) {
      needs = needsModelBody(f.fields);
    } else if (!f.primitive && !f.isObject && !f.isSchema) {
      needs = true;
    }
    if (needs) return true;
  }
  return needs;
};

const generateResolver = (schemaDefs, variant) => {
  if (variant === 'schema' && !needsModelBody(schemaDefs.fields)) {
    return undefined;
  }
  return wrapper([
    needsModelBody(schemaDefs.fields) ? resolverBodies(schemaDefs.modelName, schemaDefs.fields, variant) : undefined,
    variant === 'model' ? queryBody(schemaDefs) : undefined,
    variant === 'model' ? mutationBody(schemaDefs) : undefined
  ]);
};

module.exports = generateResolver;
