const { GraphQLScalarType, Kind } = require('graphql');

module.exports = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Plain javaScript Date object',
    serialize(value) {
      return value.toISOString();
    },
    parseValue(value) {
      return new Date(value);
    },
    parseLiteral(ast) {
      if (ast.kind !== Kind.STRING) {
        throw new TypeError(
          `Date cannot represent non string type ${String(
            ast.value != null ? ast.value : null
          )}`
        );
      }
      return new Date(ast.value);
    }
  })
};
