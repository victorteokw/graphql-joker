const fs = require('fs');
const path = require('path');
const {
  setupTest,
  cleanUpTest,
  runTest,
  iterateFiles,
  getDirectory
} = require('scaffold-kit-quality-testing');
const app = require('../../lib/app');

beforeAll(setupTest('app', app, path.join(__dirname, '../expected/app')));

//afterAll(cleanUpTest('app'));

describe('app command: ', () => {
  describe('creates an app in given directory', () => {
    beforeAll(runTest({
      group: 'app',
      template: 'brand-new-app',
      command: 'app brand-new-app'
    }));
    iterateFiles('app', 'brand-new-app', ({ filename, expected, generated }) => {
      it(`creates file '${filename}'`, () => {
        expect(generated(`brand-new-app/${filename}`)).toBe(expected(filename));
      });
    });
  });
  describe('options: ', () => {
    beforeAll(runTest({
      group: 'app',
      template: 'git-init',
      command: 'app git-init --git-init'
    }));
    it('creates directory ".git"', () => {
      const where = getDirectory('app', 'git-init');
      expect(fs.existsSync(path.join(where, 'git-init/.git'))).toBe(true);
    });
  });
});
