function unquote(str: string) {
  if (str.match(/^".*"$/)) {
    return JSON.parse(str);
  } else if (str.match(/^'(.*)'$/)) {
    return (str.match(/^'(.*)'$/) as string[])[1];
  }
};

export default unquote;
