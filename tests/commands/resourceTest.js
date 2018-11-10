const path = require('path');
const {
  setupTest,
  cleanUpTest,
  executeTest,
  compareDirectory,
  iterateFile
} = require('scaffold-kit-quality-testing');
const app = require('../../lib/app');

beforeAll(setupTest(app, 'resource'));

afterAll(cleanUpTest('resource'));

executeTest('resource', (run) => {
  describe('resource command: ', () => {

    describe('supports string type', () => {
      run('resource User name:String', iterateFile((arg) => {
        it(`creates file "${arg.fileName}"`, () => {
          compareDirectory(path.join(__dirname, '../expected/resource/supports-string-type'), arg);
        });
      }));
    });

    describe('supports array of strings', () => {
      run('resource User names:[String]', iterateFile((arg) => {
        it(`creates file "${arg.fileName}"`, () => {
          compareDirectory(path.join(__dirname, '../expected/resource/supports-array-of-strings'), arg);
        });
      }));
    });

    describe('supports int type', () => {
      run('resource User age:Int', iterateFile((arg) => {
        it(`creates file "${arg.fileName}"`, () => {
          compareDirectory(path.join(__dirname, '../expected/resource/supports-int-type'), arg);
        });
      }));
    });

    describe('supports float type', () => {
      run('resource User rate:Float', iterateFile((arg) => {
        it(`creates file "${arg.fileName}"`, () => {
          compareDirectory(path.join(__dirname, '../expected/resource/supports-float-type'), arg);
        });
      }));
    });

    describe('supports number type', () => {
      run('resource User age:Number', iterateFile((arg) => {
        it(`creates file "${arg.fileName}"`, () => {
          compareDirectory(path.join(__dirname, '../expected/resource/supports-int-type'), arg);
        });
      }));
    });

    describe('supports boolean type', () => {
      run('resource User good:Boolean', iterateFile((arg) => {
        it(`creates file "${arg.fileName}"`, () => {
          compareDirectory(path.join(__dirname, '../expected/resource/supports-boolean-type'), arg);
        });
      }));
    });

    describe('supports local single reference type', () => {
      run('resource User record:Record', iterateFile((arg) => {
        it(`creates file "${arg.fileName}"`, () => {
          compareDirectory(path.join(__dirname, '../expected/resource/supports-local-single-reference-type'), arg);
        });
      }));
    });

    describe('supports local multiple reference type', () => {
      run('resource User records:[Record]', iterateFile((arg) => {
        it(`creates file "${arg.fileName}"`, () => {
          compareDirectory(path.join(__dirname, '../expected/resource/supports-local-multiple-reference-type'), arg);
        });
      }));
    });

    describe('supports foreign multiple reference type', () => {
      run('resource User records:[Record]:owner', iterateFile((arg) => {
        it(`creates file "${arg.fileName}"`, () => {
          compareDirectory(path.join(__dirname, '../expected/resource/supports-foreign-multiple-reference-type'), arg);
        });
      }));
    });

    describe('supports multiple foreign single reference type', () => {
      run('resource User likeMost:Like:[users]', iterateFile((arg) => {
        it(`creates file "${arg.fileName}"`, () => {
          compareDirectory(path.join(__dirname, '../expected/resource/supports-multiple-foreign-single-reference-type'), arg);
        });
      }));
    });

    describe('supports multiple foreign multiple reference type', () => {
      run('resource User articles:[Article]:[users]', iterateFile((arg) => {
        it(`creates file "${arg.fileName}"`, () => {
          compareDirectory(path.join(__dirname, '../expected/resource/supports-multiple-foreign-multiple-reference-type'), arg);
        });
      }));
    });

    describe('supports nested key foreign reference type', () => {
      run('resource User name:String posts:[Post]:staffs.author', iterateFile((arg) => {
        it(`creates file "${arg.fileName}"`, () => {
          compareDirectory(path.join(__dirname, '../expected/resource/supports-nested-foreign-key-reference-type'), arg);
        });
      }));
    });

    describe('supports associated multiple reference type', () => {
      run('resource User courses:[Course]:Favorite.course.user', iterateFile((arg) => {
        it(`creates file "${arg.fileName}"`, () => {
          compareDirectory(path.join(__dirname, '../expected/resource/supports-associated-multiple-reference-type'), arg);
        });
      }));
    });

    describe('supports self associated multiple reference type', () => {
      run('resource User name:String followers:[User]:Follow.follower.followee followees:[User]:Follow.followee.follower', iterateFile((arg) => {
        it(`creates file "${arg.fileName}"`, () => {
          compareDirectory(path.join(__dirname, '../expected/resource/supports-self-associated-multiple-reference-type'), arg);
        });
      }));
    });

    describe('supports enum type', () => {
      run('resource User gender:Enum(male,female)!', iterateFile((arg) => {
        it(`creates file "${arg.fileName}"`, () => {
          compareDirectory(path.join(__dirname, '../expected/resource/supports-enum-type'), arg);
        });
      }));
    });

    describe('supports mixed type', () => {
      run('resource User experience:Mixed', iterateFile((arg) => {
        it(`creates file "${arg.fileName}"`, () => {
          compareDirectory(path.join(__dirname, '../expected/resource/supports-mixed-type'), arg);
        });
      }));
    });

    describe('supports file type', () => {
      run('resource User name:String avatar:AvatarUploader', iterateFile((arg) => {
        it(`creates file "${arg.fileName}"`, () => {
          compareDirectory(path.join(__dirname, '../expected/resource/supports-file-type'), arg);
        });
      }));
    });

    describe('supports array of files', () => {
      run('resource User photos:[PhotoUploader]', iterateFile((arg) => {
        it(`creates file "${arg.fileName}"`, () => {
          compareDirectory(path.join(__dirname, '../expected/resource/supports-array-of-files'), arg);
        });
      }));
    });

    describe('supports custom collection name', () => {
      run('resource User/people name:String', iterateFile((arg) => {
        it(`creates file "${arg.fileName}"`, () => {
          compareDirectory(path.join(__dirname, '../expected/resource/supports-custom-collection-name'), arg);
        });
      }));
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
      run('resource User name:String$', iterateFile((arg) => {
        it(`creates file "${arg.fileName}"`, () => {
          compareDirectory(path.join(__dirname, '../expected/resource/supports-sparse-index-on-primitive-field'), arg);
        });
      }));
    });

    describe('supports required on reference field', () => {
      run('resource User name:String post:Post!', iterateFile((arg) => {
        it(`creates file "${arg.fileName}"`, () => {
          compareDirectory(path.join(__dirname, '../expected/resource/supports-required-on-reference-field'), arg);
        });
      }));
    });

    describe('supports match on string field', () => {
      run('resource User email:String/^\\w+@\\w+\\.\\w+$/g!', iterateFile((arg) => {
        it(`creates file "${arg.fileName}"`, () => {
          compareDirectory(path.join(__dirname, '../expected/resource/supports-match-on-string-field'), arg);
        });
      }));
    });

    describe('supports min and max on number field', () => {
      run('resource Result score:Float<=100.0>=0.5 hexKey:Int<=0xabcd>=0x1234', iterateFile((arg) => {
        it(`creates file "${arg.fileName}"`, () => {
          compareDirectory(path.join(__dirname, '../expected/resource/supports-min-and-max-on-number-field'), arg);
        });
      }));
    });

    describe('supports minlength and maxlength on string field', () => {
      run('resource User name:String<=30>=2', iterateFile((arg) => {
        it(`creates file "${arg.fileName}"`, () => {
          compareDirectory(path.join(__dirname, '../expected/resource/supports-minlength-and-maxlength-on-string-field'), arg);
        });
      }));
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
      run('resource Meeting startedAt:Date!:`new Date()`', iterateFile((arg) => {
        it(`creates file "${arg.fileName}"`, () => {
          compareDirectory(path.join(__dirname, '../expected/resource/supports-dynamic-default-date-value'), arg);
        });
      }));
    });

    describe('supports nested model', () => {
      run('resource User name:String settings:{ sms:Boolean email:Boolean push:{ first:Boolean second:Boolean } } age:Int address:{ city:String province:String region:String address:{ one:String two:String } }', iterateFile((arg) => {
        it(`creates file "${arg.fileName}"`, () => {
          compareDirectory(path.join(__dirname, '../expected/resource/supports-nested-model'), arg);
        });
      }));
    });

    describe('supports nested array model', () => {
      run('resource User age:String roles:[{ name:String permissions:[String] }] name:String', iterateFile((arg) => {
        it(`creates file "${arg.fileName}"`, () => {
          compareDirectory(path.join(__dirname, '../expected/resource/supports-nested-array-model'), arg);
        });
      }));
    });

    describe('supports deep nested array model', () => {
      run('resource Product names:[{ langCode:String!:cn name:String! }] description:String! solds:Int comments:[{ title:String addresses:[{ region:String! country:String! }] }]', iterateFile((arg) => {
        it(`creates file "${arg.fileName}"`, () => {
          compareDirectory(path.join(__dirname, '../expected/resource/supports-deep-nested-array-model'), arg);
        });
      }));
    });

    describe('supports references in nested model', () => {
      run('resource User article:{ post:Post comments:[Comment] }', iterateFile((arg) => {
        it(`creates file "${arg.fileName}"`, () => {
          compareDirectory(path.join(__dirname, '../expected/resource/supports-references-in-nested-model'), arg);
        });
      }));
    });

    describe('references in nested model has correct orders', () => {
      run('resource User settings:{ push:PushSetting mobile:{ ios:IOSSetting android:AndroidSetting } } articles:{ titles:[Title] posts:[Post] comments:{ contents:[{ commentor:User }] } }', iterateFile((arg) => {
        it(`creates file "${arg.fileName}"`, () => {
          compareDirectory(path.join(__dirname, '../expected/resource/references-in-nested-model-has-correct-orders'), arg);
        });
      }));
    });

    describe('enum in nested model has prefixed name', () => {
      run('resource Account email:String/.*@wtf\\.com/! info:{ name:String! gender:Enum(Male,Female) } password:String!', iterateFile((arg) => {
        it(`creates file "${arg.fileName}"`, () => {
          compareDirectory(path.join(__dirname, '../expected/resource/enum-in-nested-model-has-prefixed-name'), arg);
        });
      }));
    });

    describe('enum in nested array model has singularized prefixed name', () => {
      run('resource User posts:[{ title:String title:String kind:Enum(science,math,english)', iterateFile((arg) => {
        it(`creates file "${arg.fileName}"`, () => {
          compareDirectory(path.join(__dirname, '../expected/resource/enum-in-nested-array-model-has-singularized-prefixed-name'), arg);
        });
      }));
    });

    describe('supports nestable', () => {
      run('resource User address:addressSchema addresses:[addressSchema]', iterateFile((arg) => {
        it(`creates file "${arg.fileName}"`, () => {
          compareDirectory(path.join(__dirname, '../expected/resource/supports-nestable'), arg);
        });
      }));
    });

    describe('requires mixed and objectId in same line', () => {
      run('resource User experience:Mixed post:Post', iterateFile((arg) => {
        it(`creates file "${arg.fileName}"`, () => {
          compareDirectory(path.join(__dirname, '../expected/resource/requires-mixed-and-object-id-in-same-line'), arg);
        });
      }));
    });

    describe('requires mixed, file and objectId in same line', () => {
      run('resource User experience:Mixed post:Post avatar:AvatarUploader', iterateFile((arg) => {
        it(`creates file "${arg.fileName}"`, () => {
          compareDirectory(path.join(__dirname, '../expected/resource/requires-mixed-file-and-object-id-in-same-line'), arg);
        });
      }));
    });

    describe('requires uploaders after nestables', () => {
      run('resource User experience:experienceSchema avatar:AvatarUploader', iterateFile((arg) => {
        it(`creates file "${arg.fileName}"`, () => {
          compareDirectory(path.join(__dirname, '../expected/resource/requires-uploaders-after-nestables'), arg);
        });
      }));
    });

  });
});
