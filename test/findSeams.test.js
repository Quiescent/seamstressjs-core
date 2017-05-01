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

});
