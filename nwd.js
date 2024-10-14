import path from 'node:path';
import { access, constants } from 'node:fs/promises';
import { readdir } from 'node:fs';

export function goToUpDir(currentDir, homedir) {
  if (currentDir !== homedir) {
    const newDir = path.resolve(currentDir, '..');
    console.log(`You are in ${currentDir}`);
    return newDir;
  } else {
    console.log('You are in root directory already!');
    return homedir;
  }
}

export async function navigateToDir(currentDir, nextPath) {
  const newpath = path.join(currentDir, nextPath);

  try {
    access(newpath, constants.R_OK | constants.W_OK);
    return newpath;
  } catch(err) {
    console.error(`Cannot access in ${nextPath}`);
    return null;
  }
}

export async function getList(currentDir) {
  readdir(currentDir, {withFileTypes: true}, (err, files) => {
    if (err) console.error('Get list failed');
    const isFiles = [].sort();
    const isFolders = [].sort();

    for (let file of files) {
      file.isFile() ? isFiles.push(file.name) : isFolders.push(file.name);
    }

    const dataTable = [];
    isFolders.forEach((folder) => dataTable.push({Name: folder, Type: 'directory'}));
    isFiles.forEach((file) =>  dataTable.push({Name: file, Type: 'file'}));

    console.log('\n');
    console.table(dataTable);
  });
}