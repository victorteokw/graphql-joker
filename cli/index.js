#!/usr/bin/env node
const minimist = require('minimist');
const path = require('path');
const fs = require('fs');
const help = require('./help');

const argv = minimist(process.argv.slice(2), {
  alias: {
    'v': 'version',
    'd': 'destroy',
    'h': 'help'
  },
  default: {
    models: 'models',
    schemas: 'schemas',
    resolvers: 'resolvers',
    indent: 2
  }
});

const { _: [ command, ...args ], ...options } = argv;

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
      args, options, projDir: process.cwd()
    });
  }
} else {
  process.stderr.write(`Unknown command '${command}'.\n`);
  process.exit(1);
}
