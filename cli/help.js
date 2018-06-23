module.exports = (command) => {
  let msg;
  if (command) {
    msg = `help for '${command}'`;
  } else {
    msg = 'help for amur';
  }
  
  process.stdout.write(msg + '\n');
  process.exit(0);
};
