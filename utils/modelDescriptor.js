const uncapitalize = require('./uncapitalize');
const capitalize = require('./capitalize');
const lowercase = require('./lowercase');
const pluralize = require('pluralize');
const { singular } = pluralize;
const quote = require('./quote');

// Find a nesting context for current argument
const root = (fields, nestingContext) => {
  nestingContext.forEach((name) => {
    fields = fields.find((f) => (f.name === name) && f.isObject).fields;
  });
  return fields;
};

module.exports = (args) => {
  if (args.length < 2) {
    throw `Unexpected arguments '${args.join(' ')}'.`;
  }

  // Model name and collection name
  const arg0 = args.shift();
  if (!arg0.match(/^[a-zA-Z]\w*(\/[a-zA-Z]\w*)?$/)) {
    throw `Unexpected Model/pluralVariableName '${arg0}'.`;
  }
  let [modelName, pluralVarName] = arg0.split('/');
  const varName = uncapitalize(modelName);
  !pluralVarName && (pluralVarName = pluralize(varName));
  modelName = capitalize(modelName);
  const collectionName = lowercase(pluralVarName);
  if (pluralVarName === varName) {
    pluralVarName = `all${capitalize(pluralVarName)}`;
  }

  // Code side effects
  const sideEffects = {
    requiresObjectId: false,
    requiresDate: false,
    needsResolverModelBody: false,
    needsExtraSchemaTypes: false
  };

  // Fields
  const fields = [];
  const nestingContext = [], singularNestingContext = []; // for nested

  args.forEach((arg) => {
    const tokens = arg.split(':');
    if (tokens.length > 3) {
      throw `Unexpected field descriptor '${arg}'.`;
    }

    // Nesting Structure
    if (tokens[1] && tokens[1].match(/^\[?{$/)) {
      const isArray = !!tokens[1].match(/^\[{$/);
      root(fields, nestingContext).push({
        name: tokens[0],
        isObject: true,
        isArray,
        fields: []
      });
      nestingContext.push(tokens[0]);
      singularNestingContext.push(isArray ? singular(tokens[0]) : tokens[0]);
      return;
    } else if (tokens[0].match(/}\]?/)) {
      nestingContext.pop();
      singularNestingContext.pop();
      return;
    }

    // Schema referencing
    if (tokens[1] && tokens[1].match(/^\[?.*Schema\]?$/)) {
      const isArray = !!tokens[1].match(/\[.*\]/);
      const type = capitalize(tokens[1].match(/^\[?(.*)Schema\]?$/)[1]);
      root(fields, nestingContext).push({
        name: tokens[0],
        jsType: uncapitalize(type) + 'Schema',
        graphQLType: type,
        type: type,
        isArray,
        isSchema: true
      });
      return;
    }

    // Default to String type if no type is specified
    tokens[1] || (tokens[1] = 'String');

    const name = uncapitalize(tokens[0]);
    let modifier = '', isArray = false;
    let type = '', jsType = '', graphQLType = '';
    const modifiers = {};

    const arrayTypeChecker = /^\[([a-zA-Z0-9,{}]*)\](.*)$/;
    const singleTypeChecker = /^([a-zA-Z0-9,{}]*}?)(.*)$/;
    const enumTypeChecker = /^Enum{(.*)}(.*)$/;
    const arrayEnumTypeChecker = /^\[Enum{(.*)}\](.*)$/;

    // Separate type and modifiers
    const arrayEnumMatchData = tokens[1].match(arrayEnumTypeChecker);
    const enumMatchData = tokens[1].match(enumTypeChecker);
    if (tokens[1].match(arrayEnumTypeChecker)) {
      jsType = 'String';
      type = graphQLType = modelName +
        singularNestingContext.map((n) => capitalize(n)).join('') +
        (isArray ? capitalize(singular(name)) : capitalize(name));
      modifiers['enum'] = arrayEnumMatchData[1].split(',').map(quote);
      isArray = true;
      modifier = tokens[1].match(arrayEnumTypeChecker)[2];
      sideEffects.needsExtraSchemaTypes = true;
    } else if (tokens[1].match(enumTypeChecker)) {
      jsType = 'String';
      type = graphQLType = modelName +
        singularNestingContext.map((n) => capitalize(n)).join('') +
        (isArray ? capitalize(singular(name)) : capitalize(name));
      modifiers['enum'] = enumMatchData[1].split(',').map(quote);
      modifier = tokens[1].match(enumTypeChecker)[2];
      sideEffects.needsExtraSchemaTypes = true;
    } else if (tokens[1].match(arrayTypeChecker)) {
      isArray = true;
      modifier = tokens[1].match(arrayTypeChecker)[2];
      type = capitalize(tokens[1].match(arrayTypeChecker)[1]);
    } else if (tokens[1].match(singleTypeChecker)) {
      modifier = tokens[1].match(singleTypeChecker)[2];
      type = capitalize(tokens[1].match(singleTypeChecker)[1]);
    } else {
      throw `Unexpected type '${tokens[1]}'.`;
    }

    // String regexp match modifier
    if ((type === 'String') && modifier.match(/\/(.*)\/(.*)/)) {
      const matchData = modifier.match(/(\/.*\/[\w]*)(.*)/);
      const regex = matchData[1];
      modifier = matchData[2];
      modifiers.match = regex;
    }

    // min & max <= >= modifiers
    const minChecker = />=([\da-fx\.]*)/;
    const maxChecker = /<=([\da-fx\.]*)/;
    if (modifier.match(minChecker)) {
      modifiers[type === 'String' ? 'minlength' : 'min']
        = modifier.match(minChecker)[1];
      modifier = modifier.replace(minChecker, '');
    }
    if (modifier.match(maxChecker)) {
      modifiers[type === 'String' ? 'maxlength' : 'max']
        = modifier.match(maxChecker)[1];
      modifier = modifier.replace(maxChecker, '');
    }

    // Required
    if (modifier.match(/!/)) {
      modifiers.required = true;
    }

    // Index
    if (modifier.match(/\^/)) {
      modifiers.index = true;
    }

    // Unique
    if (modifier.match(/\$/)) {
      modifiers.unique = true;
    }

    // Handle sparse index
    if (modifiers.unique && !modifiers.required) {
      modifiers.sparse = true;
    }

    // Normalize js types and graphQL types
    switch (type) {
      case 'Number':
        graphQLType = 'Int';
        break;
      case 'Int':
      case 'Float':
        jsType = 'Number';
        break;
      case 'ObjectId':
        graphQLType = 'ID';
        break;
      case 'ID':
        jsType = 'ObjectId';
        break;
    }
    !jsType && (jsType = type);
    !graphQLType && (graphQLType = type);

    // Primitive and reference types
    const primitiveJsTypes = [
      'String',
      'Boolean',
      'Number',
      'ObjectId',
      'Date'
    ];

    const primitive = primitiveJsTypes.includes(jsType);

    let foreignKey, foreignKeyIsArray;

    // tokens[2] is default value for primitive types and
    // foreign key for reference types
    if (tokens[2]) {
      // Set default value for primitive types
      if (primitive) {
        // Primitive type
        if (tokens[2].match(/`(.*)`/)) {
          modifiers['default'] = tokens[2].match(/`(.*)`/)[1];
        } else {
          if (jsType === 'String') {
            modifiers['default'] = quote(tokens[2]);
          }
          if (jsType === 'Number') {
            modifiers['default'] = parseFloat(tokens[2]);
          }
          if (jsType === 'Boolean') {
            modifiers['default'] = JSON.parse(tokens[2]);
          }
          if (jsType === 'Date') {
            if (tokens[2].match(/^[0-9]+$/)) {
              modifiers['default'] = new Date(parseFloat(tokens[2]));
            } else {
              modifiers['default'] = new Date(tokens[2]);
            }
          }
        }
      } else {
        // Reference type with foreign key
        if (tokens[2].match(/^\[(.*)\]$/)) {
          foreignKeyIsArray = true;
          foreignKey = tokens[2].match(/^\[(.*)\]$/)[1];
        } else {
          foreignKey = tokens[2];
        }
        sideEffects['needsResolverModelBody'] = true;
      }
    } else {
      // Without tokens[2]
      if (!primitive) {
        sideEffects['requiresObjectId'] = true;
        sideEffects['needsResolverModelBody'] = true;
      }
    }

    if (type === 'Date') {
      sideEffects['requiresDate'] = true;
    }

    if (jsType === 'ObjectId') {
      sideEffects['requiresObjectId'] = true;
    }

    if (nestingContext.length > 0) sideEffects.needsExtraSchemaTypes = true;
    root(fields, nestingContext).push({
      name,
      type,
      jsType,
      graphQLType,
      isArray,
      primitive,
      modifiers,
      foreignKey,
      foreignKeyIsArray
    });

  });

  return {
    modelName,
    collectionName,
    varName,
    pluralVarName,
    fields,
    sideEffects
  };
};
