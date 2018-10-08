#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const showHelpMessage = require('./showHelpMessage');
const parsingCommandLineArgs = require('./parsingCommandLineArgs');
const showVersion = require('./showVersion');
const buildOptions = require('./buildOptions');

const { command, args, options, projDir } = buildOptions(parsingCommandLineArgs());

if (options.version) {
  showVersion();
  process.exit(0);
}

if (!command) {
  showHelpMessage();
  process.exit(0);
}

if (options.help) {
  showHelpMessage(command);
  process.exit(0);
}

const commandModule = path.join(__dirname, '../commands', command);

if (!fs.existsSync(path.join(commandModule, 'index.js'))) {
  process.stderr.write(`Unknown command '${command}'.\n`);
  process.exit(1);
}

const generate = require(commandModule);

generate({
  args,
  options,
  projDir
});
