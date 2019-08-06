const uncapitalize = require('../../utils/string/uncapitalize');
const pluralize = require('pluralize');

module.exports = {
  getOneThroughAssocModel: (modelName, assocModelName, selfKey, targetKey, rootName, primaryKey) =>
    `const ${pluralize(uncapitalize(assocModelName))} = await ${assocModelName}.find({ ${selfKey}: ${rootName}.${primaryKey} });\n` +
    `return await ${modelName}.findOne({ _id: { $in: ${pluralize(uncapitalize(assocModelName))}.map((f) => f.${targetKey}) }});`,
  getAllThroughAssocModel: (modelName, assocModelName, selfKey, targetKey, rootName, primaryKey) =>
    `const ${pluralize(uncapitalize(assocModelName))} = await ${assocModelName}.find({ ${selfKey}: ${rootName}.${primaryKey} });\n` +
    `return await ${modelName}.find({ _id: { $in: ${pluralize(uncapitalize(assocModelName))}.map((f) => f.${targetKey}) }});`,
  getOneByArrRef: (modelName, refName, rootName, primaryKey) =>
    `return await ${modelName}.findOne({ where: {${refName}: ${rootName}.${primaryKey} }});`,
  getAllByArrRef: (modelName, refName, rootName, primaryKey) =>
    `return await ${modelName}.findAll({ where: { ${refName}: ${rootName}.${primaryKey} }});`,
  getOneByRef: (modelName, refName, rootName, primaryKey) =>
    `return await ${modelName}.findOne({ where: {${refName}: ${rootName}.${primaryKey} }});`,
  getAllByRef: (modelName, refName, rootName, primaryKey) =>
    `return await ${modelName}.findAll({ where: { ${refName}: ${rootName}.${primaryKey} }});`,
  getByIds: (modelName, fieldName, rootName, primaryKey) =>
    `return await ${modelName}.findAll({ where: { ${primaryKey}: ${rootName}.${fieldName} }});`,
  getById: (modelName, fieldName, rootName, _primaryKey) =>
    `return await ${modelName}.findById(${rootName}.${fieldName});`,
  findOne: (modelName, primaryKey) =>
    `return await ${modelName}.findById(${primaryKey});`,
  findAll: (modelName) =>
    `return await ${modelName}.findAll();`,
  create: (modelName) =>
    `return await ${modelName}.create(input);`,
  update: (modelName, primaryKey) =>
    `return await (await ${modelName}.findById(${primaryKey})).set(input).save();`,
  delete: (modelName, primaryKey) =>
    `return await ${modelName}.destroy({ where: { ${primaryKey} }}) && { ${primaryKey} };`,
};
