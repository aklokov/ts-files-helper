"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calculateRealPath_1 = require("./calculateRealPath");
const execRegex_1 = require("../tools/execRegex");
const _ = require("lodash");
const regex = /import[\s]*{(.*)}[\s]*from[\s]*['|"](.*)['|"]/g;
function parseImports(tsConfig, content, path) {
    const matches = execRegex_1.execRegex(regex, content);
    const typeGroups = matches.map(match => parseMatch(tsConfig, match[1], match[2], path));
    return _.flatten(typeGroups);
}
exports.parseImports = parseImports;
function parseMatch(tsConfig, types, importline, path) {
    const realPath = calculateRealPath_1.calculateRealPath(tsConfig, path, importline);
    return types.split(',').map(type => createImport(type, realPath)).filter(x => x);
}
function createImport(type, realPath) {
    const parts = type.split(' ').filter(s => s.length);
    if (parts.length === 3 && parts[1] === 'as') {
        return {
            typeName: parts[0],
            aliasName: parts[2],
            realPath
        };
    }
    else if (parts.length > 0) {
        return {
            typeName: parts[0],
            aliasName: parts[0],
            realPath
        };
    }
}
//# sourceMappingURL=parseImports.js.map