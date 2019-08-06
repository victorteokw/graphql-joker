import parseSDL from '../../../src/utils/graphql/parseSDL';
import assert = require('assert');

const ormSetting = {
  graphQLTypeFromORMType: (type: string): string => {
    switch (type) {
      case 'String':
        return 'String';
      case 'Boolean':
        return 'Boolean';
      case 'Number':
        return 'Int';
      case 'ObjectId':
        return 'ID';
      case 'Date':
        return 'Date';
      case 'Mixed':
        return 'Mixed';
    }
    return '';
  },
  ormTypeFromGraphQLType: (type: string): string => {
    switch (type) {
      case 'String':
        return 'String';
      case 'Boolean':
        return 'Boolean';
      case 'Float':
        return 'Number';
      case 'Int':
        return 'Number';
      case 'ID':
        return 'ObjectId';
      case 'Date':
        return 'Date';
      case 'Mixed':
        return 'Mixed';
    }
    return '';
  },
  supportedPrimitiveTypes: [
    'String',
    'Boolean',
    'Number',
    'ObjectId',
    'Date',
    'Mixed'
  ]
};

describe('model descriptor', () => {
  it('creates correct descriptor', () => {
    const schemaDefs = parseSDL([
      'User',
      'name:String',
      'age:Int',
      'disabled:Boolean:false'
    ], ormSetting);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          name: 'name',
          isEnum: false,
          isFile: false,
          jsType: 'String',
          graphQLType: 'String',
          isArray: false,
          primitive: true,
          reference: false,
          modifiers: {}
        },
        {
          name: 'age',
          isEnum: false,
          isFile: false,
          jsType: 'Number',
          graphQLType: 'Int',
          isArray: false,
          primitive: true,
          reference: false,
          modifiers: {}
        },
        {
          name: 'disabled',
          isEnum: false,
          isFile: false,
          jsType: 'Boolean',
          graphQLType: 'Boolean',
          isArray: false,
          primitive: true,
          reference: false,
          modifiers: {
            default: false
          }
        }
      ]
    });
  });

  it('handles plural model names', () => {
    const schemaDefs = parseSDL([
      'Quiz',
      'content:String!',
      'answer:String!'
    ], ormSetting);
    assert.deepEqual(schemaDefs, {
      modelName: 'Quiz',
      collectionName: 'quizzes',
      varName: 'quiz',
      pluralVarName: 'quizzes',
      fields: [
        {
          name: 'content',
          isEnum: false,
          isFile: false,
          jsType: 'String',
          graphQLType: 'String',
          isArray: false,
          primitive: true,
          reference: false,
          modifiers: {
            required: true
          }
        },
        {
          name: 'answer',
          isEnum: false,
          isFile: false,
          jsType: 'String',
          graphQLType: 'String',
          isArray: false,
          primitive: true,
          reference: false,
          modifiers: {
            required: true
          }
        }
      ]
    });
  });

  it('handles uncountable model names', () => {
    const schemaDefs = parseSDL(['Fish', 'name:String'], ormSetting);
    assert.deepEqual(schemaDefs, {
      modelName: 'Fish',
      collectionName: 'fish',
      varName: 'fish',
      pluralVarName: 'allFish',
      fields: [
        {
          name: 'name',
          isEnum: false,
          isFile: false,
          jsType: 'String',
          graphQLType: 'String',
          isArray: false,
          primitive: true,
          reference: false,
          modifiers: {}
        }
      ]
    });
  });

  it('handles references', () => {
    const schemaDefs = parseSDL([
      'User',
      'name:String!',
      'posts:[Post]'
    ], ormSetting);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          name: 'name',
          isEnum: false,
          isFile: false,
          jsType: 'String',
          graphQLType: 'String',
          isArray: false,
          primitive: true,
          reference: false,
          modifiers: {
            required: true
          }
        },
        {
          name: 'posts',
          isEnum: false,
          isFile: false,
          jsType: 'Post',
          graphQLType: 'Post',
          isArray: true,
          primitive: false,
          reference: true,
          modifiers: {}
        }
      ]
    });
  });

  it('handles arrays', () => {
    const schemaDefs = parseSDL([
      'User',
      'name:[String]!^$:No Name',
      'posts:[Post]'
    ], ormSetting);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          name: 'name',
          isEnum: false,
          isFile: false,
          jsType: 'String',
          graphQLType: 'String',
          isArray: true,
          primitive: true,
          reference: false,
          modifiers: {
            required: true,
            index: true,
            unique: true,
            default: "'No Name'"
          }
        },
        {
          name: 'posts',
          isEnum: false,
          isFile: false,
          jsType: 'Post',
          graphQLType: 'Post',
          isArray: true,
          primitive: false,
          reference: true,
          modifiers: {}
        }
      ]
    });
  });

  it('handle foreign keys', () => {
    const schemaDefs = parseSDL(['User', 'posts:[Post]:author'], ormSetting);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          name: 'posts',
          isEnum: false,
          isFile: false,
          jsType: 'Post',
          graphQLType: 'Post',
          isArray: true,
          primitive: false,
          reference: true,
          modifiers: {},
          foreignKey: 'author',
          foreignKeyIsArray: false
        }
      ]
    });
  });

  it('handle default value', () => {
    const schemaDefs = parseSDL(['User', 'age:Number:18'], ormSetting);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          name: 'age',
          isEnum: false,
          isFile: false,
          jsType: 'Number',
          graphQLType: 'Int',
          isArray: false,
          primitive: true,
          reference: false,
          modifiers: {
            default: 18
          }
        }
      ]
    });
  });

  it('handle index modifier', () => {
    const schemaDefs = parseSDL(['User', 'name:String^'], ormSetting);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          name: 'name',
          isEnum: false,
          isFile: false,
          jsType: 'String',
          graphQLType: 'String',
          isArray: false,
          primitive: true,
          reference: false,
          modifiers: {
            index: true
          }
        }
      ]
    });
  });

  it('handle required modifier', () => {
    const schemaDefs = parseSDL(['User', 'name:String!'], ormSetting);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          name: 'name',
          isEnum: false,
          isFile: false,
          jsType: 'String',
          graphQLType: 'String',
          isArray: false,
          primitive: true,
          reference: false,
          modifiers: {
            required: true
          }
        }
      ]
    });
  });

  it('handle unique modifier', () => {
    const schemaDefs = parseSDL(['User', 'name:String$'], ormSetting);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          name: 'name',
          isEnum: false,
          isFile: false,
          jsType: 'String',
          graphQLType: 'String',
          isArray: false,
          primitive: true,
          reference: false,
          modifiers: {
            unique: true,
            sparse: true
          }
        }
      ]
    });
  });

  it('handle combined modifiers', () => {
    const schemaDefs = parseSDL(['User', 'name:String$^!'], ormSetting);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          name: 'name',
          isEnum: false,
          isFile: false,
          jsType: 'String',
          graphQLType: 'String',
          isArray: false,
          primitive: true,
          reference: false,
          modifiers: {
            required: true,
            index: true,
            unique: true
          }
        }
      ]
    });
  });

  it('handle string match modifiers', () => {
    const schemaDefs = parseSDL(['User', 'name:String/\\w+/'], ormSetting);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          name: 'name',
          isEnum: false,
          isFile: false,
          jsType: 'String',
          graphQLType: 'String',
          isArray: false,
          primitive: true,
          reference: false,
          modifiers: {
            match: '/\\w+/'
          }
        }
      ]
    });
  });

  it('string match modifiers should come before other modifiers', () => {
    const schemaDefs = parseSDL(['User', 'name:String/\\w+/!^$'], ormSetting);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          name: 'name',
          isEnum: false,
          isFile: false,
          jsType: 'String',
          graphQLType: 'String',
          isArray: false,
          primitive: true,
          reference: false,
          modifiers: {
            match: '/\\w+/',
            required: true,
            index: true,
            unique: true
          }
        }
      ]
    });
  });

  it('set correct types for user input Number', () => {
    const schemaDefs = parseSDL(['User', 'age:Number'], ormSetting);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          name: 'age',
          isEnum: false,
          isFile: false,
          jsType: 'Number',
          graphQLType: 'Int',
          isArray: false,
          primitive: true,
          reference: false,
          modifiers: {}
        }
      ]
    });
  });

  it('set correct types for user input Int', () => {
    const schemaDefs = parseSDL(['User', 'age:Int'], ormSetting);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          name: 'age',
          isEnum: false,
          isFile: false,
          jsType: 'Number',
          graphQLType: 'Int',
          isArray: false,
          primitive: true,
          reference: false,
          modifiers: {}
        }
      ]
    });
  });

  it('set correct types for user input Float', () => {
    const schemaDefs = parseSDL(['User', 'rate:Float'], ormSetting);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          name: 'rate',
          isEnum: false,
          isFile: false,
          jsType: 'Number',
          graphQLType: 'Float',
          isArray: false,
          primitive: true,
          reference: false,
          modifiers: {}
        }
      ]
    });
  });

  it('set correct types for user input ID', () => {
    const schemaDefs = parseSDL(['User', 'link:ID'], ormSetting);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          name: 'link',
          isEnum: false,
          isFile: false,
          jsType: 'ObjectId',
          graphQLType: 'ID',
          isArray: false,
          primitive: true,
          reference: false,
          modifiers: {}
        }
      ]
    });
  });

  it('set correct types for user input ObjectId', () => {
    const schemaDefs = parseSDL(['User', 'link:ObjectId'], ormSetting);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          name: 'link',
          isEnum: false,
          isFile: false,
          jsType: 'ObjectId',
          graphQLType: 'ID',
          isArray: false,
          primitive: true,
          reference: false,
          modifiers: {}
        }
      ]
    });
  });

  it('handles nesting structure', () => {
    const schemaDefs = parseSDL([
      'User',
      'settings:{',
      'sms:Boolean!:true',
      'email:Boolean!:true',
      '}',
      'name:String'
    ], ormSetting);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          name: 'settings',
          isEnum: false,
          isFile: false,
          isObject: true,
          isArray: false,
          fields: [
            {
              name: 'sms',
              isEnum: false,
              isFile: false,
              jsType: 'Boolean',
              graphQLType: 'Boolean',
              isArray: false,
              primitive: true,
              reference: false,
              modifiers: {
                required: true,
                default: true
              }
            },
            {
              name: 'email',
              isEnum: false,
              isFile: false,
              jsType: 'Boolean',
              graphQLType: 'Boolean',
              isArray: false,
              primitive: true,
              reference: false,
              modifiers: {
                required: true,
                default: true
              }
            }
          ]
        },
        {
          name: 'name',
          isEnum: false,
          isFile: false,
          jsType: 'String',
          graphQLType: 'String',
          isArray: false,
          primitive: true,
          reference: false,
          modifiers: {}
        }
      ]
    });
  });

  it('handles nesting array structure', () => {
    const schemaDefs = parseSDL([
      'User',
      'settings:[{',
      'sms:Boolean!:true',
      'email:Boolean!:true',
      '}]',
      'name:String'
    ], ormSetting);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          name: 'settings',
          isEnum: false,
          isFile: false,
          isObject: true,
          isArray: true,
          fields: [
            {
              name: 'sms',
              isEnum: false,
              isFile: false,
              jsType: 'Boolean',
              graphQLType: 'Boolean',
              isArray: false,
              primitive: true,
              reference: false,
              modifiers: {
                required: true,
                default: true
              }
            },
            {
              name: 'email',
              isEnum: false,
              isFile: false,
              jsType: 'Boolean',
              graphQLType: 'Boolean',
              isArray: false,
              primitive: true,
              reference: false,
              modifiers: {
                required: true,
                default: true
              }
            }
          ]
        },
        {
          name: 'name',
          isEnum: false,
          isFile: false,
          jsType: 'String',
          graphQLType: 'String',
          isArray: false,
          primitive: true,
          reference: false,
          modifiers: {}
        }
      ]
    });
  });

  it('handles deep nesting structure', () => {
    const schemaDefs = parseSDL([
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
    ], ormSetting);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          name: 'age',
          isEnum: false,
          isFile: false,
          jsType: 'Number',
          graphQLType: 'Int',
          isArray: false,
          primitive: true,
          reference: false,
          modifiers: {}
        },
        {
          name: 'settings',
          isEnum: false,
          isFile: false,
          isObject: true,
          isArray: true,
          fields: [
            {
              name: 'sms',
              isEnum: false,
              isFile: false,
              jsType: 'Boolean',
              graphQLType: 'Boolean',
              isArray: false,
              primitive: true,
              reference: false,
              modifiers: {
                required: true,
                default: true
              }
            },
            {
              name: 'email',
              isEnum: false,
              isFile: false,
              jsType: 'Boolean',
              graphQLType: 'Boolean',
              isArray: false,
              primitive: true,
              reference: false,
              modifiers: {
                required: true,
                default: true
              }
            },
            {
              name: 'pn',
              isEnum: false,
              isFile: false,
              isObject: true,
              isArray: false,
              fields: [
                {
                  name: 'ipad',
                  isEnum: false,
                  isFile: false,
                  jsType: 'Boolean',
                  graphQLType: 'Boolean',
                  isArray: false,
                  primitive: true,
                  reference: false,
                  modifiers: {
                    required: true,
                    default: true
                  }
                },
                {
                  name: 'iphone',
                  isEnum: false,
                  isFile: false,
                  jsType: 'Boolean',
                  graphQLType: 'Boolean',
                  isArray: false,
                  primitive: true,
                  reference: false,
                  modifiers: {
                    required: true,
                    default: true
                  }
                }
              ]
            },
            {
              name: 'webSocket',
              isEnum: false,
              isFile: false,
              jsType: 'Boolean',
              graphQLType: 'Boolean',
              isArray: false,
              primitive: true,
              reference: false,
              modifiers: {
                required: true,
                default: true
              }
            }
          ]
        },
        {
          name: 'name',
          isEnum: false,
          isFile: false,
          jsType: 'String',
          graphQLType: 'String',
          isArray: false,
          primitive: true,
          reference: false,
          modifiers: {}
        }
      ]
    });
  });

  it('handles enum', () => {
    const schemaDefs = parseSDL(['User', 'gender:Enum(male,female)!'], ormSetting);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          name: 'gender',
          isEnum: true,
          isFile: false,
          jsType: 'String',
          graphQLType: 'UserGender',
          'jsTypeArg': 'male,female',
          isArray: false,
          primitive: true,
          reference: false,
          modifiers: {
            enum: ["'male'", "'female'"],
            required: true
          }
        }
      ]
    });
  });

  it('handles special chars in enum', () => {
    const schemaDefs = parseSDL([
      'User',
      'level:Enum(A+,A,A-,B+,B,B-)!'
    ], ormSetting);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          name: 'level',
          isEnum: true,
          isFile: false,
          jsType: 'String',
          'jsTypeArg': 'A+,A,A-,B+,B,B-',
          graphQLType: 'UserLevel',
          isArray: false,
          primitive: true,
          reference: false,
          modifiers: {
            enum: ["'A+'", "'A'", "'A-'", "'B+'", "'B'", "'B-'"],
            required: true
          }
        }
      ]
    });
  });

  it('handles enum in nested structure', () => {
    const schemaDefs = parseSDL([
      'User',
      'info:{',
      'gender:Enum(male,female)!'
    ], ormSetting);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          name: 'info',
          isEnum: false,
          isFile: false,
          isObject: true,
          isArray: false,
          fields: [
            {
              name: 'gender',
              isEnum: true,
              isFile: false,
              jsType: 'String',
              'jsTypeArg': 'male,female',
              graphQLType: 'UserInfoGender',
              isArray: false,
              primitive: true,
              reference: false,
              modifiers: {
                enum: ["'male'", "'female'"],
                required: true
              }
            }
          ]
        }
      ]
    });
  });

  it('handles enum in nested array structure', () => {
    const schemaDefs = parseSDL([
      'Building',
      'users:[{',
      'gender:Enum(male,female)!'
    ], ormSetting);
    assert.deepEqual(schemaDefs, {
      modelName: 'Building',
      collectionName: 'buildings',
      varName: 'building',
      pluralVarName: 'buildings',
      fields: [
        {
          name: 'users',
          isEnum: false,
          isFile: false,
          isObject: true,
          isArray: true,
          fields: [
            {
              name: 'gender',
              isEnum: true,
              isFile: false,
              jsType: 'String',
              'jsTypeArg': 'male,female',
              graphQLType: 'BuildingUserGender',
              isArray: false,
              primitive: true,
              reference: false,
              modifiers: {
                enum: ["'male'", "'female'"],
                required: true
              }
            }
          ]
        }
      ]
    });
  });

  it('handles file type', () => {
    const schemaDefs = parseSDL([
      'User',
      'name:String',
      'avatar:AvatarUploader'
    ], ormSetting);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          graphQLType: 'String',
          isArray: false,
          jsType: 'String',
          modifiers: {},
          name: 'name',
          isEnum: false,
          isFile: false,
          primitive: true,
          reference: false
        },
        {
          graphQLType: 'File',
          isArray: false,
          jsType: 'File',
          modifiers: {
            uploader: 'AvatarUploader'
          },
          name: 'avatar',
          isEnum: false,
          isFile: true,
          primitive: true,
          reference: false
        }
      ]
    });
  });

  it('handles association tables', () => {
    const schemaDefs = parseSDL([
      'User',
      'courses:[Course]:Favorite.course.user'
    ], ormSetting);
    assert.deepEqual(schemaDefs, {
      modelName: 'User',
      collectionName: 'users',
      varName: 'user',
      pluralVarName: 'users',
      fields: [
        {
          name: 'courses',
          isEnum: false,
          isFile: false,
          jsType: 'Course',
          graphQLType: 'Course',
          isArray: true,
          primitive: false,
          reference: true,
          modifiers: {},
          assocModel: 'Favorite',
          selfKey: 'user',
          destKey: 'course',
          foreignKeyIsArray: false
        }
      ]
    });
  });
});
