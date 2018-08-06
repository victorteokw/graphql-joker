const path = require('path');
const fs = require('fs-extra');
const runGenerator = require('../../setup/runGenerator');
const runGenerators = require('../../setup/runGenerators');
const fileContent = require('../../assertions/fileContent');
const assert = require('assert');

describe('amur resource', () => {
  describe('supports string type', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/string');
    beforeAll(() => {
      destDir = runGenerator('resource', ['User', 'name:String']);
      assertFileContent = fileContent(destDir);
    });

    afterAll(() => {
      fs.removeSync(destDir);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assertFileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assertFileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assertFileContent('resolvers/User.js', c);
    });
  });
  describe('supports array of strings', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/array-of-string');
    beforeAll(() => {
      destDir = runGenerator('resource', ['User', 'names:[String]']);
      assertFileContent = fileContent(destDir);
    });

    afterAll(() => {
      fs.removeSync(destDir);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assertFileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assertFileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assertFileContent('resolvers/User.js', c);
    });
  });
  describe('supports int type and change int to number in mongoose schema', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/int');
    beforeAll(() => {
      destDir = runGenerator('resource', ['User', 'age:Int']);
      assertFileContent = fileContent(destDir);
    });

    afterAll(() => {
      fs.removeSync(destDir);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assertFileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assertFileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assertFileContent('resolvers/User.js', c);
    });
  });
  describe('supports float type and change float to number in mongoose schema', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/float');
    beforeAll(() => {
      destDir = runGenerator('resource', ['User', 'rate:Float']);
      assertFileContent = fileContent(destDir);
    });

    afterAll(() => {
      fs.removeSync(destDir);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assertFileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assertFileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assertFileContent('resolvers/User.js', c);
    });
  });
  describe('supports number type and change number to int in graphql schema', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/int');
    beforeAll(() => {
      destDir = runGenerator('resource', ['User', 'age:Number']);
      assertFileContent = fileContent(destDir);
    });

    afterAll(() => {
      fs.removeSync(destDir);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assertFileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assertFileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assertFileContent('resolvers/User.js', c);
    });
  });
  describe('supports boolean type', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/boolean');
    beforeAll(() => {
      destDir = runGenerator('resource', ['User', 'good:Boolean']);
      assertFileContent = fileContent(destDir);
    });

    afterAll(() => {
      fs.removeSync(destDir);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assertFileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assertFileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assertFileContent('resolvers/User.js', c);
    });
  });
  describe('supports reference type', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/ref');
    beforeAll(() => {
      destDir = runGenerator('resource', ['User', 'records:[Record]']);
      assertFileContent = fileContent(destDir);
    });

    afterAll(() => {
      fs.removeSync(destDir);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assertFileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assertFileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assertFileContent('resolvers/User.js', c);
    });
  });
  describe('supports reference type with foreign key', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/ref-with-foreign-key');
    beforeAll(() => {
      destDir = runGenerator('resource', ['User', 'records:[Record]:owner']);
      assertFileContent = fileContent(destDir);
    });

    afterAll(() => {
      fs.removeSync(destDir);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assertFileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assertFileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assertFileContent('resolvers/User.js', c);
    });
  });
  describe('supports custom collection name', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/custom-collection-name');
    beforeAll(() => {
      destDir = runGenerator('resource', ['User/people', 'name:String']);
      assertFileContent = fileContent(destDir);
    });

    afterAll(() => {
      fs.removeSync(destDir);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assertFileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assertFileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assertFileContent('resolvers/User.js', c);
    });
  });
  describe('supports multiple arguments', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/multiple-args');
    beforeAll(() => {
      destDir = runGenerator('resource', [
        'User',
        'name:String',
        'age:Int',
        'popularity:Float'
      ]);
      assertFileContent = fileContent(destDir);
    });

    afterAll(() => {
      fs.removeSync(destDir);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assertFileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assertFileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assertFileContent('resolvers/User.js', c);
    });
  });
  describe('supports index unique required', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/index-unique-required');
    beforeAll(() => {
      destDir = runGenerator('resource', [
        'Article/articles',
        'title:String!$',
        'content:String!',
        'keyName:String!^$'
      ]);
      assertFileContent = fileContent(destDir);
    });

    afterAll(() => {
      fs.removeSync(destDir);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/Article.js')).toString();
      assertFileContent('models/Article.js', c);
    });

    it('create correct schema file', () => {
      const c = fs
        .readFileSync(path.join(dir, 'schemas/Article.gql'))
        .toString();
      assertFileContent('schemas/Article.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs
        .readFileSync(path.join(dir, 'resolvers/Article.js'))
        .toString();
      assertFileContent('resolvers/Article.js', c);
    });
  });
  describe('supports default values', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/default-values');
    beforeAll(() => {
      destDir = runGenerator('resource', [
        'User',
        'name:String!^$:Untitled',
        'disabled:Boolean!:false',
        'age:Int!:18',
        'posts:[Post]:user'
      ]);
      assertFileContent = fileContent(destDir);
    });

    afterAll(() => {
      fs.removeSync(destDir);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assertFileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assertFileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assertFileContent('resolvers/User.js', c);
    });
  });
  describe('supports dynamic default values', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/dynamic-default');
    beforeAll(() => {
      destDir = runGenerator('resource', [
        'Meeting',
        'startedAt:Date!:`new Date()`'
      ]);
      assertFileContent = fileContent(destDir);
    });

    afterAll(() => {
      fs.removeSync(destDir);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/Meeting.js')).toString();
      assertFileContent('models/Meeting.js', c);
    });

    it('create correct schema file', () => {
      const c = fs
        .readFileSync(path.join(dir, 'schemas/Meeting.gql'))
        .toString();
      assertFileContent('schemas/Meeting.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs
        .readFileSync(path.join(dir, 'resolvers/Meeting.js'))
        .toString();
      assertFileContent('resolvers/Meeting.js', c);
    });
  });
  describe('supports string match', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/string-match');
    beforeAll(() => {
      destDir = runGenerator('resource', [
        'User',
        'email:String/^\\w+@\\w+\\.\\w+$/g!'
      ]);
      assertFileContent = fileContent(destDir);
    });

    afterAll(() => {
      fs.removeSync(destDir);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assertFileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assertFileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assertFileContent('resolvers/User.js', c);
    });
  });

  describe('supports number min max', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/number-min-and-max');
    beforeAll(() => {
      destDir = runGenerator('resource', [
        'Result',
        'score:Float<=100.0>=0.5',
        'hexKey:Int<=0xabcd>=0x1234'
      ]);
      assertFileContent = fileContent(destDir);
    });

    afterAll(() => {
      fs.removeSync(destDir);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/Result.js')).toString();
      assertFileContent('models/Result.js', c);
    });

    it('create correct schema file', () => {
      const c = fs
        .readFileSync(path.join(dir, 'schemas/Result.gql'))
        .toString();
      assertFileContent('schemas/Result.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs
        .readFileSync(path.join(dir, 'resolvers/Result.js'))
        .toString();
      assertFileContent('resolvers/Result.js', c);
    });
  });

  describe('supports string minlength maxlength', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/string-minlength-and-maxlength');
    beforeAll(() => {
      destDir = runGenerator('resource', ['User', 'name:String<=30>=2']);
      assertFileContent = fileContent(destDir);
    });

    afterAll(() => {
      fs.removeSync(destDir);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assertFileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assertFileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assertFileContent('resolvers/User.js', c);
    });
  });

  describe('auto supports sparse index when unique and not required', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/sparse-index');
    beforeAll(() => {
      destDir = runGenerator('resource', ['User', 'name:String$']);
      assertFileContent = fileContent(destDir);
    });

    afterAll(() => {
      fs.removeSync(destDir);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assertFileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assertFileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assertFileContent('resolvers/User.js', c);
    });
  });

  describe('supports nested model without refs', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/nested-model');
    beforeAll(() => {
      destDir = runGenerator(
        'resource',
        'User name:String settings:{ sms:Boolean email:Boolean \
push:{ first:Boolean second:Boolean } } age:Int address:{ city:String \
province:String Region:String address:{ one:String two:String } }'.split(
            ' '
          )
      );
      assertFileContent = fileContent(destDir);
    });

    afterAll(() => {
      fs.removeSync(destDir);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assertFileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assertFileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assertFileContent('resolvers/User.js', c);
    });
  });

  describe('supports nested array model without refs', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/nested-model-array');
    beforeAll(() => {
      destDir = runGenerator(
        'resource',
        'User age:String roles:[{ name:String \
permissions:[String] }] name:String'.split(
            ' '
          )
      );
      assertFileContent = fileContent(destDir);
    });

    afterAll(() => {
      fs.removeSync(destDir);
    });

    it('create correct model file with special singular names', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assertFileContent('models/User.js', c);
    });

    it('create correct schema file with special singular names', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assertFileContent('schemas/User.gql', c);
    });

    it('create correct resolver file with special singular names', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assertFileContent('resolvers/User.js', c);
    });
  });

  describe('supports deep nested array model without refs', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/deep-nested-array-model');
    beforeAll(() => {
      destDir = runGenerator(
        'resource',
        'Product names:[{ langCode:String!:cn name:String! \
}] description:String! solds:Int comments:[{ title:String addresses:[{ \
region:String! country:String! }] }]'.split(
            ' '
          )
      );
      assertFileContent = fileContent(destDir);
    });

    afterAll(() => {
      fs.removeSync(destDir);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/Product.js')).toString();
      assertFileContent('models/Product.js', c);
    });

    it('create correct schema file', () => {
      const c = fs
        .readFileSync(path.join(dir, 'schemas/Product.gql'))
        .toString();
      assertFileContent('schemas/Product.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs
        .readFileSync(path.join(dir, 'resolvers/Product.js'))
        .toString();
      assertFileContent('resolvers/Product.js', c);
    });
  });

  describe('supports nested model with refs', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/nested-refs');
    beforeAll(() => {
      destDir = runGenerator(
        'resource',
        'User article:{ post:Post comments:[Comment] }'.split(' ')
      );
      assertFileContent = fileContent(destDir);
    });

    afterAll(() => {
      fs.removeSync(destDir);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assertFileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assertFileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assertFileContent('resolvers/User.js', c);
    });
  });

  describe('nested model refs has correct order in resolver files', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/nested-refs-order');
    beforeAll(() => {
      destDir = runGenerator(
        'resource',
        'User settings:{ push:PushSetting mobile:{ \
ios:IOSSetting android:AndroidSetting } } articles:{ titles:[Title] \
posts:[Post] comments:{ contents:[{ commentor:User }] } }'.split(
            ' '
          )
      );
      assertFileContent = fileContent(destDir);
    });

    afterAll(() => {
      fs.removeSync(destDir);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assertFileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assertFileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assertFileContent('resolvers/User.js', c);
    });
  });

  describe('supports enum type', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/enum');
    beforeAll(() => {
      destDir = runGenerator('resource', ['User', 'gender:Enum{male,female}!']);
      assertFileContent = fileContent(destDir);
    });

    afterAll(() => {
      fs.removeSync(destDir);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assertFileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assertFileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assertFileContent('resolvers/User.js', c);
    });
  });

  describe('supports enum in nested structures', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/enum-in-nested-structures');
    beforeAll(() => {
      destDir = runGenerator('resource', [
        'Account',
        'email:String/.*@wtf\\.com/!',
        'info:{',
        'name:String!',
        'gender:Enum{Male,Female}',
        '}',
        'password:String!'
      ]);
      assertFileContent = fileContent(destDir);
    });

    afterAll(() => {
      fs.removeSync(destDir);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/Account.js')).toString();
      assertFileContent('models/Account.js', c);
    });

    it('create correct schema file', () => {
      const c = fs
        .readFileSync(path.join(dir, 'schemas/Account.gql'))
        .toString();
      assertFileContent('schemas/Account.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs
        .readFileSync(path.join(dir, 'resolvers/Account.js'))
        .toString();
      assertFileContent('resolvers/Account.js', c);
    });
  });

  describe('supports enum in nested arrays', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/enum-in-nested-arrays');
    beforeAll(() => {
      destDir = runGenerator('resource', [
        'User',
        'posts:[{',
        'title:String',
        'kind:Enum{science,math,english}'
      ]);
      assertFileContent = fileContent(destDir);
    });

    afterAll(() => {
      fs.removeSync(destDir);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assertFileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assertFileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assertFileContent('resolvers/User.js', c);
    });
  });

  describe('supports subschema', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/referencing-schema');
    beforeAll(() => {
      destDir = runGenerator('resource', [
        'User',
        'address:addressSchema',
        'addresses:[addressSchema]'
      ]);
      assertFileContent = fileContent(destDir);
    });

    afterAll(() => {
      fs.removeSync(destDir);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assertFileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assertFileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assertFileContent('resolvers/User.js', c);
    });
  });

  describe('support reference schema in resources', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/referencing-schema-and-models');
    beforeAll(() => {
      destDir = runGenerator('resource', [
        'User',
        'name:String!',
        'gender:Enum{male,female}',
        'age:Int>=0<=200',
        'addresses:[addressSchema]',
        'phoneNo:String/1[358]\\d{9,10}/',
        'email:String/.*@.*\\..*/',
        'orders:[Order]:user'
      ]);
      assertFileContent = fileContent(destDir);
    });

    afterAll(() => {
      fs.removeSync(destDir);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assertFileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assertFileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assertFileContent('resolvers/User.js', c);
    });
  });

  describe('support nested foreign key', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/nested-foreign-key');
    beforeAll(() => {
      destDir = runGenerator('resource', [
        'User',
        'name:String',
        'posts:[Post]:staffs.author'
      ]);
      assertFileContent = fileContent(destDir);
    });

    afterAll(() => {
      fs.removeSync(destDir);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assertFileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assertFileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assertFileContent('resolvers/User.js', c);
    });
  });

  describe('support mixed scalar type', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/mixed-scalar-type');
    beforeAll(() => {
      destDir = runGenerator('resource', ['User', 'experience:Mixed']);
      assertFileContent = fileContent(destDir);
    });

    afterAll(() => {
      fs.removeSync(destDir);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assertFileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assertFileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assertFileContent('resolvers/User.js', c);
    });
  });

  describe('requires mixed and objectId in same line', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/mixed-object-id-same-line');
    beforeAll(() => {
      destDir = runGenerator('resource', [
        'User',
        'experience:Mixed',
        'post:Post'
      ]);
      assertFileContent = fileContent(destDir);
    });

    afterAll(() => {
      fs.removeSync(destDir);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assertFileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assertFileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assertFileContent('resolvers/User.js', c);
    });
  });

  describe('generates file field', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/file');
    beforeAll(() => {
      destDir = runGenerator('resource', [
        'User',
        'name:String',
        'avatar:AvatarUploader'
      ]);
      assertFileContent = fileContent(destDir);
    });

    afterAll(() => {
      fs.removeSync(destDir);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assertFileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assertFileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assertFileContent('resolvers/User.js', c);
    });
  });

  describe('requires mixed, objectId, and file in same line', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/same-line-require');
    beforeAll(() => {
      destDir = runGenerator('resource', [
        'User',
        'experience:Mixed',
        'post:Post',
        'avatar:AvatarUploader'
      ]);
      assertFileContent = fileContent(destDir);
    });

    afterAll(() => {
      fs.removeSync(destDir);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assertFileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assertFileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assertFileContent('resolvers/User.js', c);
    });
  });

  describe('put uploaders after schema requirements', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/sub-schema-and-uploader');
    beforeAll(() => {
      destDir = runGenerator('resource', [
        'User',
        'experience:experienceSchema',
        'avatar:AvatarUploader'
      ]);
      assertFileContent = fileContent(destDir);
    });

    afterAll(() => {
      fs.removeSync(destDir);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assertFileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assertFileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assertFileContent('resolvers/User.js', c);
    });
  });

  describe('generates array of files', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/array-of-files');
    beforeAll(() => {
      destDir = runGenerator('resource', [
        'User',
        'photos:[PhotoUploader]'
      ]);
      assertFileContent = fileContent(destDir);
    });

    afterAll(() => {
      fs.removeSync(destDir);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assertFileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assertFileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assertFileContent('resolvers/User.js', c);
    });
  });

  describe('generates files in nested structure', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/nested-file');
    beforeAll(() => {
      destDir = runGenerator('resource', [
        'User',
        'info:{',
        'photo:PhotoUploader',
        '}'
      ]);
      assertFileContent = fileContent(destDir);
    });

    afterAll(() => {
      fs.removeSync(destDir);
    });

    it('create correct model file', () => {
      const c = fs.readFileSync(path.join(dir, 'models/User.js')).toString();
      assertFileContent('models/User.js', c);
    });

    it('create correct schema file', () => {
      const c = fs.readFileSync(path.join(dir, 'schemas/User.gql')).toString();
      assertFileContent('schemas/User.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/User.js')).toString();
      assertFileContent('resolvers/User.js', c);
    });
  });

  describe('command line option behaviors', () => {
    describe('removes generated files with --destory', () => {
      let destDir, assertFileContent;
      const dir = path.join(__dirname, 'expected/destroy');
      beforeAll(() => {
        destDir = runGenerators([
          ['resource', ['User', 'name:String']],
          ['resource', ['Post', 'title:String']],
          ['resource', ['User'], { destroy: true }]
        ]);
        assertFileContent = fileContent(destDir);
      });

      afterAll(() => {
        fs.removeSync(destDir);
      });

      it('removes correct model file', () => {
        assert(!fs.existsSync(path.join(destDir, 'models/User.js')));
      });

      it('keeps unrelated model file', () => {
        const c = fs.readFileSync(path.join(dir, 'models/Post.js')).toString();
        assertFileContent('models/Post.js', c);
      });

      it('removes correct schema file', () => {
        assert(!fs.existsSync(path.join(destDir, 'schemas/User.js')));
      });

      it('keeps unrelated schema file', () => {
        const c = fs.readFileSync(path.join(dir, 'schemas/Post.gql')).toString();
        assertFileContent('schemas/Post.gql', c);
      });

      it('removes correct resolver file', () => {
        assert(!fs.existsSync(path.join(destDir, 'resolvers/User.js')));
      });

      it('keeps unrelated resolver file', () => {
        const c = fs.readFileSync(path.join(dir, 'resolvers/Post.js')).toString();
        assertFileContent('resolvers/Post.js', c);
      });
    });
  });
});
