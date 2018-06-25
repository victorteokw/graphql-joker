module.exports = (str) => {
  if (str.match(/^".*"$/)) {
    return JSON.parse(str);
  } else if (str.match(/^'(.*)'$/)) {
    return str.match(/^'(.*)'$/)[1];
  }
};
