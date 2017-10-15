"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function execRegex(regex, content) {
    const matches = [];
    let match = regex.exec(content);
    while (match) {
        matches.push(match);
        match = regex.exec(content);
    }
    return matches;
}
exports.execRegex = execRegex;
//# sourceMappingURL=execRegex.js.map