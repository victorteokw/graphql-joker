const config = require('noenv');
const Koa = require('koa');

const logger = require('koa-logger');
const body = require('koa-body');
const cors = require('@koa/cors');
const ass = require('koa-ass');
const mongoose = require('koa-mon');
const router = require('./middlewares/router');

const app = module.exports = new Koa();

app.use(logger());

app.use(body());

app.use(cors());

app.use(ass({ config }));

app.use(mongoose({
  modelDir: __dirname + '/models',
  url: config.database.url,
  options: {},
  debug: config.database.debug
}));

app.use(router.routes(), router.allowedMethods());

// Export a module or start server
if (!module.parent) {
  app.listen(config.app.port);
  console.log(`Using env ${config.env}...`);
  console.log(`Listening on port ${config.app.port}...`);
}
