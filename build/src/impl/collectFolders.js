"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const splitFilePath_1 = require("./splitFilePath");
const createFolders_1 = require("./createFolders");
const readGlob_1 = require("./readGlob");
function collectFolders(globs) {
    if (!Array.isArray(globs)) {
        globs = [globs];
    }
    return collectFoldersImpl(globs);
}
exports.collectFolders = collectFolders;
function collectFoldersImpl(globs) {
    return __awaiter(this, void 0, void 0, function* () {
        const allFiles = yield Promise.all(globs.map(glob => readGlob_1.readGlob(glob)));
        const files = _(allFiles).flatten().uniq().map(splitFilePath_1.splitFilePath).value();
        return createFolders_1.createFolders(files);
    });
}
//# sourceMappingURL=collectFolders.js.map