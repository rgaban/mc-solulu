import { getMaxOfProperty } from '../utils/utils.mjs';
import generatePointsAfterFolds from './solver.mjs';
import { Axis } from '../utils/config.mjs';

/**
 * @typedef Point
 * @type {{x: number, y: number}}
 */

/**
 * @typedef Fold
 * @type {{axis: string, point: number}}
 */

/**
 * Logs a decrypted message
 * @param {Array.<Array.<Point|Fold>>} input 
 * @param {Object} options
 * @param {string} options.cellCharacter
 * @param {string} options.backgroundCharacter
 * @param {number} options.viewAtNthFold
 * @returns {void}
 */
function outputMessage(input, {
  cellCharacter = '⬛',
  backgroundCharacter = '⬜',
  viewAtNthFold = input.folds.length
} = {}) {
  const { file, points, folds } = input;
  if (viewAtNthFold > folds.length)
    throw new Error('Fold specified to view is not reachable, please check your input.');

  const pointsAfterFolds = generatePointsAfterFolds(points, folds.slice(0, viewAtNthFold));

  let maxX = getMaxOfProperty(pointsAfterFolds, Axis.X);
  let maxY = getMaxOfProperty(pointsAfterFolds, Axis.Y);

  let string = '';

  for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x <= maxX; x++) {
      if (pointsAfterFolds.find((el) => (el.x === x && el.y === y))) {
        string += cellCharacter;
      } else {
        string += backgroundCharacter;
      };
    };
    string += '\n';
  };
  console.log(`This message from ${file} has ${pointsAfterFolds.length} black cells.`);
  console.log(string);
};

/**
 * Logs all decrypted messages
 * @param {Array} inputs 
 * @returns {void}
 */
function outputAllMessages(inputs) {
  inputs.forEach(input => outputMessage(input));
}

export { outputMessage, outputAllMessages };