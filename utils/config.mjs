import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

export const __dirname = dirname(fileURLToPath(new URL('./', import.meta.url, '/')));

export const Path = {
  DIRECTORY: __dirname,
  MESSAGES: '/messages/',
  TEST: '/test',
};

export const MESSAGES_PATH = join(Path.DIRECTORY, Path.MESSAGES);
export const TEST_MESSAGES_PATH = join(Path.DIRECTORY, Path.TEST, Path.MESSAGES);

export const Axis = {
  X: 'x',
  Y: 'y',
}