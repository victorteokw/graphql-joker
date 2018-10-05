const modelDir = path.join(__dirname, '<%- modelDir %>');
const models = map(glob.sync(path.join(modelDir, '**/*.js')), require);
map(models, (m) => m.associate ? m.associate(sequelize.models) : undefined);
