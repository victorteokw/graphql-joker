const modelDir = path.join(__dirname, 'models');
map(glob.sync(path.join(modelDir, '**/*.js')), require);
