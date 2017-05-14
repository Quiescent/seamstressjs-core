const R = require('ramda');
const directionObject = require('./directions');

function carveSeam(seam, image, direction) {
  const pixelMatrix = image.image;
  switch (direction) {
    case directionObject.DOWN:
      const xIndices = R.map(R.prop('x'), seam);
      const rowMajorMatrix = R.transpose(pixelMatrix);
      const newXPixelMatrix = R.transpose(carve(xIndices, rowMajorMatrix));
      return createNewImage(newXPixelMatrix, image);
    case directionObject.ACROSS:
      const yIndices = R.map(R.prop('y'), seam);
      const newYPixelMatrix = carve(yIndices, pixelMatrix);
      return createNewImage(newYPixelMatrix, image);
    default: throw new Error('Carving in direction not yet implemented: ' + direction);
  }
};

function createNewImage(pixelMatrix, image) {
  return image.createImage(pixelMatrix);
}

/**
 * Calling convention:
 *
 * The pixel matrix is row major when carving down and column major
 * when carving side to side.
 *
 * The Seam is an array of indexes corresponding to the indices in
 * either a row or a column.
 */
function carve(indices, pixelMatrix) {
  const matrixAndIndex = R.zip(indices, pixelMatrix);
  return R.map(function (indexAndVector) {
    const index = indexAndVector[0];
    const vector = indexAndVector[1];
    return R.remove(index, 1, vector);
  }, matrixAndIndex);
}

module.exports = carveSeam;
