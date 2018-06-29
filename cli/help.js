module.exports = (command) => {
  let msg;
  if (command === 'app') {
    msg = `\nUsage: amur app [appName]\n\n\
\tWhere appName is optional. If you specify it, a new app is created in\n\
\tthat directory relative to process.cwd(). If you don't specify it, the\n\
\tnew app is generated in your current working directory.\n`;
  } else if (command === 'resource') {
    msg = ``;
  } else if (command === 'schema') {
    msg = ``;
  } else {
    msg = '\nUsage: amur <command> [args...]\
    \n\nCommands:\
    \n\n\tapp\t\tCreate a brand new app.\
    \n\n\tresource\tGenerate a set of API resource.\
    \n\n\tschema\t\tGenerate a reusable schema for API resouces.\
    \n';
  }

  process.stdout.write(msg + '\n');
  process.exit(0);
};
