const capitalize = require('../../../utils/string/capitalize');
const pluralize = require('pluralize');
const { singular } = pluralize;
const concatBlocks = require('../../../utils/string/concatBlocks');
const indentEveryLine = require('../../../utils/string/indentEveryLine');
const primitiveGraphQLTypes = require('../../../data/primitiveGraphQLTypes');

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

const appendAssocResolver = (modelName, f, orm, userPrimaryKey, indentSpace = 2, appendComma = true) => {
  let final = '';
  final += `${' '.repeat(indentSpace * 2)}async ${f.name}(root, _, { ${f.assocModel}, ${f.jsType} }) {\n`;
  if (f.isArray) {
    final += indentEveryLine(orm.resolverFunctions.getAllThroughAssocModel(f.jsType, f.assocModel, f.selfKey, f.destKey, 'root', userPrimaryKey), 3, 2) + '\n';
  } else {
    final += indentEveryLine(orm.resolverFunctions.getOneThroughAssocModel(f.jsType, f.assocModel, f.selfKey, f.destKey, 'root', userPrimaryKey), 3, 2) + '\n';
  }
  final += `${' '.repeat(indentSpace * 2)}}${appendComma ? ',' : ''}\n`;
  return final;
};

const resolverBody = (modelName, fields, orm, userPrimaryKey, polymorphicReference, indentSpace = 2) => {
  let final = '';
  final += `${' '.repeat(indentSpace)}${modelName}: {\n`;
  fields.forEach((f, i) => {
    if (primitiveGraphQLTypes.includes(f.graphQLType)) return;
    if (f.assocModel) {
      final += appendAssocResolver(modelName, f, orm, userPrimaryKey, indentSpace, i !== fields.length - 1);
      return;
    }
    final += `${' '.repeat(indentSpace * 2)}async ${f.name}(root, _, { ${f.jsType} }) {\n`;
    if (f.foreignKey) {
      const formatForeignKey = polymorphicReference ? f.foreignKey : f.foreignKey + 'Id';
      const foreignKey = f.foreignKey.includes('.') ? `'${formatForeignKey}'` : formatForeignKey;
      if (f.foreignKeyIsArray) {
        if (f.isArray) {
          final += indentEveryLine(orm.resolverFunctions.getAllByArrRef(f.jsType, foreignKey, 'root', userPrimaryKey), 3, 2) + '\n';
        } else {
          final += indentEveryLine(orm.resolverFunctions.getOneByArrRef(f.jsType, foreignKey, 'root', userPrimaryKey), 3, 2) + '\n';
        }
      } else {
        if (f.isArray) {
          final += indentEveryLine(orm.resolverFunctions.getAllByRef(f.jsType, foreignKey, 'root', userPrimaryKey), 3, 2) + '\n';
        } else {
          final += indentEveryLine(orm.resolverFunctions.getOneByRef(f.jsType, foreignKey, 'root', userPrimaryKey), 3, 2) + '\n';
        }
      }
    } else {
      if (f.isArray) {
        final += indentEveryLine(orm.resolverFunctions.getByIds(f.jsType, f.name + (polymorphicReference ? '' : 'Id'), 'root', userPrimaryKey), 3, 2) + '\n';
      } else {
        final += indentEveryLine(orm.resolverFunctions.getById(f.jsType, f.name + (polymorphicReference ? '' : 'Id'), 'root', userPrimaryKey), 3, 2) + '\n';
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

const resolverBodies = (modelName, fields, variant, orm, userPrimaryKey, polymorphicReference, indentSpace = 2) => {
  const roots = rootsThatRequiresBody(modelName, fields, indentSpace);
  let str = roots.map(({ modelName, fields }) =>
    resolverBody(modelName, fields, orm, userPrimaryKey, polymorphicReference, indentSpace)).join(',\n');
  if (variant === 'model') str += ',';
  return str;
};

const wrapper = (contents) =>
  concatBlocks(['module.exports = {', ...contents, '};']);

const queryBody = (schemaDefs, orm, userPrimaryKey) =>
  indentEveryLine(concatBlocks([
    'Query: {',
    `  async ${schemaDefs.varName}(root, { ${userPrimaryKey} }, { ${schemaDefs.modelName} }) {`,
    indentEveryLine(orm.resolverFunctions.findOne(schemaDefs.modelName, userPrimaryKey), 2, 2),
    '  },',
    `  async ${schemaDefs.pluralVarName}(root, { _ }, { ${schemaDefs.modelName} }) {`,
    indentEveryLine(orm.resolverFunctions.findAll(schemaDefs.modelName), 2, 2),
    '  }',
    '},'
  ]));

const mutationBody = (schemaDefs, orm, userPrimaryKey) =>
  indentEveryLine(concatBlocks([
    'Mutation: {',
    `  async create${schemaDefs.modelName}(root, { input }, { ${schemaDefs.modelName} }) {`,
    indentEveryLine(orm.resolverFunctions.create(schemaDefs.modelName), 2, 2),
    '  },',
    `  async update${schemaDefs.modelName}(root, { ${userPrimaryKey}, input }, { ${schemaDefs.modelName} }) {`,
    indentEveryLine(orm.resolverFunctions.update(schemaDefs.modelName, userPrimaryKey), 2, 2),
    '  },',
    `  async delete${schemaDefs.modelName}(root, { ${userPrimaryKey} }, { ${schemaDefs.modelName} }) {`,
    indentEveryLine(orm.resolverFunctions.delete(schemaDefs.modelName, userPrimaryKey), 2, 2),
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

const generateResolver = (schemaDefs, variant, orm, options) => {
  if (variant === 'schema' && !needsModelBody(schemaDefs.fields)) {
    return undefined;
  }
  return wrapper([
    needsModelBody(schemaDefs.fields) ? resolverBodies(schemaDefs.modelName, schemaDefs.fields, variant, orm, options.primaryKey, options.polymorphicReference) : undefined,
    variant === 'model' ? queryBody(schemaDefs, orm, options.primaryKey) : undefined,
    variant === 'model' ? mutationBody(schemaDefs, orm, options.primaryKey) : undefined
  ]);
};

module.exports = generateResolver;
