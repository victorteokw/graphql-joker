module.exports = (str) => {
  if (str.match(/'/)) {
    return JSON.stringify(str);
  } else {
    str = str.replace("'", "\\'");
    return `'${str}'`;
  }
};
