const path = require('path');
const {
  setupTest,
  cleanUpTest,
  executeTest,
  compareDirectory,
  iterateFile
} = require('scaffold-kit/test');
const app = require('../../lib/app');

beforeAll(setupTest(app, 'nestable'));

afterAll(cleanUpTest('nestable'));

executeTest('nestable', (run) => {
  describe('nestable command: ', () => {

    describe('supports primitive types', () => {
      run('nestable Address region:String line1:String line2:String country:String', iterateFile((arg) => {
        it(`creates file "${arg.fileName}"`, () => {
          compareDirectory(path.join(__dirname, '../expected/resource/supports-primitive-types'), arg);
        });
      }));
    });

    describe('supports enum type', () => {
      run('nestable Address country:Enum(China,US)', iterateFile((arg) => {
        it(`creates file "${arg.fileName}"`, () => {
          compareDirectory(path.join(__dirname, '../expected/resource/supports-enum-type'), arg);
        });
      }));
    });

    describe('supports nested model', () => {
      run('nestable Address country:String region:String line:{ one:String two:String } city:String! postalCode:String', iterateFile((arg) => {
        it(`creates file "${arg.fileName}"`, () => {
          compareDirectory(path.join(__dirname, '../expected/resource/supports-nested-model'), arg);
        });
      }));
    });

    describe('supports reference types', () => {
      run('nestable Post comments:[Comment] author:Author title:String content:String subtitle:String', iterateFile((arg) => {
        it(`creates file "${arg.fileName}"`, () => {
          compareDirectory(path.join(__dirname, '../expected/resource/supports-reference-types'), arg);
        });
      }));
    });

    describe('supports nested nestable', () => {
      run('nestable Person address:addressSchema name:String', iterateFile((arg) => {
        it(`creates file "${arg.fileName}"`, () => {
          compareDirectory(path.join(__dirname, '../expected/resource/supports-nested-nestable'), arg);
        });
      }));
    });

  });
});
