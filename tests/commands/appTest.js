const fs = require('fs');
const path = require('path');
const {
  setupTestCase,
  tearDownTest,
  runTestCase,
  iterateExpectedFiles,
  getTempDirectory
} = require('scaffold-kit-quality-testing');
const app = require('../../lib/app');

describe('app command: ', () => {

  describe('creates an app in given directory', () => {
    const handle = setupTestCase({
      app,
      expects: path.join(__dirname, '../expected/app/brand-new-app'),
      command: 'app brand-new-app'
    });
    beforeAll(runTestCase(handle));
    afterAll(tearDownTest(handle));
    iterateExpectedFiles(handle, ({ message, expected, generated }) => {
      it(message, () => {
        expect(generated()).toBe(expected);
      });
    });
  });

  describe('options: ', () => {
    const handle = setupTestCase({
      app,
      expects: path.join(__dirname, '../expected/app/git-init'),
      command: 'app git-init --git-init'
    });
    beforeAll(runTestCase(handle));
    afterAll(tearDownTest(handle));
    it('creates directory ".git"', () => {
      const where = getTempDirectory(handle);
      expect(fs.existsSync(path.join(where, 'git-init/.git'))).toBe(true);
    });
  });
});
