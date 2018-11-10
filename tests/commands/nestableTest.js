const path = require('path');
const {
  setupTest,
  cleanUpTest,
  runTest,
  iterateFiles
} = require('scaffold-kit-quality-testing');
const app = require('../../lib/app');

beforeAll(setupTest('nestable', app, path.join(__dirname, '../expected/nestable')));

afterAll(cleanUpTest('nestable'));

describe('nestable command: ', () => {

  describe('supports primitive types', () => {
    beforeAll(runTest({
      group: 'nestable',
      template: 'supports-primitive-types',
      command: 'nestable Address region:String line1:String line2:String country:String'
    }));
    iterateFiles('nestable', 'supports-primitive-types', ({ filename, expected, generated }) => {
      it(`creates file '${filename}'`, () => {
        expect(generated(filename)).toBe(expected(filename));
      });
    });
  });

  describe('supports enum type', () => {
    beforeAll(runTest({
      group: 'nestable',
      template: 'supports-enum-type',
      command: 'nestable Address country:Enum(China,US)'
    }));
    iterateFiles('nestable', 'supports-enum-type', ({ filename, expected, generated }) => {
      it(`creates file '${filename}'`, () => {
        expect(generated(filename)).toBe(expected(filename));
      });
    });
  });

  describe('supports nested model', () => {
    beforeAll(runTest({
      group: 'nestable',
      template: 'supports-nested-model',
      command: 'nestable Address country:String region:String line:{ one:String! two:String } city:String! postalCode:String'
    }));
    iterateFiles('nestable', 'supports-nested-model', ({ filename, expected, generated }) => {
      it(`creates file '${filename}'`, () => {
        expect(generated(filename)).toBe(expected(filename));
      });
    });
  });

  describe('supports reference types', () => {
    beforeAll(runTest({
      group: 'nestable',
      template: 'supports-reference-types',
      command: 'nestable Post comments:[Comment] author:Author title:String content:String subtitle:String'
    }));
    iterateFiles('nestable', 'supports-reference-types', ({ filename, expected, generated }) => {
      it(`creates file '${filename}'`, () => {
        expect(generated(filename)).toBe(expected(filename));
      });
    });
  });

  describe('supports nested nestable', () => {
    beforeAll(runTest({
      group: 'nestable',
      template: 'supports-nested-nestable',
      command: 'nestable Person address:addressSchema name:String'
    }));
    iterateFiles('nestable', 'supports-nested-nestable', ({ filename, expected, generated }) => {
      it(`creates file '${filename}'`, () => {
        expect(generated(filename)).toBe(expected(filename));
      });
    });
  });
});
