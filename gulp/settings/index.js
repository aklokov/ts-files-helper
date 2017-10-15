const settings = require('./settings')
const constants = require('./constants');

const srcTsFiles = settings.srcPath + constants.allTs;
const testTsFiles = settings.testPath + constants.allTs;
const testFiles = settings.testBuildPath + constants.allJs;
const razorFiles = settings.srcPath + constants.rzrFiles;

const buildSettings = {
  srcTsFiles,
  testTsFiles,
  testFiles,
  razorFiles,
  projectTsFiles: [srcTsFiles, testTsFiles]
}

module.exports = Object.assign({}, settings, buildSettings);