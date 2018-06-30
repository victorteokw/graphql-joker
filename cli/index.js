#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const help = require('./help');
const parseArgs = require('./parseArgs');
const wd = require('./wd');

const { _: [ command, ...args ], ...options } = parseArgs();

if (options.version) {
  const version = require(path.join(__dirname, '../package.json')).version;
  process.stdout.write(`Amur version ${version}\n`);
  process.exit(0);
}

if (!command) {
  help();
}

const generatorFile = path.join(__dirname, '../generators', command + '.js');

if (fs.existsSync(generatorFile)) {
  if (options.help) {
    help(command);
  } else {
    const generate = require(generatorFile);
    generate({
      args, options, projDir: wd(command)
    });
  }
} else {
  process.stderr.write(`Unknown command '${command}'.\n`);
  process.exit(1);
}
