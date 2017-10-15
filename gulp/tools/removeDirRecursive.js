const fs = require('fs');
const retry = require('./retry');

function removeDir(file, path) {
  var curPath = path + "/" + file;
  if (fs.lstatSync(curPath).isDirectory()) { // recurse
    removeDirRecursive(curPath);
  } else { // delete file
    fs.unlinkSync(curPath);
  }
}

function removeDirRecursive(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(retry(file => removeDir(file, path)));
    fs.rmdirSync(path);
  }
};

module.exports = retry(removeDirRecursive);