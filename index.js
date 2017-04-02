var Image = require('./src/image');

function seamCarve(image, target) {
    var indexableImage = new Image(image);
    var energyMap      = indexableImage.energyMap();
    return carve(indexableImage, energyMap, target);
}

function carve(indexableImage, energyMap, target) {
    return indexableImage
        .carve(target)
        .toImage(target);
}

module.exports = seamCarve;
