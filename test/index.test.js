const assert = require('chai').assert;
const seamstress = require('../index.js');

// TODO: We should probably change this...  "It's wierd" M. van der
// Velden 14 May 2017
// DONE!  It's no longer wierd! :D  21 May 2017
describe('resize', function () {
  const image = {};
  it('should throw an error when supplied with empty target', function () {
    assert.throws(function () { seamstress.resize(image, {}); });
  });

  it('should throw an error when supplied with no target', function () {
    assert.throws(function () { seamstress.resize(image, undefined); });
  });

  it('should throw an error when supplied with a null target', function () {
    assert.throws(function () { seamstress.resize(image, null); });
  });
});
