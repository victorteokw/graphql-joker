const path = require('path');
const {
  setupTest,
  cleanUpTest,
  executeTest,
  compareDirectory,
  existDirectory,
  iterateFile,
  givenDestDir
} = require('scaffold-kit/test');
const app = require('../../lib/app');

beforeAll(setupTest(app, 'app'));

afterAll(cleanUpTest('app'));

executeTest('app', (run) => {
  describe('app command: ', () => {
    describe('creates an app in given directory', () => {
      run('app brand-new-app', iterateFile((arg) => {
        it(`creates file "${arg.fileName}"`, () => {
          compareDirectory(path.join(__dirname, '../expected/app/brand-new-app'), arg);
        });
      }));
    });
    describe('options: ', () => {
      run('app git-init --git-init', givenDestDir((arg) => {
        it('creates directory ".git"', () => {
          existDirectory('.git', arg);
        });
      }));
    });
  });
});
