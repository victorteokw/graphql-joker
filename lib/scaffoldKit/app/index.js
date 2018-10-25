const map = require('lodash.map');
const merge = require('lodash.merge');
const mapValues = require('lodash.mapvalues');
const error = require('../error');
const parsingCommandLineArgs = require('./parsingCommandLineArgs');
const savedCommandLineOptions = require('./savedCommandLineOptions');
const showAppHelpMessage = require('./showAppHelpMessage');
const showAppVersion = require('./showAppVersion');
const showCommandHelpMessage = require('./showCommandHelpMessage');
const commandExecutionDirectory = require('./commandExecutionDirectory');
const { executeAllInstructions } = require('../executor');

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
  app.validated = true;
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
  if (!app.validated) {
    throw error('app is not created.');
  }
  const { command, options, args } = getUserCommandLineInput(app, argv);
  // Show version and exit
  if (options.version) {
    showAppVersion(app);
    return;
  }
  // Show help and exit
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
    return mapValues(item.extraOptions, 'default');
  });
  const totalDefaultOptions = merge({}, appDefaultOptions, ...behavioralDefaultOptions, commandDefaultOptions);
  const finalOptions = merge({}, totalDefaultOptions, userOptions);

  const nonDefaultOptions = Object.assign({}, finalOptions);
  Object.keys(nonDefaultOptions).forEach((k) => {
    if (nonDefaultOptions[k] === totalDefaultOptions[k]) {
      delete nonDefaultOptions[k];
    }
  });
  const appSerializableOptions = mapValues(app.appLevelCommandLineOptions, 'saveToPreference');
  const commandSerializableOptions = mapValues(commandObject.commandLineOptions, 'saveToPreference');
  const behavioralSerializableOptions = !app.behaviorsMap ? {} : map(app.behaviorsMap, (b) => {
    const dv = b.defaultFrom;
    const v = userOptions[dv] || commandDefaultOptions[dv] || appDefaultOptions[dv];
    const item = b.items[v];
    return mapValues(item.extraOptions, 'saveToPreference');
  });
  const serializableOptions = Object.assign({}, appSerializableOptions, commandSerializableOptions, ...behavioralSerializableOptions);
  const nonDefaultOptionsToSave = {};
  map(nonDefaultOptions, (v, k) => {
    if (serializableOptions[k]) {
      nonDefaultOptionsToSave[k] = v;
    }
  });
  // Command modifies projDir
  let projDir = commandExecutionDirectory(commandObject);
  if (commandObject.relocateProjDir) {
    projDir = commandObject.relocateProjDir({ args, options: finalOptions, projDir });
  }
  commandObject.execute({ projDir, options: finalOptions, args });
  executeAllInstructions(projDir);
};

const runApp = (app, argv) => {
  startApp(createApp(app), argv);
};

const getUserCommandLineInput = (app, argv = process.argv) => {
  if (!app.userCommandLineInput) {
    const { command, options, args } = parsingCommandLineArgs(argv);
    app.userCommandLineInput = { command, options, args };
  }
  return app.userCommandLineInput;
};

module.exports = {
  createApp,
  startApp,
  runApp,
  getUserCommandLineInput
};
