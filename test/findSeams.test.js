const findSeams = require('../src/findSeams');
const createCoord = require('../src/coord');
const directions = require('../src/directions');
const assert = require('chai').assert;
const ramda = require('ramda');

describe('finding seams', function () {
  describe('in an empty energy map', function () {
    it('should produce an empty seam', function () {
      const seams = findSeams([], directions.DOWN);
      var seam = seams.next();
      var count = 0;
      while (!seam.done) {
        assert.deepEqual([], seam.value);
        seam = seams.next();
        ++count;
      }

      assert.equal(count, 0);
    });
  });

  describe('in a singleton energy map', function () {
    const SINGLETON_ENERGY_MAP = [[Infinity]];
    const ZERO_ZERO_SEAM = [createCoord(0, 0)];
    it('horizantally to a 1x1 image the single pixel is the seam', function () {
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

    it('vertically to a 1x1 image the single pixel is the seam', function () {
      const seams = findSeams(SINGLETON_ENERGY_MAP, directions.DOWN);
      var seam = seams.next();
      var count = 0;
      while (!seam.done) {
        assert.deepEqual(ZERO_ZERO_SEAM, seam.value);
        seam = seams.next();
        ++count;
      }

      assert.equal(count, 1);
    });

    it('top left diagonally to a 1x1 image the single pixel is the seam', function () {
      const seams = findSeams(SINGLETON_ENERGY_MAP, directions.DIAGONAL_FROM_TOP_LEFT);
      var seam = seams.next();
      var count = 0;
      while (!seam.done) {
        assert.deepEqual(ZERO_ZERO_SEAM, seam.value);
        seam = seams.next();
        ++count;
      }

      assert.equal(count, 1);
    });

    it('top right diagonally to a 1x1 image the single pixel is the seam', function () {
      const seams = findSeams(SINGLETON_ENERGY_MAP, directions.DIAGONAL_FROM_TOP_RIGHT);
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

  describe('in an energy map with maximum x, y coord of [0, 1]', function () {
    const RANK_ONE_TWO_ENERGY_MAP = [[Infinity, Infinity]];
    describe('when going down', function () {
      it('should produce both blocks as a seam', function () {
        const seams = findSeams(RANK_ONE_TWO_ENERGY_MAP, directions.DOWN);
        var seamsFound = [];
        var seam = seams.next();
        var count = 0;
        while (!seam.done) {
          seamsFound.push(seam.value);
          seam = seams.next();
          ++count;
        }

        assert.includeDeepMembers(seamsFound,
                                  [[createCoord(0, 1), createCoord(0, 0)]]);
        assert.equal(count, 1);
      });
    });

    describe('when going across', function () {
      it('should both blocks either block as a seam', function () {
        const seams = findSeams(RANK_ONE_TWO_ENERGY_MAP, directions.ACROSS);
        var seamsFound = [];
        var seam = seams.next();
        var count = 0;
        while (!seam.done) {
          seamsFound.push(seam.value);
          seam = seams.next();
          ++count;
        }

        assert.includeDeepMembers(seamsFound,
                                  [[createCoord(0, 0)], [createCoord(0, 1)]]);
        assert.equal(count, 2);
      });
    });

    describe('when going diagonally', function () {
      it('should find both blocks as a seam when going from top left', function () {
        const seams = findSeams(RANK_ONE_TWO_ENERGY_MAP, directions.DIAGONAL_FROM_TOP_LEFT);
        var seamsFound = [];
        var seam = seams.next();
        var count = 0;
        while (!seam.done) {
          seamsFound.push(seam.value);
          seam = seams.next();
          ++count;
        }

        assert.includeDeepMembers(seamsFound,
                                  [[createCoord(0, 1), createCoord(0, 0)]]);
        assert.equal(count, 1);
      });

      it('should find both blocks as a seam when going from top left', function () {
        const seams = findSeams(RANK_ONE_TWO_ENERGY_MAP, directions.DIAGONAL_FROM_TOP_RIGHT);
        var seamsFound = [];
        var seam = seams.next();
        var count = 0;
        while (!seam.done) {
          seamsFound.push(seam.value);
          seam = seams.next();
          ++count;
        }

        assert.includeDeepMembers(seamsFound,
                                  [[createCoord(0, 1), createCoord(0, 0)]]);
        assert.equal(count, 1);
      });
    });
  });

  describe('in an energy map with maximum x, y coord of [1, 0]', function () {
    const RANK_TWO_ONE_ENERGY_MAP = [[Infinity], [Infinity]];
    describe('when going down', function () {
      it('should produce either block as a seam', function () {
        const seams = findSeams(RANK_TWO_ONE_ENERGY_MAP, directions.DOWN);
        var seamsFound = [];
        var seam = seams.next();
        var count = 0;
        while (!seam.done) {
          seamsFound.push(seam.value);
          seam = seams.next();
          ++count;
        }

        assert.includeDeepMembers(seamsFound,
                                  [[createCoord(0, 0)], [createCoord(1, 0)]]);
        assert.equal(count, 2);
      });
    });

    describe('when going across', function () {
      it('should both blocks as seams', function () {
        const seams = findSeams(RANK_TWO_ONE_ENERGY_MAP, directions.ACROSS);
        var seamsFound = [];
        var seam = seams.next();
        var count = 0;
        while (!seam.done) {
          seamsFound.push(seam.value);
          seam = seams.next();
          ++count;
        }

        assert.includeDeepMembers(seamsFound,
                                  [[createCoord(1, 0), createCoord(0, 0)]]);
        assert.equal(count, 1);
      });
    });

    describe('when going diagonally', function () {
      it('should find both blocks as a seam when going from top left', function () {
        const seams = findSeams(RANK_TWO_ONE_ENERGY_MAP, directions.DIAGONAL_FROM_TOP_LEFT);
        var seamsFound = [];
        var seam = seams.next();
        var count = 0;
        while (!seam.done) {
          seamsFound.push(seam.value);
          seam = seams.next();
          ++count;
        }

        assert.includeDeepMembers(seamsFound,
                                  [[createCoord(1, 0), createCoord(0, 0)]]);
        assert.equal(count, 1);
      });

      it('should find both blocks as a seam when going from top left', function () {
        const seams = findSeams(RANK_TWO_ONE_ENERGY_MAP, directions.DIAGONAL_FROM_TOP_RIGHT);
        var seamsFound = [];
        var seam = seams.next();
        var count = 0;
        while (!seam.done) {
          seamsFound.push(seam.value);
          seam = seams.next();
          ++count;
        }

        assert.includeDeepMembers(seamsFound,
                                  [[createCoord(0, 0), createCoord(1, 0)]]);
        assert.equal(count, 1);
      });
    });

  });

  describe('in an energy map with maximum coordinate [1, 1]', function () {
    const RANK_TWO_TWO_ENERGY_MAP = [[Infinity, Infinity], [Infinity, Infinity]];
    it('should find four seams from bottom to top', function () {
      const seams = findSeams(RANK_TWO_TWO_ENERGY_MAP, directions.DOWN);
      var seamsFound = [];
      var seam = seams.next();
      var count = 0;
      while (!seam.done) {
        seamsFound.push(seam.value);
        seam = seams.next();
        ++count;
      }

      const ALL_POSSIBLE_SEAMS = [[createCoord(0, 1), createCoord(0, 0)],
                                  [createCoord(0, 1), createCoord(1, 0)],
                                  [createCoord(1, 1), createCoord(0, 0)],
                                  [createCoord(1, 1), createCoord(1, 0)]];;
      assert.includeDeepMembers(ALL_POSSIBLE_SEAMS,
                                seamsFound);
      assert.equal(count, 2);
    });

    it('should find four seams from right to left', function () {
      const seams = findSeams(RANK_TWO_TWO_ENERGY_MAP, directions.ACROSS);
      var seamsFound = [];
      var seam = seams.next();
      var count = 0;
      while (!seam.done) {
        seamsFound.push(seam.value);
        seam = seams.next();
        ++count;
      }

      const ALL_POSSIBLE_SEAMS = [[createCoord(1, 0), createCoord(0, 0)],
                                  [createCoord(1, 0), createCoord(0, 1)],
                                  [createCoord(1, 1), createCoord(0, 0)],
                                  [createCoord(1, 1), createCoord(0, 1)]];
      assert.includeDeepMembers(ALL_POSSIBLE_SEAMS,
                                seamsFound);
      assert.equal(count, 2);
    });

    it('should find one seam from bottom right to top left', function () {
      const seams = findSeams(RANK_TWO_TWO_ENERGY_MAP, directions.DIAGONAL_FROM_TOP_LEFT);
      var seamsFound = [];
      var seam = seams.next();
      var count = 0;
      while (!seam.done) {
        seamsFound.push(seam.value);
        seam = seams.next();
        ++count;
      }

      const ALL_POSSIBLE_SEAMS = [[createCoord(1, 1), createCoord(0, 0)],
                                  [createCoord(1, 1), createCoord(1, 0), createCoord(0, 0)],
                                  [createCoord(1, 1), createCoord(0, 1), createCoord(0, 0)]];
      assert.includeDeepMembers(ALL_POSSIBLE_SEAMS,
                                seamsFound);
      assert.equal(count, 1);
    });

    it('should find one seam from bottom left to top right', function () {
      const seams = findSeams(RANK_TWO_TWO_ENERGY_MAP, directions.DIAGONAL_FROM_TOP_RIGHT);
      var seamsFound = [];
      var seam = seams.next();
      var count = 0;
      while (!seam.done) {
        seamsFound.push(seam.value);
        seam = seams.next();
        ++count;
      }

      const ALL_POSSIBLE_SEAMS = [[createCoord(0, 1), createCoord(1, 0)],
                                  [createCoord(0, 1), createCoord(1, 1), createCoord(1, 0)],
                                  [createCoord(0, 1), createCoord(0, 0), createCoord(1, 0)]];
      assert.includeDeepMembers(ALL_POSSIBLE_SEAMS,
                                seamsFound);
      assert.equal(count, 1);
    });
  });

  describe('in an energy map with maximum coordinate [2, 2]', function () {
    const RANK_THREE_THREE_ENERGY_MAP = [[Infinity, Infinity, Infinity],
                                         [Infinity, 10, Infinity],
                                         [Infinity, Infinity, Infinity]];
    it('should find three seams from bottom to top', function () {
      const seams = findSeams(RANK_THREE_THREE_ENERGY_MAP, directions.DOWN);
      var seamsFound = [];
      var seam = seams.next();
      var count = 0;
      while (!seam.done) {
        seamsFound.push(seam.value);
        seam = seams.next();
        ++count;
      }

      const ALL_POSSIBLE_SEAMS = [[createCoord(0, 2), createCoord(1, 1), createCoord(0, 0)],
                                  [createCoord(0, 2), createCoord(1, 1), createCoord(1, 0)],
                                  [createCoord(0, 2), createCoord(1, 1), createCoord(2, 0)],
                                  [createCoord(1, 2), createCoord(1, 1), createCoord(0, 0)],
                                  [createCoord(1, 2), createCoord(1, 1), createCoord(1, 0)],
                                  [createCoord(1, 2), createCoord(1, 1), createCoord(2, 0)],
                                  [createCoord(2, 2), createCoord(1, 1), createCoord(0, 0)],
                                  [createCoord(2, 2), createCoord(1, 1), createCoord(1, 0)],
                                  [createCoord(2, 2), createCoord(1, 1), createCoord(2, 0)]];
      assert.includeDeepMembers(ALL_POSSIBLE_SEAMS,
                                seamsFound);
      assert.equal(count, 3);
    });

    it('should find three seams from right to left', function () {
      const seams = findSeams(RANK_THREE_THREE_ENERGY_MAP, directions.ACROSS);
      var seamsFound = [];
      var seam = seams.next();
      var count = 0;
      while (!seam.done) {
        seamsFound.push(seam.value);
        seam = seams.next();
        ++count;
      }

      const ALL_POSSIBLE_SEAMS = [[createCoord(2, 0), createCoord(1, 1), createCoord(0, 0)],
                                  [createCoord(2, 0), createCoord(1, 1), createCoord(0, 1)],
                                  [createCoord(2, 0), createCoord(1, 1), createCoord(0, 2)],
                                  [createCoord(2, 1), createCoord(1, 1), createCoord(0, 0)],
                                  [createCoord(2, 1), createCoord(1, 1), createCoord(0, 1)],
                                  [createCoord(2, 1), createCoord(1, 1), createCoord(0, 2)],
                                  [createCoord(2, 2), createCoord(1, 1), createCoord(0, 0)],
                                  [createCoord(2, 2), createCoord(1, 1), createCoord(0, 1)],
                                  [createCoord(2, 2), createCoord(1, 1), createCoord(0, 2)]];
      assert.includeDeepMembers(ALL_POSSIBLE_SEAMS,
                                seamsFound);
      assert.equal(count, 3);
    });

    it('should find three seams diagonally from the bottom right', function () {
      const seams = findSeams(RANK_THREE_THREE_ENERGY_MAP, directions.DIAGONAL_FROM_TOP_LEFT);
      var seamsFound = [];
      var seam = seams.next();
      var count = 0;
      while (!seam.done) {
        seamsFound.push(seam.value);
        seam = seams.next();
        ++count;
      }

      const ALL_POSSIBLE_SEAMS =
            [[createCoord(2, 2), createCoord(1, 1), createCoord(0, 0)],
             [createCoord(2, 2), createCoord(1, 1), createCoord(1, 0), createCoord(0, 0)],
             [createCoord(2, 2), createCoord(1, 1), createCoord(0, 1), createCoord(0, 0)]];
      assert.includeDeepMembers(ALL_POSSIBLE_SEAMS,
                                seamsFound);
      assert.equal(count, 1);
    });

    it('should find three seams diagonally from the top right', function () {
      const seams = findSeams(RANK_THREE_THREE_ENERGY_MAP, directions.DIAGONAL_FROM_TOP_RIGHT);
      var seamsFound = [];
      var seam = seams.next();
      var count = 0;
      while (!seam.done) {
        seamsFound.push(seam.value);
        seam = seams.next();
        ++count;
      }

      const ALL_POSSIBLE_SEAMS =
            [[createCoord(0, 2), createCoord(1, 1), createCoord(2, 0)],
             [createCoord(0, 2), createCoord(1, 1), createCoord(1, 0), createCoord(2, 0)],
             [createCoord(0, 2), createCoord(1, 1), createCoord(2, 1), createCoord(2, 0)]];
      assert.includeDeepMembers(ALL_POSSIBLE_SEAMS,
                                seamsFound);
      assert.equal(count, 1);
    });
  });

  // The rank 4, 4 test choice made in every direction.  This test
  // might seem (sorry for the pun) to be useless then, but it does
  // test the simplest possible scenario where there is a test of any
  // kind.
  describe('in an energy map with maximum coordinate [2, 3]', function () {
    const RANK_TWO_THREE_ENERGY_MAP = [[Infinity, Infinity, Infinity, Infinity],
                                       [Infinity, 5, 3, Infinity],
                                       [Infinity, Infinity, Infinity, Infinity]];
    it('should find a seam through three when going across', function () {
      const seams = findSeams(RANK_TWO_THREE_ENERGY_MAP, directions.ACROSS);
      var seamsFound = [];
      var seam = seams.next();
      var count = 0;
      while (!seam.done) {
        seamsFound.push(seam.value);
        seam = seams.next();
        ++count;
      }

      // Broken per starting block on the right of the map
      const ALL_POSSIBLE_SEAMS = [[createCoord(2, 0), createCoord(1, 1), createCoord(0, 0)],
                                  [createCoord(2, 0), createCoord(1, 1), createCoord(0, 1)],
                                  [createCoord(2, 0), createCoord(1, 1), createCoord(0, 2)],

                                  [createCoord(2, 1), createCoord(1, 2), createCoord(0, 1)],
                                  [createCoord(2, 1), createCoord(1, 2), createCoord(0, 2)],
                                  [createCoord(2, 1), createCoord(1, 2), createCoord(0, 3)],

                                  [createCoord(2, 2), createCoord(1, 2), createCoord(0, 1)],
                                  [createCoord(2, 2), createCoord(1, 2), createCoord(0, 2)],
                                  [createCoord(2, 2), createCoord(1, 2), createCoord(0, 3)],

                                  [createCoord(2, 3), createCoord(1, 2), createCoord(0, 1)],
                                  [createCoord(2, 3), createCoord(1, 2), createCoord(0, 2)],
                                  [createCoord(2, 3), createCoord(1, 2), createCoord(0, 3)]];
      assert.includeDeepMembers(ALL_POSSIBLE_SEAMS,
                                seamsFound);
      assert.equal(count, 4);
    });

    it('should find a seam through four when going down', function () {
      const seams = findSeams(RANK_TWO_THREE_ENERGY_MAP, directions.DOWN);
      var seamsFound = [];
      var seam = seams.next();
      var count = 0;
      while (!seam.done) {
        seamsFound.push(seam.value);
        seam = seams.next();
        ++count;
      }

      // Broken per three variations of the three seams
      const ALL_POSSIBLE_SEAMS = [
        [createCoord(0, 3), createCoord(1, 2), createCoord(1, 1), createCoord(0, 0)],
        [createCoord(1, 3), createCoord(1, 2), createCoord(1, 1), createCoord(0, 0)],
        [createCoord(2, 3), createCoord(1, 2), createCoord(1, 1), createCoord(0, 0)],

        [createCoord(0, 3), createCoord(1, 2), createCoord(1, 1), createCoord(1, 0)],
        [createCoord(1, 3), createCoord(1, 2), createCoord(1, 1), createCoord(1, 0)],
        [createCoord(2, 3), createCoord(1, 2), createCoord(1, 1), createCoord(1, 0)],

        [createCoord(0, 3), createCoord(1, 2), createCoord(1, 1), createCoord(2, 0)],
        [createCoord(1, 3), createCoord(1, 2), createCoord(1, 1), createCoord(2, 0)],
        [createCoord(2, 3), createCoord(1, 2), createCoord(1, 1), createCoord(2, 0)]];
      assert.includeDeepMembers(ALL_POSSIBLE_SEAMS,
                                seamsFound);
      assert.equal(count, 3);
    });

    it('should find a single seam when going diagonally from top left', function () {
      const seams = findSeams(RANK_TWO_THREE_ENERGY_MAP, directions.DIAGONAL_FROM_TOP_LEFT);
      var seamsFound = [];
      var seam = seams.next();
      var count = 0;
      while (!seam.done) {
        seamsFound.push(seam.value);
        seam = seams.next();
        ++count;
      }

      const ALL_POSSIBLE_SEAMS = [
        [createCoord(2, 3), createCoord(1, 2), createCoord(1, 1), createCoord(0, 0)],

        [createCoord(2, 3), createCoord(1, 2), createCoord(1, 1),
         createCoord(0, 1), createCoord(0, 0)],

        [createCoord(2, 3), createCoord(1, 2), createCoord(1, 1),
         createCoord(1, 0), createCoord(0, 0)]];
      assert.includeDeepMembers(ALL_POSSIBLE_SEAMS,
                                seamsFound);
      assert.equal(count, 1);
    });

    it('should find a single seam when going diagonally from top right', function () {
      const seams = findSeams(RANK_TWO_THREE_ENERGY_MAP, directions.DIAGONAL_FROM_TOP_RIGHT);
      var seamsFound = [];
      var seam = seams.next();
      var count = 0;
      while (!seam.done) {
        seamsFound.push(seam.value);
        seam = seams.next();
        ++count;
      }

      const ALL_POSSIBLE_SEAMS = [
        [createCoord(0, 3), createCoord(1, 2), createCoord(1, 1), createCoord(2, 0)],

        [createCoord(0, 3), createCoord(1, 2), createCoord(1, 1),
         createCoord(1, 0), createCoord(2, 0)],

        [createCoord(0, 3), createCoord(1, 2), createCoord(1, 1),
         createCoord(2, 1), createCoord(2, 0)]];
      assert.includeDeepMembers(ALL_POSSIBLE_SEAMS,
                                seamsFound);
      assert.equal(count, 1);
    });
  });

  describe('in an energy map with maximum coordinate [3, 3]', function () {
    const RANK_THREE_THREE_ENERGY_MAP = [[Infinity, Infinity, Infinity, Infinity],
                                         [Infinity, 3, 5, Infinity],
                                         [Infinity, 5, 3, Infinity],
                                         [Infinity, Infinity, Infinity, Infinity]];
    it('should find a seam through four when going across', function () {
      const seams = findSeams(RANK_THREE_THREE_ENERGY_MAP, directions.ACROSS);
      var seamsFound = [];
      var seam = seams.next();
      var count = 0;
      while (!seam.done) {
        seamsFound.push(seam.value);
        seam = seams.next();
        ++count;
      }

      // Broken per starting block on the right of the map
      const ALL_POSSIBLE_SEAMS = [
        [createCoord(3, 0), createCoord(2, 1), createCoord(1, 1), createCoord(0, 0)],
        [createCoord(3, 0), createCoord(2, 1), createCoord(1, 1), createCoord(0, 1)],
        [createCoord(3, 0), createCoord(2, 1), createCoord(1, 1), createCoord(0, 2)],

        [createCoord(3, 1), createCoord(2, 2), createCoord(1, 1), createCoord(0, 0)],
        [createCoord(3, 1), createCoord(2, 2), createCoord(1, 1), createCoord(0, 1)],
        [createCoord(3, 1), createCoord(2, 2), createCoord(1, 1), createCoord(0, 2)],

        [createCoord(3, 2), createCoord(2, 2), createCoord(1, 1), createCoord(0, 0)],
        [createCoord(3, 2), createCoord(2, 2), createCoord(1, 1), createCoord(0, 1)],
        [createCoord(3, 2), createCoord(2, 2), createCoord(1, 1), createCoord(0, 2)],

        [createCoord(3, 3), createCoord(2, 2), createCoord(1, 1), createCoord(0, 0)],
        [createCoord(3, 3), createCoord(2, 2), createCoord(1, 1), createCoord(0, 1)],
        [createCoord(3, 3), createCoord(2, 2), createCoord(1, 1), createCoord(0, 2)]];
      assert.includeDeepMembers(ALL_POSSIBLE_SEAMS,
                                seamsFound);
      assert.equal(count, 4);
    });

    it('should find a seam through four when going down', function () {
      const seams = findSeams(RANK_THREE_THREE_ENERGY_MAP, directions.DOWN);
      var seamsFound = [];
      var seam = seams.next();
      var count = 0;
      while (!seam.done) {
        seamsFound.push(seam.value);
        seam = seams.next();
        ++count;
      }

      // Broken per four variations of the three seams
      const ALL_POSSIBLE_SEAMS = [
        [createCoord(0, 3), createCoord(1, 2), createCoord(1, 1), createCoord(0, 0)],
        [createCoord(1, 3), createCoord(2, 2), createCoord(1, 1), createCoord(0, 0)],
        [createCoord(2, 3), createCoord(2, 2), createCoord(1, 1), createCoord(0, 0)],
        [createCoord(3, 3), createCoord(2, 2), createCoord(1, 1), createCoord(0, 0)],

        [createCoord(0, 3), createCoord(1, 2), createCoord(1, 1), createCoord(1, 0)],
        [createCoord(1, 3), createCoord(2, 2), createCoord(1, 1), createCoord(1, 0)],
        [createCoord(2, 3), createCoord(2, 2), createCoord(1, 1), createCoord(1, 0)],
        [createCoord(3, 3), createCoord(2, 2), createCoord(1, 1), createCoord(1, 0)],

        [createCoord(0, 3), createCoord(1, 2), createCoord(1, 1), createCoord(2, 0)],
        [createCoord(1, 3), createCoord(2, 2), createCoord(1, 1), createCoord(2, 0)],
        [createCoord(2, 3), createCoord(2, 2), createCoord(1, 1), createCoord(2, 0)],
        [createCoord(3, 3), createCoord(2, 2), createCoord(1, 1), createCoord(2, 0)]];
      assert.includeDeepMembers(ALL_POSSIBLE_SEAMS,
                                seamsFound);
      assert.equal(count, 4);
    });

    it('should find a single seam when going diagonally from top left', function () {
      const seams = findSeams(RANK_THREE_THREE_ENERGY_MAP, directions.DIAGONAL_FROM_TOP_LEFT);
      var seamsFound = [];
      var seam = seams.next();
      var count = 0;
      while (!seam.done) {
        seamsFound.push(seam.value);
        seam = seams.next();
        ++count;
      }

      const ALL_POSSIBLE_SEAMS = [
        [createCoord(3, 3), createCoord(2, 2), createCoord(1, 1), createCoord(0, 0)],

        [createCoord(3, 3), createCoord(2, 2), createCoord(1, 1), createCoord(1, 0),
         createCoord(0, 0)],

        [createCoord(3, 3), createCoord(2, 2), createCoord(1, 1), createCoord(0, 1),
         createCoord(0, 0)]];
      assert.includeDeepMembers(ALL_POSSIBLE_SEAMS,
                                seamsFound);
      assert.equal(count, 1);
    });

    it('should find a single seam when going diagonally from top right', function () {
      const seams = findSeams(RANK_THREE_THREE_ENERGY_MAP, directions.DIAGONAL_FROM_TOP_RIGHT);
      var seamsFound = [];
      var seam = seams.next();
      var count = 0;
      while (!seam.done) {
        seamsFound.push(seam.value);
        seam = seams.next();
        ++count;
      }

      const ALL_POSSIBLE_SEAMS = [
        [createCoord(0, 3), createCoord(1, 2), createCoord(2, 1), createCoord(3, 0)],

        [createCoord(0, 3), createCoord(1, 2), createCoord(2, 1), createCoord(3, 1),
         createCoord(3, 0)],

        [createCoord(0, 3), createCoord(1, 2), createCoord(2, 1), createCoord(2, 0),
         createCoord(3, 0)]];
      const stringified = JSON.stringify(seamsFound);
      assert.includeDeepMembers(ALL_POSSIBLE_SEAMS,
                                seamsFound);
      assert.equal(count, 1);
    });
  });

  describe('in an energy map with maximum coordinate of [4, 4]', function () {
    describe('where that map has an optimal path for diagonal from top left', function () {
      const RANK_FOUR_FOUR_ENERGY_MAP = [[Infinity, Infinity, Infinity, Infinity, Infinity],
                                         [Infinity, 0, 0, 5, Infinity],
                                         [Infinity, 0, 5, 5, Infinity],
                                         [Infinity, 5, 5, 5, Infinity],
                                         [Infinity, Infinity, Infinity, Infinity, Infinity]];

      /*
       * This map illustrates how the diagonal carver should find the
       * path which has the greatest long term benefit.  This is not
       * currently implemented because it's much much harder than we
       * first realised because you have to carve as much up and down as
       * you do side to side, this is required in order to maintain the
       * integrity of the image dimensions for each row and column.
       * This requires a potentially novel algorithm.
       */
    });

    describe('where that map has an optimal path for diagonal from top right', function () {
      const RANK_FOUR_FOUR_ENERGY_MAP = [[Infinity, Infinity, Infinity, Infinity, Infinity],
                                         [Infinity, 5, 0, 0, Infinity],
                                         [Infinity, 5, 5, 0, Infinity],
                                         [Infinity, 5, 5, 5, Infinity],
                                         [Infinity, Infinity, Infinity, Infinity, Infinity]];

      /*
       * See the comment for the diagonal from the top left.
       */
    });
  });
});
