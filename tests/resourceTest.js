const path = require('path');
const fs = require('fs-extra');
const runGenerator = require('./setup/runGenerator');
const fileContent = require('./assertions/fileContent');

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
      destDir = runGenerator('resource', ['User', 'name:String', 'age:Int', 'popularity:Float']);
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
      destDir = runGenerator('resource', ['Article/articles', 'title:String!$', 'content:String!', 'keyName:String!^$']);
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
      const c = fs.readFileSync(path.join(dir, 'schemas/Article.gql')).toString();
      assertFileContent('schemas/Article.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/Article.js')).toString();
      assertFileContent('resolvers/Article.js', c);
    });
  });
  describe('supports default values', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/default-values');
    beforeAll(() => {
      destDir = runGenerator('resource', ['User', 'name:String!^$:Untitled', 'disabled:Boolean!:false', 'age:Int!:18', 'posts:[Post]:user']);
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
      destDir = runGenerator('resource', ['Meeting', 'startedAt:Date!:`new Date()`']);
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
      const c = fs.readFileSync(path.join(dir, 'schemas/Meeting.gql')).toString();
      assertFileContent('schemas/Meeting.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/Meeting.js')).toString();
      assertFileContent('resolvers/Meeting.js', c);
    });
  });
  describe('supports string match', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/string-match');
    beforeAll(() => {
      destDir = runGenerator('resource', ['User', 'email:String/^\\w+@\\w+\\.\\w+$/g!']);
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
      destDir = runGenerator('resource', ['Result', 'score:Float<=100.0>=0.5', 'hexKey:Int<=0xabcd>=0x1234']);
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
      const c = fs.readFileSync(path.join(dir, 'schemas/Result.gql')).toString();
      assertFileContent('schemas/Result.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/Result.js')).toString();
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
      destDir = runGenerator('resource', "User name:String settings:{ sms:Boolean email:Boolean \
push:{ first:Boolean second:Boolean } } age:Int address:{ city:String \
province:String Region:String address:{ one:String two:String } }".split(' '));
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
      destDir = runGenerator('resource', "User age:String roles:[{ name:String \
permissions:[String] }] name:String".split(' '));
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
      destDir = runGenerator('resource', "Product names:[{ langCode:String!:cn name:String! \
}] description:String! solds:Int comments:[{ title:String addresses:[{ \
region:String! country:String! }] }]".split(' '));
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
      const c = fs.readFileSync(path.join(dir, 'schemas/Product.gql')).toString();
      assertFileContent('schemas/Product.gql', c);
    });

    it('create correct resolver file', () => {
      const c = fs.readFileSync(path.join(dir, 'resolvers/Product.js')).toString();
      assertFileContent('resolvers/Product.js', c);
    });
  });

  describe('supports nested model with refs', () => {
    let destDir, assertFileContent;
    const dir = path.join(__dirname, 'expected/nested-refs');
    beforeAll(() => {
      destDir = runGenerator('resource', "User article:{ post:Post comments:[Comment] }".split(' '));
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
      destDir = runGenerator('resource', "User settings:{ push:PushSetting mobile:{ \
ios:IOSSetting android:AndroidSetting } } articles:{ titles:[Title] \
posts:[Post] comments:{ contents:[{ commentor:User }] } }".split(' '));
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
});
