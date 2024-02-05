import { pipeline } from 'node:stream';
import zlib from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import path from 'node:path';

export function zlibBrotli(currentPath, currentDir) {
  const [command, ...args] = currentPath.split(' ');

  switch (command) {
    case 'compress':
      const pathFileCS = path.resolve(currentDir, args[0]);
      const pathDistCS = path.resolve(currentDir, args[1]);
      const readableCS = createReadStream(pathFileCS);
      const writableCS = createWriteStream(pathDistCS);
      pipeline(readableCS, zlib.createBrotliCompress(), writableCS, (err) => {
        if (err) console.log('Compress failed', err);
      });
      break;
    case 'decompress':
      pipeline(readableCS, zlib.createBrotliDecompress(), writableCS, (err) => {
        if (err) console.log('Decompress failed', err);
      });
      break;
  }
}