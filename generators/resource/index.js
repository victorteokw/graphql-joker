const Generator = require('yeoman-generator');
const fs = require('fs');
const uncapitalize = require('../../utils/uncapitalize');
const capitalize = require('../../utils/capitalize');
const lowercase = require('../../utils/lowercase');

module.exports = class extends Generator {

  constructor(args, options) {
    super(args, options);
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
    !collectionName && (collectionName = uncapitalize(modelName) + 's');
    modelName = capitalize(modelName);
    pvarName = collectionName;
    collectionName = lowercase(collectionName);

    const sideEffects = {};

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

      const primitiveTypes = [
        'String',
        'Boolean',
        'Number',
        'Object',
        'Array',
        'Date',
        'ObjectId',
        'RegExp',
        'Symbol'
      ];

      if (primitiveTypes.includes(fieldType)) {
        primitive = true;
        sideEffects['requiresObjectId'] = false;
      } else {
        sideEffects['requiresObjectId'] = true;
      }
      if (fieldType === 'Date') {
        sideEffects['requiresDate'] = true;
      } else {
        sideEffects['requiresDate'] = false;
      }

      return {
        fieldName, fieldType, array, primitive
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
      schemaBody: this._generateSchemaBody(fields)
    };
  }

  _generateSchemaBody(fields) {
    let final = '';
    fields.forEach((f, i) => {
      if (i > 0) {
        final = final + '\n';
      }
      final = final + '  ';
      final = final + f.fieldName + ": ";
      if (f.array) final = final + '[';
      final = final + f.fieldType;
      if (f.array) final = final + ']';
    });
    return final;
  }

  _generateMongooseSchemaBody(fields) {
    let final = '';
    fields.forEach((f, i) => {
      if (i > 0) {
        final = final + '\n';
      }
      final = final + '  ';
      final = final + f.fieldName + ": ";
      if (f.array) final = final + '[';
      if (f.primitive) {
        final = final + f.fieldType;
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
