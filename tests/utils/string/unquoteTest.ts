import unquote from '../../../src/utils/string/unquote';
import assert = require('assert');

describe('quote', () => {
  it('strips string quoted by "', () => {
    assert.equal(unquote('"male"'), 'male');
  });

  it('strips string quoted by \'', () => {
    assert.equal(unquote("'male'"), 'male');
  });
});
