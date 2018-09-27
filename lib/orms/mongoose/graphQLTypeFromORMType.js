module.exports = (type) => {
  switch (type) {
    case 'String':
      return 'String';
    case 'Boolean':
      return 'Boolean';
    case 'Number':
      return 'Float';
    case 'ObjectId':
      return 'ID';
    case 'Date':
      return 'Date';
    case 'Mixed':
      return 'Mixed';
  }
};
