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
});
