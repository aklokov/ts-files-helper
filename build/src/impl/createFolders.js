"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
function createFolders(files) {
    const grouped = _.groupBy(files, file => file.dir);
    const result = [];
    _.forIn(grouped, files => {
        const folderPath = files[0].dir;
        const folder = {
            path: folderPath,
            files: files.map(file => file.file)
        };
        result.push(folder);
    });
    return result;
}
exports.createFolders = createFolders;
//# sourceMappingURL=createFolders.js.map