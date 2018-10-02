module.exports = {
  getOneByArrRef: (modelName, refName, rootName, primaryKey) =>
    `return await ${modelName}.findOne({ ${refName}: ${rootName}.${primaryKey} });`,
  getAllByArrRef: (modelName, refName, rootName, primaryKey) =>
    `return await ${modelName}.find({ ${refName}: ${rootName}.${primaryKey} });`,
  getOneByRef: (modelName, refName, rootName, primaryKey) =>
    `return await ${modelName}.findOne({ ${refName}: ${rootName}.${primaryKey} });`,
  getAllByRef: (modelName, refName, rootName, primaryKey) =>
    `return await ${modelName}.find({ ${refName}: ${rootName}.${primaryKey} });`,
  getByIds: (modelName, fieldName, rootName, primaryKey) =>
    `return await ${modelName}.find({ ${primaryKey}: { $in: ${rootName}.${fieldName} }});`,
  getById: (modelName, fieldName, rootName, _primaryKey) =>
    `return await ${modelName}.findById(${rootName}.${fieldName});`,
  findOne: (modelName, primaryKey) =>
    `return await ${modelName}.findById(${primaryKey});`,
  findAll: (modelName) =>
    `return await ${modelName}.find();`,
  create: (modelName) =>
    `return await ${modelName}.create(input);`,
  update: (modelName, primaryKey) =>
    `return await (await ${modelName}.findById(${primaryKey})).set(input).save();`,
  delete: (modelName, primaryKey) =>
    `return await (await ${modelName}.findById(${primaryKey})).remove();`,
};
