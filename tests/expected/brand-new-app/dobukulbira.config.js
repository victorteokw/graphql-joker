const config = require('noenv');

module.exports = {
  mongodb: {
    url: config.database.url
  },
  modelsDir: "models"
};
