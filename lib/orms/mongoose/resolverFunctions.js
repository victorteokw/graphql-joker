module.exports = {
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
