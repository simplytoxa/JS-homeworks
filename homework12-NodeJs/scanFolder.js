'use strict';

let fs         = require('fs'),
    path       = require('path'),
    folderSize = 0,
    firstCycle = true;

function getStats(dirPath) {
  let dirs   = fs.readdirSync(dirPath),
      folder = [],
      stat,
      fileName;

  if (!path.isAbsolute(dirPath) && dirPath !== './') {
    throw new Error('Absolute paths only accepted');
  }

  // Log folder name
  if (firstCycle) {
    for (let dir of dirs) {
      path.isAbsolute(dirPath) && (dir = dirPath + '/' + dir);

      stat = fs.statSync(dir);

      folderSize += stat.size;
    }
  }

  if (fs.lstatSync(dirPath).isDirectory()) {
    console.log('==' + path.basename(dirPath), `(${(folderSize / 1000 / 1024).toFixed(1)} mb)==`);
  }

  // Determine name and size of files
  for (let dir of dirs) {
    fileName = dir;

    path.isAbsolute(dirPath) && (dir = dirPath + '/' + dir);

    stat = fs.statSync(dir);

    folderSize += stat.size;

    fs.lstatSync(dir).isFile() && console.log(fileName, `(${(stat.size / 1024).toFixed(0)} kb)`);

    if (fs.lstatSync(dir).isDirectory() && dir[0] !== '.') {
      folder.push(dir);
    }
  }

  folder.forEach(el => {
    firstCycle = false;
    getStats(el);
  });
}