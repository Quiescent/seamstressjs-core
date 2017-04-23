const directionObject = require('./directions');
const ramda = require('ramda');

function createStartingPoints(distanceCache, direction) {
  const values = createStartingPointValues(distanceCache, direction);
  const range = ramda.range(0, values.length);
  const valuesWithIndicies = ramda.zip(range, values);
  const sortedValuesWithIndices = ramda.sort(lessBySecond, valuesWithIndicies);
  return ramda.map(first, sortedValuesWithIndices);
}

function createStartingPointValues(distanceCache, direction) {
  const finalRow = distanceCache[distanceCache.length - 1];
  switch (direction) {
  case directionObject.DOWN:
    return finalRow;
  case directionObject.ACROSS:
    return distanceCache.map(function (row) {
      return row[row.length - 1];
    });

  case directionObject.DIAGONAL_FROM_TOP_LEFT:
    return [finalRow[finalRow.length - 1]];
  case directionObject.DIAGONAL_FROM_TOP_RIGHT:
    return [finalRow[0]];
  default:
    throw new Error(direction + ' is not a valid direction when createing final vector.  '
                    + 'The following are: ' + JSON.stringify(directionObject));
}
}

function first(x) {
  return x[0];
}

function lessBySecond(thisValue, thatValue) {
  return thisValue[1] < thatValue[1];
}

module.exports = createStartingPoints;
