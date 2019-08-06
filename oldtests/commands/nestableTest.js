const path = require('path');
const {
  setupTestCase,
  tearDownTest,
  runTestCase,
  iterateExpectedFiles
} = require('scaffold-kit-quality-testing');
const app = require('../../lib/app');

describe('nestable command: ', () => {

  describe('supports primitive types', () => {
    const handle = setupTestCase({
      app,
      expects: path.join(__dirname, '../expected/nestable/supports-primitive-types'),
      command: 'nestable Address region:String line1:String line2:String country:String'
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
      expects: path.join(__dirname, '../expected/nestable/supports-enum-type'),
      command: 'nestable Address country:Enum(China,US)'
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
      expects: path.join(__dirname, '../expected/nestable/supports-nested-model'),
      command: 'nestable Address country:String region:String line:{ one:String! two:String } city:String! postalCode:String'
    });
    beforeAll(runTestCase(handle));
    afterAll(tearDownTest(handle));
    iterateExpectedFiles(handle, ({ message, expected, generated }) => {
      it(message, () => {
        expect(generated()).toBe(expected);
      });
    });
  });

  describe('supports reference types', () => {
    const handle = setupTestCase({
      app,
      expects: path.join(__dirname, '../expected/nestable/supports-reference-types'),
      command: 'nestable Post comments:[Comment] author:Author title:String content:String subtitle:String'
    });
    beforeAll(runTestCase(handle));
    afterAll(tearDownTest(handle));
    iterateExpectedFiles(handle, ({ message, expected, generated }) => {
      it(message, () => {
        expect(generated()).toBe(expected);
      });
    });
  });

  describe('supports nested nestable', () => {
    const handle = setupTestCase({
      app,
      expects: path.join(__dirname, '../expected/nestable/supports-nested-nestable'),
      command: 'nestable Person address:addressSchema name:String'
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
