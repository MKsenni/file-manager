import { readdir, access } from 'node:fs';
import path from 'node:path';

export function getList(currentDir) {
  readdir(currentDir, {withFileTypes: true}, (err, files) => {
    if (err) throw new Error('Get list failed');
    const isFiles = [].sort();
    const isFolders = [].sort();

    for (let file of files) {
      file.isFile() ? isFiles.push(file.name) : isFolders.push(file.name);
    }
    
    isFolders.forEach(folder => console.log('Folder\t' + folder));
    isFiles.forEach(file => console.log('File\t' + file));
  })
}