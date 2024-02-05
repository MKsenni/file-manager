import { readdir, readFile } from 'node:fs';
import path from 'node:path';

export function getList(currentDir) {
  readdir(currentDir, {withFileTypes: true}, (err, files) => {
    if (err) throw new Error('Get list failed');
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

export function basicOperations(currentPath) {
  const [command, ...args] = currentPath.split(' ');
  const {dir, base} = path.parse(args.join(' '));
  const newPath = path.join(dir, base);
  switch(command) {
    case 'cat':
      readFile(newPath, 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);
    })
  }
}