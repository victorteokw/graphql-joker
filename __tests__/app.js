const path = require('path');
const fs = require('fs');
const glob = require('glob');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('amur app brand-new-app', () => {
  let context;
  beforeAll(() => {
    context = helpers
      .run(path.join(__dirname, '../generators/app'))
      .withOptions({ skipInstall: false })
      .withPrompts({ name: 'brand-new-app' });
    return context;
  });
  const expectedDir = path.join(__dirname, 'expected/brand-new-app');
  const filesAndDirs = glob.sync(expectedDir + '/**/*');

  filesAndDirs.forEach((f) => {
    if (fs.lstatSync(f).isDirectory()) {
      it(`create directory ${path.relative(expectedDir, f)}`, () => {
        assert(fs.lstatSync(path.join(context.targetDirectory, path.relative(expectedDir, f))).isDirectory());
      });
    } else {
      if (path.relative(expectedDir, f) === 'package.json') {
        it('has name field', () => {
          const fileContents = fs.readFileSync(path.join(context.targetDirectory, path.relative(expectedDir, f))).toString();
          const j = JSON.parse(fileContents);
          assert(j.name === 'brand-new-app');
        });
        it('has title field', () => {
          const fileContents = fs.readFileSync(path.join(context.targetDirectory, path.relative(expectedDir, f))).toString();
          const j = JSON.parse(fileContents);
          assert(j.title === 'brand-new-app');
        });
        it('version is 0.0.1', () => {
          const fileContents = fs.readFileSync(path.join(context.targetDirectory, path.relative(expectedDir, f))).toString();
          const j = JSON.parse(fileContents);
          assert(j.version === '0.0.1');
        });
        it('should be a private project', () => {
          const fileContents = fs.readFileSync(path.join(context.targetDirectory, path.relative(expectedDir, f))).toString();
          const j = JSON.parse(fileContents);
          assert(j.private === true);
        });
        it('has a main file called app.js', () => {
          const fileContents = fs.readFileSync(path.join(context.targetDirectory, path.relative(expectedDir, f))).toString();
          const j = JSON.parse(fileContents);
          assert(j.main === 'app.js');
        });
        it('sets correct scripts', () => {
          const fileContents = fs.readFileSync(path.join(context.targetDirectory, path.relative(expectedDir, f))).toString();
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
          'koa-body', 'koa-logger', 'koa-router', 'koa2-mongoose', '@koa/cors',
          'graphql-tools', 'merge-graphql-schemas', 'apollo-server-koa',
          'noenv', 'lodash', 'glob'
        ].forEach((name) => {
          it(`installs the dependency ${name}`, () => {
            const fileContents = fs.readFileSync(path.join(context.targetDirectory, path.relative(expectedDir, f))).toString();
            const j = JSON.parse(fileContents);
            assert(!!j.dependencies[name]);
          });
        });
        [
          'eslint', 'nodemon', 'nonula', 'dobukulbira', 'jest', 'jest-cli'
        ].forEach((name) => {
          it(`installs the dev dependency ${name}`, () => {
            const fileContents = fs.readFileSync(path.join(context.targetDirectory, path.relative(expectedDir, f))).toString();
            const j = JSON.parse(fileContents);
            assert(!!j.devDependencies[name]);
          });
        });
      } else {
        it(`create file ${path.relative(expectedDir, f)} with correct content.`, () => {
          assert.fileContent(path.relative(expectedDir, f), fs.readFileSync(f).toString());
        });

      }
    }
  });

});
