'use strict';

let fs    = require('fs'),
    path  = require('path'),
    http  = require('http'),
    folderSize = 0,
    firstCycle = true,
    typeMap = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.txt': 'text/plain'
    };

// Run server
http.createServer((request, response) => {
  console.log('поступил запрос', request.url);

  fs.writeFileSync('stat.txt', '');

  let fileToRead = decodeURIComponent(request.url);

  console.log(fileToRead, 'DJDDDSDSDSDS');
  if (fileToRead != '/') {
    if (!fs.statSync(fileToRead)) {
      fileToRead = '404.html';
    }

    getStats(fileToRead);

    let content = fs.readFileSync('stat.txt');
    let ext = path.extname('stat.txt');
    let contentType = typeMap[ext];

    response.setHeader('Content-Type', contentType);
    response.write(content);

  }

  response.end();
}).listen(7777);


/**
 * Get statistics
 * @param dirPath - Path to the folder
 */
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

  if(fs.lstatSync(dirPath).isDirectory()) {
    fs.appendFileSync('stat.txt', `==${path.basename(dirPath)} (${(folderSize / 1000 / 1024).toFixed(1)} mb)== \x0D`);
  }

  // Determine name and size of files
  for (let dir of dirs) {
    fileName = dir;

    path.isAbsolute(dirPath) && (dir = dirPath + '/' + dir);

    stat = fs.statSync(dir);

    folderSize += stat.size;

    fs.lstatSync(dir).isFile() && fs.appendFileSync('stat.txt', `${fileName} (${(stat.size / 1024).toFixed(0)} kb) \x0D`);

    if (fs.lstatSync(dir).isDirectory() && dir[0] !== '.') {
      folder.push(dir);
    }
  }

  folder.forEach(el => {
    firstCycle = false;
    getStats(el);
  });
}