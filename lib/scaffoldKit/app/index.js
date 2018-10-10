const map = require('lodash.map');
const error = require('../error');
const parsingCommandLineArgs = require('./parsingCommandLineArgs');

const validateApp = (app) => {
  if (!app.appName) {
    throw error('app name is required.');
  }
  if (!app.description) {
    throw error('app description is required.');
  }
  if (!app.version) {
    throw error('app version is required.');
  }
  // Validate options later
  if (!app.commandsMap) {
    throw error('app commands map is required.');
  }
  map(app.commandsMap, (modulePath, commandName) => {
    if (!commandName || !commandName.match(/[a-z0-9][a-zA-Z0-9]*/)) {
      throw error(`app command name '${commandName}' not valid.`);
    }
    if (!modulePath) {
      throw error(`module path is required for command '${commandName}'.`);
    }
  });
};

const createApp = (app) => {
  validateApp(app);
  return app;
};

const loadCommand = (app, commandName) => {
  if (!app.commandsMap[commandName]) {
    throw error(`command '${commandName}' not exist.`);
  }
  let command;
  try {
    command = require(app.commandsMap[commandName]);
  } catch(e) {
    throw error(`command '${commandName}' can't be required.`);
  }
  return command;
};

const startApp = (app, argv = process.argv) => {
  parsingCommandLineArgs(argv);
};

const runApp = (app, argv) => {
  startApp(createApp(app), argv);
};

module.exports = {
  createApp,
  startApp,
  runApp
};
