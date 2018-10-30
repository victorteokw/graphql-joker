const unquote = require('../../../lib/utils/string/unquote');
const assert = require('assert');

describe('quote', () => {
  it('strips string quoted by "', () => {
    assert.equal(unquote('"male"'), 'male');
  });

  it('strips string quoted by \'', () => {
    assert.equal(unquote("'male'"), 'male');
  });
});
