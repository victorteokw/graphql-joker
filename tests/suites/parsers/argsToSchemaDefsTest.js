const argsToSchemaDefs = require('../../../lib/parsers/argsToSchemaDefs');
const assert = require('assert');

describe('model schemaDefsriptor', () => {
  it('creates correct schemaDefsriptor', () => {
    const schemaDefs = argsToSchemaDefs([
      'User',
      'name:String',
      'age:Int',
      'disabled:Boolean:false'
    ]);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
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
        }
      ]
    });
  });

  it('handles plural model names', () => {
    const schemaDefs = argsToSchemaDefs([
      'Quiz',
      'content:String!',
      'answer:String!'
    ]);
    assert.deepEqual(schemaDefs, {
      modelName: 'Quiz',
      collectionName: 'quizzes',
      varName: 'quiz',
      pluralVarName: 'quizzes',
      fields: [
        {
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
        }
      ]
    });
  });

  it('handles uncountable model names', () => {
    const schemaDefs = argsToSchemaDefs(['Fish', 'name:String']);
    assert.deepEqual(schemaDefs, {
      modelName: 'Fish',
      collectionName: 'fish',
      varName: 'fish',
      pluralVarName: 'allFish',
      fields: [
        {
          name: 'name',
          type: 'String',
          jsType: 'String',
          graphQLType: 'String',
          isArray: false,
          primitive: true,
          modifiers: {},
          foreignKey: undefined,
          foreignKeyIsArray: undefined
        }
      ]
    });
  });

  it('handles references', () => {
    const schemaDefs = argsToSchemaDefs([
      'User',
      'name:String!',
      'posts:[Post]'
    ]);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          name: 'name',
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
          name: 'posts',
          type: 'Post',
          jsType: 'Post',
          graphQLType: 'Post',
          isArray: true,
          primitive: false,
          modifiers: {},
          foreignKey: undefined,
          foreignKeyIsArray: undefined
        }
      ]
    });
  });

  it('handles arrays', () => {
    const schemaDefs = argsToSchemaDefs([
      'User',
      'name:[String]!^$:No Name',
      'posts:[Post]'
    ]);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          name: 'name',
          type: 'String',
          jsType: 'String',
          graphQLType: 'String',
          isArray: true,
          primitive: true,
          modifiers: {
            required: true,
            index: true,
            unique: true,
            default: "'No Name'"
          },
          foreignKey: undefined,
          foreignKeyIsArray: undefined
        },
        {
          name: 'posts',
          type: 'Post',
          jsType: 'Post',
          graphQLType: 'Post',
          isArray: true,
          primitive: false,
          modifiers: {},
          foreignKey: undefined,
          foreignKeyIsArray: undefined
        }
      ]
    });
  });

  it('handle foreign keys', () => {
    const schemaDefs = argsToSchemaDefs(['User', 'posts:[Post]:author']);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          name: 'posts',
          type: 'Post',
          jsType: 'Post',
          graphQLType: 'Post',
          isArray: true,
          primitive: false,
          modifiers: {},
          foreignKey: 'author',
          foreignKeyIsArray: undefined
        }
      ]
    });
  });

  it('handle default value', () => {
    const schemaDefs = argsToSchemaDefs(['User', 'age:Number:18']);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          name: 'age',
          type: 'Number',
          jsType: 'Number',
          graphQLType: 'Int',
          isArray: false,
          primitive: true,
          modifiers: {
            default: 18
          },
          foreignKey: undefined,
          foreignKeyIsArray: undefined
        }
      ]
    });
  });

  it('handle index modifier', () => {
    const schemaDefs = argsToSchemaDefs(['User', 'name:String^']);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          name: 'name',
          type: 'String',
          jsType: 'String',
          graphQLType: 'String',
          isArray: false,
          primitive: true,
          modifiers: {
            index: true
          },
          foreignKey: undefined,
          foreignKeyIsArray: undefined
        }
      ]
    });
  });

  it('handle required modifier', () => {
    const schemaDefs = argsToSchemaDefs(['User', 'name:String!']);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          name: 'name',
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
        }
      ]
    });
  });

  it('handle unique modifier', () => {
    const schemaDefs = argsToSchemaDefs(['User', 'name:String$']);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          name: 'name',
          type: 'String',
          jsType: 'String',
          graphQLType: 'String',
          isArray: false,
          primitive: true,
          modifiers: {
            unique: true,
            sparse: true
          },
          foreignKey: undefined,
          foreignKeyIsArray: undefined
        }
      ]
    });
  });

  it('handle combined modifiers', () => {
    const schemaDefs = argsToSchemaDefs(['User', 'name:String$^!']);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          name: 'name',
          type: 'String',
          jsType: 'String',
          graphQLType: 'String',
          isArray: false,
          primitive: true,
          modifiers: {
            required: true,
            index: true,
            unique: true
          },
          foreignKey: undefined,
          foreignKeyIsArray: undefined
        }
      ]
    });
  });

  it('handle string match modifiers', () => {
    const schemaDefs = argsToSchemaDefs(['User', 'name:String/\\w+/']);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          name: 'name',
          type: 'String',
          jsType: 'String',
          graphQLType: 'String',
          isArray: false,
          primitive: true,
          modifiers: {
            match: '/\\w+/'
          },
          foreignKey: undefined,
          foreignKeyIsArray: undefined
        }
      ]
    });
  });

  it('string match modifiers should come before other modifiers', () => {
    const schemaDefs = argsToSchemaDefs(['User', 'name:String/\\w+/!^$']);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          name: 'name',
          type: 'String',
          jsType: 'String',
          graphQLType: 'String',
          isArray: false,
          primitive: true,
          modifiers: {
            match: '/\\w+/',
            required: true,
            index: true,
            unique: true
          },
          foreignKey: undefined,
          foreignKeyIsArray: undefined
        }
      ]
    });
  });

  it('set correct types for user input Number', () => {
    const schemaDefs = argsToSchemaDefs(['User', 'age:Number']);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          name: 'age',
          type: 'Number',
          jsType: 'Number',
          graphQLType: 'Int',
          isArray: false,
          primitive: true,
          modifiers: {},
          foreignKey: undefined,
          foreignKeyIsArray: undefined
        }
      ]
    });
  });

  it('set correct types for user input Int', () => {
    const schemaDefs = argsToSchemaDefs(['User', 'age:Int']);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
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
        }
      ]
    });
  });

  it('set correct types for user input Float', () => {
    const schemaDefs = argsToSchemaDefs(['User', 'rate:Float']);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          name: 'rate',
          type: 'Float',
          jsType: 'Number',
          graphQLType: 'Float',
          isArray: false,
          primitive: true,
          modifiers: {},
          foreignKey: undefined,
          foreignKeyIsArray: undefined
        }
      ]
    });
  });

  it('set correct types for user input ID', () => {
    const schemaDefs = argsToSchemaDefs(['User', 'link:ID']);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          name: 'link',
          type: 'ID',
          jsType: 'ObjectId',
          graphQLType: 'ID',
          isArray: false,
          primitive: true,
          modifiers: {},
          foreignKey: undefined,
          foreignKeyIsArray: undefined
        }
      ]
    });
  });

  it('set correct types for user input ObjectId', () => {
    const schemaDefs = argsToSchemaDefs(['User', 'link:ObjectId']);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          name: 'link',
          type: 'ObjectId',
          jsType: 'ObjectId',
          graphQLType: 'ID',
          isArray: false,
          primitive: true,
          modifiers: {},
          foreignKey: undefined,
          foreignKeyIsArray: undefined
        }
      ]
    });
  });

  it('handles nesting structure', () => {
    const schemaDefs = argsToSchemaDefs([
      'User',
      'settings:{',
      'sms:Boolean!:true',
      'email:Boolean!:true',
      '}',
      'name:String'
    ]);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          name: 'settings',
          isObject: true,
          isArray: false,
          fields: [
            {
              name: 'sms',
              type: 'Boolean',
              jsType: 'Boolean',
              graphQLType: 'Boolean',
              isArray: false,
              primitive: true,
              modifiers: {
                required: true,
                default: true
              },
              foreignKey: undefined,
              foreignKeyIsArray: undefined
            },
            {
              name: 'email',
              type: 'Boolean',
              jsType: 'Boolean',
              graphQLType: 'Boolean',
              isArray: false,
              primitive: true,
              modifiers: {
                required: true,
                default: true
              },
              foreignKey: undefined,
              foreignKeyIsArray: undefined
            }
          ]
        },
        {
          name: 'name',
          type: 'String',
          jsType: 'String',
          graphQLType: 'String',
          isArray: false,
          primitive: true,
          modifiers: {},
          foreignKey: undefined,
          foreignKeyIsArray: undefined
        }
      ]
    });
  });

  it('handles nesting array structure', () => {
    const schemaDefs = argsToSchemaDefs([
      'User',
      'settings:[{',
      'sms:Boolean!:true',
      'email:Boolean!:true',
      '}]',
      'name:String'
    ]);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          name: 'settings',
          isObject: true,
          isArray: true,
          fields: [
            {
              name: 'sms',
              type: 'Boolean',
              jsType: 'Boolean',
              graphQLType: 'Boolean',
              isArray: false,
              primitive: true,
              modifiers: {
                required: true,
                default: true
              },
              foreignKey: undefined,
              foreignKeyIsArray: undefined
            },
            {
              name: 'email',
              type: 'Boolean',
              jsType: 'Boolean',
              graphQLType: 'Boolean',
              isArray: false,
              primitive: true,
              modifiers: {
                required: true,
                default: true
              },
              foreignKey: undefined,
              foreignKeyIsArray: undefined
            }
          ]
        },
        {
          name: 'name',
          type: 'String',
          jsType: 'String',
          graphQLType: 'String',
          isArray: false,
          primitive: true,
          modifiers: {},
          foreignKey: undefined,
          foreignKeyIsArray: undefined
        }
      ]
    });
  });

  it('handles deep nesting structure', () => {
    const schemaDefs = argsToSchemaDefs([
      'User',
      'age:Int',
      'settings:[{',
      'sms:Boolean!:true',
      'email:Boolean!:true',
      'pn:{',
      'ipad:Boolean!:true',
      'iphone:Boolean!:true',
      '}',
      'webSocket:Boolean!:true',
      '}]',
      'name:String'
    ]);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
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
          name: 'settings',
          isObject: true,
          isArray: true,
          fields: [
            {
              name: 'sms',
              type: 'Boolean',
              jsType: 'Boolean',
              graphQLType: 'Boolean',
              isArray: false,
              primitive: true,
              modifiers: {
                required: true,
                default: true
              },
              foreignKey: undefined,
              foreignKeyIsArray: undefined
            },
            {
              name: 'email',
              type: 'Boolean',
              jsType: 'Boolean',
              graphQLType: 'Boolean',
              isArray: false,
              primitive: true,
              modifiers: {
                required: true,
                default: true
              },
              foreignKey: undefined,
              foreignKeyIsArray: undefined
            },
            {
              name: 'pn',
              isObject: true,
              isArray: false,
              fields: [
                {
                  name: 'ipad',
                  type: 'Boolean',
                  jsType: 'Boolean',
                  graphQLType: 'Boolean',
                  isArray: false,
                  primitive: true,
                  modifiers: {
                    required: true,
                    default: true
                  },
                  foreignKey: undefined,
                  foreignKeyIsArray: undefined
                },
                {
                  name: 'iphone',
                  type: 'Boolean',
                  jsType: 'Boolean',
                  graphQLType: 'Boolean',
                  isArray: false,
                  primitive: true,
                  modifiers: {
                    required: true,
                    default: true
                  },
                  foreignKey: undefined,
                  foreignKeyIsArray: undefined
                }
              ]
            },
            {
              name: 'webSocket',
              type: 'Boolean',
              jsType: 'Boolean',
              graphQLType: 'Boolean',
              isArray: false,
              primitive: true,
              modifiers: {
                required: true,
                default: true
              },
              foreignKey: undefined,
              foreignKeyIsArray: undefined
            }
          ]
        },
        {
          name: 'name',
          type: 'String',
          jsType: 'String',
          graphQLType: 'String',
          isArray: false,
          primitive: true,
          modifiers: {},
          foreignKey: undefined,
          foreignKeyIsArray: undefined
        }
      ]
    });
  });

  it('handles enum', () => {
    const schemaDefs = argsToSchemaDefs(['User', 'gender:Enum{male,female}!']);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          name: 'gender',
          type: 'UserGender',
          jsType: 'String',
          graphQLType: 'UserGender',
          isArray: false,
          primitive: true,
          modifiers: {
            enum: ["'male'", "'female'"],
            required: true
          },
          foreignKey: undefined,
          foreignKeyIsArray: undefined
        }
      ]
    });
  });

  it('handles special chars in enum', () => {
    const schemaDefs = argsToSchemaDefs([
      'User',
      'level:Enum{A+,A,A-,B+,B,B-}!'
    ]);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          name: 'level',
          type: 'UserLevel',
          jsType: 'String',
          graphQLType: 'UserLevel',
          isArray: false,
          primitive: true,
          modifiers: {
            enum: ["'A+'", "'A'", "'A-'", "'B+'", "'B'", "'B-'"],
            required: true
          },
          foreignKey: undefined,
          foreignKeyIsArray: undefined
        }
      ]
    });
  });

  it('handles enum in nested structure', () => {
    const schemaDefs = argsToSchemaDefs([
      'User',
      'info:{',
      'gender:Enum{male,female}!'
    ]);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          name: 'info',
          isObject: true,
          isArray: false,
          fields: [
            {
              name: 'gender',
              type: 'UserInfoGender',
              jsType: 'String',
              graphQLType: 'UserInfoGender',
              isArray: false,
              primitive: true,
              modifiers: {
                enum: ["'male'", "'female'"],
                required: true
              },
              foreignKey: undefined,
              foreignKeyIsArray: undefined
            }
          ]
        }
      ]
    });
  });

  it('handles enum in nested array structure', () => {
    const schemaDefs = argsToSchemaDefs([
      'Building',
      'users:[{',
      'gender:Enum{male,female}!'
    ]);
    assert.deepEqual(schemaDefs, {
      modelName: 'Building',
      collectionName: 'buildings',
      varName: 'building',
      pluralVarName: 'buildings',
      fields: [
        {
          name: 'users',
          isObject: true,
          isArray: true,
          fields: [
            {
              name: 'gender',
              type: 'BuildingUserGender',
              jsType: 'String',
              graphQLType: 'BuildingUserGender',
              isArray: false,
              primitive: true,
              modifiers: {
                enum: ["'male'", "'female'"],
                required: true
              },
              foreignKey: undefined,
              foreignKeyIsArray: undefined
            }
          ]
        }
      ]
    });
  });
});
