const path = require('path');
const {
  setupTestCase,
  tearDownTest,
  runTestCase,
  iterateExpectedFiles
} = require('scaffold-kit-quality-testing');
const app = require('../../lib/app');

describe('resource command: ', () => {

  describe('supports string type', () => {
    const handle = setupTestCase({
      app,
      expects: path.join(__dirname, '../expected/resource/supports-string-type'),
      command: 'resource User name:String'
    });
    beforeAll(runTestCase(handle));
    afterAll(tearDownTest(handle));
    iterateExpectedFiles(handle, ({ message, expected, generated }) => {
      it(message, () => {
        expect(generated()).toBe(expected);
      });
    });
  });

  describe('supports array of strings', () => {
    const handle = setupTestCase({
      app,
      expects: path.join(__dirname, '../expected/resource/supports-array-of-strings'),
      command: 'resource User names:[String]'
    });
    beforeAll(runTestCase(handle));
    afterAll(tearDownTest(handle));
    iterateExpectedFiles(handle, ({ message, expected, generated }) => {
      it(message, () => {
        expect(generated()).toBe(expected);
      });
    });
  });

  describe('supports int type', () => {
    const handle = setupTestCase({
      app,
      expects: path.join(__dirname, '../expected/resource/supports-int-type'),
      command: 'resource User age:Int'
    });
    beforeAll(runTestCase(handle));
    afterAll(tearDownTest(handle));
    iterateExpectedFiles(handle, ({ message, expected, generated }) => {
      it(message, () => {
        expect(generated()).toBe(expected);
      });
    });
  });

  describe('supports float type', () => {
    const handle = setupTestCase({
      app,
      expects: path.join(__dirname, '../expected/resource/supports-float-type'),
      command: 'resource User rate:Float'
    });
    beforeAll(runTestCase(handle));
    afterAll(tearDownTest(handle));
    iterateExpectedFiles(handle, ({ message, expected, generated }) => {
      it(message, () => {
        expect(generated()).toBe(expected);
      });
    });
  });

  describe('supports number type', () => {
    const handle = setupTestCase({
      app,
      expects: path.join(__dirname, '../expected/resource/supports-int-type'),
      command: 'resource User age:Number'
    });
    beforeAll(runTestCase(handle));
    afterAll(tearDownTest(handle));
    iterateExpectedFiles(handle, ({ message, expected, generated }) => {
      it(message, () => {
        expect(generated()).toBe(expected);
      });
    });
  });

  describe('supports boolean type', () => {
    const handle = setupTestCase({
      app,
      expects: path.join(__dirname, '../expected/resource/supports-boolean-type'),
      command: 'resource User good:Boolean'
    });
    beforeAll(runTestCase(handle));
    afterAll(tearDownTest(handle));
    iterateExpectedFiles(handle, ({ message, expected, generated }) => {
      it(message, () => {
        expect(generated()).toBe(expected);
      });
    });
  });

  describe('supports local single reference type', () => {
    const handle = setupTestCase({
      app,
      expects: path.join(__dirname, '../expected/resource/supports-local-single-reference-type'),
      command: 'resource User record:Record'
    });
    beforeAll(runTestCase(handle));
    afterAll(tearDownTest(handle));
    iterateExpectedFiles(handle, ({ message, expected, generated }) => {
      it(message, () => {
        expect(generated()).toBe(expected);
      });
    });
  });

  describe('supports local multiple reference type', () => {
    const handle = setupTestCase({
      app,
      expects: path.join(__dirname, '../expected/resource/supports-local-multiple-reference-type'),
      command: 'resource User records:[Record]'
    });
    beforeAll(runTestCase(handle));
    afterAll(tearDownTest(handle));
    iterateExpectedFiles(handle, ({ message, expected, generated }) => {
      it(message, () => {
        expect(generated()).toBe(expected);
      });
    });
  });

  describe('supports foreign multiple reference type', () => {
    const handle = setupTestCase({
      app,
      expects: path.join(__dirname, '../expected/resource/supports-foreign-multiple-reference-type'),
      command: 'resource User records:[Record]:owner'
    });
    beforeAll(runTestCase(handle));
    afterAll(tearDownTest(handle));
    iterateExpectedFiles(handle, ({ message, expected, generated }) => {
      it(message, () => {
        expect(generated()).toBe(expected);
      });
    });
  });

  describe('supports multiple foreign single reference type', () => {
    const handle = setupTestCase({
      app,
      expects: path.join(__dirname, '../expected/resource/supports-multiple-foreign-single-reference-type'),
      command: 'resource User likeMost:Like:[users]'
    });
    beforeAll(runTestCase(handle));
    afterAll(tearDownTest(handle));
    iterateExpectedFiles(handle, ({ message, expected, generated }) => {
      it(message, () => {
        expect(generated()).toBe(expected);
      });
    });
  });

  describe('supports multiple foreign multiple reference type', () => {
    const handle = setupTestCase({
      app,
      expects: path.join(__dirname, '../expected/resource/supports-multiple-foreign-multiple-reference-type'),
      command: 'resource User articles:[Article]:[users]'
    });
    beforeAll(runTestCase(handle));
    afterAll(tearDownTest(handle));
    iterateExpectedFiles(handle, ({ message, expected, generated }) => {
      it(message, () => {
        expect(generated()).toBe(expected);
      });
    });
  });

  describe('supports nested key foreign reference type', () => {
    const handle = setupTestCase({
      app,
      expects: path.join(__dirname, '../expected/resource/supports-nested-foreign-key-reference-type'),
      command: 'resource User name:String posts:[Post]:staffs.author'
    });
    beforeAll(runTestCase(handle));
    afterAll(tearDownTest(handle));
    iterateExpectedFiles(handle, ({ message, expected, generated }) => {
      it(message, () => {
        expect(generated()).toBe(expected);
      });
    });
  });

  describe('supports associated multiple reference type', () => {
    const handle = setupTestCase({
      app,
      expects: path.join(__dirname, '../expected/resource/supports-associated-multiple-reference-type'),
      command: 'resource User courses:[Course]:Favorite.course.user'
    });
    beforeAll(runTestCase(handle));
    afterAll(tearDownTest(handle));
    iterateExpectedFiles(handle, ({ message, expected, generated }) => {
      it(message, () => {
        expect(generated()).toBe(expected);
      });
    });
  });

  describe('supports self associated multiple reference type', () => {
    const handle = setupTestCase({
      app,
      expects: path.join(__dirname, '../expected/resource/supports-self-associated-multiple-reference-type'),
      command: 'resource User name:String followers:[User]:Follow.follower.followee followees:[User]:Follow.followee.follower'
    });
    beforeAll(runTestCase(handle));
    afterAll(tearDownTest(handle));
    iterateExpectedFiles(handle, ({ message, expected, generated }) => {
      it(message, () => {
        expect(generated()).toBe(expected);
      });
    });
  });

  describe('supports enum type', () => {
    const handle = setupTestCase({
      app,
      expects: path.join(__dirname, '../expected/resource/supports-enum-type'),
      command: 'resource User gender:Enum(male,female)!'
    });
    beforeAll(runTestCase(handle));
    afterAll(tearDownTest(handle));
    iterateExpectedFiles(handle, ({ message, expected, generated }) => {
      it(message, () => {
        expect(generated()).toBe(expected);
      });
    });
  });

  describe('supports mixed type', () => {
    const handle = setupTestCase({
      app,
      expects: path.join(__dirname, '../expected/resource/supports-mixed-type'),
      command: 'resource User experience:Mixed'
    });
    beforeAll(runTestCase(handle));
    afterAll(tearDownTest(handle));
    iterateExpectedFiles(handle, ({ message, expected, generated }) => {
      it(message, () => {
        expect(generated()).toBe(expected);
      });
    });
  });

  describe('supports file type', () => {
    const handle = setupTestCase({
      app,
      expects: path.join(__dirname, '../expected/resource/supports-file-type'),
      command: 'resource User name:String avatar:AvatarUploader'
    });
    beforeAll(runTestCase(handle));
    afterAll(tearDownTest(handle));
    iterateExpectedFiles(handle, ({ message, expected, generated }) => {
      it(message, () => {
        expect(generated()).toBe(expected);
      });
    });
  });

  describe('supports array of files', () => {
    const handle = setupTestCase({
      app,
      expects: path.join(__dirname, '../expected/resource/supports-array-of-files'),
      command: 'resource User photos:[PhotoUploader]'
    });
    beforeAll(runTestCase(handle));
    afterAll(tearDownTest(handle));
    iterateExpectedFiles(handle, ({ message, expected, generated }) => {
      it(message, () => {
        expect(generated()).toBe(expected);
      });
    });
  });

  describe('supports custom collection name', () => {
    const handle = setupTestCase({
      app,
      expects: path.join(__dirname, '../expected/resource/supports-custom-collection-name'),
      command: 'resource User/people name:String'
    });
    beforeAll(runTestCase(handle));
    afterAll(tearDownTest(handle));
    iterateExpectedFiles(handle, ({ message, expected, generated }) => {
      it(message, () => {
        expect(generated()).toBe(expected);
      });
    });
  });

  describe('supports index on primitive field', () => {
    // run('resource User/people name:String', iterateFile((arg) => {
    //   it(`creates file "${arg.fileName}"`, () => {
    //     compareDirectory(path.join(__dirname, '../expected/resource/supports-custom-collection-name'), arg);
    //   });
    // }));
  });

  describe('supports unique on primitive field', () => {
    // run('resource User/people name:String', iterateFile((arg) => {
    //   it(`creates file "${arg.fileName}"`, () => {
    //     compareDirectory(path.join(__dirname, '../expected/resource/supports-custom-collection-name'), arg);
    //   });
    // }));
  });

  describe('supports required on primitive field', () => {
    // run('resource User/people name:String', iterateFile((arg) => {
    //   it(`creates file "${arg.fileName}"`, () => {
    //     compareDirectory(path.join(__dirname, '../expected/resource/supports-custom-collection-name'), arg);
    //   });
    // }));
  });

  describe('supports sparse index when unique and not required on primitive field', () => {
    const handle = setupTestCase({
      app,
      expects: path.join(__dirname, '../expected/resource/supports-sparse-index-on-primitive-field'),
      command: 'resource User name:String$'
    });
    beforeAll(runTestCase(handle));
    afterAll(tearDownTest(handle));
    iterateExpectedFiles(handle, ({ message, expected, generated }) => {
      it(message, () => {
        expect(generated()).toBe(expected);
      });
    });
  });

  describe('supports required on reference field', () => {
    const handle = setupTestCase({
      app,
      expects: path.join(__dirname, '../expected/resource/supports-required-on-reference-field'),
      command: 'resource User name:String post:Post!'
    });
    beforeAll(runTestCase(handle));
    afterAll(tearDownTest(handle));
    iterateExpectedFiles(handle, ({ message, expected, generated }) => {
      it(message, () => {
        expect(generated()).toBe(expected);
      });
    });
  });

  describe('supports match on string field', () => {
    const handle = setupTestCase({
      app,
      expects: path.join(__dirname, '../expected/resource/supports-match-on-string-field'),
      command: 'resource User email:String/^\\w+@\\w+\\.\\w+$/g!'
    });
    beforeAll(runTestCase(handle));
    afterAll(tearDownTest(handle));
    iterateExpectedFiles(handle, ({ message, expected, generated }) => {
      it(message, () => {
        expect(generated()).toBe(expected);
      });
    });
  });

  describe('supports min and max on number field', () => {
    const handle = setupTestCase({
      app,
      expects: path.join(__dirname, '../expected/resource/supports-min-and-max-on-number-field'),
      command: 'resource Result score:Float<=100.0>=0.5 hexKey:Int<=0xabcd>=0x1234'
    });
    beforeAll(runTestCase(handle));
    afterAll(tearDownTest(handle));
    iterateExpectedFiles(handle, ({ message, expected, generated }) => {
      it(message, () => {
        expect(generated()).toBe(expected);
      });
    });
  });

  describe('supports minlength and maxlength on string field', () => {
    const handle = setupTestCase({
      app,
      expects: path.join(__dirname, '../expected/resource/supports-minlength-and-maxlength-on-string-field'),
      command: 'resource User name:String<=30>=2'
    });
    beforeAll(runTestCase(handle));
    afterAll(tearDownTest(handle));
    iterateExpectedFiles(handle, ({ message, expected, generated }) => {
      it(message, () => {
        expect(generated()).toBe(expected);
      });
    });
  });

  describe('supports default string value', () => {
    // run('resource User name:String post:Post!', iterateFile((arg) => {
    //   it(`creates file "${arg.fileName}"`, () => {
    //     compareDirectory(path.join(__dirname, '../expected/resource/supports-required-on-reference-field'), arg);
    //   });
    // }));
  });

  describe('supports default int value', () => {
    // run('resource User name:String post:Post!', iterateFile((arg) => {
    //   it(`creates file "${arg.fileName}"`, () => {
    //     compareDirectory(path.join(__dirname, '../expected/resource/supports-required-on-reference-field'), arg);
    //   });
    // }));
  });

  describe('supports default float value', () => {
    // run('resource User name:String post:Post!', iterateFile((arg) => {
    //   it(`creates file "${arg.fileName}"`, () => {
    //     compareDirectory(path.join(__dirname, '../expected/resource/supports-required-on-reference-field'), arg);
    //   });
    // }));
  });

  describe('supports default boolean value', () => {
    // run('resource User name:String post:Post!', iterateFile((arg) => {
    //   it(`creates file "${arg.fileName}"`, () => {
    //     compareDirectory(path.join(__dirname, '../expected/resource/supports-required-on-reference-field'), arg);
    //   });
    // }));
  });

  describe('supports dynamic default date value', () => {
    const handle = setupTestCase({
      app,
      expects: path.join(__dirname, '../expected/resource/supports-dynamic-default-date-value'),
      command: ['resource', 'Meeting', 'startedAt:Date!:`new Date()`']
    });
    beforeAll(runTestCase(handle));
    afterAll(tearDownTest(handle));
    iterateExpectedFiles(handle, ({ message, expected, generated }) => {
      it(message, () => {
        expect(generated()).toBe(expected);
      });
    });
  });

  describe('supports nested model', () => {
    const handle = setupTestCase({
      app,
      expects: path.join(__dirname, '../expected/resource/supports-nested-model'),
      command: 'resource User name:String settings:{ sms:Boolean email:Boolean push:{ first:Boolean second:Boolean } } age:Int address:{ city:String province:String region:String address:{ one:String two:String } }'
    });
    beforeAll(runTestCase(handle));
    afterAll(tearDownTest(handle));
    iterateExpectedFiles(handle, ({ message, expected, generated }) => {
      it(message, () => {
        expect(generated()).toBe(expected);
      });
    });
  });

  describe('supports nested array model', () => {
    const handle = setupTestCase({
      app,
      expects: path.join(__dirname, '../expected/resource/supports-nested-array-model'),
      command: 'resource User age:String roles:[{ name:String permissions:[String] }] name:String'
    });
    beforeAll(runTestCase(handle));
    afterAll(tearDownTest(handle));
    iterateExpectedFiles(handle, ({ message, expected, generated }) => {
      it(message, () => {
        expect(generated()).toBe(expected);
      });
    });
  });

  describe('supports deep nested array model', () => {
    const handle = setupTestCase({
      app,
      expects: path.join(__dirname, '../expected/resource/supports-deep-nested-array-model'),
      command: 'resource Product names:[{ langCode:String!:cn name:String! }] description:String! solds:Int comments:[{ title:String addresses:[{ region:String! country:String! }] }]'
    });
    beforeAll(runTestCase(handle));
    afterAll(tearDownTest(handle));
    iterateExpectedFiles(handle, ({ message, expected, generated }) => {
      it(message, () => {
        expect(generated()).toBe(expected);
      });
    });
  });

  describe('supports references in nested model', () => {
    const handle = setupTestCase({
      app,
      expects: path.join(__dirname, '../expected/resource/supports-references-in-nested-model'),
      command: 'resource User article:{ post:Post comments:[Comment] }'
    });
    beforeAll(runTestCase(handle));
    afterAll(tearDownTest(handle));
    iterateExpectedFiles(handle, ({ message, expected, generated }) => {
      it(message, () => {
        expect(generated()).toBe(expected);
      });
    });
  });

  describe('references in nested model has correct orders', () => {
    const handle = setupTestCase({
      app,
      expects: path.join(__dirname, '../expected/resource/references-in-nested-model-has-correct-orders'),
      command: 'resource User settings:{ push:PushSetting mobile:{ ios:IOSSetting android:AndroidSetting } } articles:{ titles:[Title] posts:[Post] comments:{ contents:[{ commentor:User }] } }'
    });
    beforeAll(runTestCase(handle));
    afterAll(tearDownTest(handle));
    iterateExpectedFiles(handle, ({ message, expected, generated }) => {
      it(message, () => {
        expect(generated()).toBe(expected);
      });
    });
  });

  describe('enum in nested model has prefixed name', () => {
    const handle = setupTestCase({
      app,
      expects: path.join(__dirname, '../expected/resource/enum-in-nested-model-has-prefixed-name'),
      command: 'resource Account email:String/.*@wtf\\.com/! info:{ name:String! gender:Enum(Male,Female) } password:String!'
    });
    beforeAll(runTestCase(handle));
    afterAll(tearDownTest(handle));
    iterateExpectedFiles(handle, ({ message, expected, generated }) => {
      it(message, () => {
        expect(generated()).toBe(expected);
      });
    });
  });

  describe('enum in nested array model has singularized prefixed name', () => {
    const handle = setupTestCase({
      app,
      expects: path.join(__dirname, '../expected/resource/enum-in-nested-array-model-has-singularized-prefixed-name'),
      command: 'resource User posts:[{ title:String kind:Enum(science,math,english)'
    });
    beforeAll(runTestCase(handle));
    afterAll(tearDownTest(handle));
    iterateExpectedFiles(handle, ({ message, expected, generated }) => {
      it(message, () => {
        expect(generated()).toBe(expected);
      });
    });
  });

  describe('supports nestable', () => {
    const handle = setupTestCase({
      app,
      expects: path.join(__dirname, '../expected/resource/supports-nestable'),
      command: 'resource User address:addressSchema addresses:[addressSchema]'
    });
    beforeAll(runTestCase(handle));
    afterAll(tearDownTest(handle));
    iterateExpectedFiles(handle, ({ message, expected, generated }) => {
      it(message, () => {
        expect(generated()).toBe(expected);
      });
    });
  });

  describe('requires mixed and objectId in same line', () => {
    const handle = setupTestCase({
      app,
      expects: path.join(__dirname, '../expected/resource/requires-mixed-and-object-id-in-same-line'),
      command: 'resource User experience:Mixed post:Post'
    });
    beforeAll(runTestCase(handle));
    afterAll(tearDownTest(handle));
    iterateExpectedFiles(handle, ({ message, expected, generated }) => {
      it(message, () => {
        expect(generated()).toBe(expected);
      });
    });
  });

  describe('requires mixed, file and objectId in same line', () => {
    const handle = setupTestCase({
      app,
      expects: path.join(__dirname, '../expected/resource/requires-mixed-file-and-object-id-in-same-line'),
      command: 'resource User experience:Mixed post:Post avatar:AvatarUploader'
    });
    beforeAll(runTestCase(handle));
    afterAll(tearDownTest(handle));
    iterateExpectedFiles(handle, ({ message, expected, generated }) => {
      it(message, () => {
        expect(generated()).toBe(expected);
      });
    });
  });

  describe('requires uploaders after nestables', () => {
    const handle = setupTestCase({
      app,
      expects: path.join(__dirname, '../expected/resource/requires-uploaders-after-nestables'),
      command: 'resource User experience:experienceSchema avatar:AvatarUploader'
    });
    beforeAll(runTestCase(handle));
    afterAll(tearDownTest(handle));
    iterateExpectedFiles(handle, ({ message, expected, generated }) => {
      it(message, () => {
        expect(generated()).toBe(expected);
      });
    });
  });
});
