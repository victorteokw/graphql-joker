const Generator = require('yeoman-generator');
const fs = require('fs');
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
        this.destinationPath(`models/${this._context.modelName}.js`),
      );
      this.fs.delete(
        this.destinationPath(`schemas/${this._context.modelName}.gql`),
      );
      this.fs.delete(
        this.destinationPath(`resolvers/${this._context.modelName}.js`),
      );
      return;
    }
    const dateSchemaFile = this.destinationPath('schemas/Date.gql');
    const dateResolverFile = this.destinationPath('resolvers/Date.js');
    if (!fs.existsSync(dateSchemaFile)) {
      this.fs.copy(
        this.templatePath('schemas/Date.gql'),
        this.destinationPath('schemas/Date.gql')
      );
    }
    if (!fs.existsSync(dateResolverFile)) {
      this.fs.copy(
        this.templatePath('resolvers/Date.js'),
        this.destinationPath('resolvers/Date.js')
      );
    }
    this.fs.copyTpl(
      this.templatePath('models/_Base.js'),
      this.destinationPath(`models/${this._context.modelName}.js`),
      this._context
    );
    this.fs.copyTpl(
      this.templatePath('schemas/_Base.gql'),
      this.destinationPath(`schemas/${this._context.modelName}.gql`),
      this._context
    );
    this.fs.copyTpl(
      this.templatePath('resolvers/_Base.js'),
      this.destinationPath(`resolvers/${this._context.modelName}.js`),
      this._context
    );
  }

  install() {}
};
