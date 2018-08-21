const config = require('noenv');

const Koa = require('koa');
const logger = require('koa-logger');
const body = require('koa-body');
const cors = require('@koa/cors');
const ass = require('koa-ass');
const mongoose = require('koa-mon');
const setupGraphQL = require('./setup/graphql');

const mongooseUploader = require('mongoose-uploader');

const app = new Koa();

app.use(logger());

app.use(body());

app.use(cors());

app.use(ass({ config }));

app.use(mongoose({
  modelDir: __dirname + '/models',
  plugins: [mongooseUploader],
  url: config.database.url,
  options: {},
  debug: config.database.debug
}));

setupGraphQL({
  schemaDir: __dirname + '/schemas',
  resolverDir: __dirname + '/resolvers'
}).applyMiddleware({ app });

app.listen(config.app.port);
console.log(`Using env ${config.env}...`);
console.log(`Listening on port ${config.app.port}...`);
