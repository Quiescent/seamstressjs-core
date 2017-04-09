const createImage = require('./src/image');

function seamCarve(image, target) {
  const indexableImage = createImage(image);
  const energyMap      = indexableImage.energyMap();
  return carve(indexableImage, energyMap, target);
}

function carve(indexableImage, energyMap, target) {
  return indexableImage
    .carve(target)
    .toImage(target);
}

module.exports = seamCarve;
