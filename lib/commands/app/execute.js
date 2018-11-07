const orms = require('../../orms');
const path = require('path');
const fs = require('fs');
const kebabCase = require('lodash/kebabCase');
const merge = require('lodash/merge');
const { pushInstruction, pushInstructions } = require('scaffold-kit/executor');

module.exports = ({ options, wd }) => {

  const orm = orms[options.orm];

  options.name = path.basename(wd);

  const template = (name) =>
    path.join(__dirname, 'templates', name);

  // Create amur config file is needed

  // if (Object.keys(options.nonDefaultOptions).length > 0) {
  //   pushInstruction('app', {
  //     updateJSONFile: {
  //       path: '.amurrc.json',
  //       updator: () => options.nonDefaultOptions
  //     }
  //   });
  // }

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

  pushInstruction({
    updateJSONFile: {
      at: 'package.json',
      updator: (original) => merge(original, packageContent)
    }
  });

  // COPYING

  // Main directory

  pushInstructions([
    {
      createFiles: [
        {
          from: template('_README.md'),
          at: 'README.md',
          context: { name: options.name },
          overwrite: options.overwrite
        },
        {
          src: template('_.eslintrc'),
          at: '.eslintrc',
          context: { eslintConfig: options.eslintConfig },
          overwrite: options.overwrite
        },
        {
          src: template('.git_ignore'),
          at: '.gitignore',
          overwrite: options.overwrite
        },
        {
          src: template('nodemon.json'),
          at: 'nodemon.json',
          overwrite: options.overwrite
        },
        {
          src: template('_main.js'),
          at: `${options.main}.js`,
          context: {
            mainVarName: options.main,
            mainFileRequires: orm.mainFileRequires.call ? orm.mainFileRequires(options) : orm.mainFileRequires,
            mainFileSetup: orm.mainFileSetup.call ? orm.mainFileSetup(options) : orm.mainFileSetup,
            mainFileContext: orm.mainFileContext.call ? orm.mainFileContext(options): orm.mainFileContext,
            mainConnect: orm.mainConnect.call ? orm.mainConnect(options) : orm.mainConnect,
            schemaDir: options.schemaDir,
            resolverDir: options.resolverDir
          },
          overwrite: options.overwrite
        },
        {
          content: JSON.stringify(orm.updateConfigJson({
            app: {
              port: options.port.toString()
            }
          }, 'dev', options), null, 2) + '\n',
          at: 'config/dev.json',
          overwrite: options.overwrite
        },
        {
          content: JSON.stringify(orm.updateConfigJson({
            app: {
              port: `process.env.PORT || ${options.port}`
            }
          }, 'prod', options), null, 2) + '\n',
          at: 'config/prod.json',
          overwrite: options.overwrite
        },
        {
          src: template('middlewares/index.js'),
          at: 'middlewares/index.js',
          overwrite: options.overwrite
        },
        {
          src: template('schemas/schema.gql'),
          at: `${options.schemaDir}/schema.gql`,
          overwrite: options.overwrite
        },
        {
          src: template('schemas/Date.gql'),
          at: `${options.schemaDir}/Date.gql`,
          overwrite: options.overwrite
        },
        {
          src: template('schemas/Mixed.gql'),
          at: `${options.schemaDir}/Mixed.gql`,
          overwrite: options.overwrite
        },
        {
          src: template('schemas/Upload.gql'),
          at: `${options.schemaDir}/Upload.gql`,
          overwrite: options.overwrite
        },
        {
          src: template('schemas/File.gql'),
          at: `${options.schemaDir}/File.gql`,
          overwrite: options.overwrite
        },
        {
          src: template('resolvers/Date.js'),
          dest: `${options.resolverDir}/Date.js`,
          overwrite: options.overwrite
        },
        {
          src: template('resolvers/Mixed.js'),
          dest: `${options.resolverDir}/Mixed.js`,
          overwrite: options.overwrite
        },
        {
          src: template('resolvers/Upload.js'),
          dest: `${options.resolverDir}/Upload.js`,
          overwrite: options.overwrite
        },
        {
          src: template('resolvers/File.js'),
          dest: `${options.resolverDir}/File.js`,
          overwrite: options.overwrite
        }
      ]
    },
    {
      ensureDirectories: [
        {
          name: `${options.dataDir}`
        },
        {
          name: `${options.modelDir}`
        },
        {
          name: 'scripts'
        }
      ]
    }
  ]);

  // ORM specific copies and appends

  orm.createFiles.forEach((f) => {
    if (f[0].call) {
      pushInstruction({
        createFile: {
          content: f[0](options),
          dest: f[1].call ? f[1](options) : f[1],
          context: options,
          overwrite: options.overwrite
        }
      });
    } else {
      pushInstruction({
        createFile: {
          src: f[0],
          dest: f[1].call ? f[1](options) : f[1],
          context: options,
          overwrite: options.overwrite
        }
      });
    }
  });

  orm.appendFiles.forEach((f) => {
    if (f.call) {
      pushInstruction({
        appendFile: {
          src: f[0](options),
          dest: f[1].call ? f[1](options) : f[1],
          context: options
        }
      });
    } else {
      pushInstruction({
        appendFile: {
          content: fs.readFileSync(f[0]).toString(),
          dest: f[1].call ? f[1](options) : f[1],
          context: options
        }
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
      pushInstruction({
        installDependency: {
          package: dep[0],
          isDev: false,
          version: dep[1],
          isMock: options.mockInstall
        }
      })
    );

    const devDependencies = [
      ['eslint', 'latest'],
      [`eslint-config-${options.eslintConfig}`, 'latest'],
      ['nodemon', 'latest']
    ].concat(orm.devPackageRequirements(options));
    devDependencies.map((dep) =>
      pushInstruction({
        installDependency: {
          package: dep[0],
          isDev: true,
          version: dep[1],
          isMock: options.mockInstall
        }
      }));
  }

  if (options.gitInit) {
    pushInstruction({
      runShellCommand: {
        command: 'git init'
      }
    });
  }
};
