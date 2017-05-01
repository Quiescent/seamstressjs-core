const createCoord = require('./coord');
const directionObject = require('./directions');
const createStartingPoints = require('./createStartingPoints');
const lessBy = require('./lessBy');
const ramda = require('ramda');

function* findSeams(energyMap, direction) {
  if (energyMap.length === 0) {
    return [];
  }

  const distanceCache = executeAlgorithm(energyMap, direction);

  // list of tuples which are already sorted from best to worst.
  const startingPoints = createStartingPoints(distanceCache, direction);

  for (var l = 0; l != startingPoints.length; ++l) {
    const startingPoint = startingPoints[l];
    yield backTrackSeam(distanceCache, startingPoint, direction);
  }
}

function createEnergyCoord(xIndex, yIndex, distanceCache) {
  return {
    coord: createCoord(xIndex, yIndex),
    energy: distanceCache[xIndex][yIndex]
  };

}

function createBackTracker(map, direction, xDimension, yDimension) {
  switch (direction) {
  case directionObject.DOWN:
    return function (xIndex, yIndex) {
      const candidates = [];
      if (yIndex == 0) return candidates;
      if (xIndex != 0) candidates.push(createEnergyCoord(xIndex - 1, yIndex - 1,
                                                         map));
      if (xIndex != xDimension - 1) candidates.push(createEnergyCoord(xIndex + 1,
                                                                      yIndex - 1,
                                                                      map));
      candidates.push(createEnergyCoord(xIndex, yIndex - 1, map));
      return candidates;
    };

  case directionObject.ACROSS:
    return function (xIndex, yIndex) {
      const candidates = [];
      if (xIndex == 0) return candidates;
      if (yIndex != 0) candidates.push(createEnergyCoord(xIndex - 1, yIndex - 1,
                                                         map));
      if (yIndex != yDimension - 1) candidates.push(createEnergyCoord(xIndex - 1,
                                                                      yIndex + 1,
                                                                      map));
      candidates.push(createEnergyCoord(xIndex - 1, yIndex, map));
      return candidates;
    };

  case directionObject.DIAGONAL_FROM_TOP_LEFT:
    return function (xIndex, yIndex) {
      const candidates = [];
      if (yIndex == 0 && xIndex == 0) return candidates;
      if (xIndex != 0) candidates.push(createEnergyCoord(xIndex - 1, yIndex,
                                                         map));
      if (yIndex != 0) candidates.push(createEnergyCoord(xIndex,
                                                         yIndex - 1,
                                                         map));
      if (xIndex != 0 && yIndex != 0) {
        candidates.push(createEnergyCoord(xIndex - 1, yIndex - 1, map));
      }

      return candidates;
    };

  case directionObject.DIAGONAL_FROM_TOP_RIGHT:
    return function (xIndex, yIndex) {
      const maxXCoord = xDimension - 1;
      const candidates = [];
      if (yIndex == 0 && xIndex == maxXCoord) return candidates;
      if (xIndex != maxXCoord) candidates.push(createEnergyCoord(xIndex + 1, yIndex,
                                                                 map));
      if (yIndex != 0) candidates.push(createEnergyCoord(xIndex,
                                                         yIndex - 1,
                                                         map));
      if (xIndex != maxXCoord && yIndex != 0) {
        candidates.push(createEnergyCoord(xIndex + 1, yIndex - 1, map));
      }

      return candidates;
    };

  default:
    throw new Error(direction + ' is not a valid direction when backtracking.  '
                    + 'The following are: ' + JSON.stringify(directionObject));
}
}

function startCoord(distanceCache, startOffset, direction) {
  const xDimension = distanceCache.length;
  const yDimension = distanceCache[0].length;
  switch (direction) {
  case directionObject.DOWN:
    return createCoord(startOffset, yDimension - 1);

  case directionObject.ACROSS:
    return createCoord(xDimension - 1, startOffset);

  case directionObject.DIAGONAL_FROM_TOP_LEFT:
    return createCoord(xDimension - 1, yDimension - 1);

  case directionObject.DIAGONAL_FROM_TOP_RIGHT:
    return createCoord(0, yDimension - 1);

  default:
    throw new Error(direction + ' is not a valid direction when backtracking.  '
                    + 'The following are: ' + JSON.stringify(directionObject));
}
}

function backTrackSeam(distanceCache, startOffset, direction) {
  const xDimension = distanceCache.length;
  const yDimension = distanceCache[0].length;
  const backTracker = createBackTracker(distanceCache, direction,
                                        xDimension, yDimension);
  const seam = [];
  var currentCoord = startCoord(distanceCache, startOffset, direction);
  while (currentCoord != null) {
    seam.push(currentCoord);
    const candidates = ramda.sort(lessBy('energy'), backTracker(currentCoord.x, currentCoord.y));

    currentCoord = candidates.length === 0 ? null : candidates[0].coord;
  }

  return seam;
}

// We've decided to store distance cache in column major format so
// that you can index it with [row][columnn]
function createEmptyDistanceCache(xDimension, yDimension) {
  const distanceCache = new Array(xDimension);
  for (var l = 0; l != xDimension; ++l) {
    distanceCache[l] = new Array(yDimension);
  }

  return distanceCache;
}

function executeAlgorithm(energyMap, direction) {
  const xDimension = energyMap.length;
  const yDimension = energyMap[0].length;
  const distanceCache = createEmptyDistanceCache(xDimension, yDimension);
  const findCandidates = createBackTracker(energyMap, direction, xDimension, yDimension);
  const nextCoord = decodeCoordFunction(energyMap, direction,
                                        xDimension, yDimension);

  // When creating the energy map we start from the [0, 0] and work
  // row by row down to [xDimension - 1, yDimension - 1].
  var currentCoord = createCoord(0, 0);
  while (currentCoord != null) {
    const candidates = findCandidates(currentCoord.x, currentCoord.y);
    const thisEnergy = computeCumulativeEnergy(energyMap, currentCoord, candidates);
    append(distanceCache, currentCoord, thisEnergy);
    currentCoord = nextCoord(currentCoord.x, currentCoord.y);
  }

  return distanceCache;
}

const INFINITE_ENERGY_DUMMY = {
  energy: Infinity
};
function infinityIfUndifined(energyCoordinate) {
  return energyCoordinate == undefined ? INFINITE_ENERGY_DUMMY : energyCoordinate;
}

function computeCumulativeEnergy(energyMap, coord, candidates) {
  const leastCandidate = ramda.compose(infinityIfUndifined, ramda.head,
                                       ramda.sort(lessBy('energy')))(candidates);
  const leastEnergy = leastCandidate.energy;
  const shouldAdd = isFinite(leastEnergy);
  const toAdd =  shouldAdd ? leastEnergy : 0;
  return energyMap[coord.x][coord.y] + toAdd;
}

function decodeCoordFunction(energyMap, direction, xDimension, yDimension) {
  return function (xIndex, yIndex) {
    switch (direction) {
    case directionObject.DOWN:
    case directionObject.DIAGONAL_FROM_TOP_LEFT:
      if (xIndex === xDimension - 1) {
        if (yIndex === yDimension - 1) return null;
        return createCoord(0, yIndex + 1);
      }

      return createCoord(xIndex + 1, yIndex);
    case directionObject.DIAGONAL_FROM_TOP_RIGHT:
    case directionObject.ACROSS:
      if (yIndex === yDimension - 1) {
        if (xIndex === xDimension - 1) return null;
        return createCoord(xIndex + 1, 0);
      }

      return createCoord(xIndex, yIndex + 1);
    default:
      throw new Error(direction + ' is not a valid direction when creating decodeCoord.  '
                      + 'The following are: ' + JSON.stringify(directionObject));
  }
  };
}

function append(distanceCache, coord, energy) {
  distanceCache[coord.x][coord.y] = energy;
}

module.exports = findSeams;
