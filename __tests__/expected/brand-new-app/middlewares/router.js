const router = require('koa-router')();
const { graphqlKoa, graphiqlKoa } = require('apollo-server-koa');
const { makeExecutableSchema } = require('graphql-tools');
const { mergeTypes } = require('merge-graphql-schemas');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const map = require('lodash/map');
const merge = require('lodash/merge');

const schema = makeExecutableSchema({
  typeDefs: mergeTypes(map(
    glob.sync(path.dirname(__dirname) + '/schemas/**/*.gql'),
    (filename) => fs.readFileSync(filename).toString()
  )),
  resolvers: merge(...map(
    glob.sync(path.dirname(__dirname) + '/resolvers/**/*.js'),
    (filename) => require(filename)
  ))
});

const handler = (ctx, next) => graphqlKoa({ schema, context: ctx })(ctx, next);

router.post('/graphql', handler);
router.get('/graphql', handler);
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

module.exports = router;
