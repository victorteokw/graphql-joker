const concatBlocks = require('../../utils/string/concatBlocks');

const topOfHeader = [
  "const Sequelize = require('sequelize');",
  "const sequelize = require('./sequelize');",
].join('\n');
