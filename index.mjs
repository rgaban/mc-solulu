import { generateInputs, getFileNames } from './components/input.mjs';
import { outputAllMessages } from './components/output.mjs';
import { MESSAGES_PATH } from './utils/config.mjs';

const files = getFileNames(MESSAGES_PATH);
const inputs = generateInputs(files, MESSAGES_PATH);
outputAllMessages(inputs);


/* -- output --
  FREDDIE
  HITCHHIKE ON A STORK
  YOUR BAG IS IN NEW YORK
  DONT GO BANANAS
  YOUR HAT IS IN ATLANTA
*/