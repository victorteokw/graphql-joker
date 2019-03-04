const orms = require('../../orms');
const path = require('path');
const fs = require('fs');
const kebabCase = require('lodash/kebabCase');
const merge = require('lodash/merge');
const {
  useTemplatesFrom,
  updateJSONFile,
  createFile,
  keepDirectoryInGit,
  appendFile,
  installDependency,
  runShellCommand
} = require('scaffold-kit/executor');

module.exports = ({ options, wd }) => {

  const orm = orms[options.orm];

  options.name = path.basename(wd);

  useTemplatesFrom(path.join(__dirname, 'templates'));

  // Create package.json file

  const packageContent = {};
  packageContent.name = kebabCase(options.name);
  packageContent.version = '0.0.1';
  packageContent.private = true;
  packageContent.main = `${options.main}.js`;
  packageContent.scripts = Object.assign({
    'start': `nodemon ${options.main}.js`
  }, orm.scripts);
  packageContent.dependencies = {};
  packageContent.devDependencies = {};

  updateJSONFile({
    at: 'package.json',
    updator: (original) => merge(original, packageContent),
    rollbacker: () => ({ dependencies: {}, devDependencies: {}})
  });

  // COPYING

  // Main directory

  createFile({
    at: 'README.md',
    context: { name: options.name }
  });

  createFile({
    at: '.eslintrc',
    context: { eslintConfig: options.eslintConfig }
  });

  createFile({
    from: '.git_ignore',
    at: '.gitignore'
  });

  createFile({
    at: 'nodemon.json'
  });

  createFile({
    from: 'main.js',
    at: `${options.main}.js`,
    context: {
      mainVarName: options.main,
      mainFileRequires: orm.mainFileRequires.call ? orm.mainFileRequires(options) : orm.mainFileRequires,
      mainFileSetup: orm.mainFileSetup.call ? orm.mainFileSetup(options) : orm.mainFileSetup,
      mainFileContext: orm.mainFileContext.call ? orm.mainFileContext(options): orm.mainFileContext,
      mainConnect: orm.mainConnect.call ? orm.mainConnect(options) : orm.mainConnect,
      schemaDir: options.schemaDir,
      resolverDir: options.resolverDir
    }
  });

  createFile({
    content: JSON.stringify(orm.updateConfigJson({
      app: {
        port: options.port.toString()
      }
    }, 'dev', options), null, 2) + '\n',
    at: 'config/dev.json'
  });

  createFile({
    content: JSON.stringify(orm.updateConfigJson({
      app: {
        port: `process.env.PORT || ${options.port}`
      }
    }, 'prod', options), null, 2) + '\n',
    at: 'config/prod.json'
  });

  createFile({
    at: 'middlewares/index.js'
  });

  createFile({
    from: 'schemas/schema.gql',
    at: `${options.schemaDir}/schema.gql`
  });

  createFile({
    from: 'schemas/Date.gql',
    at: `${options.schemaDir}/Date.gql`
  });

  createFile({
    from: 'schemas/Mixed.gql',
    at: `${options.schemaDir}/Mixed.gql`
  });

  createFile({
    from: 'schemas/Upload.gql',
    at: `${options.schemaDir}/Upload.gql`
  });

  createFile({
    from: 'schemas/File.gql',
    at: `${options.schemaDir}/File.gql`
  });

  createFile({
    from: 'resolvers/Date.js',
    at: `${options.resolverDir}/Date.js`
  });

  createFile({
    from: 'resolvers/Mixed.js',
    at: `${options.resolverDir}/Mixed.js`
  });

  createFile({
    from: 'resolvers/Upload.js',
    at: `${options.resolverDir}/Upload.js`
  });

  createFile({
    from: 'resolvers/File.js',
    at: `${options.resolverDir}/File.js`
  });

  keepDirectoryInGit({
    at: `${options.dataDir}`
  });

  keepDirectoryInGit({
    at: `${options.modelDir}`
  });

  keepDirectoryInGit({
    at: 'scripts'
  });

  // ORM specific copies and appends

  orm.createFiles.forEach((f) => {
    if (f[0].call) {
      createFile({
        content: f[0](options),
        at: f[1].call ? f[1](options) : f[1],
        context: options
      });
    } else {
      createFile({
        from: f[0],
        at: f[1].call ? f[1](options) : f[1],
        context: options
      });
    }
  });

  orm.appendFiles.forEach((f) => {
    if (f.call) {
      appendFile({
        from: f[0](options),
        at: f[1].call ? f[1](options) : f[1],
        context: options
      });
    } else {
      appendFile({
        content: fs.readFileSync(f[0]).toString(),
        at: f[1].call ? f[1](options) : f[1],
        context: options
      });
    }
  });

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
    ].concat(orm.packageRequirements(options)).map((dep) =>
      installDependency({
        package: dep[0],
        version: dep[1],
        dev: false
      })
    );

    const devDependencies = [
      ['eslint', 'latest'],
      [`eslint-config-${options.eslintConfig}`, 'latest'],
      ['nodemon', 'latest']
    ].concat(orm.devPackageRequirements(options));
    devDependencies.map((dep) =>
      installDependency({
        package: dep[0],
        version: dep[1],
        dev: true
      })
    );
  }

  if (options.gitInit) {
    runShellCommand({
      command: 'git init',
      reverseCommand: 'rm -rf .git'
    });
  }
};
