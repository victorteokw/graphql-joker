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

  // Create amur config file is needed

  if (Object.keys(options.nonDefaultOptions).length > 0) {
    updateJSON(
      destination('.amurrc.json'),
      () => options.nonDefaultOptions
    );
  }

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
    { soft: !options.overwrite }
  );
  // eslintrc
  copyTpl(
    template('_.eslintrc'),
    destination('.eslintrc'),
    { eslintConfig: options.eslintConfig },
    { soft: !options.overwrite }
  );
  // git
  copyTpl(
    template('.git_ignore'),
    destination('.gitignore'),
    undefined,
    { soft: !options.overwrite }
  );
  // nodemon
  copyTpl(
    template('nodemon.json'),
    destination('nodemon.json'),
    undefined,
    { soft: !options.overwrite }
  );
  // main app file
  copyTpl(
    template('_main.js'),
    destination(`${options.main}.js`),
    {
      mainVarName: options.main,
      mainFileRequires: orm.mainFileRequires.call ? orm.mainFileRequires(options) : orm.mainFileRequires,
      mainFileSetup: orm.mainFileSetup.call ? orm.mainFileSetup(options) : orm.mainFileSetup,
      mainFileContext: orm.mainFileContext.call ? orm.mainFileContext(options): orm.mainFileContext,
      mainConnect: orm.mainConnect.call ? orm.mainConnect(options) : orm.mainConnect,
      schemaDir: options.schemaDir,
      resolverDir: options.resolverDir
    },
    { soft: !options.overwrite }
  );

  // Config directory

  writeToFile(
    JSON.stringify(orm.updateConfigJson({
      app: {
        port: options.port.toString()
      }
    }, 'dev', options), null, 2) + '\n',
    destination('config/dev.json'),
    { soft: !options.overwrite }
  );

  writeToFile(
    JSON.stringify(orm.updateConfigJson({
      app: {
        port: `process.env.PORT || ${options.port}`
      }
    }, 'prod', options), null, 2) + '\n',
    destination('config/prod.json'),
    { soft: !options.overwrite }
  );

  // Middlewares directory

  copyTpl(
    template('middlewares/index.js'),
    destination('middlewares/index.js'),
    undefined,
    { soft: !options.overwrite }
  );

  // Schema definition

  copyTpl(
    template('schemas/schema.gql'),
    destination(`${options.schemaDir}/schema.gql`),
    undefined,
    { soft: !options.overwrite }
  );

  copyTpl(
    template('schemas/Date.gql'),
    destination(`${options.schemaDir}/Date.gql`),
    undefined,
    { soft: !options.overwrite }
  );

  copyTpl(
    template('schemas/Mixed.gql'),
    destination(`${options.schemaDir}/Mixed.gql`),
    undefined,
    { soft: !options.overwrite }
  );

  copyTpl(
    template('schemas/Upload.gql'),
    destination(`${options.schemaDir}/Upload.gql`),
    undefined,
    { soft: !options.overwrite }
  );

  copyTpl(
    template('schemas/File.gql'),
    destination(`${options.schemaDir}/File.gql`),
    undefined,
    { soft: !options.overwrite }
  );

  // Resolvers

  copyTpl(
    template('resolvers/Date.js'),
    destination(`${options.resolverDir}/Date.js`),
    undefined,
    { soft: !options.overwrite }
  );

  copyTpl(
    template('resolvers/Mixed.js'),
    destination(`${options.resolverDir}/Mixed.js`),
    undefined,
    { soft: !options.overwrite }
  );

  copyTpl(
    template('resolvers/Upload.js'),
    destination(`${options.resolverDir}/Upload.js`),
    undefined,
    { soft: !options.overwrite }
  );

  copyTpl(
    template('resolvers/File.js'),
    destination(`${options.resolverDir}/File.js`),
    undefined,
    { soft: !options.overwrite }
  );

  // ORM specific copies and appends

  orm.createFiles.forEach((f) => {
    if (f[0].call) {
      writeToFile(f[0](options), destination(f[1].call ? f[1](options) : f[1]), { soft: !options.overwrite });
    } else {
      copyTpl(f[0], destination(f[1].call ? f[1](options) : f[1]), options, { soft: !options.overwrite });
    }
  });

  orm.appendFiles.forEach((f) => {
    if (f.call) {
      appendFile(f[0](options), f[1].call ? destination(f[1](options)) : destination(f[1]));
    } else {
      appendFile(fs.readFileSync(f[0]).toString(), destination(f[1].call ? f[1](options) : f[1]));
    }
  });

  // Make directories

  copyTpl(
    template('.keep'),
    destination(`${options.dataDir}/.keep`),
    undefined,
    { soft: !options.overwrite }
  );
  copyTpl(
    template('.keep'),
    destination(`${options.modelDir}/.keep`),
    undefined,
    { soft: !options.overwrite }
  );
  copyTpl(
    template('.keep'),
    destination('scripts/.keep'),
    undefined,
    { soft: !options.overwrite }
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
    ].concat(orm.packageRequirements(options)).sort().map((dep) => install(dep[0], dep[1], false, options.mockInstall));

    const devDependencies = [
      ['eslint', 'latest'],
      [`eslint-config-${options.eslintConfig}`, 'latest'],
      ['nodemon', 'latest']
    ].concat(orm.devPackageRequirements(options));
    devDependencies.sort().map((dep) => install(dep[0], dep[1], true, options.mockInstall));
  }

  if (options.gitInit) {
    run('git init');
  }

};
