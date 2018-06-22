const modelDescriptor = require('../utils/modelDescriptor');
const assert = require('assert');

describe('model descriptor', () => {
  it('creates correct descriptor', () => {
    const desc = modelDescriptor(['User', 'name:String', 'age:Int', 'disabled:Boolean:false']);
    assert.deepEqual(desc, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [{
        name: 'name',
        type: 'String',
        jsType: 'String',
        graphQLType: 'String',
        isArray: false,
        primitive: true,
        modifiers: {},
        foreignKey: undefined,
        foreignKeyIsArray: undefined
      },
      {
        name: 'age',
        type: 'Int',
        jsType: 'Number',
        graphQLType: 'Int',
        isArray: false,
        primitive: true,
        modifiers: {},
        foreignKey: undefined,
        foreignKeyIsArray: undefined
      },
      {
        name: 'disabled',
        type: 'Boolean',
        jsType: 'Boolean',
        graphQLType: 'Boolean',
        isArray: false,
        primitive: true,
        modifiers: {
          default: false
        },
        foreignKey: undefined,
        foreignKeyIsArray: undefined
      }],
      sideEffects: {
        requiresObjectId: false,
        requiresDate: false,
        needsResolverModelBody: false
      }
    });
  });

  it('handles plural model names', () => {
    const desc = modelDescriptor(['Quiz', 'content:String!', 'answer:String!']);
    assert.deepEqual(desc, {
      modelName: 'Quiz',
      collectionName: 'quizzes',
      varName: 'quiz',
      pluralVarName: 'quizzes',
      fields: [{
        name: 'content',
        type: 'String',
        jsType: 'String',
        graphQLType: 'String',
        isArray: false,
        primitive: true,
        modifiers: {
          required: true
        },
        foreignKey: undefined,
        foreignKeyIsArray: undefined
      },
      {
        name: 'answer',
        type: 'String',
        jsType: 'String',
        graphQLType: 'String',
        isArray: false,
        primitive: true,
        modifiers: {
          required: true
        },
        foreignKey: undefined,
        foreignKeyIsArray: undefined
      }],
      sideEffects: {
        requiresObjectId: false,
        requiresDate: false,
        needsResolverModelBody: false
      }
    });
  });

  it('handles references', () => {
    const desc = modelDescriptor(['User', 'name:String!', 'posts:[Post]']);
    assert.deepEqual(desc, {
      "modelName":"User",
      "collectionName":"users",
      "varName":"user",
      "pluralVarName":"users",
      "fields": [
        {
          "name":"name",
          "type":"String",
          "jsType":"String",
          "graphQLType":"String",
          "isArray":false,
          "primitive":true,
          "modifiers":{
            "required":true
          },
          foreignKey: undefined,
          foreignKeyIsArray: undefined
        },
        {
          "name":"posts",
          "type":"Post",
          "jsType":"Post",
          "graphQLType":"Post",
          "isArray":true,
          "primitive":false,
          "modifiers":{},
          foreignKey: undefined,
          foreignKeyIsArray: undefined
        }
      ],
      "sideEffects": {
        "requiresObjectId":true,
        "requiresDate":false,
        "needsResolverModelBody":true
      }
    });
  });
});
