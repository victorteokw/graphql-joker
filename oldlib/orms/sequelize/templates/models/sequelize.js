const config = require('noenv');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.database.url);

module.exports = sequelize;
