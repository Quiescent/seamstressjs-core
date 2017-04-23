const createRGBPixel = require('./rgbPixel');
const createImage = require('./image');

function createDummyImage(pixelMatrix) {
  const dummyImage = {
    pixelMatrix: pixelMatrix,
    getPixel: function (x, y) {
      return createRGBPixel(x, y);
    }
  };
  const image = createImage(pixelMatrix);
  Object.setPrototypeOf(dummyImage, image);
  return dummyImage;
}

module.exports = createDummyImage;
