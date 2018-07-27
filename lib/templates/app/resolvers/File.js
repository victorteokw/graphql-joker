const { GraphQLScalarType } = require('graphql');

module.exports = {
  Date: new GraphQLScalarType({
    name: 'File',
    description: 'The `File` scalar type represents an uploaded file.',
    serialize: value => value,
    parseValue() {
      throw new Error('File scalar value unsupported');
    },
    parseLiteral() {
      throw new Error('File scalar literal unsupported');
    }
  })
};
