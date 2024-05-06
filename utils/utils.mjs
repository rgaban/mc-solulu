/**
 * @typedef Point
 * @type {{x: number, y: number}}
 */

/**
 * Get the axis max value
 * @param {Array<Point>} points 
 * @param {string} axis 
 * @returns {number}
 */
function getMaxOfProperty(points, axis) {
  return Math.max(...points.map((point) => {
    if (!point.hasOwnProperty(axis)) {
      throw new Error(`"${axis}" axis in your list of coordinates doesn't exist, please verify your input.`);
    }
    return point[axis];
  }), 0);
};

export { getMaxOfProperty };