const assert = require('chai').assert;
const seamCarve = require('../index.js');

describe('seamCarve', function () {
  const image = {};
  it('should return the given image when supplied with empty target', function () {
    assert.equal(seamCarve(image, {}), image);
  });

  it('should return the given image when supplied with no target', function () {
    assert.equal(seamCarve(image, undefined), image);
  });

  it('should return the given image when supplied with a null target', function () {
    assert.equal(seamCarve(image, null), image);
  });
});
