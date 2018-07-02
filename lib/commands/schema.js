const resource = require('./resource');

module.exports = ({ args, options, projDir }) => {
  resource({ args, options, projDir, variant: 'schema' });
};
