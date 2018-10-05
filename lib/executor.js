const { singular } = require('pluralize');

const registries = {};

const ensureRegistry = (name) => {
  if (!registries[name]) registries[name] = { commands: [] };
};

const commands = {
  createFile: {
    fields: {
      src: '[optional string] the src location, should be present if content is not present.',
      content: '[optional string] the file content, should be present if src is not present.',
      dest: '[required string] the relative destination location.',
      context: '[optional object] the rendering template context.'
    }
  },
  appendFile: {
    fields: {
      src: '[optional string] the src location, should be present if content is not present.',
      content: '[optional string] the file content, should be present if src is not present.',
      dest: '[required string] the relative destination location.',
      context: '[optional object] the rendering template context.'
    }
  },
  ensureDirectory: {
    fields: {
      name: '[required string] the directory name.'
    }
  },
  installDependency: {
    fields: {
      package: '[required string] package name',
      version: '[required string] version',
      isDev: '[required boolean] is dev dependency',
      isMock: '[required boolean] is fake installing (for unit test)'
    }
  },
  deleteFile: {
    fields: {
      path: '[required string] which file to delete'
    }
  },
  removeDependency: {
    fields: {
      package: '[required string] the package name'
    }
  }
};

const isSingleCommand = (command) =>
  Object.keys(commands).includes(Object.keys(command)[0]);

const isArrayCommand = (command) =>
  Object.keys(commands).includes(singular(Object.keys(command)[0]));

const separateArrayCommand = (command) => {
  const pluralName = Object.keys(command)[0];
  return command[pluralName].map((c) => ({ [singular(pluralName)]: c }));
};

const throwCommand = (command) => {
  throw `Invalid command: ${JSON.stringify(command, null, 2)}`;
};

// Only check if command is exist yet.
const validateCommand = (command) => {
  if (Object.keys(command).length !== 1) {
    throwCommand(command);
  }
  if (!isSingleCommand(command)) {
    if (!isArrayCommand(command)) {
      throw `Invalid command: ${JSON.stringify(command, null, 2)}`;
    }
  }
};

const pushCommand = (registry, command) => {
  ensureRegistry(registry);
  validateCommand(command);
  if (isSingleCommand(command)) {
    registries[registry].commands.push(command);
  } else if (isArrayCommand(command)) {
    separateArrayCommand(command).map((c) => registries[registry].commands.push(c));
  }
};

const pushCommands = (registry, commands) => {
  commands.map((c) => pushCommand(c));
};

const executeAllCommands = (registry, destDir) => {

  delete registries[registry];
};

module.exports = {
  pushCommand,
  pushCommands,
  executeAllCommands
};
