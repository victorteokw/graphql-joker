module.exports = (type) => {
  switch (type) {
    case 'String':
      return 'STRING';
    case 'Boolean':
      return 'BOOLEAN';
    case 'Float':
      return 'FLOAT';
    case 'Int':
      return 'INTEGER';
    case 'ID':
      return 'INTEGER';
    case 'Date':
      return 'DATE';
    case 'Mixed':
      return 'JSON';
  }
};
