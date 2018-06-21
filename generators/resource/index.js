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
    if (args.length < 2) {
      throw `Arguments error. You need to specify at least two arguments.`;
    }
    // Model name and collection name
    const arg0 = args.shift();
    if (!arg0.match(/^[a-zA-Z]\w*(\/[a-zA-Z]\w*)?$/)) {
      throw `Model/collection name format error.`;
    }
    let [modelName, pvarName] = arg0.split('/');
    !pvarName && (pvarName = pluralize(uncapitalize(modelName)));
    modelName = capitalize(modelName);
    const collectionName = lowercase(pvarName);

    const sideEffects = {};
    sideEffects['requiresObjectId'] = false;
    sideEffects['requiresDate'] = false;
    sideEffects['needsResolverModelBody'] = false;

    const fields = args.map((arg) => {
      const tokens = arg.split(':');

      const fieldName = uncapitalize(tokens[0]);
      let fieldType = 'String',
        modifier = '',
        array = false;
      const modifiers = {};

      const typeDesc = tokens[1] || 'String';

      const matchData = typeDesc.match(/^\[(.*)\](.*)$/);
      if (matchData) {
        fieldType = matchData[1];
        modifier = matchData[2];
        array = true;
      } else {
        const pmatchData = typeDesc.match(/^([a-zA-Z0-9]*)(.*)/);
        fieldType = pmatchData[1];
        modifier = pmatchData[2];
      }
      if (modifier.match(/!/)) {
        modifiers.required = true;
      }
      if (modifier.match(/\^/)) {
        modifiers.index = true;
      }
      if (modifier.match(/\$/)) {
        modifiers.unique = true;
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

      const primitive = primitiveTypes.includes(fieldType);

      let foreignKey = tokens[2];
      let foreignKeyArray = false;
      if (foreignKey) {
        if (foreignKey.match(/^\[(.*)\]$/)) {
          foreignKeyArray = true;
          foreignKey = foreignKey.match(/^\[(.*)\]$/)[1];
        }
      }

      if (!primitive) {
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
        foreignKey, foreignKeyArray, modifiers
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

  _fm(modifiers) {
    const keys = Object.keys(modifiers);
    return keys.map((k) => `${k}: ${modifiers[k].toString()}`).join(', ');
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
        if (Object.keys(f.modifiers).length === 0) {
          final = final + f.fieldJSType;
        } else {
          final = final + `{ type: ${f.fieldType}, ${this._fm(f.modifiers)} }`;
        }
      } else {
        if (Object.keys(f.modifiers).length === 0) {
          final = final + `{ type: ObjectId, ref: '${f.fieldType}' }`;
        } else {
          final = final + `{ type: ObjectId, ref: '${f.fieldType}', ${this._fm(f.modifiers)} }`;
        }
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
