/**
 * @typedef Point
 * @type {{x: number, y: number}}
 */

/**
 * @typedef Fold
 * @type {{axis: string, point: number}}
 */

/**
 * Deduplicates from an array of points
 * @param {Array.<Point>} points 
 * @returns {Array.<Point>}
 */
function removeDuplicates(points) {
  return points.reduce((acc, point) => {
    if (!acc.some(obj => obj.x === point.x && obj.y === point.y)) {
      acc.push(point);
    };
    return acc;
  }, []);
}

/**
 * Generates the new coordinates given an initial list of coordinates and a list of folds
 * @param {Array.<Point>} points - list of coordinates on the grid
 * @param {Array.<Fold>} folds - list of folds
 * @param {Object} options
 * @param {boolean} options.dedupe
 * @returns {Array.<Point>} new coordinates on the grid after each folds
 */

function generatePointsAfterFolds(points, folds, { dedupe = true } = {}) {
  if (!points || !folds)
    throw new error('Invalid input(s), please verify your points and/or folds.');

  const pointsDeepCopy = [...points.map((point) => ({ ...point }))];

  for (let fold of folds) {
    for (let i = 0; i < pointsDeepCopy.length; i++) {
      const point = pointsDeepCopy[i];
      if (point[fold.axis] > fold.point) {
        point[fold.axis] = fold.point - (point[fold.axis] - fold.point);
      }
    }
  }

  if (dedupe) return removeDuplicates(pointsDeepCopy)

  return pointsDeepCopy;
};

export default generatePointsAfterFolds;