const path = require('path');
const mkdirp = require('mkdirp');
const kebabCase = require('lodash.kebabcase');
const copyTpl = require('../utils/fs/copyTpl');
const mkdir = require('../utils/fs/mkdir');
const install = require('../utils/install');

module.exports = ({ args, options, projDir }) => {
  if (args[0]) {
    projDir = path.join(projDir, args[0]);
    mkdirp.sync(projDir);
    process.chdir(projDir);
  }
  const name = path.basename(projDir);

  const template = require('../utils/template')('app');
  const destination = require('../utils/destination')(projDir);

  // COPYING

  // Main directory

  // package.json
  copyTpl(
    template('_package.json'),
    destination('package.json'),
    {
      name: kebabCase(name),
      title: name
    }
  );

  // readme
  copyTpl(
    template('_README.md'),
    destination('README.md'),
    {
      name
    }
  );
  // eslintrc
  copyTpl(
    template('_.eslintrc'),
    destination('.eslintrc'),
    {
      eslintConfig: options.eslintConfig
    }
  );
  // git
  copyTpl(
    template('.git_ignore'),
    destination('.gitignore')
  );
  // nonula
  copyTpl(
    template('.nonularc'),
    destination('.nonularc')
  );
  // dobukulbira
  copyTpl(
    template('dobukulbira.config.js'),
    destination('dobukulbira.config.js')
  );
  // nodemon
  copyTpl(
    template('nodemon.json'),
    destination('nodemon.json')
  );
  // main app file
  copyTpl(
    template('app.js'),
    destination('app.js')
  );
  // jest manifest file
  if (!options.noTest) {
    copyTpl(
      template('jest.config.js'),
      destination('jest.config.js')
    );
  }

  // Config directory

  copyTpl(
    template('config/_dev.json'),
    destination('config/dev.json'),
    {
      name: kebabCase(name)
    }
  );
  copyTpl(
    template('config/_prod.json'),
    destination('config/prod.json'),
    {
      name: kebabCase(name)
    }
  );
  copyTpl(
    template('config/_test.json'),
    destination('config/test.json'),
    {
      name: kebabCase(name)
    }
  );

  // Middlewares directory

  copyTpl(
    template('middlewares/config.js'),
    destination('middlewares/config.js')
  );
  copyTpl(
    template('middlewares/router.js'),
    destination('middlewares/router.js')
  );

  // Schema definition

  copyTpl(
    template('schemas/schema.gql'),
    destination('schemas/schema.gql')
  );

  copyTpl(
    template('schemas/Date.gql'),
    destination('schemas/Date.gql')
  );

  copyTpl(
    template('resolvers/Date.js'),
    destination('resolvers/Date.js')
  );

  // tests
  if (!options.noTest) {
    copyTpl(
      template('tests/modelEnv.js'),
      destination('tests/modelEnv.js')
    );
  }

  // Make directories

  mkdir(destination('data'));
  mkdir(destination('models'));
  mkdir(destination('scripts'));
  if (!options.noTest) {
    mkdir(destination('tests/models'));
    mkdir(destination('tests/integration'));
  }

  // INSTALL
  if (options['skip-install']) {
    return;
  }

  [
    'koa', 'mongoose', 'graphql',
    'koa-body', 'koa-logger', 'koa-router', 'koa-mon', '@koa/cors',
    'graphql-tools', 'merge-graphql-schemas', 'apollo-server-koa',
    'noenv', 'lodash', 'glob'
  ].sort().map((dep) => install(dep));

  [
    'eslint', `eslint-config-${options.eslintConfig}`, 'nodemon', 'nonula', 'dobukulbira', 'jest', 'mexpect'
  ].sort().map((dep) => install(dep, true));
};
