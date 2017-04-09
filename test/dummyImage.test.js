const assert = require('chai').assert;
const createDummyImage = require('../src/dummyImage');
const createRGBPixel = require('../src/rgbPixel');

const redPixel = { r: 255, g: 0, b: 0 };
const ninePixelMatrix = [[redPixel, redPixel, redPixel],
                         [redPixel, redPixel, redPixel],
                         [redPixel, redPixel, redPixel]];

describe('dummyImage', function () {
  const dummyImage = createDummyImage(ninePixelMatrix);
  it('should return a pixel with inifinity energy for OOB coordinates', function () {
    const rgbPixel = createRGBPixel(-1, -1);
    assert.equal(rgbPixel.calculateEnergy(dummyImage), Infinity);
  });

  describe('for a single pixel matrix', function () {
    const singlePixelMatrix = [[redPixel]];
    it('should produce a pixel which has infinite energy', function () {
      const dummyImage = createDummyImage(singlePixelMatrix);
      const pixel = dummyImage.getPixel(1, 1);
      const energy = pixel.calculateEnergy(dummyImage);
      assert.equal(energy, Infinity);
    });
  });

  describe('for a nine pixel matrix', function () {
    it('should produce a pixel which can be used to calculate finite energy', function () {
      const dummyImage = createDummyImage(ninePixelMatrix);
      const pixel = dummyImage.getPixel(1, 1);
      const energy = pixel.calculateEnergy(dummyImage);
      assert.notEqual(energy, Infinity);
    });
  });
});
