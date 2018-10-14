const map = require('lodash.map');
const merge = require('lodash.merge');
const mapValues = require('lodash.mapvalues');
const error = require('../error');
const parsingCommandLineArgs = require('./parsingCommandLineArgs');
const savedCommandLineOptions = require('./savedCommandLineOptions');
const showAppHelpMessage = require('./showAppHelpMessage');
const showAppVersion = require('./showAppVersion');
const showCommandHelpMessage = require('./showCommandHelpMessage');

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
  const { command, options, args } = parsingCommandLineArgs(argv);
  if (options.version) {
    showAppVersion(app);
    return;
  }
  if (!command) {
    showAppHelpMessage(app);
    return;
  }
  const commandObject = loadCommand(app, command);
  if (command && options.help) {
    showCommandHelpMessage(app, command, commandObject);
    return;
  }
  const savedOptions = savedCommandLineOptions(process.cwd());
  const userOptions = merge(savedOptions, options);
  const appDefaultOptions = mapValues(app.appLevelCommandLineOptions, 'default');
  const commandDefaultOptions = mapValues(commandObject.commandLineOptions, 'default');
  const behavioralDefaultOptions = !app.behaviorsMap ? {} : map(app.behaviorsMap, (b) => {
    const dv = b.defaultFrom;
    const v = userOptions[dv] || commandDefaultOptions[dv] || appDefaultOptions[dv];
    const item = b.items[v];
    mapValues(item.extraOptions, 'default');
  });
  const totalDefaultOptions = merge({}, appDefaultOptions, ...behavioralDefaultOptions, commandDefaultOptions);
  const finalOptions = merge({}, totalDefaultOptions, userOptions);

  const nonDefaultOptions = Object.assign({}, finalOptions);
  Object.keys(nonDefaultOptions).forEach((k) => {
    if (nonDefaultOptions[k] === totalDefaultOptions[k]) {
      delete nonDefaultOptions[k];
    }
  });

};

const runApp = (app, argv) => {
  startApp(createApp(app), argv);
};

module.exports = {
  createApp,
  startApp,
  runApp
};
