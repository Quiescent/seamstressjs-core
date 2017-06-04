const findSeams = require('./findSeams');
const directionObject = require('./directions');
const carveSeam = require('./carveSeam');
const expandSeam = require('./expandSeam');

function createImage(pixelMatrix) {
  return {
    pixelMatrix: pixelMatrix,
    energyMap: function () {
      return energyMap(this);
    },

    toImage: function (target) {
      return toImage(this, target);
    },

    resize: function (target) {
      return resize(this, target);
    },

    width: function () {
      return pixelMatrix.length;
    },

    height: function () {
      if (!pixelMatrix[0]) return 0;
      return pixelMatrix[0].length;
    }
  };
};

function energyMap(self) {
  const energyMap = [];
  const height = self.height();
  const width = self.width();
  for (var row = 0; row != height; ++row) {
    let newEnergyRow = [];
    for (var column = 0; column != width; ++column) {
      const pixel = self.getPixel(row, column);
      const energy = pixel.calculateEnergy(self);
      newEnergyRow.push(energy);
    }

    energyMap.push(newEnergyRow);
  }

  return energyMap;
}

function toImage(self, target) {
  return self.pixelMatrix;
}

function resize(self, target) {
  const changeXBy = self.width() - target.width;
  const xIsGrowing = changeXBy < 0;
  const changeYBy = self.height() - target.height;
  const yIsGrowing = changeYBy < 0;
  const xChangeIterations = Math.abs(changeXBy);
  const yChangeIterations = Math.abs(changeYBy);

  var currentImage = self;

  doTimes(xChangeIterations, function () {
    currentImage = resizeByOne(currentImage, xIsGrowing, directionObject.DOWN);
  });

  doTimes(yChangeIterations, function () {
    currentImage = resizeByOne(currentImage, yIsGrowing, directionObject.ACROSS);
  });

  return currentImage;
}

function doTimes(times, f) {
  for (var l = 0; l != times; ++l) {
    f();
  }
}

function resizeByOne(currentImage, isGrowing, direction) {
  const energyMap = currentImage.energyMap();
  const seams = findSeams(energyMap, direction);
  const seam = seams.next().value;
  return isGrowing ? expandSeam(seam, currentImage, direction)
    : carveSeam(seam, currentImage, direction);
}

module.exports = createImage;
