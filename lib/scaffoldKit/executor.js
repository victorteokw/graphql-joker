const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const { spawnSync } = require('child_process');
const ejs = require('ejs');
const chalk = require('chalk');
const { singular } = require('pluralize');
const clone = require('lodash.clonedeep');

const userInstructions = [];

const instructions = {
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
  deleteFile: {
    fields: {
      path: '[required string] which file to delete'
    }
  },
  updateJSONFile: {
    fields: {
      path: '[required string] which file to update',
      updator: '[required (object) => object] the json updator'
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
  removeDependency: {
    fields: {
      package: '[required string] the package name'
    }
  },
  runShellCommand: {
    fields: {
      command: '[required string] the command to run'
    }
  }
};

const isSingleCommand = (command) =>
  Object.keys(instructions).includes(Object.keys(command)[0]);

const isArrayCommand = (command) =>
  Object.keys(instructions).includes(singular(Object.keys(command)[0]));

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

const pushInstruction = (command) => {
  validateCommand(command);
  if (isSingleCommand(command)) {
    userInstructions.push(command);
  } else if (isArrayCommand(command)) {
    separateArrayCommand(command).map((c) => userInstructions.push(c));
  }
};

const pushInstructions = (commands) => {
  commands.map((command) => pushInstruction(command));
};

const executeAllInstructions = (destDir) => {
  const executionCommands = convertCommandsToExecutionCommands(userInstructions, destDir);
  execute(executionCommands, destDir);
};

const outputMessage = (flag, flagColor, text) => {
  console.log(`${chalk[flagColor](flag.padStart(12))} ${text}`);
};

const executeFileCommandsAndOutputMessage = (target, commands, destDir) => {
  let flag, flagColor;
  commands.forEach((command) => {
    const key = Object.keys(command)[0];
    command = command[key];
    command[key] = true;
    if (command.createFile) {
      mkdirp.sync(path.dirname(target));
      const content = command.content === undefined ? fs.readFileSync(command.src).toString() : command.content;
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
    } else if (command.updateJSONFile) {
      let original;
      if (fs.existsSync(target)) {
        original = fs.readFileSync(target).toString();
      } else {
        original = '';
        if (!flag) {
          flag = 'create';
          flagColor = 'green';
        }
      }
      updateJSONFile(target, command.updator);
      const currentVal = fs.existsSync(target);
      if (!flag) {
        if (original === currentVal) {
          flag = 'up-to-date';
          flagColor = 'green';
        } else {
          flag = 'update';
          flagColor = 'green';
        }
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
      outputMessage(flag, flagColor, dep);
    } else {
      if (command.isMock) {
        updateJSONFile(pkgFile, (j) => {
          j[command.isDev ? 'devDependencies' : 'dependencies'][dep] = command.version;
          return j;
        });
        flag = 'install';
        flagColor = 'green';
        outputMessage(flag, flagColor, dep);
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
          flag = 'install';
          flagColor = 'green';
          outputMessage(flag, flagColor, dep);
          const obj = spawnSync('npm', ['install', dep + '@' + command.version, command.isDev ? '--save-dev' : '--save']);
          if (obj.signal === 'SIGINT') {
            console.log('');
            process.exit(0);
          }
        }
      }
    }
  } else if (command.command === 'remove') {
    flag = 'remove';
    flagColor = 'green';
    outputMessage(flag, flagColor, dep);
    const obj = spawnSync('npm', ['remove', dep]);
    if (obj.signal === 'SIGINT') {
      console.log('');
      process.exit(0);
    }
  } else {
    throw `Unknown dependency command '${command.command}'`;
  }
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
  const shellCommandsList = executionCommands.shellCommands;
  shellCommandsList.forEach((command) => {
    executeShellCommandAndOutputMessage(command, destDir);
  });
};

const executeShellCommandAndOutputMessage = (command, _destDir) => {
  runShellCommand(command);
};

const convertCommandsToExecutionCommands = (commands, destDir) => {
  const filesMap = {};
  const dependenciesMap = {};
  const shellCommandsList = [];
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
    } else if (commandName === 'updateJSONFile') {
      if (!filesMap[commandParams.path]) {
        filesMap[commandParams.path] = [];
      }
      filesMap[commandParams.path].push({
        'updateJSONFile': {
          updator: commandParams.updator
        }
      });
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
    } else if (commandName === 'runShellCommand') {
      shellCommandsList.push(commandParams.command);
    }
  });
  commands.filter((c) => Object.keys(c)[0] === 'ensureDirectory').forEach((c) => {
    const commandParams = c[Object.keys(c)[0]];
    const destPath = path.join(destDir, commandParams.name);
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
        // .keep file itself, remove it from the list
        if (currentFileNames.includes(path.join(destPath, '.keep'))) {
          currentFileNames.splice(currentFileNames.indexOf(path.join(destPath, '.keep')), 1);
        }
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
  return {
    files: filesMap,
    dependencies: dependenciesMap,
    shellCommands: shellCommandsList
  };
};

const runShellCommand = (command) => {
  const [name, ...args] = command.split(' ');
  const obj = spawnSync(name, args);
  if (obj.signal === 'SIGINT') {
    console.log('');
    process.exit(0);
  }
  outputMessage('run', 'green', command);
};

module.exports = {
  pushInstruction,
  pushInstructions,
  executeAllInstructions
};
