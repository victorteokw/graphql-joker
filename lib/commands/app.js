const orms = require('../orms');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const kebabCase = require('lodash.kebabcase');
const copyTpl = require('../utils/fs/copyTpl');
const writeToFile = require('../utils/fs/writeToFile');
const appendFile = require('../utils/fs/appendFile');
const updateJSON = require('../utils/fs/updateJSON');
const install = require('../utils/install');
const run = require('../utils/run');
const merge = require('lodash.merge');

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

  updateJSON(
    destination('package.json'),
    (original) => merge(original, packageContent)
  );

  // COPYING

  // Main directory

  // readme
  copyTpl(
    template('_README.md'),
    destination('README.md'),
    { name: options.name },
    { soft: true }
  );
  // eslintrc
  copyTpl(
    template('_.eslintrc'),
    destination('.eslintrc'),
    { eslintConfig: options.eslintConfig },
    { soft: true }
  );
  // git
  copyTpl(
    template('.git_ignore'),
    destination('.gitignore'),
    undefined,
    { soft: true }
  );
  // nodemon
  copyTpl(
    template('nodemon.json'),
    destination('nodemon.json'),
    undefined,
    { soft: true }
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
    },
    { soft: true }
  );

  // Config directory

  writeToFile(
    JSON.stringify(orm.updateConfigJson({
      app: {
        port: options.port.toString()
      }
    }, 'dev', options), null, 2) + '\n',
    destination('config/dev.json'),
    { soft: true }
  );

  writeToFile(
    JSON.stringify(orm.updateConfigJson({
      app: {
        port: `process.env.PORT || ${options.port}`
      }
    }, 'prod', options), null, 2) + '\n',
    destination('config/prod.json'),
    { soft: true }
  );

  // Middlewares directory

  copyTpl(
    template('middlewares/index.js'),
    destination('middlewares/index.js'),
    undefined,
    { soft: true }
  );

  // Schema definition

  copyTpl(
    template('schemas/schema.gql'),
    destination('schemas/schema.gql'),
    undefined,
    { soft: true }
  );

  copyTpl(
    template('schemas/Date.gql'),
    destination('schemas/Date.gql'),
    undefined,
    { soft: true }
  );

  copyTpl(
    template('schemas/Mixed.gql'),
    destination('schemas/Mixed.gql'),
    undefined,
    { soft: true }
  );

  copyTpl(
    template('schemas/Upload.gql'),
    destination('schemas/Upload.gql'),
    undefined,
    { soft: true }
  );

  copyTpl(
    template('schemas/File.gql'),
    destination('schemas/File.gql'),
    undefined,
    { soft: true }
  );

  // Resolvers

  copyTpl(
    template('resolvers/Date.js'),
    destination('resolvers/Date.js'),
    undefined,
    { soft: true }
  );

  copyTpl(
    template('resolvers/Mixed.js'),
    destination('resolvers/Mixed.js'),
    undefined,
    { soft: true }
  );

  copyTpl(
    template('resolvers/Upload.js'),
    destination('resolvers/Upload.js'),
    undefined,
    { soft: true }
  );

  copyTpl(
    template('resolvers/File.js'),
    destination('resolvers/File.js'),
    undefined,
    { soft: true }
  );

  // ORM specific copies and appends

  orm.createFiles.forEach((f) => {
    if (f[0].call) {
      writeToFile(f[0](options), destination(f[1]), { soft: true });
    } else {
      copyTpl(f[0], destination(f[1]), undefined, { soft: true });
    }

  });

  orm.appendFiles.forEach((f) => {
    if (f.call) {
      appendFile(f[0](options), destination(f[1]));
    } else {
      appendFile(fs.readFileSync(f[0]).toString(), destination(f[1]));
    }
  });

  // Make directories

  copyTpl(
    template('.keep'),
    destination('data/.keep'),
    undefined,
    { soft: true }
  );
  copyTpl(
    template('.keep'),
    destination('models/.keep'),
    undefined,
    { soft: true }
  );
  copyTpl(
    template('.keep'),
    destination('scripts/.keep'),
    undefined,
    { soft: true }
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
