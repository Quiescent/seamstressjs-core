const findSeams = require('../src/findSeams');
const createCoord = require('../src/coord');
const directions = require('../src/directions');
const assert = require('chai').assert;

describe('finding seams', function () {
  describe('in a singleton energy map', function () {
    const SINGLETON_ENERGY_MAP = [[Infinity]];
    const ZERO_ZERO_SEAM = [createCoord(0, 0)];
    it('when carved horizantally to a 0x0 image the single pixel is the seam', function () {
      const seams = findSeams(SINGLETON_ENERGY_MAP, directions.ACROSS);
      var seam = seams.next();
      var count = 0;
      while (!seam.done) {
        assert.deepEqual(ZERO_ZERO_SEAM, seam.value);
        seam = seams.next();
        ++count;
      }

      assert.equal(count, 1);
    });
  });
});
