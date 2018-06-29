const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');
const assert = require('assert');
const fileContent = require('./assertions/fileContent');
const runGenerator = require('./setup/runGenerator');

describe('amur app brand-new-app', () => {

  const expectedDir = path.join(__dirname, 'expected/brand-new-app');
  const filesAndDirs = glob.sync(expectedDir + '/**/*');
  let destDir, projDir, assertFileContent;

  beforeAll(() => {
    destDir = runGenerator('app', ['brand-new-app']);
    projDir = path.join(destDir, 'brand-new-app');
    assertFileContent = fileContent(projDir);
  });

  afterAll(() => {
    fs.removeSync(destDir);
  });

  filesAndDirs.forEach((f) => {
    if (fs.lstatSync(f).isDirectory()) {
      it(`create directory ${path.relative(expectedDir, f)}`, () => {
        assert(fs.lstatSync(path.join(projDir, path.relative(expectedDir, f))).isDirectory());
      });
    } else {
      if (path.relative(expectedDir, f) === 'package.json') {
        it('has name field', () => {
          const fileContents = fs.readFileSync(path.join(projDir, path.relative(expectedDir, f))).toString();
          const j = JSON.parse(fileContents);
          assert(j.name === 'brand-new-app');
        });
        it('has title field', () => {
          const fileContents = fs.readFileSync(path.join(projDir, path.relative(expectedDir, f))).toString();
          const j = JSON.parse(fileContents);
          assert(j.title === 'brand-new-app');
        });
        it('version is 0.0.1', () => {
          const fileContents = fs.readFileSync(path.join(projDir, path.relative(expectedDir, f))).toString();
          const j = JSON.parse(fileContents);
          assert(j.version === '0.0.1');
        });
        it('should be a private project', () => {
          const fileContents = fs.readFileSync(path.join(projDir, path.relative(expectedDir, f))).toString();
          const j = JSON.parse(fileContents);
          assert(j.private === true);
        });
        it('has a main file called app.js', () => {
          const fileContents = fs.readFileSync(path.join(projDir, path.relative(expectedDir, f))).toString();
          const j = JSON.parse(fileContents);
          assert(j.main === 'app.js');
        });
        it('sets correct scripts', () => {
          const fileContents = fs.readFileSync(path.join(projDir, path.relative(expectedDir, f))).toString();
          const j = JSON.parse(fileContents);
          assert.deepEqual(j.scripts, {
            "start": "nodemon app.js",
            "console": "dobukulbira",
            "test": "jest",
            "seed": "nonula seed",
            "drop": "nonula drop"
          });
        });
        [
          'koa', 'mongoose', 'graphql',
          'koa-body', 'koa-logger', 'koa-router', 'koa-mon', '@koa/cors',
          'graphql-tools', 'merge-graphql-schemas', 'apollo-server-koa',
          'noenv', 'lodash', 'glob'
        ].forEach((name) => {
          it(`installs the dependency ${name}`, () => {
            const fileContents = fs.readFileSync(path.join(projDir, path.relative(expectedDir, f))).toString();
            const j = JSON.parse(fileContents);
            assert(!!j.dependencies[name]);
          });
        });
        [
          'eslint', 'eslint-config-man', 'nodemon', 'nonula', 'dobukulbira', 'jest', 'mexpect'
        ].forEach((name) => {
          it(`installs the dev dependency ${name}`, () => {
            const fileContents = fs.readFileSync(path.join(projDir, path.relative(expectedDir, f))).toString();
            const j = JSON.parse(fileContents);
            assert(!!j.devDependencies[name]);
          });
        });
      } else {
        it(`create file ${path.relative(expectedDir, f)} with correct content.`, () => {
          assertFileContent(path.relative(expectedDir, f), fs.readFileSync(f).toString());
        });
      }
    }
  });
});
