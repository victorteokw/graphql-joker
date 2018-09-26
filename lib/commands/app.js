const orms = require('../orms');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const kebabCase = require('lodash.kebabcase');
const copyTpl = require('../utils/fs/copyTpl');
const writeToFile = require('../utils/fs/writeToFile');
const appendFile = require('../utils/fs/appendFile');
const install = require('../utils/install');
const run = require('../utils/run');

module.exports = ({ args, options, projDir }) => {

  const orm = orms[options.orm];

  if (args[0]) {
    projDir = path.join(projDir, args[0]);
    mkdirp.sync(projDir);
    process.chdir(projDir);
  }
  options.name = path.basename(projDir);

  const template = require('../utils/template')('app');
  const destination = require('../utils/destination')(projDir);

  // Create package.json file

  const packageContent = {};
  packageContent.name = kebabCase(options.name);
  packageContent.title = options.name;
  packageContent.version = '0.0.1';
  packageContent.private = true;
  packageContent.main = `${options.main}.js`;
  packageContent.scripts = Object.assign({
    'start': `nodemon ${options.main}.js`
  }, orm.scripts);
  packageContent.dependencies = {};
  packageContent.devDependencies = {};

  writeToFile(
    JSON.stringify(packageContent, null, 2),
    destination('package.json')
  );

  // COPYING

  // Main directory

  // readme
  copyTpl(
    template('_README.md'),
    destination('README.md'),
    {
      name: options.name
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
  // nodemon
  copyTpl(
    template('nodemon.json'),
    destination('nodemon.json')
  );
  // main app file
  copyTpl(
    template('_main.js'),
    destination(`${options.main}.js`),
    {
      mainVarName: options.main,
      mainFileRequires: orm.mainFileRequires,
      mainFileSetup: orm.mainFileSetup,
      mainFileContext: orm.mainFileContext,
      mainConnect: orm.mainConnect
    }
  );

  // Config directory

  writeToFile(
    JSON.stringify(orm.updateConfigJson({
      app: {
        port: options.port.toString()
      }
    }, 'dev', options), null, 2) + '\n',
    destination('config/dev.json')
  );

  writeToFile(
    JSON.stringify(orm.updateConfigJson({
      app: {
        port: `process.env.PORT || ${options.port}`
      }
    }, 'prod', options), null, 2) + '\n',
    destination('config/prod.json')
  );

  // Middlewares directory

  copyTpl(
    template('middlewares/index.js'),
    destination('middlewares/index.js')
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
    template('schemas/Mixed.gql'),
    destination('schemas/Mixed.gql')
  );

  copyTpl(
    template('schemas/Upload.gql'),
    destination('schemas/Upload.gql')
  );

  copyTpl(
    template('schemas/File.gql'),
    destination('schemas/File.gql')
  );

  // Resolvers

  copyTpl(
    template('resolvers/Date.js'),
    destination('resolvers/Date.js')
  );

  copyTpl(
    template('resolvers/Mixed.js'),
    destination('resolvers/Mixed.js')
  );

  copyTpl(
    template('resolvers/Upload.js'),
    destination('resolvers/Upload.js')
  );

  copyTpl(
    template('resolvers/File.js'),
    destination('resolvers/File.js')
  );

  // ORM specific copies and appends

  orm.createFiles.forEach((f) => {
    copyTpl(f[0], destination(f[1]));
  });

  orm.appendFiles.forEach((f) => {
    appendFile(fs.readFileSync(f[0]).toString(), destination(f[1]));
  });

  // Make directories

  copyTpl(
    template('.keep'),
    destination('data/.keep')
  );
  copyTpl(
    template('.keep'),
    destination('models/.keep')
  );
  copyTpl(
    template('.keep'),
    destination('scripts/.keep')
  );

  // INSTALL
  if (!options.skipInstall) {
    [
      ['noenv', 'latest'],
      ['graphql', '^14.0.0'],
      ['apollo-server', '^2.0.0'],
      ['merge-graphql-schemas', '^1.0.0'],
      ['graphql-middleware', '^1.0.0'],
      ['glob', 'latest'],
      ['lodash.merge', 'latest'],
      ['lodash.map', 'latest']
    ].concat(orm.packageRequirements(options)).sort().map((dep) => install(dep[0], dep[1]));

    const devDependencies = [
      ['eslint', 'latest'],
      [`eslint-config-${options.eslintConfig}`, 'latest'],
      ['nodemon', 'latest']
    ].concat(orm.devPackageRequirements(options));
    devDependencies.sort().map((dep) => install(dep[0], dep[1], true));
  }

  if (options.gitInit) {
    run('git init');
  }

};
