const { GraphQLScalarType, Kind } = require('graphql');

const parseAst = (ast) => {
  switch (ast.kind) {
    case Kind.NULL:
      return null;
    case Kind.STRING:
      if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(ast.value)) {
        return new Date(ast.value);
      }
      return ast.value;
    case Kind.BOOLEAN:
    case Kind.ENUM:
      return ast.value;
    case Kind.INT:
      return parseInt(ast.value);
    case Kind.FLOAT:
      return parseFloat(ast.value);
    case Kind.LIST:
      return ast.values.map(parseAst);
    case Kind.OBJECT: {
      const retval = {};
      ast.fields.forEach(f => {
        retval[f.name.value] = parseAst(f.value);
      });
      return retval;
    }
    default:
      return ast.value;
  }
};

module.exports = {
  Mixed: new GraphQLScalarType({
    name: 'Mixed',
    description: 'Mixed Scalar Type',
    serialize(value) {
      return value;
    },
    parseValue(value) {
      return value;
    },
    parseLiteral(ast) {
      return parseAst(ast);
    }
  })
};
