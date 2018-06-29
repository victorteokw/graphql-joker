module.exports = (command) => {
  let msg;
  if (command) {
    msg = `help for '${command}'`;
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
