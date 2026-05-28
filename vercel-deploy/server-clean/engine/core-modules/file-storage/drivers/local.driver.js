"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LocalDriver", {
    enumerable: true,
    get: function() {
        return LocalDriver;
    }
});
const _fs = require("fs");
const _promises = /*#__PURE__*/ _interop_require_wildcard(require("node:fs/promises"));
const _path = /*#__PURE__*/ _interop_require_wildcard(require("path"));
const _filestorageexception = require("../interfaces/file-storage-exception");
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
let LocalDriver = class LocalDriver {
    async createFolder(folderPath) {
        return _promises.mkdir(folderPath, {
            recursive: true
        });
    }
    assertRealPathIsWithinStorage(realPath) {
        const storageRoot = (0, _fs.realpathSync)(_path.default.resolve(this.options.storagePath));
        if (!realPath.startsWith(storageRoot + _path.default.sep)) {
            throw new _filestorageexception.FileStorageException('Access denied', _filestorageexception.FileStorageExceptionCode.ACCESS_DENIED);
        }
    }
    async readFile(params) {
        const joinedPath = (0, _path.join)(this.options.storagePath, params.filePath);
        let filePath;
        try {
            filePath = (0, _fs.realpathSync)(_path.default.resolve(joinedPath));
        } catch  {
            throw new _filestorageexception.FileStorageException('File not found', _filestorageexception.FileStorageExceptionCode.FILE_NOT_FOUND);
        }
        this.assertRealPathIsWithinStorage(filePath);
        try {
            return (0, _fs.createReadStream)(filePath);
        } catch (error) {
            if (error.code === 'ENOENT') {
                throw new _filestorageexception.FileStorageException('File not found', _filestorageexception.FileStorageExceptionCode.FILE_NOT_FOUND);
            }
            throw error;
        }
    }
    async writeFile(params) {
        const filePath = _path.default.resolve(this.options.storagePath, params.filePath);
        const folderPath = (0, _path.dirname)(filePath);
        await this.createFolder(folderPath);
        const realFolderPath = (0, _fs.realpathSync)(folderPath);
        const realFilePath = _path.default.join(realFolderPath, _path.default.basename(filePath));
        this.assertRealPathIsWithinStorage(realFilePath);
        try {
            const stats = await _promises.lstat(realFilePath);
            if (stats.isSymbolicLink()) {
                throw new _filestorageexception.FileStorageException('Access denied', _filestorageexception.FileStorageExceptionCode.ACCESS_DENIED);
            }
        } catch (error) {
            if (error.code !== 'ENOENT') {
                throw error;
            }
        }
        await _promises.writeFile(realFilePath, params.sourceFile);
    }
    async downloadFile(params) {
        const resolvedPath = _path.default.resolve(this.options.storagePath, params.onStoragePath);
        let filePath;
        try {
            filePath = (0, _fs.realpathSync)(resolvedPath);
        } catch  {
            throw new _filestorageexception.FileStorageException('File not found', _filestorageexception.FileStorageExceptionCode.FILE_NOT_FOUND);
        }
        this.assertRealPathIsWithinStorage(filePath);
        await this.createFolder((0, _path.dirname)(params.localPath));
        const content = await _promises.readFile(filePath);
        await _promises.writeFile(params.localPath, content);
    }
    async downloadFolder(params) {
        const resolvedPath = _path.default.resolve(this.options.storagePath, params.onStoragePath);
        let rootFolderPath;
        try {
            rootFolderPath = (0, _fs.realpathSync)(resolvedPath);
        } catch  {
            throw new _filestorageexception.FileStorageException('File not found', _filestorageexception.FileStorageExceptionCode.FILE_NOT_FOUND);
        }
        this.assertRealPathIsWithinStorage(rootFolderPath);
        await this.createFolder(params.localPath);
        await this.downloadFolderFromRealPath({
            rootFolderPath,
            localPath: params.localPath
        });
    }
    async downloadFolderFromRealPath(params) {
        await this.createFolder(params.localPath);
        const resources = await _promises.readdir(params.rootFolderPath);
        for (const resource of resources){
            const resourcePath = _path.default.join(params.rootFolderPath, resource);
            const stats = await _promises.lstat(resourcePath);
            if (stats.isSymbolicLink()) {
                throw new _filestorageexception.FileStorageException('Access denied', _filestorageexception.FileStorageExceptionCode.ACCESS_DENIED);
            }
            if (stats.isFile()) {
                const content = await _promises.readFile(resourcePath);
                await _promises.writeFile(_path.default.join(params.localPath, resource), content);
            } else {
                await this.downloadFolderFromRealPath({
                    rootFolderPath: resourcePath,
                    localPath: _path.default.join(params.localPath, resource)
                });
            }
        }
    }
    async uploadFolder(params) {
        const resources = await _promises.readdir(params.localPath);
        for (const resource of resources){
            const resourcePath = _path.default.join(params.localPath, resource);
            const stats = await _promises.stat(resourcePath);
            if (stats.isFile()) {
                const content = await _promises.readFile(resourcePath);
                await this.writeFile({
                    filePath: _path.default.join(params.onStoragePath, resource),
                    sourceFile: content,
                    mimeType: undefined
                });
            } else {
                await this.uploadFolder({
                    localPath: resourcePath,
                    onStoragePath: _path.default.join(params.onStoragePath, resource)
                });
            }
        }
    }
    async delete(params) {
        const filePath = _path.default.resolve(this.options.storagePath, params.folderPath, params.filename || '');
        await _promises.rm(filePath, {
            recursive: true,
            force: true
        });
    }
    async move(params) {
        const fromPath = _path.default.resolve(this.options.storagePath, params.from.folderPath, params.from.filename || '');
        const toPath = _path.default.resolve(this.options.storagePath, params.to.folderPath, params.to.filename || '');
        await this.createFolder((0, _path.dirname)(toPath));
        try {
            await _promises.rename(fromPath, toPath);
        } catch (error) {
            if (error.code === 'ENOENT') {
                throw new _filestorageexception.FileStorageException('File not found', _filestorageexception.FileStorageExceptionCode.FILE_NOT_FOUND);
            }
            throw error;
        }
    }
    async copy(params) {
        if (!params.from.filename && params.to.filename) {
            throw new Error('Cannot copy folder to file');
        }
        const fromPath = _path.default.resolve(this.options.storagePath, params.from.folderPath, params.from.filename || '');
        const toPath = _path.default.resolve(this.options.storagePath, params.to.folderPath, params.to.filename || '');
        await this.createFolder((0, _path.dirname)(toPath));
        try {
            await _promises.cp(fromPath, toPath, {
                recursive: true
            });
        } catch (error) {
            if (error.code === 'ENOENT') {
                throw new _filestorageexception.FileStorageException('File not found', _filestorageexception.FileStorageExceptionCode.FILE_NOT_FOUND);
            }
            throw error;
        }
    }
    async checkFileExists(params) {
        const fullPath = _path.default.resolve(this.options.storagePath, params.filePath);
        return (0, _fs.existsSync)(fullPath);
    }
    async getPresignedUrl() {
        return null;
    }
    async checkFolderExists(params) {
        const folderFullPath = _path.default.resolve(this.options.storagePath, params.folderPath);
        return (0, _fs.existsSync)(folderFullPath);
    }
    constructor(options){
        this.options = options;
    }
};

//# sourceMappingURL=local.driver.js.map