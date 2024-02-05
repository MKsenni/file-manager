import { pipeline } from 'node:stream';
import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import path from 'node:path';

export function calculateHash(currentDir, currentPath) {
  const fileName = path.join(currentDir, currentPath);
  const hash = createHash('sha256');
  const readable = createReadStream(fileName);

  pipeline(readable, hash.setEncoding('hex'), process.stdout, (err) => {
    if (err) console.log('Hash failed');
  });
}