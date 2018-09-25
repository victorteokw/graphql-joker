module.exports = (command) => {
  process.stdout.write(`\
    For documentation of ${ command ? 'amur ' + command + ' command' : 'amur'},
    Please goto https://github.com/zhangkaiyulw/amur
  `);
};
