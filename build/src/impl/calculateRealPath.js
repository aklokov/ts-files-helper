"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const last_first_1 = require("../tools/last-first");
const combinePath_1 = require("../tools/combinePath");
function calculateRealPath(tsconfig, path, importLine) {
    const splitPath = path.split('/');
    const splitImport = split(importLine);
    if (splitImport[0] !== '.' && splitImport[0] !== '..') {
        return applyPath(tsconfig, splitImport);
    }
    return calculateDiff(splitPath, splitImport);
}
exports.calculateRealPath = calculateRealPath;
function split(line) {
    return line.replace(/\\/g, '/').split('/').filter(part => part.length);
}
function applyPath(tsconfig, split) {
    split[0] = tryReplace(tsconfig, split[0]);
    return split.join('/');
}
function tryReplace(tsconfig, first) {
    if (!tsconfig || !tsconfig.baseUrl) {
        return first;
    }
    const pathstart = tsconfig.baseUrl;
    let result = first;
    _.forIn(tsconfig.paths, (repl, path) => {
        if (path === first) {
            result = combinePath_1.combinePath(pathstart, repl[0]);
        }
        else if (path === first + '/*') {
            result = combinePath_1.combinePath(pathstart, repl[0].substr(0, repl[0].length - 2));
        }
    });
    return split(result).join('/');
}
function calculateDiff(path, imp) {
    imp.forEach(line => {
        if (line === '..') {
            path = subtractPath(path);
        }
        else if (line !== '.') {
            path = [...path, line];
        }
    });
    return path.join('/');
}
function subtractPath(path) {
    const lastLine = last_first_1.last(path);
    if (lastLine === '.') {
        const lastRemoved = path.slice(0, path.length - 1);
        return [...lastRemoved, '..'];
    }
    else if (lastLine === '..') {
        return [...path, '..'];
    }
    else {
        return path.slice(0, path.length - 1);
    }
}
//# sourceMappingURL=calculateRealPath.js.map