module.exports = (options) =>
  `module.exports = {
  'dev': {
    'database': '${options.name}-dev',
    'host': 'localhost',
    'dialect': '${options.adaptor}'
  },
  'prod': {
    'database': '${options.name}-prod',
    'host': 'localhost',
    'dialect': '${options.adaptor}'
  }
};
`;
