const path = require('path');
const appPackage = require('../package.json');
const { createApp } = require('scaffold-kit/app');
const { setExecutorOption } = require('scaffold-kit/executor');

const app = createApp({
  appName: 'Amur',
  commandName: 'amur',
  description: appPackage.description,
  version: appPackage.version,
  rcFile: '.amurrc.json',
  options: [
    {
      name: 'orm',
      type: String,
      description: 'the ORM to use.',
      defaultValue: 'mongoose',
      alias: 'o',
      saveToPreference: true,
      behavioral: true
    },
    {
      name: 'overwrite',
      type: Boolean,
      description: 'whether overwrite existing file.',
      defaultValue: false,
      saveToPreference: false
    },
    {
      name: 'mockInstall',
      type: Boolean,
      description: 'update dependency list without installing.',
      defaultValue: false,
      saveToPreference: false
    },
    {
      name: 'silent',
      type: Boolean,
      description: 'whether suppress output.',
      defaultValue: false,
      saveToPreference: false
    }
  ],
  behaviorals: [
    {
      name: 'Supported ORMs',
      description: 'The ORM to be used in the project.',
      optionName: 'orm',
      values: [
        {
          name: 'mongoose',
          description: 'The mongoose ODM.',
          options: [
            {
              name: 'primaryKey',
              type: String,
              description: 'the primary key of data model.',
              defaultValue: '_id',
              saveToPreference: true
            },
            {
              name: 'polymorphicReference',
              type: Boolean,
              description: 'whether use same field name for reference and nesting object.',
              defaultValue: true,
              saveToPreference: true
            }
          ]
        },
        {
          name: 'sequelize',
          description: 'The sequelize ORM.',
          options: [
            {
              name: 'primaryKey',
              type: String,
              description: 'the primary key of data model.',
              defaultValue: 'id',
              saveToPreference: true
            },
            {
              name: 'polymorphicReference',
              type: Boolean,
              description: 'whether use same field name for reference and nesting object.',
              defaultValue: false,
              saveToPreference: true
            },
            {
              name: 'adaptor',
              type: String,
              description: 'which sequelize adaptor to use',
              defaultValue: 'postgres',
              saveToPreference: true
            }
          ]
        }
      ]
    }
  ],
  commands: {
    'app': path.join(__dirname, './commands/app'),
    'model': path.join(__dirname, './commands/model'),
    'schema': path.join(__dirname, './commands/schema'),
    'resolver': path.join(__dirname, './commands/resolver'),
    'resource': path.join(__dirname, './commands/resource'),
    'nestable': path.join(__dirname, './commands/nestable'),
    'uploader': path.join(__dirname, './commands/uploader'),
    'destroy': path.join(__dirname, './commands/destroy')
  },
  beforeExecution: ({ options }) => {
    if (options.overwrite) {
      setExecutorOption('overwrite', true);
    }
    if (options.silent) {
      setExecutorOption('silent', true);
    }
    if (options.mockInstall) {
      setExecutorOption('mock', true);
    }
  }
});

module.exports = app;
