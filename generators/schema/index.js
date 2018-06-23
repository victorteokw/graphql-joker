const Generator = require('yeoman-generator');
const modelDescriptor = require('../../utils/modelDescriptor');
const mongooseSchemaBody = require('../../utils/mongooseSchemaBody');
const graphQLSchemaBody = require('../../utils/graphQLSchemaBody');
const graphQLExtraSchemaTypes = require('../../utils/graphQLExtraSchemaTypes');
const resolverBody = require('../../utils/resolverBody');

module.exports = class extends Generator {

  constructor(args, options) {
    super(args, options);
    if (options.destroy) {
      this.__destroy = true;
    }
    this._parseArguments(args);
  }

  _parseArguments(args) {
    const result = modelDescriptor(args);
    this._context = Object.assign({}, result, {
      mongooseSchemaBody: mongooseSchemaBody(result.fields),
      schemaBody: graphQLSchemaBody(result.modelName, result.fields),
      schemaInputBody: graphQLSchemaBody(result.modelName, result.fields, true),
      extraSchemaTypes: graphQLExtraSchemaTypes(result.modelName, result.fields),
      resolverModelBody: resolverBody(result.modelName, result.fields)
    });
  }

  writing() {
    if (this.__destroy) {
      this.fs.delete(
        this.destinationPath(`models/${this._context.varName}Schema.js`),
      );
      this.fs.delete(
        this.destinationPath(`schemas/${this._context.modelName}.gql`),
      );
      this.fs.delete(
        this.destinationPath(`resolvers/${this._context.modelName}.js`),
      );
      return;
    }
    this.fs.copyTpl(
      this.templatePath('models/_baseSchema.js'),
      this.destinationPath(`models/${this._context.varName}Schema.js`),
      this._context
    );
    this.fs.copyTpl(
      this.templatePath('schemas/_Base.gql'),
      this.destinationPath(`schemas/${this._context.modelName}.gql`),
      this._context
    );
    if (this._context.sideEffects.needsResolverModelBody) {
      this.fs.copyTpl(
        this.templatePath('resolvers/_Base.js'),
        this.destinationPath(`resolvers/${this._context.modelName}.js`),
        this._context
      );
    }
  }

  install() {}
};
