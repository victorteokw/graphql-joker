const path = require('path');
const map = require('lodash.map');
const glob = require('glob');
const sequelize = require('../<%- modelDir %>/sequelize');

const modelDir = path.join(__dirname, '../<%- modelDir %>');
map(glob.sync(path.join(modelDir, '**/*.js')), require);

sequelize.sync().then(() => {
  sequelize.close();
});
