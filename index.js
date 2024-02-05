import getUsername from './cli.js';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { getHomedir, goToUpDir, navigateToDir } from './path.js';
import { basicOperations, getList } from './filesistem.js';
import { calculateHash } from './hash.js';
import { zlibBrotli } from './zlib.js';


try {
  const rl = readline.createInterface({ input, output });

  const username = getUsername();
  const homedir = getHomedir();
  let currentDir = homedir;
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
        case 'ls':
          getList(currentDir);
          break;
        case 'hash':
          calculateHash(currentDir, args[0]);
          break;
      }
      basicOperations(line, currentDir);
      zlibBrotli(line, currentDir);
      console.log(`You are currently in ${currentDir}`);
    }
    rl.prompt();
  });
  
  rl.on('close', (_stream) => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  });
  rl.prompt();
} catch(err) {
  console.log('Global error', err);
}
