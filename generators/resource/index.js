const Generator = require('yeoman-generator');
const fs = require('fs');
const modelDescriptor = require('../../utils/modelDescriptor');
const mongooseSchemaBody = require('../../utils/mongooseSchemaBody');
const graphQLSchemaBody = require('../../utils/graphQLSchemaBody');
const graphQLExtraSchemaTypes = require('../../utils/graphQLExtraSchemaTypes');

const primitiveJsTypes = [
  'String',
  'Boolean',
  'Number',
  'ObjectId',
  'Date'
];

const primitiveGraphQLTypes = [
  'String',
  'Boolean',
  'Float',
  'Int',
  'ID',
  'Date'
];

module.exports = class extends Generator {

  constructor(args, options) {
    super(args, options);
    if (options.destroy) {
      this.__destroy = true;
    }
    this._resourceParseArgs(args);
  }

  _resourceParseArgs(args) {
    const result = modelDescriptor(args);
    this._userArgs = Object.assign({}, result, {
      mongooseSchemaBody: mongooseSchemaBody(result.fields),
      schemaBody: graphQLSchemaBody(result.modelName, result.fields),
      schemaInputBody: graphQLSchemaBody(result.modelName, result.fields, true),
      extraSchemaTypes: graphQLExtraSchemaTypes(result.modelName, result.fields),
      resolverModelBody: this._generateResolverModelBody(
        result.sideEffects['needsResolverModelBody'],
        result.modelName,
        result.fields
      )
    });
  }

  _generateResolverModelBody(needs, modelName, fields) {
    if (!needs) return '';
    let final = '';
    final += `  ${modelName}: {\n`;
    fields.forEach((f, i) => {
      if (primitiveJsTypes.includes(f.jsType)) return;
      final += `    async ${f.name}(root, _, ctx) {\n`;
      final += `      const { ${f.jsType} } = ctx.models;\n`;
      if (f.foreignKey) {
        if (f.foreignKeyIsArray) {
          if (f.isArray) {
            final += `      return await ${f.jsType}.find({ ${f.foreignKey}: root._id });\n`;
          } else {
            final += `      return await ${f.jsType}.findOne({ ${f.foreignKey}: root._id });\n`;
          }
        } else {
          if (f.isArray) {
            final += `      return await ${f.jsType}.find({ ${f.foreignKey}: root._id });\n`;
          } else {
            final += `      return await ${f.jsType}.findOne({ ${f.foreignKey}: root._id });\n`;
          }
        }
      } else {
        if (f.isArray) {
          final += `      return await ${f.jsType}.find({ _id: { $in: root.${f.name} }});\n`;
        } else {
          final += `      return await ${f.jsType}.findById(root.${f.name});\n`;
        }
      }
      if (i !== fields.length - 1) {
        final += '    },\n';
      } else {
        final += '    }\n';
      }
    });
    final += `  },`;
    return final;
  }

  writing() {
    if (this.__destroy) {
      this.fs.delete(
        this.destinationPath(`models/${this._userArgs.modelName}.js`),
      );
      this.fs.delete(
        this.destinationPath(`schemas/${this._userArgs.modelName}.gql`),
      );
      this.fs.delete(
        this.destinationPath(`resolvers/${this._userArgs.modelName}.js`),
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
      this.destinationPath(`models/${this._userArgs.modelName}.js`),
      this._userArgs
    );
    this.fs.copyTpl(
      this.templatePath('schemas/_Base.gql'),
      this.destinationPath(`schemas/${this._userArgs.modelName}.gql`),
      this._userArgs
    );
    this.fs.copyTpl(
      this.templatePath('resolvers/_Base.js'),
      this.destinationPath(`resolvers/${this._userArgs.modelName}.js`),
      this._userArgs
    );
  }

  install() {}
};
