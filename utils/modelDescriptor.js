const uncapitalize = require('./uncapitalize');
const capitalize = require('./capitalize');
const lowercase = require('./lowercase');
const pluralize = require('pluralize');

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

  // Code side effects
  const sideEffects = {};
  sideEffects['requiresObjectId'] = false;
  sideEffects['requiresDate'] = false;
  sideEffects['needsResolverModelBody'] = false;

  // Fields
  const fields = [];

  args.forEach((arg) => {
    const tokens = arg.split(':');
    if (tokens.length > 3) {
      throw `Unexpected field descriptor '${arg}'.`;
    }
    // Default to String type if no type is specified
    tokens[1] || (tokens[1] = 'String');

    const name = uncapitalize(tokens[0]);
    let modifier = '', isArray = false;
    let type = '', jsType = '', graphQLType = '';
    const modifiers = {};

    const arrayTypeChecker = /^\[(.*)\](.*)$/;
    const singleTypeChecker = /^([a-zA-Z0-9]*)(.*)$/;
    if (tokens[1].match(arrayTypeChecker)) {
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

    // // Handle sparse index
    // if (modifier.unique && !modifier.required) {
    //   modifiers.sparse = true;
    // }
    //

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
            modifiers['default'] = JSON.stringify(tokens[2]);
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

    fields.push({
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