#!/usr/bin/env node
const { startApp } = require('scaffold-kit');
const app = require('./app');

startApp(app, process.argv);
