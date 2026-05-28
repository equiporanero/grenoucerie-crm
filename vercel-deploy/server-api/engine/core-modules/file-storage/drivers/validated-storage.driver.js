"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ValidatedStorageDriver", {
    enumerable: true,
    get: function() {
        return ValidatedStorageDriver;
    }
});
const _assertstoragepathissafeutil = require("../utils/assert-storage-path-is-safe.util");
let ValidatedStorageDriver = class ValidatedStorageDriver {
    async readFile(params) {
        (0, _assertstoragepathissafeutil.assertStoragePathIsSafe)(params.filePath);
        return this.delegate.readFile(params);
    }
    async writeFile(params) {
        (0, _assertstoragepathissafeutil.assertStoragePathIsSafe)(params.filePath);
        return this.delegate.writeFile(params);
    }
    async downloadFolder(params) {
        (0, _assertstoragepathissafeutil.assertStoragePathIsSafe)(params.onStoragePath);
        return this.delegate.downloadFolder(params);
    }
    async uploadFolder(params) {
        (0, _assertstoragepathissafeutil.assertStoragePathIsSafe)(params.onStoragePath);
        return this.delegate.uploadFolder(params);
    }
    async downloadFile(params) {
        (0, _assertstoragepathissafeutil.assertStoragePathIsSafe)(params.onStoragePath);
        return this.delegate.downloadFile(params);
    }
    async delete(params) {
        (0, _assertstoragepathissafeutil.assertStoragePathIsSafe)(params.folderPath);
        if (params.filename) {
            (0, _assertstoragepathissafeutil.assertStoragePathIsSafe)(params.filename);
        }
        return this.delegate.delete(params);
    }
    async move(params) {
        (0, _assertstoragepathissafeutil.assertStoragePathIsSafe)(params.from.folderPath);
        (0, _assertstoragepathissafeutil.assertStoragePathIsSafe)(params.to.folderPath);
        if (params.from.filename) {
            (0, _assertstoragepathissafeutil.assertStoragePathIsSafe)(params.from.filename);
        }
        if (params.to.filename) {
            (0, _assertstoragepathissafeutil.assertStoragePathIsSafe)(params.to.filename);
        }
        return this.delegate.move(params);
    }
    async copy(params) {
        (0, _assertstoragepathissafeutil.assertStoragePathIsSafe)(params.from.folderPath);
        (0, _assertstoragepathissafeutil.assertStoragePathIsSafe)(params.to.folderPath);
        if (params.from.filename) {
            (0, _assertstoragepathissafeutil.assertStoragePathIsSafe)(params.from.filename);
        }
        if (params.to.filename) {
            (0, _assertstoragepathissafeutil.assertStoragePathIsSafe)(params.to.filename);
        }
        return this.delegate.copy(params);
    }
    async getPresignedUrl(params) {
        (0, _assertstoragepathissafeutil.assertStoragePathIsSafe)(params.filePath);
        return this.delegate.getPresignedUrl(params);
    }
    async checkFileExists(params) {
        (0, _assertstoragepathissafeutil.assertStoragePathIsSafe)(params.filePath);
        return this.delegate.checkFileExists(params);
    }
    async checkFolderExists(params) {
        (0, _assertstoragepathissafeutil.assertStoragePathIsSafe)(params.folderPath);
        return this.delegate.checkFolderExists(params);
    }
    constructor(delegate){
        this.delegate = delegate;
    }
};

//# sourceMappingURL=validated-storage.driver.js.map