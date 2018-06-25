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
        needsResolverModelBody: false,
        needsExtraSchemaTypes: false,
        "schemaRequirements": []
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
        needsResolverModelBody: false,
        needsExtraSchemaTypes: false,
        "schemaRequirements": []
      }
    });
  });

  it('handles uncountable model names', () => {
    const desc = modelDescriptor(['Fish', 'name:String']);
    assert.deepEqual(desc, {
      modelName: 'Fish',
      collectionName: 'fish',
      varName: 'fish',
      pluralVarName: 'allFish',
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
      }],
      sideEffects: {
        requiresObjectId: false,
        requiresDate: false,
        needsResolverModelBody: false,
        needsExtraSchemaTypes: false,
        "schemaRequirements": []
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
        "needsResolverModelBody":true,
        "needsExtraSchemaTypes": false,
        "schemaRequirements": []
      }
    });
  });

  it('handles arrays', () => {
    const desc = modelDescriptor(['User', 'name:[String]!^$:No Name', 'posts:[Post]']);
    assert.deepEqual(desc, {
      "modelName": "User",
      "collectionName": "users",
      "varName": "user",
      "pluralVarName": "users",
      "fields": [
        {
          "name": "name",
          "type": "String",
          "jsType": "String",
          "graphQLType": "String",
          "isArray": true,
          "primitive": true,
          "modifiers": {
            "required": true,
            "index": true,
            "unique": true,
            "default": "'No Name'"
          },
          foreignKey: undefined,
          foreignKeyIsArray: undefined
        },
        {
          "name": "posts",
          "type": "Post",
          "jsType": "Post",
          "graphQLType": "Post",
          "isArray": true,
          "primitive": false,
          "modifiers": {},
          foreignKey: undefined,
          foreignKeyIsArray: undefined
        }
      ],
      "sideEffects": {
        "requiresObjectId": true,
        "requiresDate": false,
        "needsResolverModelBody": true,
        "needsExtraSchemaTypes": false,
        "schemaRequirements": []
      }
    });
  });

  it('handle foreign keys', () => {
    const desc = modelDescriptor(['User', 'posts:[Post]:author']);
    assert.deepEqual(desc, {
      "modelName": "User",
      "collectionName": "users",
      "varName": "user",
      "pluralVarName": "users",
      "fields": [
        {
          "name": "posts",
          "type": "Post",
          "jsType": "Post",
          "graphQLType": "Post",
          "isArray": true,
          "primitive": false,
          "modifiers": {},
          "foreignKey": "author",
          foreignKeyIsArray: undefined
        }
      ],
      "sideEffects": {
        "requiresObjectId": false,
        "requiresDate": false,
        "needsResolverModelBody": true,
        "needsExtraSchemaTypes": false,
        "schemaRequirements": []
      }
    });
  });

  it('handle default value', () => {
    const desc = modelDescriptor(['User', 'age:Number:18']);
    assert.deepEqual(desc, {
      "modelName": "User",
      "collectionName": "users",
      "varName": "user",
      "pluralVarName": "users",
      "fields": [
        {
          "name": "age",
          "type": "Number",
          "jsType": "Number",
          "graphQLType": "Int",
          "isArray": false,
          "primitive": true,
          "modifiers": {
            "default": 18
          },
          foreignKey: undefined,
          foreignKeyIsArray: undefined
        }
      ],
      "sideEffects": {
        "requiresObjectId": false,
        "requiresDate": false,
        "needsResolverModelBody": false,
        "needsExtraSchemaTypes": false,
        "schemaRequirements": []
      }
    });
  });

  it('handle index modifier', () => {
    const desc = modelDescriptor(['User', 'name:String^']);
    assert.deepEqual(desc, {
      "modelName": "User",
      "collectionName": "users",
      "varName": "user",
      "pluralVarName": "users",
      "fields": [
        {
          "name": "name",
          "type": "String",
          "jsType": "String",
          "graphQLType": "String",
          "isArray": false,
          "primitive": true,
          "modifiers": {
            "index": true
          },
          foreignKey: undefined,
          foreignKeyIsArray: undefined
        }
      ],
      "sideEffects": {
        "requiresObjectId": false,
        "requiresDate": false,
        "needsResolverModelBody": false,
        "needsExtraSchemaTypes": false,
        "schemaRequirements": []
      }
    });
  });

  it('handle required modifier', () => {
    const desc = modelDescriptor(['User', 'name:String!']);
    assert.deepEqual(desc, {
      "modelName": "User",
      "collectionName": "users",
      "varName": "user",
      "pluralVarName": "users",
      "fields": [
        {
          "name": "name",
          "type": "String",
          "jsType": "String",
          "graphQLType": "String",
          "isArray": false,
          "primitive": true,
          "modifiers": {
            "required": true
          },
          foreignKey: undefined,
          foreignKeyIsArray: undefined
        }
      ],
      "sideEffects": {
        "requiresObjectId": false,
        "requiresDate": false,
        "needsResolverModelBody": false,
        "needsExtraSchemaTypes": false,
        "schemaRequirements": []
      }
    });

  });

  it('handle unique modifier', () => {
    const desc = modelDescriptor(['User', 'name:String$']);
    assert.deepEqual(desc, {
      "modelName": "User",
      "collectionName": "users",
      "varName": "user",
      "pluralVarName": "users",
      "fields": [
        {
          "name": "name",
          "type": "String",
          "jsType": "String",
          "graphQLType": "String",
          "isArray": false,
          "primitive": true,
          "modifiers": {
            "unique": true,
            "sparse": true
          },
          foreignKey: undefined,
          foreignKeyIsArray: undefined
        }
      ],
      "sideEffects": {
        "requiresObjectId": false,
        "requiresDate": false,
        "needsResolverModelBody": false,
        "needsExtraSchemaTypes": false,
        "schemaRequirements": []
      }
    });
  });

  it('handle combined modifiers', () => {
    const desc = modelDescriptor(['User', 'name:String$^!']);
    assert.deepEqual(desc, {
      "modelName": "User",
      "collectionName": "users",
      "varName": "user",
      "pluralVarName": "users",
      "fields": [
        {
          "name": "name",
          "type": "String",
          "jsType": "String",
          "graphQLType": "String",
          "isArray": false,
          "primitive": true,
          "modifiers": {
            "required": true,
            "index": true,
            "unique": true
          },
          foreignKey: undefined,
          foreignKeyIsArray: undefined
        }
      ],
      "sideEffects": {
        "requiresObjectId": false,
        "requiresDate": false,
        "needsResolverModelBody": false,
        "needsExtraSchemaTypes": false,
        "schemaRequirements": []
      }
    });
  });

  it('handle string match modifiers', () => {
    const desc = modelDescriptor(['User', 'name:String/\\w+/']);
    assert.deepEqual(desc, {
      "modelName": "User",
      "collectionName": "users",
      "varName": "user",
      "pluralVarName": "users",
      "fields": [
        {
          "name": "name",
          "type": "String",
          "jsType": "String",
          "graphQLType": "String",
          "isArray": false,
          "primitive": true,
          "modifiers": {
            match: '/\\w+/'
          },
          foreignKey: undefined,
          foreignKeyIsArray: undefined
        }
      ],
      "sideEffects": {
        "requiresObjectId": false,
        "requiresDate": false,
        "needsResolverModelBody": false,
        "needsExtraSchemaTypes": false,
        "schemaRequirements": []
      }
    });
  });

  it('string match modifiers should come before other modifiers', () => {
    const desc = modelDescriptor(['User', 'name:String/\\w+/!^$']);
    assert.deepEqual(desc, {
      "modelName": "User",
      "collectionName": "users",
      "varName": "user",
      "pluralVarName": "users",
      "fields": [
        {
          "name": "name",
          "type": "String",
          "jsType": "String",
          "graphQLType": "String",
          "isArray": false,
          "primitive": true,
          "modifiers": {
            match: '/\\w+/',
            required: true,
            index: true,
            unique: true
          },
          foreignKey: undefined,
          foreignKeyIsArray: undefined
        }
      ],
      "sideEffects": {
        "requiresObjectId": false,
        "requiresDate": false,
        "needsResolverModelBody": false,
        "needsExtraSchemaTypes": false,
        "schemaRequirements": []
      }
    });
  });

  it('set correct types for user input Number', () => {
    const desc = modelDescriptor(['User', 'age:Number']);
    assert.deepEqual(desc, {
      "modelName": "User",
      "collectionName": "users",
      "varName": "user",
      "pluralVarName": "users",
      "fields": [
        {
          "name": "age",
          "type": "Number",
          "jsType": "Number",
          "graphQLType": "Int",
          "isArray": false,
          "primitive": true,
          "modifiers": {},
          foreignKey: undefined,
          foreignKeyIsArray: undefined
        }
      ],
      "sideEffects": {
        "requiresObjectId": false,
        "requiresDate": false,
        "needsResolverModelBody": false,
        "needsExtraSchemaTypes": false,
        "schemaRequirements": []
      }
    });
  });

  it('set correct types for user input Int', () => {
    const desc = modelDescriptor(['User', 'age:Int']);
    assert.deepEqual(desc, {
      "modelName": "User",
      "collectionName": "users",
      "varName": "user",
      "pluralVarName": "users",
      "fields": [
        {
          "name": "age",
          "type": "Int",
          "jsType": "Number",
          "graphQLType": "Int",
          "isArray": false,
          "primitive": true,
          "modifiers": {},
          foreignKey: undefined,
          foreignKeyIsArray: undefined
        }
      ],
      "sideEffects": {
        "requiresObjectId": false,
        "requiresDate": false,
        "needsResolverModelBody": false,
        "needsExtraSchemaTypes": false,
        "schemaRequirements": []
      }
    });
  });

  it('set correct types for user input Float', () => {
    const desc = modelDescriptor(['User', 'rate:Float']);
    assert.deepEqual(desc, {
      "modelName": "User",
      "collectionName": "users",
      "varName": "user",
      "pluralVarName": "users",
      "fields": [
        {
          "name": "rate",
          "type": "Float",
          "jsType": "Number",
          "graphQLType": "Float",
          "isArray": false,
          "primitive": true,
          "modifiers": {},
          foreignKey: undefined,
          foreignKeyIsArray: undefined
        }
      ],
      "sideEffects": {
        "requiresObjectId": false,
        "requiresDate": false,
        "needsResolverModelBody": false,
        "needsExtraSchemaTypes": false,
        "schemaRequirements": []
      }
    });
  });

  it('set correct types for user input ID', () => {
    const desc = modelDescriptor(['User', 'link:ID']);
    assert.deepEqual(desc, {
      "modelName": "User",
      "collectionName": "users",
      "varName": "user",
      "pluralVarName": "users",
      "fields": [
        {
          "name": "link",
          "type": "ID",
          "jsType": "ObjectId",
          "graphQLType": "ID",
          "isArray": false,
          "primitive": true,
          "modifiers": {},
          foreignKey: undefined,
          foreignKeyIsArray: undefined
        }
      ],
      "sideEffects": {
        "requiresObjectId": true,
        "requiresDate": false,
        "needsResolverModelBody": false,
        "needsExtraSchemaTypes": false,
        "schemaRequirements": []
      }
    });
  });

  it('set correct types for user input ObjectId', () => {
    const desc = modelDescriptor(['User', 'link:ObjectId']);
    assert.deepEqual(desc, {
      "modelName": "User",
      "collectionName": "users",
      "varName": "user",
      "pluralVarName": "users",
      "fields": [
        {
          "name": "link",
          "type": "ObjectId",
          "jsType": "ObjectId",
          "graphQLType": "ID",
          "isArray": false,
          "primitive": true,
          "modifiers": {},
          foreignKey: undefined,
          foreignKeyIsArray: undefined
        }
      ],
      "sideEffects": {
        "requiresObjectId": true,
        "requiresDate": false,
        "needsResolverModelBody": false,
        "needsExtraSchemaTypes": false,
        "schemaRequirements": []
      }
    });
  });

  it('handles nesting structure', () => {
    const desc = modelDescriptor(['User', 'settings:{', 'sms:Boolean!:true', 'email:Boolean!:true', '}', 'name:String']);
    assert.deepEqual(desc, {
      "modelName": "User",
      "collectionName": "users",
      "varName": "user",
      "pluralVarName": "users",
      "fields": [
        {
          "name": "settings",
          "isObject": true,
          "isArray": false,
          "fields": [
            {
              "name": "sms",
              "type": "Boolean",
              "jsType": "Boolean",
              "graphQLType": "Boolean",
              "isArray": false,
              "primitive": true,
              "modifiers": {
                "required": true,
                "default": true
              },
              foreignKey: undefined,
              foreignKeyIsArray: undefined
            },
            {
              "name": "email",
              "type": "Boolean",
              "jsType": "Boolean",
              "graphQLType": "Boolean",
              "isArray": false,
              "primitive": true,
              "modifiers": {
                "required": true,
                "default": true
              },
              foreignKey: undefined,
              foreignKeyIsArray: undefined
            }
          ]
        },
        {
          "name": "name",
          "type": "String",
          "jsType": "String",
          "graphQLType": "String",
          "isArray": false,
          "primitive": true,
          "modifiers": {},
          foreignKey: undefined,
          foreignKeyIsArray: undefined
        }
      ],
      "sideEffects": {
        "requiresObjectId": false,
        "requiresDate": false,
        "needsResolverModelBody": false,
        "needsExtraSchemaTypes": true,
        "schemaRequirements": []
      }
    });
  });

  it('handles nesting array structure', () => {
    const desc = modelDescriptor(['User', 'settings:[{', 'sms:Boolean!:true', 'email:Boolean!:true', '}]', 'name:String']);
    assert.deepEqual(desc, {
      "modelName": "User",
      "collectionName": "users",
      "varName": "user",
      "pluralVarName": "users",
      "fields": [
        {
          "name": "settings",
          "isObject": true,
          "isArray": true,
          "fields": [
            {
              "name": "sms",
              "type": "Boolean",
              "jsType": "Boolean",
              "graphQLType": "Boolean",
              "isArray": false,
              "primitive": true,
              "modifiers": {
                "required": true,
                "default": true
              },
              foreignKey: undefined,
              foreignKeyIsArray: undefined
            },
            {
              "name": "email",
              "type": "Boolean",
              "jsType": "Boolean",
              "graphQLType": "Boolean",
              "isArray": false,
              "primitive": true,
              "modifiers": {
                "required": true,
                "default": true
              },
              foreignKey: undefined,
              foreignKeyIsArray: undefined
            }
          ]
        },
        {
          "name": "name",
          "type": "String",
          "jsType": "String",
          "graphQLType": "String",
          "isArray": false,
          "primitive": true,
          "modifiers": {},
          foreignKey: undefined,
          foreignKeyIsArray: undefined
        }
      ],
      "sideEffects": {
        "requiresObjectId": false,
        "requiresDate": false,
        "needsResolverModelBody": false,
        "needsExtraSchemaTypes": true,
        "schemaRequirements": []
      }
    });
  });

  it('handles deep nesting structure', () => {
    const desc = modelDescriptor([
      'User',
      'age:Int',
      'settings:[{', 'sms:Boolean!:true', 'email:Boolean!:true', 'pn:{',
      'ipad:Boolean!:true', 'iphone:Boolean!:true', '}',
      'webSocket:Boolean!:true', '}]', 'name:String'
    ]);
    assert.deepEqual(desc, {
      "modelName": "User",
      "collectionName": "users",
      "varName": "user",
      "pluralVarName": "users",
      "fields": [
        {
          "name": "age",
          "type": "Int",
          "jsType": "Number",
          "graphQLType": "Int",
          "isArray": false,
          "primitive": true,
          "modifiers": {},
          foreignKey: undefined,
          foreignKeyIsArray: undefined
        },
        {
          "name": "settings",
          "isObject": true,
          "isArray": true,
          "fields": [
            {
              "name": "sms",
              "type": "Boolean",
              "jsType": "Boolean",
              "graphQLType": "Boolean",
              "isArray": false,
              "primitive": true,
              "modifiers": {
                "required": true,
                "default": true
              },
              foreignKey: undefined,
              foreignKeyIsArray: undefined
            },
            {
              "name": "email",
              "type": "Boolean",
              "jsType": "Boolean",
              "graphQLType": "Boolean",
              "isArray": false,
              "primitive": true,
              "modifiers": {
                "required": true,
                "default": true
              },
              foreignKey: undefined,
              foreignKeyIsArray: undefined
            },
            {
              "name": "pn",
              "isObject": true,
              "isArray": false,
              "fields": [
                {
                  "name": "ipad",
                  "type": "Boolean",
                  "jsType": "Boolean",
                  "graphQLType": "Boolean",
                  "isArray": false,
                  "primitive": true,
                  "modifiers": {
                    "required": true,
                    "default": true
                  },
                  foreignKey: undefined,
                  foreignKeyIsArray: undefined
                },
                {
                  "name": "iphone",
                  "type": "Boolean",
                  "jsType": "Boolean",
                  "graphQLType": "Boolean",
                  "isArray": false,
                  "primitive": true,
                  "modifiers": {
                    "required": true,
                    "default": true
                  },
                  foreignKey: undefined,
                  foreignKeyIsArray: undefined
                }
              ]
            },
            {
              "name": "webSocket",
              "type": "Boolean",
              "jsType": "Boolean",
              "graphQLType": "Boolean",
              "isArray": false,
              "primitive": true,
              "modifiers": {
                "required": true,
                "default": true
              },
              foreignKey: undefined,
              foreignKeyIsArray: undefined
            }
          ]
        },
        {
          "name": "name",
          "type": "String",
          "jsType": "String",
          "graphQLType": "String",
          "isArray": false,
          "primitive": true,
          "modifiers": {},
          foreignKey: undefined,
          foreignKeyIsArray: undefined
        }
      ],
      "sideEffects": {
        "requiresObjectId": false,
        "requiresDate": false,
        "needsResolverModelBody": false,
        "needsExtraSchemaTypes": true,
        "schemaRequirements": []
      }
    });
  });

  it('handles enum', () => {
    const desc = modelDescriptor(['User', 'gender:Enum{male,female}!']);
    assert.deepEqual(desc, {
      "modelName": "User",
      "collectionName": "users",
      "varName": "user",
      "pluralVarName": "users",
      "fields": [
        {
          "name": "gender",
          "type": "UserGender",
          "jsType": "String",
          "graphQLType": "UserGender",
          "isArray": false,
          "primitive": true,
          "modifiers": {
            "enum": [
              "'male'",
              "'female'"
            ],
            "required": true
          },
          foreignKey: undefined,
          foreignKeyIsArray: undefined
        }
      ],
      "sideEffects": {
        "requiresObjectId": false,
        "requiresDate": false,
        "needsResolverModelBody": false,
        "needsExtraSchemaTypes": true,
        "schemaRequirements": []
      }
    });
  });

  it('handles special chars in enum', () => {
    const desc = modelDescriptor(['User', 'level:Enum{A+,A,A-,B+,B,B-}!']);
    assert.deepEqual(desc, {
      "modelName": "User",
      "collectionName": "users",
      "varName": "user",
      "pluralVarName": "users",
      "fields": [
        {
          "name": "level",
          "type": "UserLevel",
          "jsType": "String",
          "graphQLType": "UserLevel",
          "isArray": false,
          "primitive": true,
          "modifiers": {
            "enum": [
              "'A+'",
              "'A'",
              "'A-'",
              "'B+'",
              "'B'",
              "'B-'"
            ],
            "required": true
          },
          foreignKey: undefined,
          foreignKeyIsArray: undefined
        }
      ],
      "sideEffects": {
        "requiresObjectId": false,
        "requiresDate": false,
        "needsResolverModelBody": false,
        "needsExtraSchemaTypes": true,
        "schemaRequirements": []
      }
    });
  });

  it('handles enum in nested structure', () => {
    const desc = modelDescriptor(['User', 'info:{', 'gender:Enum{male,female}!']);
    assert.deepEqual(desc, {
      "modelName": "User",
      "collectionName": "users",
      "varName": "user",
      "pluralVarName": "users",
      "fields": [
        {
          "name": "info",
          "isObject": true,
          "isArray": false,
          "fields": [
            {
              "name": "gender",
              "type": "UserInfoGender",
              "jsType": "String",
              "graphQLType": "UserInfoGender",
              "isArray": false,
              "primitive": true,
              "modifiers": {
                "enum": [
                  "'male'",
                  "'female'"
                ],
                "required": true
              },
              foreignKey: undefined,
              foreignKeyIsArray: undefined
            }
          ]
        }
      ],
      "sideEffects": {
        "requiresObjectId": false,
        "requiresDate": false,
        "needsResolverModelBody": false,
        "needsExtraSchemaTypes": true,
        "schemaRequirements": []
      }
    });
  });

  it('handles enum in nested array structure', () => {
    const desc = modelDescriptor(['Building', 'users:[{', 'gender:Enum{male,female}!']);
    assert.deepEqual(desc, {
      "modelName": "Building",
      "collectionName": "buildings",
      "varName": "building",
      "pluralVarName": "buildings",
      "fields": [
        {
          "name": "users",
          "isObject": true,
          "isArray": true,
          "fields": [
            {
              "name": "gender",
              "type": "BuildingUserGender",
              "jsType": "String",
              "graphQLType": "BuildingUserGender",
              "isArray": false,
              "primitive": true,
              "modifiers": {
                "enum": [
                  "'male'",
                  "'female'"
                ],
                "required": true
              },
              foreignKey: undefined,
              foreignKeyIsArray: undefined
            }
          ]
        }
      ],
      "sideEffects": {
        "requiresObjectId": false,
        "requiresDate": false,
        "needsResolverModelBody": false,
        "needsExtraSchemaTypes": true,
        "schemaRequirements": []
      }
    });
  });

});
