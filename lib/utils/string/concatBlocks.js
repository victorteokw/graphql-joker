const concatBlocks = (blocks) => {
  const nonEmptyBlocks = [];
  blocks.forEach((block) => {
    if ((block !== undefined) && (block !== '')) {
      nonEmptyBlocks.push(block);
    }
  });
  let retval = '';
  nonEmptyBlocks.forEach((b) => {
    if (b === '\n') {
      retval += b;
    } else {
      retval += b;
      if (retval[retval.length - 1] !== '\n') {
        retval += '\n';
      }
    }
  });
  return retval;
};

module.exports = concatBlocks;
