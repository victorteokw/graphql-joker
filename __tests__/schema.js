const path = require('path');
const fs = require('fs');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('yo amur:schema', () => {

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
});
