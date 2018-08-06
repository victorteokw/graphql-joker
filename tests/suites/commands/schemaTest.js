const path = require('path');
const fs = require('fs-extra');
const assert = require('assert');
const runGenerator = require('../../setup/runGenerator');
const runGenerators = require('../../setup/runGenerators');
const fileContent = require('../../assertions/fileContent');

describe('amur schema', () => {
  describe('simple schema', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/simple-schema');
    beforeAll(() => {
      destDir = runGenerator('schema', [
        'Address',
        'region:String',
        'line1:String',
        'line2:String',
        'country:String'
      ]);
      assertFileContent = fileContent(destDir);
    });

    afterAll(() => {
      fs.removeSync(destDir);
    });

    it('create correct mongoose schema file', () => {
      const c = fs
        .readFileSync(path.join(dir, 'models/addressSchema.js'))
        .toString();
      assertFileContent('models/addressSchema.js', c);
    });

    it('create correct graphQL schema file', () => {
      const c = fs
        .readFileSync(path.join(dir, 'schemas/Address.gql'))
        .toString();
      assertFileContent('schemas/Address.gql', c);
    });

    it("doesn't create resolver file because it's not needed", () => {
      assert(!fs.existsSync(path.join(destDir, 'resolvers/Address.js')));
    });
  });

  describe('nested schema', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/nested-schema');
    beforeAll(() => {
      destDir = runGenerator('schema', [
        'Address',
        'country:String',
        'region:String',
        'line:{',
        'one:String!',
        'two:String',
        '}',
        'city:String!',
        'postalCode:String'
      ]);
      assertFileContent = fileContent(destDir);
    });

    afterAll(() => {
      fs.removeSync(destDir);
    });

    it('create correct mongoose schema file', () => {
      const c = fs
        .readFileSync(path.join(dir, 'models/addressSchema.js'))
        .toString();
      assertFileContent('models/addressSchema.js', c);
    });

    it('create correct graphQL schema file', () => {
      const c = fs
        .readFileSync(path.join(dir, 'schemas/Address.gql'))
        .toString();
      assertFileContent('schemas/Address.gql', c);
    });

    it("doesn't create resolver file because it's not needed", () => {
      assert(!fs.existsSync(path.join(destDir, 'resolvers/Address.js')));
    });
  });

  describe('schema with references', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/schema-with-refs');
    beforeAll(() => {
      destDir = runGenerator('schema', [
        'Post',
        'comments:[Comment]',
        'author:Author',
        'title:String',
        'content:String',
        'subtitle:String'
      ]);
      assertFileContent = fileContent(destDir);
    });

    afterAll(() => {
      fs.removeSync(destDir);
    });

    it('create correct mongoose schema file', () => {
      const c = fs
        .readFileSync(path.join(dir, 'models/postSchema.js'))
        .toString();
      assertFileContent('models/postSchema.js', c);
    });

    it('create correct graphQL schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/Post.gql')).toString();
      assertFileContent('schemas/Post.gql', c);
    });

    it('create correct graphQL resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/Post.js')).toString();
      assertFileContent('resolvers/Post.js', c);
    });
  });

  describe('schema with enum', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/enum-in-schema');
    beforeAll(() => {
      destDir = runGenerator('schema', ['Address', 'country:Enum{China,US}']);
      assertFileContent = fileContent(destDir);
    });

    afterAll(() => {
      fs.removeSync(destDir);
    });

    it('create correct mongoose schema file', () => {
      const c = fs
        .readFileSync(path.join(dir, 'models/addressSchema.js'))
        .toString();
      assertFileContent('models/addressSchema.js', c);
    });

    it('create correct graphQL schema file', () => {
      const c = fs
        .readFileSync(path.join(dir, 'schemas/Address.gql'))
        .toString();
      assertFileContent('schemas/Address.gql', c);
    });

    it("doesn't create resolver file because it's not needed", () => {
      assert(!fs.existsSync(path.join(destDir, 'resolvers/Address.js')));
    });
  });

  describe('schema with schema reference', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/referencing-schema-in-schema');
    beforeAll(() => {
      destDir = runGenerator('schema', [
        'Person',
        'address:addressSchema',
        'name:String'
      ]);
      assertFileContent = fileContent(destDir);
    });

    afterAll(() => {
      fs.removeSync(destDir);
    });

    it('create correct mongoose schema file', () => {
      const c = fs
        .readFileSync(path.join(dir, 'models/personSchema.js'))
        .toString();
      assertFileContent('models/personSchema.js', c);
    });

    it('create correct graphQL schema file', () => {
      const c = fs
        .readFileSync(path.join(dir, 'schemas/Person.gql'))
        .toString();
      assertFileContent('schemas/Person.gql', c);
    });

    it("doesn't create resolver file because it's not needed", () => {
      assert(!fs.existsSync(path.join(destDir, 'resolvers/Person.js')));
    });
  });

  describe('command line option behaviors', () => {
    describe('removes generated files with --destory', () => {
      let destDir, assertFileContent;
      const dir = path.join(__dirname, 'expected/destroy-schema');
      beforeAll(() => {
        destDir = runGenerators([
          ['schema', ['User', 'name:String']],
          ['schema', ['Post', 'title:String']],
          ['schema', ['User'], { destroy: true }]
        ]);
        assertFileContent = fileContent(destDir);
      });

      afterAll(() => {
        fs.removeSync(destDir);
      });

      it('removes correct model file', () => {
        assert(!fs.existsSync(path.join(destDir, 'models/userSchema.js')));
      });

      it('keeps unrelated model file', () => {
        const c = fs.readFileSync(path.join(dir, 'models/postSchema.js')).toString();
        assertFileContent('models/postSchema.js', c);
      });
    });
  });
});
