function quote(str: string) {
  if (str.match(/'/)) {
    return JSON.stringify(str);
  } else {
    str = str.replace("'", "\\'");
    return `'${str}'`;
  }
};

export default quote;
