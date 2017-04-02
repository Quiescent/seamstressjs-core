const createRGBPixel = require('./rgbPixel');
const createImage = require('./image');

function createDummyImage(pixelMatrix) {
    var dummyImage = {
        pixelMatrix : pixelMatrix,
        getPixel : function(x, y) {
            return createRGBPixel(x, y);
        }
    };
    const image = createImage(pixelMatrix);
    dummyImage.prototype = image;
    return dummyImage;
}

module.exports = createDummyImage;
