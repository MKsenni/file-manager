import * as os from 'node:os';
import path from 'node:path';
import { access, constants } from 'node:fs/promises';

export function getHomedir() {
  const homedir = os.homedir();
  console.log(`You are currently in ${homedir}`);
  return homedir;
}

export function goToUpDir(currentDir, homedir) {
  if (currentDir !== homedir) {
    const newDir = path.resolve(currentDir, '..');
    console.log(`You in ${currentDir}`);
    return newDir;
  } else {
    console.log('You in root directory already!');
    return homedir;
  }
}

export async function navigateToDir(currentDir, nextPath) {
  const newpath = path.join(currentDir, nextPath);

  try {
    access(newpath, constants.R_OK | constants.W_OK);
    return newpath;
  } catch {
    console.error(`Cannot access in ${nextPath}`);
    return null;
  }
}