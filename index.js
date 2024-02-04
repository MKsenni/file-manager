import getUsername from './cli.js';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

try {
  const rl = readline.createInterface({ input, output });
  
  const username = getUsername();
  rl.on('line', (line) => {
    if(line === '.exit') {
      rl.close();
    } else {
      console.log(`You are currently in ${__dirname}`);
    }
  });
  
  rl.on('close', (_stream) => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  })
} catch {
  throw new Error('My custom error');
}
