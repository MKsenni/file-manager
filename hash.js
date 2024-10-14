import { pipeline } from 'node:stream';
import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import {stdout} from 'node:process';

export async function calculateHash(currentDir, currentPath) {
  const fileName = path.join(currentDir, currentPath);
  const hash = createHash('sha256');
  const readable = createReadStream(fileName);

  pipeline(readable, hash.setEncoding('hex'), (err) => {
    if (err) {
      console.error('Hash calculation failed:', err);
    } else {
      stdout.write(hash.read() + '\n');
    }
  });
}