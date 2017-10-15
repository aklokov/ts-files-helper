"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
function splitFilePath(filePath) {
    const dir = path.dirname(filePath);
    const file = filePath.substr(dir.length + 1);
    return {
        dir,
        file
    };
}
exports.splitFilePath = splitFilePath;
//# sourceMappingURL=splitFilePath.js.map