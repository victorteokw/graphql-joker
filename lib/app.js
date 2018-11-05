const path = require('path');
const appPackage = require('../package.json');
const { createApp } = require('scaffold-kit/app');

const app = createApp({
  appName: 'Amur',
  commandName: 'amur',
  description: appPackage.description,
  version: appPackage.version,
  rcFile: '.amurrc.json',
  options: [
    {
      name: 'forceCwd',
      type: Boolean,
      description: 'force generating to current directory.',
      defaultValue: false,
      saveToPreference: false
    },
    {
      name: 'orm',
      type: String,
      description: 'the ORM to use.',
      defaultValue: 'mongoose',
      alias: 'o',
      saveToPreference: true,
      behavioral: 'orm'
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
  commandsMap: {
    'app': path.join(__dirname, './commands/app'),
    'model': path.join(__dirname, './commands/model'),
    'schema': path.join(__dirname, './commands/schema'),
    'resolver': path.join(__dirname, './commands/resolver'),
    'resource': path.join(__dirname, './commands/resource'),
    'nestable': path.join(__dirname, './commands/nestable'),
    'uploader': path.join(__dirname, './commands/uploader'),
    'destroy': path.join(__dirname, './commands/destroy')
  },
  behaviorsMap: {
    'orm': {
      name: 'Supported ORMs',
      description: 'The ORM to be used in the project.',
      defaultFrom: 'orm',
      items: {
        'mongoose': {
          name: 'mongoose',
          description: 'The mongoose ODM.',
          extraOptions: {
            primaryKey: {
              type: 'string',
              default: '_id',
              description: 'the primary key of data model.',
              saveToPreference: true
            },
            polymorphicReference: {
              type: 'boolean',
              default: true,
              description: 'whether use same field name for reference and nesting object.',
              saveToPreference: true
            }
          }
        },
        'sequelize': {
          name: 'sequelize',
          description: 'The sequelize ORM.',
          extraOptions: {
            primaryKey: {
              type: 'string',
              default: 'id',
              description: 'the primary key of data model.',
              saveToPreference: true
            },
            polymorphicReference: {
              type: 'boolean',
              default: true,
              description: 'whether use same field name for reference and nesting object.',
              saveToPreference: true
            },
            adaptor: {
              type: 'string',
              default: 'postgres',
              description: 'which sequelize adaptor to use',
              saveToPreference: true
            }
          }
        }
      }
    }
  }
});

module.exports = app;
