const path = require('path');
const fs = require('fs');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('yo amur:resource', () => {
  describe('supports string type', () => {
    const dir = path.join(__dirname, 'expected/string');
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/resource'))
        .withArguments(['User', 'name:String']);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assert.fileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assert.fileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assert.fileContent('resolvers/User.js', c);
    });
  });
  describe('supports array of strings', () => {
    const dir = path.join(__dirname, 'expected/array-of-string');
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/resource'))
        .withArguments(['User', 'names:[String]']);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assert.fileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assert.fileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assert.fileContent('resolvers/User.js', c);
    });
  });
  describe('supports int type and change int to number in mongoose schema', () => {
    const dir = path.join(__dirname, 'expected/int');
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/resource'))
        .withArguments(['User', 'age:Int']);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assert.fileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assert.fileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assert.fileContent('resolvers/User.js', c);
    });
  });
  describe('supports float type and change float to number in mongoose schema', () => {
    const dir = path.join(__dirname, 'expected/float');
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/resource'))
        .withArguments(['User', 'rate:Float']);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assert.fileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assert.fileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assert.fileContent('resolvers/User.js', c);
    });
  });
  describe('supports number type and change number to int in graphql schema', () => {
    const dir = path.join(__dirname, 'expected/int');
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/resource'))
        .withArguments(['User', 'age:Number']);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assert.fileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assert.fileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assert.fileContent('resolvers/User.js', c);
    });
  });
  describe('supports boolean type', () => {
    const dir = path.join(__dirname, 'expected/boolean');
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/resource'))
        .withArguments(['User', 'good:Boolean']);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assert.fileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assert.fileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assert.fileContent('resolvers/User.js', c);
    });
  });
  describe('supports reference type', () => {
    const dir = path.join(__dirname, 'expected/ref');
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/resource'))
        .withArguments(['User', 'records:[Record]']);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assert.fileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assert.fileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assert.fileContent('resolvers/User.js', c);
    });
  });
  describe('supports reference type with foreign key', () => {
    const dir = path.join(__dirname, 'expected/ref-with-foreign-key');
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/resource'))
        .withArguments(['User', 'records:[Record]:owner']);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assert.fileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assert.fileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assert.fileContent('resolvers/User.js', c);
    });
  });
  describe('supports custom collection name', () => {
    const dir = path.join(__dirname, 'expected/custom-collection-name');
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/resource'))
        .withArguments(['User/people', 'name:String']);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assert.fileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assert.fileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assert.fileContent('resolvers/User.js', c);
    });
  });
  describe('supports multiple arguments', () => {
    const dir = path.join(__dirname, 'expected/multiple-args');
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/resource'))
        .withArguments(['User', 'name:String', 'age:Int', 'popularity:Float']);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assert.fileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assert.fileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assert.fileContent('resolvers/User.js', c);
    });
  });
  describe('supports index unique required', () => {
    const dir = path.join(__dirname, 'expected/index-unique-required');
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/resource'))
        .withArguments(['Article/articles', 'title:String!$', 'content:String!', 'keyName:String!^$']);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/Article.js')).toString();
      assert.fileContent('models/Article.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/Article.gql')).toString();
      assert.fileContent('schemas/Article.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/Article.js')).toString();
      assert.fileContent('resolvers/Article.js', c);
    });
  });
  describe('supports default values', () => {
    const dir = path.join(__dirname, 'expected/default-values');
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/resource'))
        .withArguments(['User', 'name:String!^$:Untitled', 'disabled:Boolean!:false', 'age:Int!:18', 'posts:[Post]:user']);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assert.fileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assert.fileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assert.fileContent('resolvers/User.js', c);
    });
  });
  describe('supports dynamic default values', () => {
    const dir = path.join(__dirname, 'expected/dynamic-default');
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/resource'))
        .withArguments(['Meeting', 'startedAt:Date!:`new Date()`']);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/Meeting.js')).toString();
      assert.fileContent('models/Meeting.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/Meeting.gql')).toString();
      assert.fileContent('schemas/Meeting.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/Meeting.js')).toString();
      assert.fileContent('resolvers/Meeting.js', c);
    });
  });
  describe('supports string match', () => {
    const dir = path.join(__dirname, 'expected/string-match');
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/resource'))
        .withArguments(['User', 'email:String/^\\w+@\\w+\\.\\w+$/g!']);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assert.fileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assert.fileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assert.fileContent('resolvers/User.js', c);
    });
  });

  describe('supports number min max', () => {
    const dir = path.join(__dirname, 'expected/number-min-and-max');
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/resource'))
        .withArguments(['Result', 'score:Float<=100.0>=0.5', 'hexKey:Int<=0xabcd>=0x1234' ]);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/Result.js')).toString();
      assert.fileContent('models/Result.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/Result.gql')).toString();
      assert.fileContent('schemas/Result.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/Result.js')).toString();
      assert.fileContent('resolvers/Result.js', c);
    });
  });

  describe('supports string minlength maxlength', () => {
    const dir = path.join(__dirname, 'expected/string-minlength-and-maxlength');
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/resource'))
        .withArguments(['User', 'name:String<=30>=2']);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assert.fileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assert.fileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assert.fileContent('resolvers/User.js', c);
    });
  });

  describe('auto supports sparse index when unique and not required', () => {
    const dir = path.join(__dirname, 'expected/sparse-index');
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/resource'))
        .withArguments(['User', 'name:String$']);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assert.fileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assert.fileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assert.fileContent('resolvers/User.js', c);
    });
  });

  describe('supports nested model without refs', () => {
    const dir = path.join(__dirname, 'expected/nested-model');
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/resource'))
        .withArguments("User name:String settings:{ sms:Boolean email:Boolean \
push:{ first:Boolean second:Boolean } } age:Int address:{ city:String \
province:String Region:String address:{ one:String two:String } }".split(' '));
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assert.fileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assert.fileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assert.fileContent('resolvers/User.js', c);
    });
  });

  describe('supports nested array model without refs', () => {
    const dir = path.join(__dirname, 'expected/nested-model-array');
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/resource'))
        .withArguments("User age:String roles:[{ name:String \
permissions:[String] }] name:String".split(' '));
    });

    it('create correct model file with special singular names', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assert.fileContent('models/User.js', c);
    });

    it('create correct schema file with special singular names', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assert.fileContent('schemas/User.gql', c);
    });

    it('create correct resolver file with special singular names', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assert.fileContent('resolvers/User.js', c);
    });
  });

  describe('supports deep nested array model without refs', () => {
    const dir = path.join(__dirname, 'expected/deep-nested-array-model');
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/resource'))
        .withArguments("Product names:[{ langCode:String!:cn name:String! \
}] description:String! solds:Int comments:[{ title:String addresses:[{ \
region:String! country:String! }] }]".split(' '));
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/Product.js')).toString();
      assert.fileContent('models/Product.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/Product.gql')).toString();
      assert.fileContent('schemas/Product.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/Product.js')).toString();
      assert.fileContent('resolvers/Product.js', c);
    });
  });
});
