module.exports = (type) => {
  switch (type) {
    case 'String':
      return 'String';
    case 'Boolean':
      return 'Boolean';
    case 'Float':
      return 'Number';
    case 'Int':
      return 'Number';
    case 'ID':
      return 'ObjectId';
    case 'Date':
      return 'Date';
    case 'Mixed':
      return 'Mixed';
  }
};
