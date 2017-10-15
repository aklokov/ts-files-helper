"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const glob = require("glob");
function readGlob(globArg) {
    return new Promise((resolve, reject) => {
        glob(globArg, (err, files) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(files);
            }
        });
    });
}
exports.readGlob = readGlob;
//# sourceMappingURL=readGlob.js.map