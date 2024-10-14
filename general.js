import * as os from 'node:os';
import {dirname} from 'node:path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function getHomedir() {
  return os.homedir();
}

export function getCurrentWorkDir() {
  const homedir = __dirname;
  console.log(`You are currently in ${homedir}`);
  return homedir;
}