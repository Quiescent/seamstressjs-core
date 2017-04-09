const createCoord = require('./coord');

function createRGBPixel(x, y) {
  const coord = createCoord(x, y);
  var rgbPixel = {};
  Object.setPrototypeOf(rgbPixel,  coord);
  rgbPixel.calculateEnergy = function (image) {
    const rgbPixelMatrix = image.pixelMatrix;
    const currentPixelVector = createVector(getPixel(x, y, rgbPixelMatrix));
    const rgbArray = createRGBArray(x, y, rgbPixelMatrix);
    const energy = rgbArray.map(function (rgbVector) {
      return dotProduct(rgbVector, currentPixelVector);
    }).reduce(function (acc, val) {
      return val + acc;
    },

              0);
    return isNaN(energy) ? Infinity : energy;
  };

  return rgbPixel;
}

const INFINITY_PIXEL = { r: Infinity, g: Infinity, b: Infinity };

function getPixel(x, y, rgbPixelMatrix) {
  const xVector = rgbPixelMatrix[x];
  if (xVector === undefined || xVector === null) return INFINITY_PIXEL;
  const pixel = xVector[y];
  if (pixel === undefined || pixel === null) return INFINITY_PIXEL;
  return pixel;
}

function createVector(rgbPixel) {
  return [rgbPixel.r, rgbPixel.g, rgbPixel.b];
}

function createRGBArray(x, y, rgbPixelMatrix) {
  var rgbArray = [];
  for (var l = x - 1; l != x + 2; ++l) {
    for (var L = y - 1; L != y + 2; ++L) {
      if (l === x && L == y) continue;
      const currentPixel = getPixel(l, L, rgbPixelMatrix);
      rgbArray.push(createVector(currentPixel));
    }
  }

  return rgbArray;
}

function dotProduct(thisRGBVector, thatRGBVector) {
  const sumOfSquareDiffs = thisRGBVector.map(function (_, index) {
    const difference = thisRGBVector[index] - thatRGBVector[index];
    return difference * difference;
  }).reduce(function (acc, val) {
    return acc + val;
  },

            0);
  return Math.sqrt(sumOfSquareDiffs);
}

module.exports = createRGBPixel;
