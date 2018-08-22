const config = require('noenv');

const path = require('path');
const fs = require('fs');
const glob = require('glob');

const mongoose = require('mongoose');
const mongooseUploader = require('mongoose-uploader');

const { ApolloServer, makeExecutableSchema } = require('apollo-server');
const { mergeTypes } = require('merge-graphql-schemas');
const { applyMiddleware } = require('graphql-middleware');

const merge = require('lodash.merge');
const map = require('lodash.map');

const middlewares = require('./middlewares');

const modelDir = path.join(__dirname, 'models');
const schemaDir = path.join(__dirname, '/schemas');
const resolverDir = path.join(__dirname, '/resolvers');

mongoose.plugin(mongooseUploader);

map(glob.sync(path.join(modelDir, '**/*.js')), require);

const schema = makeExecutableSchema({
  typeDefs: mergeTypes(map(
    glob.sync(path.join(schemaDir, '**/*.gql')),
    (filename) => fs.readFileSync(filename).toString()
  )),
  resolvers: merge(
    ...map(glob.sync(path.join(resolverDir, '**/*.js')), require)
  )
});

if (middlewares.length) {
  applyMiddleware(schema, ...middlewares);
}

const server = new ApolloServer({
  schema,
  context: (o) => Object.assign({}, o, { models: mongoose.models }),
  playground: {
    settings: {
      'editor.cursorShape': 'line'
    }
  }
});

mongoose.connect(config.database.url, { useNewUrlParser: true });
server.listen(config.app.port);
console.log(`[INFO] ${config.env} server listening on ${config.app.port}...`);
