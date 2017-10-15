"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const execRegex_1 = require("../tools/execRegex");
function containsReexports(content) {
    return getExportedNames(content).length > 0;
}
exports.containsReexports = containsReexports;
const funcRegex = /export[\s]*function[\s]*([^\s^\()]*)|export[\s]*async[\s]*function[\s]*([^\s^\()]*)/g;
const typeRegex = /export[\s]*enum[\s]*([^\s^{]*)|export[\s]*type[\s]*([^\s^{]*)/g;
const classRegex = /export[\s]*interface[\s]*([^\s^{]*)|export[\s]*class[\s]*([^\s^{]*)/g;
const constRegex = /export[\s]*const[\s]*([^\s]*)[\s]*[:[\s]*[^\s]*[\s]*]?=/g;
function getExportedNames(content) {
    const funcs = execRegex_1.execRegex(funcRegex, content).map(match => match[1] || match[2]);
    const types = execRegex_1.execRegex(typeRegex, content).map(match => match[1] || match[2]);
    const classes = execRegex_1.execRegex(classRegex, content).map(match => match[1] || match[2]);
    const constants = execRegex_1.execRegex(constRegex, content).map(match => match[1]);
    return [...funcs, ...types, ...classes, ...constants];
}
exports.getExportedNames = getExportedNames;
//# sourceMappingURL=getExportedNames.js.map