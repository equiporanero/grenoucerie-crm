"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateStoragePathIsWithinWorkspaceOrThrow", {
    enumerable: true,
    get: function() {
        return validateStoragePathIsWithinWorkspaceOrThrow;
    }
});
const _path = require("path");
const _filestorageexception = require("../interfaces/file-storage-exception");
const validateStoragePathIsWithinWorkspaceOrThrow = ({ onStoragePath, workspaceId, applicationUniversalIdentifier, fileFolder })=>{
    const expectedPrefix = (0, _path.join)(workspaceId, applicationUniversalIdentifier, fileFolder);
    const normalizedPath = (0, _path.normalize)(onStoragePath);
    const normalizedPrefix = (0, _path.normalize)(expectedPrefix + '/');
    if (!normalizedPath.startsWith(normalizedPrefix)) {
        throw new _filestorageexception.FileStorageException('Invalid storage path: resolved path escapes the expected directory', _filestorageexception.FileStorageExceptionCode.ACCESS_DENIED);
    }
};

//# sourceMappingURL=validate-storage-path-is-within-workspace-or-throw.util.js.map