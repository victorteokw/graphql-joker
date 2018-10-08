#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const help = require('./help');
const parseArgs = require('./parseArgs');
const wd = require('./wd');

const { _: [ command, ...args ], ...options } = parseArgs();

if (options.version) {
  const { version } = require(path.join(__dirname, '../../package.json'));
  process.stdout.write(`Amur version ${version}\n`);
  process.exit(0);
}

if (!command) {
  help();
  process.exit(0);
}

const commandModule = path.join(__dirname, '../commands', command);

if (!fs.existsSync(path.join(commandModule, 'index.js'))) {
  process.stderr.write(`Unknown command '${command}'.\n`);
  process.exit(1);
}

if (options.help) {
  help(command);
  process.exit(0);
}

const generate = require(commandModule);

generate({
  args,
  options,
  projDir: options.forceCwd ? process.cwd() : wd(command)
});
