const path = require('path');
const appPackage = require('../package.json');
const { runApp } = require('./scaffoldKit');

runApp({
  appName: 'Amur',
  description: appPackage.description,
  version: appPackage.version,
  rcFile: '.amurrc.json',
  appLevelCommandLineOptions: {
    forceCwd: {
      type: 'boolean',
      default: false,
      description: 'force generating to current directory.',
      saveToPreference: false
    },
    orm: {
      type: 'string',
      default: 'mongoose',
      description: 'the orm used in the project.',
      saveToPreference: true
    },
    overwrite: {
      type: 'boolean',
      default: false,
      description: 'whether overwrite existing file.',
      saveToPreference: false
    },
    'mockInstall': {
      type: 'boolean',
      default: false,
      description: 'update dependency list without installing.',
      saveToPreference: false
    }
  },
  commandsMap: {
    'app': path.join(__dirname, './commands/app'),
    'resource': path.join(__dirname, './commands/resource'),
    'nestable': path.join(__dirname, './commands/nestable'),
    'uploader': path.join(__dirname, './commands/uploader'),
    'destroy': path.join(__dirname, './commands/destroy'),
    'model': path.join(__dirname, './commands/model'),
    'schema': path.join(__dirname, './commands/schema'),
    'resolver': path.join(__dirname, './commands/resolver')
  }
}, process.argv);
