"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "S3Driver", {
    enumerable: true,
    get: function() {
        return S3Driver;
    }
});
const _common = require("@nestjs/common");
const _fs = /*#__PURE__*/ _interop_require_default(require("fs"));
const _promises = require("node:fs/promises");
const _path = require("path");
const _stream = require("stream");
const _promises1 = require("node:stream/promises");
const _clients3 = require("@aws-sdk/client-s3");
const _s3requestpresigner = require("@aws-sdk/s3-request-presigner");
const _utils = require("twenty-shared/utils");
const _filestorageexception = require("../interfaces/file-storage-exception");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let S3Driver = class S3Driver {
    get client() {
        return this.s3Client;
    }
    async readFile(params) {
        const command = new _clients3.GetObjectCommand({
            Key: params.filePath,
            Bucket: this.bucketName
        });
        try {
            const file = await this.s3Client.send(command);
            if (!file || !file.Body || !(file.Body instanceof _stream.Readable)) {
                throw new Error('Unable to get file stream');
            }
            return _stream.Readable.from(file.Body);
        } catch (error) {
            if (error.name === 'NoSuchKey') {
                throw new _filestorageexception.FileStorageException('File not found', _filestorageexception.FileStorageExceptionCode.FILE_NOT_FOUND);
            }
            throw error;
        }
    }
    async writeFile(params) {
        const command = new _clients3.PutObjectCommand({
            Key: params.filePath,
            Body: params.sourceFile,
            ContentType: params.mimeType,
            Bucket: this.bucketName
        });
        await this.s3Client.send(command);
    }
    async createFolder(path) {
        return _fs.default.mkdirSync(path, {
            recursive: true
        });
    }
    async downloadFile(params) {
        await this.createFolder((0, _path.dirname)(params.localPath));
        const fileStream = await this.readFile({
            filePath: params.onStoragePath
        });
        await (0, _promises1.pipeline)(fileStream, _fs.default.createWriteStream(params.localPath));
    }
    async downloadFolder(params) {
        const listedObjects = await this.fetchS3FolderContents(params.onStoragePath);
        if (!listedObjects.Contents || listedObjects.Contents.length === 0) {
            return;
        }
        for (const object of listedObjects.Contents){
            const folderAndFilePaths = this.extractFolderAndFilePaths(object.Key);
            if (!(0, _utils.isDefined)(folderAndFilePaths)) {
                continue;
            }
            const { fromFolderPath, filename } = folderAndFilePaths;
            const relativePath = fromFolderPath.replace(params.onStoragePath + '/', '').replace(params.onStoragePath, '');
            const localFolderPath = relativePath ? (0, _path.join)(params.localPath, relativePath) : params.localPath;
            await this.createFolder(localFolderPath);
            const fileStream = await this.readFile({
                filePath: `${fromFolderPath}/${filename}`
            });
            const toPath = (0, _path.join)(localFolderPath, filename);
            await (0, _promises1.pipeline)(fileStream, _fs.default.createWriteStream(toPath));
        }
    }
    async uploadFolder(params) {
        const entries = await (0, _promises.readdir)(params.localPath, {
            withFileTypes: true
        });
        for (const entry of entries){
            const localEntryPath = (0, _path.join)(params.localPath, entry.name);
            if (entry.isDirectory()) {
                await this.uploadFolder({
                    localPath: localEntryPath,
                    onStoragePath: (0, _path.join)(params.onStoragePath, entry.name)
                });
            } else {
                const fileContent = await (0, _promises.readFile)(localEntryPath);
                await this.writeFile({
                    filePath: `${params.onStoragePath}/${entry.name}`,
                    sourceFile: fileContent,
                    mimeType: undefined
                });
            }
        }
    }
    async delete(params) {
        if (params.filename) {
            const deleteCommand = new _clients3.DeleteObjectCommand({
                Key: `${params.folderPath}/${params.filename}`,
                Bucket: this.bucketName
            });
            await this.s3Client.send(deleteCommand);
        } else {
            await this.emptyS3Directory(params.folderPath);
            const deleteEmptyFolderCommand = new _clients3.DeleteObjectCommand({
                Key: `${params.folderPath}`,
                Bucket: this.bucketName
            });
            await this.s3Client.send(deleteEmptyFolderCommand);
        }
    }
    async move(params) {
        if (!params.from.filename || !params.to.filename) {
            await this.moveS3Folder(params);
            return;
        }
        const fromKey = `${params.from.folderPath}/${params.from.filename}`;
        const toKey = `${params.to.folderPath}/${params.to.filename}`;
        try {
            await this.s3Client.send(new _clients3.HeadObjectCommand({
                Bucket: this.bucketName,
                Key: fromKey
            }));
            await this.s3Client.send(new _clients3.CopyObjectCommand({
                CopySource: `${this.bucketName}/${fromKey}`,
                Bucket: this.bucketName,
                Key: toKey
            }));
            await this.s3Client.send(new _clients3.DeleteObjectCommand({
                Bucket: this.bucketName,
                Key: fromKey
            }));
        } catch (error) {
            if (error.name === 'NotFound') {
                throw new _filestorageexception.FileStorageException('File not found', _filestorageexception.FileStorageExceptionCode.FILE_NOT_FOUND);
            }
            throw error;
        }
    }
    async copy(params) {
        if (!params.from.filename && params.to.filename) {
            throw new Error('Cannot copy folder to file');
        }
        const fromKey = `${params.from.folderPath}/${params.from.filename || ''}`;
        const toKey = `${params.to.folderPath}/${params.to.filename || ''}`;
        if ((0, _utils.isDefined)(params.from.filename)) {
            try {
                await this.s3Client.send(new _clients3.HeadObjectCommand({
                    Bucket: this.bucketName,
                    Key: fromKey
                }));
                await this.s3Client.send(new _clients3.CopyObjectCommand({
                    CopySource: `${this.bucketName}/${fromKey}`,
                    Bucket: this.bucketName,
                    Key: toKey
                }));
                return;
            } catch (error) {
                if (error.name === 'NotFound') {
                    throw new _filestorageexception.FileStorageException('File not found', _filestorageexception.FileStorageExceptionCode.FILE_NOT_FOUND);
                }
                throw error;
            }
        }
        const listedObjects = await this.s3Client.send(new _clients3.ListObjectsV2Command({
            Bucket: this.bucketName,
            Prefix: fromKey
        }));
        if (!listedObjects.Contents || listedObjects.Contents.length === 0) {
            throw new Error(`No objects found in the source folder ${fromKey}.`);
        }
        for (const object of listedObjects.Contents){
            const folderAndFilePaths = this.extractFolderAndFilePaths(object.Key);
            if (!(0, _utils.isDefined)(folderAndFilePaths)) {
                continue;
            }
            const { fromFolderPath, filename } = folderAndFilePaths;
            const toFolderPath = fromFolderPath.replace(params.from.folderPath, params.to.folderPath);
            if (!(0, _utils.isDefined)(toFolderPath)) {
                continue;
            }
            await this.copy({
                from: {
                    folderPath: fromFolderPath,
                    filename
                },
                to: {
                    folderPath: toFolderPath,
                    filename
                }
            });
        }
    }
    async checkFileExists(params) {
        try {
            await this.s3Client.send(new _clients3.HeadObjectCommand({
                Bucket: this.bucketName,
                Key: params.filePath
            }));
        } catch (error) {
            if (error instanceof _clients3.NotFound) {
                return false;
            }
            throw error;
        }
        return true;
    }
    async checkFolderExists(params) {
        try {
            const listCommand = new _clients3.ListObjectsV2Command({
                Bucket: this.bucketName,
                Prefix: params.folderPath,
                MaxKeys: 1
            });
            const result = await this.s3Client.send(listCommand);
            return result.Contents && result.Contents.length > 0 || false;
        } catch (error) {
            if (error instanceof _clients3.NotFound) {
                return false;
            }
            throw error;
        }
    }
    async getPresignedUrl(params) {
        if (!this.presignClient) {
            return null;
        }
        const command = new _clients3.GetObjectCommand({
            Bucket: this.bucketName,
            Key: params.filePath,
            ResponseContentType: params.responseContentType,
            ResponseContentDisposition: params.responseContentDisposition
        });
        return (0, _s3requestpresigner.getSignedUrl)(this.presignClient, command, {
            expiresIn: params.expiresInSeconds ?? 900
        });
    }
    async checkBucketExists(args) {
        try {
            await this.s3Client.headBucket(args);
            return true;
        } catch (error) {
            if (error instanceof _clients3.NotFound) {
                return false;
            }
            throw error;
        }
    }
    async createBucket(args) {
        const exist = await this.checkBucketExists({
            Bucket: args.Bucket
        });
        if (exist) {
            return;
        }
        return this.s3Client.createBucket(args);
    }
    async fetchS3FolderContents(folderPath) {
        const listParams = {
            Bucket: this.bucketName,
            Prefix: folderPath
        };
        const listObjectsCommand = new _clients3.ListObjectsV2Command(listParams);
        const listedObjects = await this.s3Client.send(listObjectsCommand);
        return listedObjects;
    }
    async emptyS3Directory(folderPath) {
        const listedObjects = await this.fetchS3FolderContents(folderPath);
        if (!(0, _utils.isDefined)(listedObjects.Contents) || listedObjects.Contents.length === 0) return;
        const deleteParams = {
            Bucket: this.bucketName,
            Delete: {
                Objects: listedObjects.Contents.map(({ Key })=>{
                    return {
                        Key
                    };
                })
            }
        };
        const deleteObjectCommand = new _clients3.DeleteObjectsCommand(deleteParams);
        await this.s3Client.send(deleteObjectCommand);
        if (listedObjects.IsTruncated) {
            await this.emptyS3Directory(folderPath);
        }
    }
    extractFolderAndFilePaths(objectKey) {
        if (!(0, _utils.isDefined)(objectKey)) {
            return;
        }
        const result = /(?<folder>.*)\/(?<file>.*)/.exec(objectKey);
        if (!(0, _utils.isDefined)(result) || !(0, _utils.isDefined)(result.groups)) {
            return;
        }
        const fromFolderPath = result.groups.folder;
        const filename = result.groups.file;
        return {
            fromFolderPath,
            filename
        };
    }
    async moveS3Folder(params) {
        const fromKey = `${params.from.folderPath}`;
        const listedObjects = await this.fetchS3FolderContents(fromKey);
        if (!listedObjects.Contents || listedObjects.Contents.length === 0) {
            throw new Error(`No objects found in the source folder ${params.from.folderPath}.`);
        }
        for (const object of listedObjects.Contents){
            const folderAndFilePaths = this.extractFolderAndFilePaths(object.Key);
            if (!(0, _utils.isDefined)(folderAndFilePaths)) {
                continue;
            }
            const { fromFolderPath, filename } = folderAndFilePaths;
            const toFolderPath = fromFolderPath.replace(params.from.folderPath, params.to.folderPath);
            if (!(0, _utils.isDefined)(toFolderPath)) {
                continue;
            }
            await this.move({
                from: {
                    folderPath: fromFolderPath,
                    filename
                },
                to: {
                    folderPath: toFolderPath,
                    filename
                }
            });
        }
    }
    constructor(options){
        this.logger = new _common.Logger(S3Driver.name);
        const { bucketName, region, endpoint, presignEnabled, presignEndpoint, ...s3Options } = options;
        if (!bucketName || !region) {
            return;
        }
        this.s3Client = new _clients3.S3({
            ...s3Options,
            region,
            endpoint
        });
        this.bucketName = bucketName;
        if (presignEnabled) {
            this.presignClient = presignEndpoint ? new _clients3.S3({
                ...s3Options,
                region,
                endpoint: presignEndpoint
            }) : this.s3Client;
        }
    }
};

//# sourceMappingURL=s3.driver.js.map