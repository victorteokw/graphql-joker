const path = require('path');
const fs = require('fs');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('amur schema', () => {

  describe('simple schema', () => {
    const dir = path.join(__dirname, 'expected/simple-schema');
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/schema'))
        .withArguments(['Address', 'region:String', 'line1:String', 'line2:String', 'country:String']);
    });
    it('create correct mongoose schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/addressSchema.js')).toString();
      assert.fileContent('models/addressSchema.js', c);
    });

    it('create correct graphQL schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/Address.gql')).toString();
      assert.fileContent('schemas/Address.gql', c);
    });

    it('doesn\'t create resolver file because it\'s not needed', () => {
      assert.noFile('resolvers/Address.js');
    });
  });

  describe('nested schema', () => {
    const dir = path.join(__dirname, 'expected/nested-schema');
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/schema'))
        .withArguments(['Address', 'country:String', 'region:String', 'line:{',
          'one:String!', 'two:String', '}', 'city:String!',
          'postalCode:String']);
    });
    it('create correct mongoose schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/addressSchema.js')).toString();
      assert.fileContent('models/addressSchema.js', c);
    });

    it('create correct graphQL schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/Address.gql')).toString();
      assert.fileContent('schemas/Address.gql', c);
    });

    it('doesn\'t create resolver file because it\'s not needed', () => {
      assert.noFile('resolvers/Address.js');
    });
  });

  describe('schema with references', () => {
    const dir = path.join(__dirname, 'expected/schema-with-refs');
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/schema'))
        .withArguments(['Post', 'comments:[Comment]', 'author:Author',
          'title:String', 'content:String', 'subtitle:String']);
    });
    it('create correct mongoose schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/postSchema.js')).toString();
      assert.fileContent('models/postSchema.js', c);
    });

    it('create correct graphQL schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/Post.gql')).toString();
      assert.fileContent('schemas/Post.gql', c);
    });

    it('create correct graphQL resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/Post.js')).toString();
      assert.fileContent('resolvers/Post.js', c);
    });
  });
});
