#!/usr/bin/env node
const { executeApp } = require('scaffold-kit/app');
const app = require('./app');

executeApp(app, process.argv);
