import { readFileSync, readdirSync } from 'fs';

/**
 * @typedef Point
 * @type {{x: number, y: number}}
 */

/**
 * @typedef Fold
 * @type {{axis: string, point: number}}
 */

/**
 * Reads a files content under an utf-8 encoding
 * @param {string} directory 
 * @returns {string}
 */
const readFile = (directory) => readFileSync(directory, { encoding: 'utf-8' });

/**
 * Gets the filenames of a given directory
 * @param {string} directory 
 * @returns {Array.<string>}
 */
const getFileNames = (directory) => readdirSync(directory).map((file) => file);

/**
 * Gets the raw input from all files, while spliting a file's content with '\n\n' delimeter
 * Allowing to get the raw points and folds for each file
 * @param {Array.<string>} files 
 * @param {string} directory 
 * @returns {Array.<Array.<string>>}
 */
const getRawInputs = (files, directory) => files.map((file) => readFile(directory + file).trim().split('\n\n'));

/**
 * Generates a transformed list of points
 * @param {string} rawPointsInput 
 * @returns {Array.<Point>}
 */
function getPoints(rawPointsInput) {
  return rawPointsInput.match(/[^cell at\n/]+/g).map(point => {
    let [x, y] = point.split(',').map((el) => Number(el.match(/\d+/g)));
    return { x, y };
  });
}

/**
 * Generates a transformed list of folds
 * @param {string} rawFoldsInput 
 * @returns {Array.<Fold>}
 */
function getFolds(rawFoldsInput) {
  return rawFoldsInput.match(/[^fold (up|left) along\n]+/g).map(fold => {
    let [axis, point] = fold.split('=');
    return { axis, point: Number(point) };
  });
}

/**
 * Generates an array of points and folds for all messages
 * @param {Array.<string>} files
 * @param {string} path
 * @returns {Array.<{file: string, points: Array.<Point>, folds: Array.<Fold>}>}
 */
function generateInputs(files, path) {
  const inputs = getRawInputs(files, path);
  const scrubbedInputs = inputs.map((input, index) => {
    const [rawPoints, rawFolds] = input;
    const points = getPoints(rawPoints);
    const folds = getFolds(rawFolds);
    return { file: files[index], points, folds };
  });

  return scrubbedInputs;
}

export { generateInputs, getFileNames, getPoints, getFolds };