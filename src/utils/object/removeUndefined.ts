function removeUndefined(obj: object) {
  const t = obj;
  for (const v in t) {
    if (typeof t[v] === 'object') {
      removeUndefined(t[v]);
    } else if (t[v] === undefined) {
      delete t[v];
    }
  }
  return t;
};

export default removeUndefined;
