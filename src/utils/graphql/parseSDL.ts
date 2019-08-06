import { cloneDeep } from 'lodash';
import uncapitalize from '../../utils/string/uncapitalize';
import capitalize from '../../utils/string/capitalize';
import lowercase from '../../utils/string/lowercase';
import pluralize = require('pluralize');
const { singular } = pluralize;
import quote from '../../utils/string/quote';
import removeUndefined from '../../utils/object/removeUndefined';
import primitiveGraphQLTypes from './primitiveTypes';
import ParseSDLError from './ParseSDLError';

interface ModelName {
  modelName: string,
  varName: string,
  pluralVarName: string,
  collectionName: string
}

interface Field {
  name: string,
  jsType?: string,
  graphQLType?: string,
  isArray?: boolean,
  isObject?: boolean,
  isSchema?: boolean,
  isEnum?: boolean,
  isFile?: boolean,
  fields?: Field[],
  primitive?: boolean,
  reference?: boolean,
  jsTypeArg?: string,
  modifiers?: Modifier,
  foreignKey?: string,
  foreignKeyIsArray?: boolean,
  assocModel?: string,
  selfKey?: string,
  destKey?: string
}

interface NestingContext {
  name: string,
  singularName: string
}

interface Modifier {
  match?: string,
  enum?: string[],
  uploader?: string,
  required?: boolean,
  index?: boolean,
  autoIncrement?: boolean,
  unique?: boolean,
  sparse?: boolean,
  default?: any
}

interface ORMSetting {
  ormTypeFromGraphQLType: (graphQLType: string) => string,
  graphQLTypeFromORMType: (ORMType: string) => string,
  supportedPrimitiveTypes: string[]
}

// Find a nesting context for current argument
const getCurrentContext = (fields: Field[], nestingContext: NestingContext[]) => {
  nestingContext.forEach((context) => {
    fields = ((fields.find((f) => (f.name === context.name) && f.isObject) as Field).fields as Field[]);
  });
  return fields;
};

// Get model name from user's arg zero
const parsingModelName = (arg0: string): ModelName => {
  if (!arg0.match(/^[a-zA-Z]\w*(\/[a-zA-Z]\w*)?$/)) {
    throw new ParseSDLError(`Unexpected model name \`${arg0}'.`);
  }
  let [modelName, pluralVarName] = arg0.split('/');
  modelName = capitalize(modelName);
  const varName = uncapitalize(modelName);
  if (!pluralVarName) pluralVarName = pluralize(varName);
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

const parseSDL = (args: string[], ormSetting: ORMSetting) => {

  args = cloneDeep(args);
  ormSetting = cloneDeep(ormSetting);

  // Parsing model names
  const arg0 = args.shift();
  if (!arg0) {
    throw new ParseSDLError(`Missing model name argument.`);
  }
  const {
    modelName,
    varName,
    pluralVarName,
    collectionName
  } = parsingModelName(arg0);

  // Parsing fields

  const fields: Field[] = [];
  const nestingContext: NestingContext[] = [];

  args.forEach((arg) => {
    const tokens = arg.split(':');
    if (tokens.length > 3) {
      throw new ParseSDLError(`Unexpected field descriptor '${arg}'.`);
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
      const nIsArray = !!nestingMatcher[1];
      getCurrentContext(fields, nestingContext).push({
        name: token0,
        isObject: true,
        isArray: nIsArray,
        isEnum: false,
        isFile: false,
        fields: []
      });
      nestingContext.push({
        name: token0,
        singularName: nIsArray ? singular(tokens[0]) : tokens[0]
      });
      return;
    }

    // Reusable nesting (Subschema) referencing

    const reusableMatcher = token1.match(/^(\[)?(.+)Schema(\])?$/);
    if (reusableMatcher) {
      const rIsArray = !!(reusableMatcher[1] && reusableMatcher[3]);
      const rGraphQLType = capitalize(reusableMatcher[2]);
      const rJsType = uncapitalize(rGraphQLType) + 'Schema';
      getCurrentContext(fields, nestingContext).push({
        name: token0,
        jsType: rJsType,
        graphQLType: rGraphQLType,
        isArray: rIsArray,
        isEnum: false,
        isFile: false,
        isSchema: true
      });
      return;
    }

    // Parsing normal fields

    const name = token0;
    const typeMatcherRegExp = /^(\[)?([\w\d\.]+)(\((.+)\))?(\])?(.*)?$/;
    const typeMatcher = token1.match(typeMatcherRegExp) as RegExpMatchArray;
    const isArray = Boolean(typeMatcher[1] && typeMatcher[5]);
    let modifier = typeMatcher[6] || '';
    const rawType = typeMatcher[2];
    const mainRawType = rawType.split('.')[0];
    const typeArgument = typeMatcher[4];
    let graphQLType: string | undefined;
    let jsType: string | undefined;
    let isEnum = false;
    let isFile = false;
    let primitive = false;
    let reference = false;
    const modifiers: Modifier = {};

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
      modifiers.enum = typeArgument.split(',').map(quote);
    }

    // Upload type
    if (mainRawType.match(/^.+Uploader$/)) {
      primitive = true;
      isFile = true;
      // Update this later
      modifiers.uploader = rawType;
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
      const matchData = modifier.match(/(\/.*\/[\w]*)(.*)/) as RegExpMatchArray;
      const regex = matchData[1];
      modifier = matchData[2];
      modifiers.match = regex;
    }

    // min & max <= >= modifiers
    const minChecker = />=([\da-fx\.]*)/;
    const maxChecker = /<=([\da-fx\.]*)/;
    if (modifier.match(minChecker)) {
      modifiers[graphQLType === 'String' ? 'minlength' : 'min']
        = (modifier.match(minChecker) as RegExpMatchArray)[1];
      modifier = modifier.replace(minChecker, '');
    }
    if (modifier.match(maxChecker)) {
      modifiers[graphQLType === 'String' ? 'maxlength' : 'max']
        = (modifier.match(maxChecker) as RegExpMatchArray)[1];
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
        modifiers.default = calValMatcher[1];
      } else {
        if (graphQLType === 'String') {
          modifiers.default = quote(token2);
        } else if (['Int', 'Float'].includes(graphQLType as string)) {
          modifiers.default = parseFloat(token2);
        } else if (graphQLType === 'Boolean') {
          modifiers.default = JSON.parse(token2);
        } else if (graphQLType === 'Date') {
          if (token2.match(/^[0-9]+$/)) {
            modifiers.default = new Date(parseFloat(token2));
          } else {
            modifiers.default = new Date(token2);
          }
        }
      }
    }

    let foreignKey: string | undefined;
    let foreignKeyIsArray: boolean | undefined;
    let assocModel: string | undefined;
    let selfKey: string | undefined;
    let destKey: string | undefined;
    if (token2 && reference) {
      const foreignKeyMatcher = token2.match(/^(\[)?([\w\d\.]+)(\])?$/);
      foreignKeyIsArray = Boolean((foreignKeyMatcher as RegExpMatchArray)[1] && (foreignKeyMatcher as RegExpMatchArray)[3]);
      const foreignKeyRawValue = (foreignKeyMatcher as RegExpMatchArray)[2];
      if (foreignKeyRawValue.match(/^[A-Z]/)) {
        const assocInfo = token2.split('.');
        assocModel = assocInfo[0];
        destKey = assocInfo[1] || uncapitalize(jsType as string);
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

export default parseSDL;
