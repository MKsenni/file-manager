import getUsername from './cli.js';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import { getHomedir, goToUpDir, navigateToDir } from './navigate.js';
import { getList } from './filesistem.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const homedir = getHomedir();
let currentDir = homedir;

try {
  const rl = readline.createInterface({ input, output });
  
  const username = getUsername();
  rl.on('line', async (line) => {
    const [command, ...args] = line.split(' ');

    if(line === '.exit') {
      rl.close();
    } else {
      switch (command.trim()) {
        case 'up':
          currentDir = goToUpDir(currentDir, homedir);
          break;
        case 'cd':
          currentDir = await navigateToDir(currentDir, args[0]);
          break;
        case 'list':
          getList(currentDir);
          break;
      }
      console.log(`You are currently in ${currentDir}`);
    }
  });
  
  rl.on('close', (_stream) => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  })
} catch {
  throw new Error('My custom error');
}
