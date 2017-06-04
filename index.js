const R = require('ramda');

/**
 * target: {
 *   width: int,
 *   height: int
 * }
 */
function resize(image, target) {
  assertValidTarget(target);
  assertValidImage(image);
  const energyMap = image.energyMap();
  return _resize(image, energyMap, target);
}

function _resize(indexableImage, energyMap, target) {
  return indexableImage
    .resize(target);
}

function assertValidTarget(target) {
  if (!(Number.isFinite(target.width) && Number.isFinite(target.height))) {
    // TODO make this clearer for undifined values on the stringified object
    throw new Error('We need a valid target please.  You gave us: ' + JSON.stringify(target));
  }
}

const objectHasType = R.curry(
  function (object, type, propName) {
    const objectHas = R.hasIn(R.__, object);
    return objectHas(propName) && R.is(type, object[propName]);
  });

const hasFunction = R.curry(function (image, propName) {
  if (!objectHasType(image, Function, propName)) {
    throw new Error('We need a valid image please. The image must have a property "' + propName
                    + '" with a type of: function, but it was: ' + typeof image[propName]);
  }
});

function assertValidImage(image) {
  const imageHasFunction = hasFunction(image);
  imageHasFunction('width');
  imageHasFunction('height');
}

module.exports = {
  resize: resize
};
