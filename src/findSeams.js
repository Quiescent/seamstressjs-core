const createCoord = require('./coord');
const directionObject = require('./directions');
const createStartingPoints = require('./createStartingPoints');

function* findSeams(energyMap, direction) {
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

function createBackTracker(distanceCache, direction, xDimension, yDimension) {
  switch (direction) {
  case directionObject.DOWN:
    return function (xIndex, yIndex) {
      const candidates = [];
      if (yIndex == yDimension - 1) return candidates;
      if (xIndex != 0) candidates.push(createEnergyCoord(xIndex - 1, yIndex - 1,
                                                         distanceCache));
      if (xIndex != xDimension - 1) candidates.push(createEnergyCoord(xIndex + 1,
                                                                      yIndex - 1,
                                                                      distanceCache));
      candidates.push(createEnergyCoord(xIndex, yIndex - 1, distanceCache));
      return candidates;
    };

  case directionObject.ACROSS:
    return function (xIndex, yIndex) {
      const candidates = [];
      if (xIndex == xDimension - 1) return candidates;
      if (yIndex != 0) candidates.push(createEnergyCoord(xIndex + 1, yIndex - 1,
                                                         distanceCache));
      if (yIndex != yDimension - 1) candidates.push(createEnergyCoord(xIndex + 1,
                                                                      yIndex + 1,
                                                                      distanceCache));
      candidates.push(createEnergyCoord(xIndex + 1, yIndex, distanceCache));
      return candidates;
    };

  case directionObject.DIAGONAL_FROM_TOP_LEFT:
    return function (xIndex, yIndex) {
      const candidates = [];
      if (yIndex == 0 && xIndex == 0) return candidates;
      if (xIndex != 0) candidates.push(createEnergyCoord(xIndex - 1, yIndex,
                                                         distanceCache));
      if (yIndex != 0) candidates.push(createEnergyCoord(xIndex,
                                                         yIndex - 1,
                                                         distanceCache));
      if (xIndex != 0 && yIndex != 0) {
        candidates.push(createEnergyCoord(xIndex - 1, yIndex - 1, distanceCache));
      }

      return candidates;
    };

  case directionObject.DIAGONAL_FROM_TOP_RIGHT:
    return function (xIndex, yIndex) {
      const candidates = [];
      if (yIndex == 0 && xIndex == xDimension - 1) return candidates;
      if (xIndex != xDimension - 1) candidates.push(createEnergyCoord(xIndex + 1, yIndex,
                                                                      distanceCache));
      if (yIndex != 0) candidates.push(createEnergyCoord(xIndex,
                                                         yIndex + 1,
                                                         distanceCache));
      if (xIndex != xDimension - 1 && yIndex != 0) {
        candidates.push(createEnergyCoord(xIndex + 1, yIndex - 1, distanceCache));
      }

      return candidates;
    };

  default:
    throw new Error(direction + ' is not a valid direction when backtracking.  '
                    + 'The following are: ' + JSON.stringify(directionObject));
}
}

function startCoord(distanceCache, startOffset, direction) {
  const xDimension = distanceCache[0].length;
  const yDimension = distanceCache.length;
  switch (direction) {
  case directionObject.DOWN:
    return createCoord(yDimension - 1, startOffset);

  case directionObject.ACROSS:
    return createCoord(startOffset, xDimension - 1);

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
  const xDimension = distanceCache[0].length;
  const yDimension = distanceCache.length;
  const backTracker = createBackTracker(distanceCache, direction,
                                        xDimension, yDimension);
  const seam = [];
  var currentCoord = startCoord(distanceCache, startOffset, direction);
  while (currentCoord != null) {
    seam.push(currentCoord);
    const candidates = backTracker(currentCoord.x, currentCoord.y);
    candidates.sort(function (thisEnergyCoord, thatEnergyCoord) {
      return thisEnergyCoord.energy.compare(thatEnergyCoord.energy);
    });

    currentCoord = candidates.length === 0 ? null : candidates[0].coord;
  }

  return seam;
}

function createEmptyDistanceCache(xDimension, yDimension) {
  const distanceCache = new Array(yDimension);
  for (var l = 0; l != yDimension; ++l) {
    distanceCache[l] = new Array(xDimension);
  }

  return distanceCache;
}

function executeAlgorithm(energyMap, direction) {
  const xDimension = energyMap[0].length;
  const yDimension = energyMap.length;
  const distanceCache = createEmptyDistanceCache(xDimension, yDimension);
  const findCandidates = decodeCandidateFunction(energyMap, direction);
  const nextCoord = decodeCoordFunction(energyMap, direction,
                                       xDimension, yDimension);
  var currentCoord = createCoord(0, 0);
  while (currentCoord != null) {
    const candidates = findCandidates(currentCoord.x, currentCoord.y);
    const thisEnergy = computeThisEnergy(energyMap, currentCoord, candidates);
    append(distanceCache, currentCoord, thisEnergy);
    currentCoord = nextCoord(currentCoord.x, currentCoord.y);
  }

  return distanceCache;
}

function decodeCandidateFunction(energyMap, direction) {
  return function (xIndex, yIndex) {
    const candidateOne = Infinity;
    const candidateTwo = Infinity;
    const candidateThree = Infinity;
    return [candidateOne, candidateTwo, candidateThree];
  };
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

function computeThisEnergy(energyMap, coord, candidates) {
  return Infinity;
}

function append(distanceCache, coord, energy) {
  distanceCache[coord.y][coord.x] = energy;
}

module.exports = findSeams;
