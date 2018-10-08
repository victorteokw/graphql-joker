const uncapitalize = require('../../utils/string/uncapitalize');
const capitalize = require('../../utils/string/capitalize');
const lowercase = require('../../utils/string/lowercase');
const pluralize = require('pluralize');
const { singular } = pluralize;
const quote = require('../../utils/string/quote');
const removeUndefined = require('../../utils/object/removeUndefined');
const primitiveGraphQLTypes = require('../../data/primitiveGraphQLTypes');

// Find a nesting context for current argument
const getCurrentContext = (fields, nestingContext) => {
  nestingContext.forEach((context) => {
    fields = fields.find((f) => (f.name === context.name) && f.isObject).fields;
  });
  return fields;
};

const parsingModelName = (arg0) => {
  if (!arg0.match(/^[a-zA-Z]\w*(\/[a-zA-Z]\w*)?$/)) {
    throw `Unexpected Model/pluralVariableName '${arg0}'.`;
  }
  let [modelName, pluralVarName] = arg0.split('/');
  modelName = capitalize(modelName);
  const varName = uncapitalize(modelName);
  !pluralVarName && (pluralVarName = pluralize(varName));
  const collectionName = lowercase(pluralVarName);
  if (pluralVarName === varName) {
    pluralVarName = `all${capitalize(pluralVarName)}`;
  }
  return {
    modelName,
    varName,
    pluralVarName,
    collectionName
  };
};

module.exports = (args, ormSetting) => {

  // Parsing model names
  const arg0 = args.shift();
  const {
    modelName,
    varName,
    pluralVarName,
    collectionName
  } = parsingModelName(arg0);

  // Parsing fields

  const fields = [], nestingContext = [];

  args.forEach((arg) => {
    const tokens = arg.split(':');
    if (tokens.length > 3) {
      throw `Unexpected field descriptor '${arg}'.`;
    } else if (tokens.length === 1) {
      // set default type GraphQL String
      tokens.push('String');
    }
    const [token0, token1, token2] = tokens;

    // Nesting structure

    // Declared nesting structure

    // Pop nesting structure
    if (token0.match(/^}]?$/)) {
      nestingContext.pop();
      return;
    }
    // Push nesting structure
    const nestingMatcher = token1.match(/^(\[)?{$/);
    if (nestingMatcher) {
      const isArray = !!nestingMatcher[1];
      getCurrentContext(fields, nestingContext).push({
        name: token0,
        isObject: true,
        isArray,
        isEnum: false,
        isFile: false,
        fields: []
      });
      nestingContext.push({
        name: token0,
        singularName: isArray ? singular(tokens[0]) : tokens[0]
      });
      return;
    }

    // Reusable nesting (Subschema) referencing

    const reusableMatcher = token1.match(/^(\[)?(.+)Schema(\])?$/);
    if (reusableMatcher) {
      const isArray = !!(reusableMatcher[1] && reusableMatcher[3]);
      const graphQLType = capitalize(reusableMatcher[2]);
      const jsType = uncapitalize(graphQLType) + 'Schema';
      getCurrentContext(fields, nestingContext).push({
        name: token0,
        jsType,
        graphQLType,
        isArray,
        isEnum: false,
        isFile: false,
        isSchema: true
      });
      return;
    }

    // Parsing normal fields

    const name = token0;
    const typeMatcherRegExp = /^(\[)?([\w\d\.]+)(\((.+)\))?(\])?(.*)?$/;
    const typeMatcher = token1.match(typeMatcherRegExp);
    const isArray = Boolean(typeMatcher[1] && typeMatcher[5]);
    let modifier = typeMatcher[6] || '';
    const rawType = typeMatcher[2];
    const mainRawType = rawType.split('.')[0];
    const typeArgument = typeMatcher[4];
    let graphQLType, jsType,
      isEnum = false, isFile = false,
      primitive = false, reference = false;
    const modifiers = {};

    // Special Primitive Types

    // Enum type
    if (mainRawType.toLowerCase() === 'enum') {
      primitive = true;
      graphQLType = modelName
        + nestingContext.map((c) => capitalize(c.singularName)).join('')
        + (isArray ? capitalize(singular(name)) : capitalize(name));
      isEnum = true;
      // Update this later
      jsType = 'String';
      modifiers['enum'] = typeArgument.split(',').map(quote);
    }

    // Upload type
    if (mainRawType.match(/^.+Uploader$/)) {
      primitive = true;
      isFile = true;
      // Update this later
      modifiers['uploader'] = rawType;
      jsType = graphQLType = 'File';
    }

    // Scalar Primitive Types

    if (!isEnum && !isFile) {
      if (primitiveGraphQLTypes.includes(mainRawType)) {
        primitive = true;
        graphQLType = mainRawType;
        jsType = ormSetting.ormTypeFromGraphQLType(graphQLType);
      } else if (ormSetting.supportedPrimitiveTypes.includes(mainRawType)) {
        primitive = true;
        graphQLType = ormSetting.graphQLTypeFromORMType(mainRawType);
        jsType = rawType;
      }
    }

    // Association Types

    if (!primitive) {
      reference = true;
      jsType = mainRawType;
      graphQLType = mainRawType;
    }

    // Modifiers

    // String regexp match modifier
    if ((graphQLType === 'String') && modifier.match(/\/(.*)\/(.*)/)) {
      const matchData = modifier.match(/(\/.*\/[\w]*)(.*)/);
      const regex = matchData[1];
      modifier = matchData[2];
      modifiers.match = regex;
    }

    // min & max <= >= modifiers
    const minChecker = />=([\da-fx\.]*)/;
    const maxChecker = /<=([\da-fx\.]*)/;
    if (modifier.match(minChecker)) {
      modifiers[graphQLType === 'String' ? 'minlength' : 'min']
        = modifier.match(minChecker)[1];
      modifier = modifier.replace(minChecker, '');
    }
    if (modifier.match(maxChecker)) {
      modifiers[graphQLType === 'String' ? 'maxlength' : 'max']
        = modifier.match(maxChecker)[1];
      modifier = modifier.replace(maxChecker, '');
    }

    // Required
    if (modifier.match(/!/)) {
      modifiers.required = true;
    }

    // Auto Increment
    if (modifier.match(/\+/)) {
      modifiers.autoIncrement = true;
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

    // Default value and reference keys

    if (token2 && primitive) {
      const calValMatcher = token2.match(/`(.*)`/);
      if (calValMatcher) {
        modifiers['default'] = calValMatcher[1];
      } else {
        if (graphQLType === 'String') {
          modifiers['default'] = quote(token2);
        } else if (['Int', 'Float'].includes(graphQLType)) {
          modifiers['default'] = parseFloat(token2);
        } else if (graphQLType === 'Boolean') {
          modifiers['default'] = JSON.parse(token2);
        } else if (graphQLType === 'Date') {
          if (token2.match(/^[0-9]+$/)) {
            modifiers['default'] = new Date(parseFloat(token2));
          } else {
            modifiers['default'] = new Date(token2);
          }
        }
      }
    }

    let foreignKey, foreignKeyIsArray;
    let assocModel, selfKey, destKey;
    if (token2 && reference) {
      const foreignKeyMatcher = token2.match(/^(\[)?([\w\d\.]+)(\])?$/);
      foreignKeyIsArray = Boolean(foreignKeyMatcher[1] && foreignKeyMatcher[3]);
      const foreignKeyRawValue = foreignKeyMatcher[2];
      if (foreignKeyRawValue.match(/^[A-Z]/)) {
        const assocInfo = token2.split('.');
        assocModel = assocInfo[0];
        destKey = assocInfo[1] || uncapitalize(jsType);
        selfKey = assocInfo[2] || uncapitalize(modelName);
      } else {
        foreignKey = foreignKeyRawValue;
      }
    }

    getCurrentContext(fields, nestingContext).push({
      name,
      jsType,
      graphQLType,
      jsTypeArg: typeArgument,
      isArray,
      primitive,
      reference,
      modifiers,
      isEnum,
      isFile,
      foreignKey,
      foreignKeyIsArray,
      assocModel,
      selfKey,
      destKey
    });

  });

  return removeUndefined({
    modelName,
    collectionName,
    varName,
    pluralVarName,
    fields
  });
};
