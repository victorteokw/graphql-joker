const path = require('path');
const {
  setupTest,
  cleanUpTest,
  runTest,
  iterateFiles
} = require('scaffold-kit-quality-testing');
const app = require('../../lib/app');

beforeAll(setupTest('resource', app, path.join(__dirname, '../expected/resource')));

afterAll(cleanUpTest('resource'));

describe('resource command: ', () => {

  describe('supports string type', () => {
    beforeAll(runTest({
      group: 'resource',
      template: 'supports-string-type',
      command: 'resource User name:String'
    }));
    iterateFiles('resource', 'supports-string-type', ({ filename, expected, generated }) => {
      it(`creates file '${filename}'`, () => {
        expect(generated(filename)).toBe(expected(filename));
      });
    });
  });

  describe('supports array of strings', () => {
    beforeAll(runTest({
      group: 'resource',
      template: 'supports-array-of-strings',
      command: 'resource User names:[String]'
    }));
    iterateFiles('resource', 'supports-array-of-strings', ({ filename, expected, generated }) => {
      it(`creates file '${filename}'`, () => {
        expect(generated(filename)).toBe(expected(filename));
      });
    });
  });

  describe('supports int type', () => {
    beforeAll(runTest({
      group: 'resource',
      template: 'supports-int-type',
      command: 'resource User age:Int'
    }));
    iterateFiles('resource', 'supports-int-type', ({ filename, expected, generated }) => {
      it(`creates file '${filename}'`, () => {
        expect(generated(filename)).toBe(expected(filename));
      });
    });
  });

  describe('supports float type', () => {
    beforeAll(runTest({
      group: 'resource',
      template: 'supports-float-type',
      command: 'resource User rate:Float'
    }));
    iterateFiles('resource', 'supports-float-type', ({ filename, expected, generated }) => {
      it(`creates file '${filename}'`, () => {
        expect(generated(filename)).toBe(expected(filename));
      });
    });
  });

  describe('supports number type', () => {
    beforeAll(runTest({
      group: 'resource',
      template: 'supports-int-type',
      command: 'resource User age:Number'
    }));
    iterateFiles('resource', 'supports-int-type', ({ filename, expected, generated }) => {
      it(`creates file '${filename}'`, () => {
        expect(generated(filename)).toBe(expected(filename));
      });
    });
  });

  describe('supports boolean type', () => {
    beforeAll(runTest({
      group: 'resource',
      template: 'supports-boolean-type',
      command: 'resource User good:Boolean'
    }));
    iterateFiles('resource', 'supports-boolean-type', ({ filename, expected, generated }) => {
      it(`creates file '${filename}'`, () => {
        expect(generated(filename)).toBe(expected(filename));
      });
    });
  });

  describe('supports local single reference type', () => {
    beforeAll(runTest({
      group: 'resource',
      template: 'supports-local-single-reference-type',
      command: 'resource User record:Record'
    }));
    iterateFiles('resource', 'supports-local-single-reference-type', ({ filename, expected, generated }) => {
      it(`creates file '${filename}'`, () => {
        expect(generated(filename)).toBe(expected(filename));
      });
    });
  });

  describe('supports local multiple reference type', () => {
    beforeAll(runTest({
      group: 'resource',
      template: 'supports-local-multiple-reference-type',
      command: 'resource User records:[Record]'
    }));
    iterateFiles('resource', 'supports-local-multiple-reference-type', ({ filename, expected, generated }) => {
      it(`creates file '${filename}'`, () => {
        expect(generated(filename)).toBe(expected(filename));
      });
    });
  });

  describe('supports foreign multiple reference type', () => {
    beforeAll(runTest({
      group: 'resource',
      template: 'supports-foreign-multiple-reference-type',
      command: 'resource User records:[Record]:owner'
    }));
    iterateFiles('resource', 'supports-foreign-multiple-reference-type', ({ filename, expected, generated }) => {
      it(`creates file '${filename}'`, () => {
        expect(generated(filename)).toBe(expected(filename));
      });
    });
  });

  describe('supports multiple foreign single reference type', () => {
    beforeAll(runTest({
      group: 'resource',
      template: 'supports-multiple-foreign-single-reference-type',
      command: 'resource User likeMost:Like:[users]'
    }));
    iterateFiles('resource', 'supports-multiple-foreign-single-reference-type', ({ filename, expected, generated }) => {
      it(`creates file '${filename}'`, () => {
        expect(generated(filename)).toBe(expected(filename));
      });
    });
  });

  describe('supports multiple foreign multiple reference type', () => {
    beforeAll(runTest({
      group: 'resource',
      template: 'supports-multiple-foreign-multiple-reference-type',
      command: 'resource User articles:[Article]:[users]'
    }));
    iterateFiles('resource', 'supports-multiple-foreign-multiple-reference-type', ({ filename, expected, generated }) => {
      it(`creates file '${filename}'`, () => {
        expect(generated(filename)).toBe(expected(filename));
      });
    });
  });

  describe('supports nested key foreign reference type', () => {
    beforeAll(runTest({
      group: 'resource',
      template: 'supports-nested-foreign-key-reference-type',
      command: 'resource User name:String posts:[Post]:staffs.author'
    }));
    iterateFiles('resource', 'supports-nested-foreign-key-reference-type', ({ filename, expected, generated }) => {
      it(`creates file '${filename}'`, () => {
        expect(generated(filename)).toBe(expected(filename));
      });
    });
  });

  describe('supports associated multiple reference type', () => {
    beforeAll(runTest({
      group: 'resource',
      template: 'supports-associated-multiple-reference-type',
      command: 'resource User courses:[Course]:Favorite.course.user'
    }));
    iterateFiles('resource', 'supports-associated-multiple-reference-type', ({ filename, expected, generated }) => {
      it(`creates file '${filename}'`, () => {
        expect(generated(filename)).toBe(expected(filename));
      });
    });
  });

  describe('supports self associated multiple reference type', () => {
    beforeAll(runTest({
      group: 'resource',
      template: 'supports-self-associated-multiple-reference-type',
      command: 'resource User name:String followers:[User]:Follow.follower.followee followees:[User]:Follow.followee.follower'
    }));
    iterateFiles('resource', 'supports-self-associated-multiple-reference-type', ({ filename, expected, generated }) => {
      it(`creates file '${filename}'`, () => {
        expect(generated(filename)).toBe(expected(filename));
      });
    });
  });

  describe('supports enum type', () => {
    beforeAll(runTest({
      group: 'resource',
      template: 'supports-enum-type',
      command: 'resource User gender:Enum(male,female)!'
    }));
    iterateFiles('resource', 'supports-enum-type', ({ filename, expected, generated }) => {
      it(`creates file '${filename}'`, () => {
        expect(generated(filename)).toBe(expected(filename));
      });
    });
  });

  describe('supports mixed type', () => {
    beforeAll(runTest({
      group: 'resource',
      template: 'supports-mixed-type',
      command: 'resource User experience:Mixed'
    }));
    iterateFiles('resource', 'supports-mixed-type', ({ filename, expected, generated }) => {
      it(`creates file '${filename}'`, () => {
        expect(generated(filename)).toBe(expected(filename));
      });
    });
  });

  describe('supports file type', () => {
    beforeAll(runTest({
      group: 'resource',
      template: 'supports-file-type',
      command: 'resource User name:String avatar:AvatarUploader'
    }));
    iterateFiles('resource', 'supports-file-type', ({ filename, expected, generated }) => {
      it(`creates file '${filename}'`, () => {
        expect(generated(filename)).toBe(expected(filename));
      });
    });
  });

  describe('supports array of files', () => {
    beforeAll(runTest({
      group: 'resource',
      template: 'supports-array-of-files',
      command: 'resource User photos:[PhotoUploader]'
    }));
    iterateFiles('resource', 'supports-array-of-files', ({ filename, expected, generated }) => {
      it(`creates file '${filename}'`, () => {
        expect(generated(filename)).toBe(expected(filename));
      });
    });
  });

  describe('supports custom collection name', () => {
    beforeAll(runTest({
      group: 'resource',
      template: 'supports-custom-collection-name',
      command: 'resource User/people name:String'
    }));
    iterateFiles('resource', 'supports-custom-collection-name', ({ filename, expected, generated }) => {
      it(`creates file '${filename}'`, () => {
        expect(generated(filename)).toBe(expected(filename));
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
    beforeAll(runTest({
      group: 'resource',
      template: 'supports-sparse-index-on-primitive-field',
      command: 'resource User name:String$'
    }));
    iterateFiles('resource', 'supports-sparse-index-on-primitive-field', ({ filename, expected, generated }) => {
      it(`creates file '${filename}'`, () => {
        expect(generated(filename)).toBe(expected(filename));
      });
    });
  });

  describe('supports required on reference field', () => {
    beforeAll(runTest({
      group: 'resource',
      template: 'supports-required-on-reference-field',
      command: 'resource User name:String post:Post!'
    }));
    iterateFiles('resource', 'supports-required-on-reference-field', ({ filename, expected, generated }) => {
      it(`creates file '${filename}'`, () => {
        expect(generated(filename)).toBe(expected(filename));
      });
    });
  });

  describe('supports match on string field', () => {
    beforeAll(runTest({
      group: 'resource',
      template: 'supports-match-on-string-field',
      command: 'resource User email:String/^\\w+@\\w+\\.\\w+$/g!'
    }));
    iterateFiles('resource', 'supports-match-on-string-field', ({ filename, expected, generated }) => {
      it(`creates file '${filename}'`, () => {
        expect(generated(filename)).toBe(expected(filename));
      });
    });
  });

  describe('supports min and max on number field', () => {
    beforeAll(runTest({
      group: 'resource',
      template: 'supports-min-and-max-on-number-field',
      command: 'resource Result score:Float<=100.0>=0.5 hexKey:Int<=0xabcd>=0x1234'
    }));
    iterateFiles('resource', 'supports-min-and-max-on-number-field', ({ filename, expected, generated }) => {
      it(`creates file '${filename}'`, () => {
        expect(generated(filename)).toBe(expected(filename));
      });
    });
  });

  describe('supports minlength and maxlength on string field', () => {
    beforeAll(runTest({
      group: 'resource',
      template: 'supports-minlength-and-maxlength-on-string-field',
      command: 'resource User name:String<=30>=2'
    }));
    iterateFiles('resource', 'supports-minlength-and-maxlength-on-string-field', ({ filename, expected, generated }) => {
      it(`creates file '${filename}'`, () => {
        expect(generated(filename)).toBe(expected(filename));
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
    beforeAll(runTest({
      group: 'resource',
      template: 'supports-dynamic-default-date-value',
      command: ['resource', 'Meeting', 'startedAt:Date!:`new Date()`']
    }));
    iterateFiles('resource', 'supports-dynamic-default-date-value', ({ filename, expected, generated }) => {
      it(`creates file '${filename}'`, () => {
        expect(generated(filename)).toBe(expected(filename));
      });
    });
  });

  describe('supports nested model', () => {
    beforeAll(runTest({
      group: 'resource',
      template: 'supports-nested-model',
      command: 'resource User name:String settings:{ sms:Boolean email:Boolean push:{ first:Boolean second:Boolean } } age:Int address:{ city:String province:String region:String address:{ one:String two:String } }'
    }));
    iterateFiles('resource', 'supports-nested-model', ({ filename, expected, generated }) => {
      it(`creates file '${filename}'`, () => {
        expect(generated(filename)).toBe(expected(filename));
      });
    });
  });

  describe('supports nested array model', () => {
    beforeAll(runTest({
      group: 'resource',
      template: 'supports-nested-array-model',
      command: 'resource User age:String roles:[{ name:String permissions:[String] }] name:String'
    }));
    iterateFiles('resource', 'supports-nested-array-model', ({ filename, expected, generated }) => {
      it(`creates file '${filename}'`, () => {
        expect(generated(filename)).toBe(expected(filename));
      });
    });
  });

  describe('supports deep nested array model', () => {
    beforeAll(runTest({
      group: 'resource',
      template: 'supports-deep-nested-array-model',
      command: 'resource Product names:[{ langCode:String!:cn name:String! }] description:String! solds:Int comments:[{ title:String addresses:[{ region:String! country:String! }] }]'
    }));
    iterateFiles('resource', 'supports-deep-nested-array-model', ({ filename, expected, generated }) => {
      it(`creates file '${filename}'`, () => {
        expect(generated(filename)).toBe(expected(filename));
      });
    });
  });

  describe('supports references in nested model', () => {
    beforeAll(runTest({
      group: 'resource',
      template: 'supports-references-in-nested-model',
      command: 'resource User article:{ post:Post comments:[Comment] }'
    }));
    iterateFiles('resource', 'supports-references-in-nested-model', ({ filename, expected, generated }) => {
      it(`creates file '${filename}'`, () => {
        expect(generated(filename)).toBe(expected(filename));
      });
    });
  });

  describe('references in nested model has correct orders', () => {
    beforeAll(runTest({
      group: 'resource',
      template: 'references-in-nested-model-has-correct-orders',
      command: 'resource User settings:{ push:PushSetting mobile:{ ios:IOSSetting android:AndroidSetting } } articles:{ titles:[Title] posts:[Post] comments:{ contents:[{ commentor:User }] } }'
    }));
    iterateFiles('resource', 'references-in-nested-model-has-correct-orders', ({ filename, expected, generated }) => {
      it(`creates file '${filename}'`, () => {
        expect(generated(filename)).toBe(expected(filename));
      });
    });
  });

  describe('enum in nested model has prefixed name', () => {
    beforeAll(runTest({
      group: 'resource',
      template: 'enum-in-nested-model-has-prefixed-name',
      command: 'resource Account email:String/.*@wtf\\.com/! info:{ name:String! gender:Enum(Male,Female) } password:String!'
    }));
    iterateFiles('resource', 'enum-in-nested-model-has-prefixed-name', ({ filename, expected, generated }) => {
      it(`creates file '${filename}'`, () => {
        expect(generated(filename)).toBe(expected(filename));
      });
    });
  });

  describe('enum in nested array model has singularized prefixed name', () => {
    beforeAll(runTest({
      group: 'resource',
      template: 'enum-in-nested-array-model-has-singularized-prefixed-name',
      command: 'resource User posts:[{ title:String kind:Enum(science,math,english)'
    }));
    iterateFiles('resource', 'enum-in-nested-array-model-has-singularized-prefixed-name', ({ filename, expected, generated }) => {
      it(`creates file '${filename}'`, () => {
        expect(generated(filename)).toBe(expected(filename));
      });
    });
  });

  describe('supports nestable', () => {
    beforeAll(runTest({
      group: 'resource',
      template: 'supports-nestable',
      command: 'resource User address:addressSchema addresses:[addressSchema]'
    }));
    iterateFiles('resource', 'supports-nestable', ({ filename, expected, generated }) => {
      it(`creates file '${filename}'`, () => {
        expect(generated(filename)).toBe(expected(filename));
      });
    });
  });

  describe('requires mixed and objectId in same line', () => {
    beforeAll(runTest({
      group: 'resource',
      template: 'requires-mixed-and-object-id-in-same-line',
      command: 'resource User experience:Mixed post:Post'
    }));
    iterateFiles('resource', 'requires-mixed-and-object-id-in-same-line', ({ filename, expected, generated }) => {
      it(`creates file '${filename}'`, () => {
        expect(generated(filename)).toBe(expected(filename));
      });
    });
  });

  describe('requires mixed, file and objectId in same line', () => {
    beforeAll(runTest({
      group: 'resource',
      template: 'requires-mixed-file-and-object-id-in-same-line',
      command: 'resource User experience:Mixed post:Post avatar:AvatarUploader'
    }));
    iterateFiles('resource', 'requires-mixed-file-and-object-id-in-same-line', ({ filename, expected, generated }) => {
      it(`creates file '${filename}'`, () => {
        expect(generated(filename)).toBe(expected(filename));
      });
    });
  });

  describe('requires uploaders after nestables', () => {
    beforeAll(runTest({
      group: 'resource',
      template: 'requires-uploaders-after-nestables',
      command: 'resource User experience:experienceSchema avatar:AvatarUploader'
    }));
    iterateFiles('resource', 'requires-uploaders-after-nestables', ({ filename, expected, generated }) => {
      it(`creates file '${filename}'`, () => {
        expect(generated(filename)).toBe(expected(filename));
      });
    });
  });
});
