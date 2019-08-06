const concatBlocks = (blocks: string[]): string => {
  const nonEmptyBlocks: string[] = [];
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

export default concatBlocks;
