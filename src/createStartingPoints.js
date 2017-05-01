const directionObject = require('./directions');
const lessBy = require('./lessBy');
const ramda = require('ramda');

function createStartingPoints(distanceCache, direction) {
  const values = createStartingPointValues(distanceCache, direction);
  const range = ramda.range(0, values.length);
  const valuesWithIndicies = ramda.zip(range, values);
  const sortedValuesWithIndices = ramda.sort(lessBy(1), valuesWithIndicies);
  return ramda.map(first, sortedValuesWithIndices);
}

function createStartingPointValues(distanceCache, direction) {
  const finalColumn = distanceCache[distanceCache.length - 1];
  switch (direction) {
  case directionObject.DOWN:
    return distanceCache.map(function (column) {
      return column[column.length - 1];
    });

  case directionObject.ACROSS:
    return finalColumn;
  case directionObject.DIAGONAL_FROM_TOP_LEFT:
    return [finalColumn[finalColumn.length - 1]];
  case directionObject.DIAGONAL_FROM_TOP_RIGHT:
    return [distanceCache[0][0]];
  default:
    throw new Error(direction + ' is not a valid direction when createing final vector.  '
                    + 'The following are: ' + JSON.stringify(directionObject));
}
}

function first(x) {
  return x[0];
}

module.exports = createStartingPoints;
