const config = require('noenv');

<%- mainFileRequires %>
const { ApolloServer, makeExecutableSchema } = require('apollo-server');
const { mergeTypes } = require('merge-graphql-schemas');
const { applyMiddleware } = require('graphql-middleware');

const path = require('path');
const fs = require('fs');
const glob = require('glob');
const merge = require('lodash.merge');
const map = require('lodash.map');

const middlewares = require('./middlewares');

<%- mainFileSetup %>
const schemaDir = path.join(__dirname, '/schemas');
const resolverDir = path.join(__dirname, '/resolvers');

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

const <%- mainVarName %> = new ApolloServer({
  schema,
  context: <%- mainFileContext %>,
  playground: {
    settings: {
      'editor.cursorShape': 'line'
    }
  }
});

mongoose.connect(config.database.url, { useNewUrlParser: true });
<%- mainVarName %>.listen(config.app.port);
console.log(`[INFO] ${config.env} <%- mainVarName %> listening on ${config.app.port}...`);
