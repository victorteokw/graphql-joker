const { graphqlKoa, graphiqlKoa } = require('apollo-server-koa');
const { apolloUploadKoa } = require('apollo-upload-server');
const { makeExecutableSchema } = require('graphql-tools');
const { mergeTypes } = require('merge-graphql-schemas');
const { applyMiddleware } = require('graphql-middleware');
const merge = require('lodash.merge');
const map = require('lodash/map');
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const Router = require('koa-router');

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

  const handle = (ctx, next) => graphqlKoa({ schema, context: ctx })(ctx, next);

  const router = Router();
  router.post('/graphql', apolloUploadKoa(), handle);
  router.get('/graphql', apolloUploadKoa(), handle);
  router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

  return router.routes();
};
