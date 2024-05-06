import { describe, it } from 'node:test';
import assert from 'node:assert';
import { generateInputs, getFileNames } from '../components/input.mjs';
import generatePointsAfterFolds from '../components/solver.mjs';
import { getMaxOfProperty } from '../utils/utils.mjs';
import { TEST_MESSAGES_PATH } from '../utils/config.mjs';

// input
describe('gets file names of the secret messages', () => {
  const expected = ['test-message.txt'];
  it('returns an array of file in the test directory', () => {
    const files = getFileNames(TEST_MESSAGES_PATH);
    assert.deepStrictEqual(files, expected);
  });
});

describe('generate inputs by transforming the raw input to an array of points and folds', () => {
  const expected = [
    {
      file: 'test-message.txt',
      points: [{ x: 4, y: 0 }],
      folds: [{ axis: 'x', point: 2 }]
    },
  ];
  it(`transforms the input to ${JSON.stringify(expected)}`, () => {
    const files = getFileNames(TEST_MESSAGES_PATH);
    const inputs = generateInputs(files, TEST_MESSAGES_PATH);
    assert.deepStrictEqual(inputs, expected);
  });
});

// solver
describe('generate points after folds', () => {
  const expected1 = [{ x: 0, y: 0 }];
  const expected2 = [{ x: 1, y: 1 }];

  it(`new points after folds should equal to ${JSON.stringify(expected1)}`, () => {
    const points = [{ x: 4, y: 0 }];
    const folds = [{ axis: 'x', point: 2 }];
    const pointsAfterFolds = generatePointsAfterFolds(points, folds);
    assert.deepStrictEqual(pointsAfterFolds, expected1);
  });

  it(`new points after folds should equal to ${JSON.stringify(expected2)}`, () => {
    const points = [{ x: 1, y: 3 }];
    const folds = [{ axis: 'y', point: 2 }];
    const pointsAfterFolds = generatePointsAfterFolds(points, folds);
    assert.deepStrictEqual(pointsAfterFolds, expected2);
  });
});

// utils
describe('get max of property', () => {
  const expect = 10;
  it(`max value is ${expect}`, () => {
    const points = [{ x: 2, y: 0 }, { x: 10, y: 0 }, { x: 4, y: 0 }];
    const axis = 'x';
    const max = getMaxOfProperty(points, axis);
    assert.equal(max, expect);
  });
});

