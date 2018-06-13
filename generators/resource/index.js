const Generator = require('yeoman-generator');
const fs = require('fs');
const uncapitalize = require('../../utils/uncapitalize');
const capitalize = require('../../utils/capitalize');
const lowercase = require('../../utils/lowercase');
const pluralize = require('pluralize');

const primitiveTypes = [
  'String',
  'Boolean',
  'Number',
  'Object',
  'Array',
  'Date',
  'ObjectId',
  'RegExp',
  'Symbol',
  'Int',
  'Float',
  'ID'
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
    // Model name and collection name
    const arg0 = args.shift();
    if (!arg0.match(/^[a-zA-Z]\w*(\/[a-zA-Z]\w*)?$/)) {
      throw `Model/collection name format error.`;
    }
    let [modelName, collectionName] = arg0.split('/');
    let pvarName = '';
    !collectionName && (collectionName = pluralize(uncapitalize(modelName)));
    modelName = capitalize(modelName);
    pvarName = collectionName;
    collectionName = lowercase(collectionName);

    const sideEffects = {};
    sideEffects['requiresObjectId'] = false;
    sideEffects['requiresDate'] = false;
    sideEffects['needsResolverModelBody'] = false;

    const fields = args.map((arg) => {
      const tokens = arg.split(':');

      let fieldName = tokens[0];
      fieldName = uncapitalize(fieldName);

      let array = false, primitive = false;
      let fieldType = tokens[1] || 'String';
      const matchData = fieldType.match(/^\[(.*)\]$/);
      if (matchData) {
        fieldType = matchData[1];
        array = true;
      }
      fieldType = capitalize(fieldType);
      let fieldJSType = fieldType;
      let fieldGraphQLType = fieldType;
      if (fieldType === 'Number') {
        fieldGraphQLType = 'Int';
      }
      if ((fieldType === 'Int') || (fieldType === 'Float')) {
        fieldJSType = 'Number';
      }
      if (fieldType === 'ObjectId') {
        fieldGraphQLType = 'ID';
      }

      let foreignKey = tokens[2];
      let foreignKeyArray = false;
      if (foreignKey) {
        if (foreignKey.match(/^\[(.*)\]$/)) {
          foreignKeyArray = true;
          foreignKey = foreignKey.match(/^\[(.*)\]$/)[1];
        }
      }

      if (primitiveTypes.includes(fieldJSType)) {
        primitive = true;
      } else {
        if (!foreignKey) {
          sideEffects['requiresObjectId'] = true;
        }
        sideEffects['needsResolverModelBody'] = true;
      }
      if (fieldType === 'Date') {
        sideEffects['requiresDate'] = true;
      }

      return {
        fieldName, fieldType, array, primitive, fieldJSType, fieldGraphQLType,
        foreignKey, foreignKeyArray
      };

    });

    this._userArgs = {
      modelName,
      collectionName,
      fields,
      mongooseSchemaName: uncapitalize(modelName) + 'Schema',
      mongooseSchemaBody: this._generateMongooseSchemaBody(fields),
      ...sideEffects,
      svarName: uncapitalize(modelName),
      pvarName,
      schemaBody: this._generateSchemaBody(fields),
      schemaInputBody: this._generateSchemaBody(fields, true),
      resolverModelBody: this._generateResolverModelBody(
        sideEffects['needsResolverModelBody'],
        modelName,
        fields
      )
    };
  }

  _generateResolverModelBody(needs, modelName, fields) {
    if (!needs) return '';
    let final = '';
    final += `  ${modelName}: {\n`;
    fields.forEach((f, i) => {
      if (primitiveTypes.includes(f.fieldJSType)) return;
      final += `    async ${f.fieldName}(root, _, ctx) {\n`;
      final += `      const { ${f.fieldJSType} } = ctx.models;\n`;
      if (f.foreignKey) {
        if (f.foreignKeyArray) {
          if (f.array) {
            final += `      return await ${f.fieldJSType}.find({ ${f.foreignKey}: root._id });\n`;
          } else {
            final += `      return await ${f.fieldJSType}.findOne({ ${f.foreignKey}: root._id });\n`;
          }
        } else {
          if (f.array) {
            final += `      return await ${f.fieldJSType}.find({ ${f.foreignKey}: root._id });\n`;
          } else {
            final += `      return await ${f.fieldJSType}.findOne({ ${f.foreignKey}: root._id });\n`;
          }
        }
      } else {
        if (f.array) {
          final += `      return await ${f.fieldJSType}.find({ _id: { $in: root.${f.fieldName} }});\n`;
        } else {
          final += `      return await ${f.fieldJSType}.findById(root.${f.fieldName});\n`;
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

  _generateSchemaBody(fields, input) {
    if (input) {
      fields = fields.filter((f) => !f.foreignKey);
    }
    let final = '';
    fields.forEach((f, i) => {
      if (i > 0) {
        final = final + '\n';
      }
      final = final + '  ';
      final = final + f.fieldName + ": ";
      if (f.array) final = final + '[';
      if (primitiveTypes.includes(f.fieldGraphQLType)) {
        final = final + f.fieldGraphQLType;
      } else {
        if (input) {
          final = final + 'ID';
        } else {
          final = final + f.fieldGraphQLType;
        }
      }
      if (f.array) final = final + ']';
    });
    return final;
  }

  _generateMongooseSchemaBody(fields) {
    let final = '';
    fields = fields.filter((f) => !f.foreignKey);
    fields.forEach((f, i) => {
      if (i > 0) {
        final = final + '\n';
      }
      final = final + '  ';
      final = final + f.fieldName + ": ";
      if (f.array) final = final + '[';
      if (f.primitive) {
        final = final + f.fieldJSType;
      } else {
        final = final + `{ type: ObjectId, ref: '${f.fieldType}' }`;
      }
      if (f.array) final = final + ']';
      if (i !== fields.length - 1) {
        final = final + ',';
      }
    });
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
