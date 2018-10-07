const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const ejs = require('ejs');
const chalk = require('chalk');
const { singular } = require('pluralize');
const clone = require('lodash.clonedeep');

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

const executeAllCommands = (registryName, destDir) => {
  const registry = registries[registryName];
  if (!registry) {
    throw `No registry '${registryName}'.`;
  }
  const commands = registry.commands;
  const executionCommands = convertCommandsToExecutionCommands(commands, destDir);
  execute(executionCommands, destDir);
  // Remove from registry
  delete registries[registry];
};

const outputMessage = (flag, flagColor, text) => {
  console.log(`${chalk[flagColor](flag.padStart(12))} ${text}`);
};

const executeFileCommandsAndOutputMessage = (target, commands, destDir) => {
  let flag, flagColor;
  commands.forEach((command) => {
    if (command.createFile) {
      mkdirp.sync(path.dirname(target));
      const content = command.content || fs.readFileSync(command.src).toString();
      const rendered = ejs.render(content, command.context || {});
      if (fs.existsSync(target)) {
        if (fs.readFileSync(target).toString() === rendered) {
          flag = 'up-to-date';
          flagColor = 'green';
        } else {
          flag = 'exist';
          flagColor = 'yellow';
        }
      } else {
        fs.writeFileSync(target, rendered);
        flag = 'create';
        flagColor = 'green';
      }
    } else if (command.appendFile) {
      mkdirp.sync(path.dirname(target));
      const content = command.content || fs.readFileSync(command.src).toString();
      const rendered = ejs.render(content, command.context || {});
      if (fs.readFileSync(target).toString().includes(rendered)) {
        flag = 'up-to-date';
        flagColor = 'green';
      } else {
        fs.appendFileSync(target, rendered);
        if (!flag) {
          flag = 'append';
          flagColor = 'green';
        }
      }
    } else if (command.deleteFile) {
      if (fs.existsSync(target)) {
        fs.unlinkSync(target);
        flag = 'delete';
        flagColor = 'green';
      } else {
        flag = 'not exist';
        flagColor = 'yellow';
      }
    }
  });
  outputMessage(flag, flagColor, path.relative(destDir, target));
};

const updateJSONFile = (file, updator) => {
  let original;
  if (!fs.existsSync(file)) {
    original = {};
  } else {
    original = JSON.parse(fs.readFileSync(file).toString());
  }
  const updated = updator(clone(original));
  fs.writeFileSync(file, JSON.stringify(updated, null, 2));
};

const executeDependencyCommandAndOutputMessage = (dep, command, destDir) => {
  let flag, flagColor;
  if (command.command === 'install') {
    const pkgFile = path.join(destDir, 'package.json');
    const pkg = require(pkgFile);
    if (command.isDev ? pkg.devDependencies[dep] : pkg.dependencies[dep]) {
      flag = 'installed';
      flagColor = 'green';
    } else {
      if (command.isMock) {
        updateJSONFile(pkgFile, (j) => {
          j[command.isDev ? 'devDependencies' : 'dependencies'][dep] = command.version;
          return j;
        });
        flag = 'install';
        flagColor = 'green';
      } else {
        if (command.isMock) {
          updateJSONFile(pkgFile, (j) => {
            if (j.devDependencies) {
              delete j['devDependencies'][dep];
            }
            if (j.dependencies) {
              delete j['dependencies'][dep];
            }
            return j;
          });
        } else {
          const obj = spawnSync('npm', ['install', dep + '@' + command.version, command.isDev ? '--save-dev' : '--save']);
          if (obj.signal === 'SIGINT') {
            console.log('');
            process.exit(0);
          }
          flag = 'install';
          flagColor = 'green';
        }
      }
    }
  } else if (command.command === 'remove') {
    const obj = spawnSync('npm', ['remove', dep]);
    if (obj.signal === 'SIGINT') {
      console.log('');
      process.exit(0);
    }
    flag = 'remove';
    flagColor = 'green';
  } else {
    throw `Unknown dependency command '${command.command}'`;
  }
  outputMessage(flag, flagColor, dep);
};

const execute = (executionCommands, destDir) => {
  const filesMap = executionCommands.files;
  Object.keys(filesMap).sort().forEach((filename) => {
    const target = path.join(destDir, filename);
    const commands = filesMap[filename];
    executeFileCommandsAndOutputMessage(target, commands, destDir);
  });
  const dependenciesMap = executionCommands.dependencies;
  Object.keys(dependenciesMap).sort().forEach((dep) => {
    const command = dependenciesMap[dep];
    executeDependencyCommandAndOutputMessage(dep, command, destDir);
  });
};

const convertCommandsToExecutionCommands = (commands, destDir) => {
  const filesMap = {};
  const dependenciesMap = {};
  commands.forEach((command) => {
    const commandName = Object.keys(command)[0];
    const commandParams = command[commandName];
    if (commandName === 'createFile') {
      filesMap[commandParams.dest] = [{
        'createFile': {
          src: commandParams.src,
          content: commandParams.content,
          context: commandParams.context
        }
      }];
    } else if (commandName === 'appendFile') {
      if (filesMap[commandParams.dest]) {
        filesMap[commandParams.dest].push({
          'appendFile': {
            src: commandParams.src,
            content: commandParams.content,
            context: commandParams.context
          }
        });
      } else {
        // same with create if not exist yet
        filesMap[commandParams.dest] = [{
          'createFile': {
            src: commandParams.src,
            content: commandParams.content,
            context: commandParams.context
          }
        }];
      }
    } else if (commandName === 'deleteFile') {
      filesMap[commandParams.path] = [{
        'deleteFile': {}
      }];
    } else if (commandName === 'installDependency') {
      dependenciesMap[commandParams.package] = {
        command: 'install',
        version: commandParams.version,
        isDev: commandParams.isDev,
        isMock: commandParams.isMock
      };
    } else if (commandName === 'removeDependency') {
      dependenciesMap[commandParams.package] = {
        command: 'remove'
      };
    }
  });
  commands.filter((c) => Object.keys(c)[0] === 'ensureDirectory').forEach((c) => {
    const commandParams = c[Object.keys(c)[0]];
    const destPath = path.join(destDir, c.path);
    if (fs.existsSync(destPath) && fs.lstatSync(destPath).isDirectory() && fs.existsSync(path.join(destPath, '.keep'))) {
      // Dir exist already
      let needRemoveKeepFile = false;
      Object.keys(filesMap).forEach((filename) => {
        if (filesMap[filename][0]['createFile']) {
          if (filename.indexOf(commandParams.name) === 0) {
            needRemoveKeepFile = true;
          }
        }
      });
      if (!needRemoveKeepFile) {
        const currentFileNames = fs.readdirSync(destPath).map((fn) => path.join(destPath, fn));
        Object.keys(filesMap).forEach((filename) => {
          if (filesMap[filename][0]['deleteFile']) {
            if (currentFileNames.includes(filename)) {
              currentFileNames.splice(currentFileNames.indexOf(filename), 1);
            }
          }
        });
        if (currentFileNames.length > 0) {
          needRemoveKeepFile = true;
        }
      }
      if (needRemoveKeepFile) {
        filesMap[path.join(commandParams.name, '.keep')] = [{
          'deleteFile': {}
        }];
      }
    } else {
      // Dir not exist yet
      let needCreate = true;
      Object.keys(filesMap).forEach((filename) => {
        if (filesMap[filename][0]['createFile']) {
          if (filename.indexOf(commandParams.name) === 0) {
            needCreate = false;
          }
        }
      });
      if (needCreate) {
        filesMap[path.join(commandParams.name, '.keep')] = [{
          'createFile': {
            content: '',
            context: {}
          }
        }];
      }
    }
  });
  return { files: filesMap, dependencies: dependenciesMap };
};

module.exports = {
  pushCommand,
  pushCommands,
  executeAllCommands
};
