const config = require('noenv');
const Koa = require('koa');

const logger = require('koa-logger');
const body = require('koa-body');
const cors = require('@koa/cors');
const configMiddleware = require('./middlewares/config');
const mongoose = require('koa2-mongoose');
const router = require('./middlewares/router');

const app = module.exports = new Koa();

app.use(logger());

app.use(body());

app.use(cors());

app.use(configMiddleware(config));

app.use(mongoose({
  url: config.database.url,
  models: __dirname + '/models',
  debug: config.database.debug,
  options: {}
}));

app.use(router.routes(), router.allowedMethods());

// Export a module or start server
if (!module.parent) {
  app.listen(config.app.port);
  console.log(`App ${config.env} listening on port ${config.app.port}...`);
}
