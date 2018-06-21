'use strict';
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('yo amur:app brand-new-app', () => {
  let context;
  beforeAll(() => {
    context = helpers
      .run(path.join(__dirname, '../generators/app'))
      .withOptions({ skipInstall: false })
      .withPrompts({ name: 'brand-new-app' });
    return context;
  });

  it('creates files and directories', () => {
    const expectedDir = path.join(__dirname, 'expected/brand-new-app');
    const filesAndDirs = glob.sync(expectedDir + '/**/*');
    filesAndDirs.forEach((f) => {
      if (fs.lstatSync(f).isDirectory()) {
        assert(fs.lstatSync(path.join(context.targetDirectory, path.relative(expectedDir, f))).isDirectory());
      } else {
        if (path.relative(expectedDir, f) === 'package.json') {
          const fileContents = fs.readFileSync(path.join(context.targetDirectory, path.relative(expectedDir, f))).toString();
          const j = JSON.parse(fileContents);
          assert(j.name === 'brand-new-app');
          assert(j.title === 'brand-new-app');
          assert(j.version === '0.0.1');
          assert(j.private === true);
          assert(j.main === 'app.js');
          assert.deepEqual(j.scripts, {
            "start": "nodemon app.js",
            "console": "dobukulbira",
            "test": "jest",
            "seed": "nonula seed",
            "drop": "nonula drop"
          });

          [
            'koa', 'mongoose', 'graphql',
            'koa-body', 'koa-logger', 'koa-router', 'koa2-mongoose', '@koa/cors',
            'graphql-tools', 'merge-graphql-schemas', 'apollo-server-koa',
            'noenv', 'lodash', 'glob'
          ].forEach((name) => {
            assert(!!j.dependencies[name]);
          });

          [
            'eslint', 'nodemon', 'nonula', 'dobukulbira', 'jest', 'jest-cli'
          ].forEach((name) => {
            assert(!!j.devDependencies[name]);
          });
        } else {
          assert.fileContent(path.relative(expectedDir, f), fs.readFileSync(f).toString());
        }
      }
    });
  });
});
