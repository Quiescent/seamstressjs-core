const assert = require('chai').assert;
const seamCarve = require('../index.js');
const createDummyImage = require('../src/dummyImage');

const redPixel = { r: 255, g: 0, b: 0 };
const ninePixelMatrix = [[redPixel, redPixel, redPixel],
                         [redPixel, redPixel, redPixel],
                         [redPixel, redPixel, redPixel]];
const ninePixelEnergyMap = [[Infinity, Infinity, Infinity],
                            [Infinity, 0, Infinity],
                            [Infinity, Infinity, Infinity]];

describe('image', function () {
  describe('creating an energy map', function () {
    it('all pixels are infinity except for the middle one', function () {
      const dummyImage = createDummyImage(ninePixelMatrix);
      const energyMap = dummyImage.energyMap();
      assert.deepEqual(energyMap, ninePixelEnergyMap);
    });
  });
});
