const repl = require('repl');
const mongoose = require('mongoose');
const config = require('noenv');
const glob = require('glob');
const path = require('path');
const each = require('lodash/each');

mongoose.connect(config.database.url)
  .then(function(_) {
    global.mongoose = mongoose;
    global.print = console.log;
    global.as = function(name) {
      return function(v) {
        global[name] = v;
      };
    };
    each(glob.sync(path.join(path.dirname(__dirname), 'models/**/*.js')),
      require);
    each(mongoose.models, function(m,k) {
      global[k] = m;
    });
    const replServer = repl.start({ useGlobal: true });
    replServer.on('exit', () => {
      console.log("");
      process.exit();
    });
  }).catch(function(err) {
    console.warn(err);
    process.exit(1);
  });
