"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isSafeRelativePath", {
    enumerable: true,
    get: function() {
        return isSafeRelativePath;
    }
});
const _path = require("path");
const isSafeRelativePath = (filePath)=>{
    if (filePath.length === 0) {
        return false;
    }
    if (filePath.includes('\0')) {
        return false;
    }
    if ((0, _path.isAbsolute)(filePath)) {
        return false;
    }
    if (filePath.includes('\\')) {
        return false;
    }
    const normalized = (0, _path.normalize)(filePath);
    if (normalized.split(_path.sep).includes('..')) {
        return false;
    }
    return true;
};

//# sourceMappingURL=is-safe-relative-path.util.js.map