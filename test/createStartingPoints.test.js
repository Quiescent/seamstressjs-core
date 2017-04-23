const assert = require('chai').assert;
const createStartingPoints = require('../src/createStartingPoints');
const directionObject = require('../src/directions');

describe('createStartingPoints', function () {
  describe('should return a vector containing zero for', function () {
    const SINGLETON_ENERGY_MAP = [[Infinity]];
    it('the downwards direction', function () {
      const startingPoints = createStartingPoints(SINGLETON_ENERGY_MAP, directionObject.DOWN);
      assert.deepEqual([0], startingPoints);
    });

    it('going across', function () {
      const startingPoints = createStartingPoints(SINGLETON_ENERGY_MAP, directionObject.ACROSS);
      assert.deepEqual([0], startingPoints);
    });

    it('the diagonal from top left', function () {
      const startingPoints =
            createStartingPoints(SINGLETON_ENERGY_MAP, directionObject.DIAGONAL_FROM_TOP_LEFT);
      assert.deepEqual([0], startingPoints);
    });

    it('the diagonal from top right', function () {
      const startingPoints =
            createStartingPoints(SINGLETON_ENERGY_MAP, directionObject.DIAGONAL_FROM_TOP_RIGHT);
      assert.deepEqual([0], startingPoints);
    });
  });
});
