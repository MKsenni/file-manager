import { readdir, writeFile , createReadStream, rename, createWriteStream, unlink } from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream';

export function getList(currentDir) {
  readdir(currentDir, {withFileTypes: true}, (err, files) => {
    if (err) console.log('Get list failed', err);
    const isFiles = [].sort();
    const isFolders = [].sort();

    for (let file of files) {
      file.isFile() ? isFiles.push(file.name) : isFolders.push(file.name);
    }

    const dataTable = [];
    isFolders.forEach((folder) => dataTable.push({Name: folder, Type: 'directory'}));
    isFiles.forEach((file) =>  dataTable.push({Name: file, Type: 'file'}));

    console.table(dataTable);
  });
}

export function basicOperations(currentPath, currentDir) {
  const [command, ...args] = currentPath.split(' ');
  const {dir, base} = path.parse(args.join(' '));
  const readFilePath = path.join(dir, base);
  const newFilePath = path.join(currentDir, base);

  switch(command) {
    case 'cat':
      const readable = createReadStream(newFilePath);
      readable.setEncoding('utf8');
      readable.pipe(process.stdout);
      break;
    case 'add':
      writeFile(newFilePath, '', (err) => {
        console.log(err ? 'Add file failed' : `Added file: ${base}`);
      })
      break;
    case 'rn':
      const oldFileName = path.join(currentDir, args[0]);
      const newFileName = path.join(currentDir, args[1]);
      rename(oldFileName, newFileName, (err) => {
        console.log(err ? 'Rename file failed' : `Rename file ${args[0]} on ${args[1]}`);
      });
      break;
    case 'cp':
      const copyFileName = path.join(currentDir, args[0]);
      const folderForCopy = path.join(currentDir, args[1], args[0]);
      const readableCP = createReadStream(copyFileName);
      const writableCP = createWriteStream(folderForCopy);
      readableCP.pipe(writableCP);
      break;
    case 'mv':
      const moveFileName = path.join(currentDir, args[0]);
      const folderForMove = path.join(currentDir, args[1], args[0]);
      const readableMV = createReadStream(moveFileName);
      const writableMV = createWriteStream(folderForMove);
      pipeline(readableMV, writableMV, (err) => {
        if (err) console.log('Operation failed', err);
        unlink(moveFileName, (err) => {
          if (err) console.log('Operation failed', err);
        });
      })
      break;
    case 'rm':
      unlink(newFilePath, (err) => {
        if (err) console.log('Operation failed', err);
      });
      break;
  }
}