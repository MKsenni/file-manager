import getUsername from './cli.js';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output, exit } from 'node:process';
import {getList, goToUpDir, navigateToDir} from './nwd.js';
import { basicOperations } from './filesistem.js';
import { calculateHash } from './hash.js';
import { zlibBrotli } from './zlib.js';
import {getCurrentWorkDir, getHomedir} from "./general.js";
import {handleOsCommand} from "./os.js";
import errorHandler from "./errorsHandler.js";

const startFileManager = async () => {
  const rl = readline.createInterface({ input, output });

  const username = getUsername();
  const homedir = getHomedir();
  let currentDir = getCurrentWorkDir();
  rl.on('line', async (line) => {
    const [command, ...args] = line.split(' ');

    if (line === '.exit') {
      return rl.close();
    } else {
      try {
        switch (command.trim()) {
          case 'up':
            currentDir = goToUpDir(currentDir, homedir);
            break;
          case 'cd':
            currentDir = await navigateToDir(currentDir, args[0]);
            break;
          case 'ls':
            await getList(currentDir);
            break;
          case 'hash':
            await calculateHash(currentDir, args[0]);
            break;
          default:
            basicOperations(line, currentDir);
            zlibBrotli(line, currentDir);
            handleOsCommand(line);
        }
      } catch (err) {
        console.error('Operation failed');
      } finally {
        rl.prompt();
      }
      console.log(`You are currently in ${currentDir}`);
    }
  }).on('close', (_stream) => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    exit(0);
  });
  rl.prompt();
}

await errorHandler(startFileManager);