module.exports = function removeUndefined(obj) {
  var t = obj;
  for (const v in t) {
    if (typeof t[v] == 'object')
      removeUndefined(t[v]);
    else if (t[v] == undefined)
      delete t[v];
  }
  return t;
};
