import quote from '../../../src/utils/string/quote';
import assert = require('assert');

describe('quote', () => {
  it('converts string to quoted string with single quote', () => {
    assert.equal(quote('male'), "'male'");
  });

  it('converts string with single quote to double quoted', () => {
    assert.equal(quote('jack\'s document'), "\"jack's document\"");
  });
});
