"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "assertStoragePathIsSafe", {
    enumerable: true,
    get: function() {
        return assertStoragePathIsSafe;
    }
});
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
const _filestorageexception = require("../interfaces/file-storage-exception");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const assertStoragePathIsSafe = (storagePath)=>{
    if (storagePath.includes('\0')) {
        throw new _filestorageexception.FileStorageException('Invalid storage path: contains null bytes', _filestorageexception.FileStorageExceptionCode.ACCESS_DENIED);
    }
    if (_path.default.isAbsolute(storagePath)) {
        throw new _filestorageexception.FileStorageException('Invalid storage path: absolute path not allowed', _filestorageexception.FileStorageExceptionCode.ACCESS_DENIED);
    }
    const normalized = _path.default.normalize(storagePath);
    if (normalized.split(_path.default.sep).includes('..')) {
        throw new _filestorageexception.FileStorageException('Invalid storage path: path traversal detected', _filestorageexception.FileStorageExceptionCode.ACCESS_DENIED);
    }
};

//# sourceMappingURL=assert-storage-path-is-safe.util.js.map