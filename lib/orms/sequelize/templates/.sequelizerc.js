const config = require('noenv');
const path = require('path');

module.exports = {
  'config': path.resolve('config/sequelize.js'),
  'models-path': path.resolve('models')
};
