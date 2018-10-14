const resource = require('../resource/execute');

module.exports = ({ args, options, projDir }) => {
  resource({ args, options, projDir, variant: 'schema' });
};
