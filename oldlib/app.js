const path = require('path');
const appPackage = require('../package.json');
const { createApp } = require('scaffold-kit/app');

const app = createApp({
  appName: 'GraphQL Joker',
  commandName: 'joker',
  description: appPackage.description,
  version: appPackage.version,
  rcFile: '.jokerrc.json',
  options: [
    {
      name: 'orm',
      type: String,
      description: 'the ORM to use.',
      defaultValue: 'mongoose',
      alias: 'o',
      saveToPreference: true,
      behavioral: true
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
  ]
});

module.exports = app;
