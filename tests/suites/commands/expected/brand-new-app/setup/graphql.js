const { ApolloServer, makeExecutableSchema } = require('apollo-server-koa');
const { mergeTypes } = require('merge-graphql-schemas');
const { applyMiddleware } = require('graphql-middleware');
const merge = require('lodash.merge');
const map = require('lodash/map');
const path = require('path');
const fs = require('fs');
const glob = require('glob');

module.exports = ({ schemaDir, resolverDir, middlewares }) => {

  const schema = makeExecutableSchema({
    typeDefs: mergeTypes(map(
      glob.sync(path.join(schemaDir, '**/*.gql')),
      (filename) => fs.readFileSync(filename).toString()
    )),
    resolvers: merge(
      ...map(glob.sync(path.join(resolverDir, '**/*.js')), require)
    )
  });

  if (middlewares && middlewares.length) {
    applyMiddleware(schema, ...middlewares);
  }

  return new ApolloServer({
    schema,
    context: ({ ctx }) => ctx
  });
};
