const assert = require('chai').assert;
const createStartingPoints = require('../src/createStartingPoints');
const directionObject = require('../src/directions');

describe('createStartingPoints', function () {
  describe('should return a vector containing zero for', function () {
    const SINGLETON_DISTANCE_CACHE = [[Infinity]];
    it('the downwards direction', function () {
      const startingPoints = createStartingPoints(SINGLETON_DISTANCE_CACHE, directionObject.DOWN);
      assert.deepEqual([0], startingPoints);
    });

    it('going across', function () {
      const startingPoints = createStartingPoints(SINGLETON_DISTANCE_CACHE, directionObject.ACROSS);
      assert.deepEqual([0], startingPoints);
    });

    it('the diagonal from top left', function () {
      const startingPoints =
            createStartingPoints(SINGLETON_DISTANCE_CACHE, directionObject.DIAGONAL_FROM_TOP_LEFT);
      assert.deepEqual([0], startingPoints);
    });

    it('the diagonal from top right', function () {
      const startingPoints =
            createStartingPoints(SINGLETON_DISTANCE_CACHE, directionObject.DIAGONAL_FROM_TOP_RIGHT);
      assert.deepEqual([0], startingPoints);
    });
  });

  describe('should return a sorted list of indices for the final row', function () {
    describe('for a 3x3 distance cache', function () {
      const THREE_BY_THREE_DISTANCE_CACHE = [[1, 0, 5],
                                             [3, 4, 2],
                                             [7, 6, 8]];
      describe('should return a sorted list of indices by lowest value for', function () {
        it('the downwards direction', function () {
          const startingPoints = createStartingPoints(THREE_BY_THREE_DISTANCE_CACHE,
                                                      directionObject.DOWN);
          assert.deepEqual([1, 0, 2], startingPoints);
        });

        it('going across', function () {
          const startingPoints = createStartingPoints(THREE_BY_THREE_DISTANCE_CACHE,
                                                      directionObject.ACROSS);
          assert.deepEqual([1, 0, 2], startingPoints);
        });

        it('the diagonal from top left', function () {
          const startingPoints =
                createStartingPoints(THREE_BY_THREE_DISTANCE_CACHE,
                                     directionObject.DIAGONAL_FROM_TOP_LEFT);
          assert.deepEqual([0], startingPoints);
        });

        it('the diagonal from top right', function () {
          const startingPoints =
                createStartingPoints(THREE_BY_THREE_DISTANCE_CACHE,
                                     directionObject.DIAGONAL_FROM_TOP_RIGHT);
          assert.deepEqual([0], startingPoints);
        });
      });
    });
  });
});
