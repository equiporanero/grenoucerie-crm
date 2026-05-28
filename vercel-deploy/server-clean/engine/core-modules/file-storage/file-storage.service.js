"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FileStorageService", {
    enumerable: true,
    get: function() {
        return FileStorageService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _path = require("path");
const _typeorm1 = require("typeorm");
const _applicationentity = require("../application/application.entity");
const _filestoragedriverfactory = require("./file-storage-driver.factory");
const _filestorageexception = require("./interfaces/file-storage-exception");
const _preparefileforstorageorthrowutil = require("./utils/prepare-file-for-storage-or-throw.util");
const _validatefilepathutil = require("./utils/validate-file-path.util");
const _validatefolderpathutil = require("./utils/validate-folder-path.util");
const _validatestoragepathiswithinworkspaceorthrowutil = require("./utils/validate-storage-path-is-within-workspace-or-throw.util");
const _fileentity = require("../file/entities/file.entity");
const _removefilefolderfromfileentitypathutils = require("../file/utils/remove-file-folder-from-file-entity-path.utils");
const _injectworkspacescopedrepositorydecorator = require("../../twenty-orm/workspace-scoped-repository/inject-workspace-scoped-repository.decorator");
const _workspacescopedrepository = require("../../twenty-orm/workspace-scoped-repository/workspace-scoped-repository");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let FileStorageService = class FileStorageService {
    buildStoragePathWithinWorkspaceOrThrow({ workspaceId, applicationUniversalIdentifier, fileFolder, relativePath }) {
        const resourcePath = (0, _path.join)(fileFolder, relativePath).replace(/\/+/g, '/');
        const onStoragePath = (0, _path.join)(workspaceId, applicationUniversalIdentifier, resourcePath).replace(/\/+/g, '/');
        (0, _validatestoragepathiswithinworkspaceorthrowutil.validateStoragePathIsWithinWorkspaceOrThrow)({
            onStoragePath,
            workspaceId,
            applicationUniversalIdentifier,
            fileFolder
        });
        return {
            onStoragePath,
            resourcePath
        };
    }
    validateAndBuildFileStoragePathOrThrow(params) {
        const validationResult = (0, _validatefilepathutil.validateFilePath)({
            resourcePath: params.resourcePath,
            fileFolder: params.fileFolder
        });
        if (!validationResult.isValid) {
            throw new _filestorageexception.FileStorageException(validationResult.error, _filestorageexception.FileStorageExceptionCode.ACCESS_DENIED);
        }
        const { onStoragePath, resourcePath } = this.buildStoragePathWithinWorkspaceOrThrow({
            ...params,
            relativePath: params.resourcePath
        });
        return {
            onStorageFilePath: onStoragePath,
            filePath: resourcePath
        };
    }
    validateAndBuildFolderStoragePathOrThrow(params) {
        const validationResult = (0, _validatefolderpathutil.validateFolderPath)({
            folderPath: params.folderPath
        });
        if (!validationResult.isValid) {
            throw new _filestorageexception.FileStorageException(validationResult.error, _filestorageexception.FileStorageExceptionCode.ACCESS_DENIED);
        }
        const { onStoragePath, resourcePath } = this.buildStoragePathWithinWorkspaceOrThrow({
            ...params,
            relativePath: params.folderPath
        });
        return {
            onStorageFolderPath: `${onStoragePath}/`,
            folderPath: `${resourcePath}/`
        };
    }
    async writeFile({ sourceFile, fileFolder, applicationUniversalIdentifier, workspaceId, resourcePath, fileId, settings, queryRunner }) {
        const driver = this.fileStorageDriverFactory.getCurrentDriver();
        const applicationRepository = queryRunner ? queryRunner.manager.getRepository(_applicationentity.ApplicationEntity) : this.applicationRepository;
        const fileRepository = queryRunner ? this.fileRepository.withManager(queryRunner.manager) : this.fileRepository;
        const application = await applicationRepository.findOneOrFail({
            where: {
                universalIdentifier: applicationUniversalIdentifier,
                workspaceId
            }
        });
        const { onStorageFilePath, filePath } = this.validateAndBuildFileStoragePathOrThrow({
            workspaceId,
            applicationUniversalIdentifier,
            fileFolder,
            resourcePath
        });
        const { sourceFile: persistedSourceFile, mimeType } = await (0, _preparefileforstorageorthrowutil.prepareFileForStorageOrThrow)({
            sourceFile,
            resourcePath
        });
        await driver.writeFile({
            filePath: onStorageFilePath,
            mimeType,
            sourceFile: persistedSourceFile
        });
        await fileRepository.upsert(workspaceId, {
            path: filePath,
            applicationId: application.id,
            id: fileId,
            mimeType,
            size: typeof persistedSourceFile === 'string' ? Buffer.byteLength(persistedSourceFile) : persistedSourceFile.length,
            settings
        }, [
            'path',
            'workspaceId',
            'applicationId'
        ]);
        return fileRepository.findOneOrFail(workspaceId, {
            where: {
                path: filePath,
                applicationId: application.id
            }
        });
    }
    async getPresignedUrl(params) {
        const driver = this.fileStorageDriverFactory.getCurrentDriver();
        const { onStorageFilePath } = this.validateAndBuildFileStoragePathOrThrow(params);
        return driver.getPresignedUrl({
            filePath: onStorageFilePath,
            expiresInSeconds: params.expiresInSeconds,
            responseContentType: params.responseContentType,
            responseContentDisposition: params.responseContentDisposition
        });
    }
    readFile(params) {
        const driver = this.fileStorageDriverFactory.getCurrentDriver();
        const { onStorageFilePath } = this.validateAndBuildFileStoragePathOrThrow(params);
        return driver.readFile({
            filePath: onStorageFilePath
        });
    }
    downloadFile(params) {
        const driver = this.fileStorageDriverFactory.getCurrentDriver();
        const { onStorageFilePath } = this.validateAndBuildFileStoragePathOrThrow(params);
        return driver.downloadFile({
            onStoragePath: onStorageFilePath,
            localPath: params.localPath
        });
    }
    async deleteApplicationFiles({ applicationUniversalIdentifier, workspaceId }) {
        const application = await this.applicationRepository.findOneOrFail({
            where: {
                universalIdentifier: applicationUniversalIdentifier,
                workspaceId: workspaceId
            }
        });
        const driver = this.fileStorageDriverFactory.getCurrentDriver();
        await driver.delete({
            folderPath: `${workspaceId}/${applicationUniversalIdentifier}/`
        });
        await this.fileRepository.delete(workspaceId, {
            applicationId: application.id
        });
    }
    async deleteFile(params) {
        const driver = this.fileStorageDriverFactory.getCurrentDriver();
        const { onStorageFilePath, filePath } = this.validateAndBuildFileStoragePathOrThrow(params);
        await driver.delete({
            folderPath: (0, _path.dirname)(onStorageFilePath),
            filename: (0, _path.basename)(onStorageFilePath)
        });
        const application = await this.applicationRepository.findOneOrFail({
            where: {
                universalIdentifier: params.applicationUniversalIdentifier,
                workspaceId: params.workspaceId
            }
        });
        await this.fileRepository.delete(params.workspaceId, {
            path: filePath,
            applicationId: application.id
        });
    }
    async deleteFolder(params) {
        const { workspaceId, applicationUniversalIdentifier, fileFolder, folderPath } = params;
        const { onStorageFolderPath, folderPath: validatedFolderPath } = this.validateAndBuildFolderStoragePathOrThrow({
            workspaceId,
            applicationUniversalIdentifier,
            fileFolder,
            folderPath
        });
        const driver = this.fileStorageDriverFactory.getCurrentDriver();
        await driver.delete({
            folderPath: onStorageFolderPath
        });
        const application = await this.applicationRepository.findOneOrFail({
            where: {
                universalIdentifier: applicationUniversalIdentifier,
                workspaceId
            }
        });
        await this.fileRepository.delete(workspaceId, {
            path: (0, _typeorm1.Like)(`${validatedFolderPath}%`),
            applicationId: application.id
        });
    }
    async deleteByFileId({ fileId, workspaceId, fileFolder }) {
        const file = await this.fileRepository.findOneOrFail(workspaceId, {
            where: {
                id: fileId,
                path: (0, _typeorm1.Like)(`${fileFolder}/%`)
            }
        });
        const application = await this.applicationRepository.findOneOrFail({
            where: {
                id: file.applicationId,
                workspaceId: file.workspaceId
            }
        });
        await this.deleteFile({
            workspaceId,
            applicationUniversalIdentifier: application.universalIdentifier,
            fileFolder,
            resourcePath: (0, _removefilefolderfromfileentitypathutils.removeFileFolderFromFileEntityPath)(file.path)
        });
    }
    async checkIfWorkspaceFolderExists(workspaceId) {
        const driver = this.fileStorageDriverFactory.getCurrentDriver();
        return driver.checkFolderExists({
            folderPath: workspaceId
        });
    }
    async deleteWorkspaceFolder(workspaceId) {
        const driver = this.fileStorageDriverFactory.getCurrentDriver();
        await driver.delete({
            folderPath: workspaceId
        });
    }
    copyLegacy(params) {
        const driver = this.fileStorageDriverFactory.getCurrentDriver();
        return driver.copy(params);
    }
    async copy({ from, to }) {
        const driver = this.fileStorageDriverFactory.getCurrentDriver();
        const { onStorageFilePath: fromPath } = this.validateAndBuildFileStoragePathOrThrow(from);
        const { onStorageFilePath: toPath } = this.validateAndBuildFileStoragePathOrThrow(to);
        const isFile = await driver.checkFileExists({
            filePath: fromPath
        });
        if (isFile) {
            return driver.copy({
                from: {
                    folderPath: (0, _path.dirname)(fromPath),
                    filename: (0, _path.basename)(fromPath)
                },
                to: {
                    folderPath: (0, _path.dirname)(toPath),
                    filename: (0, _path.basename)(toPath)
                }
            });
        }
        return driver.copy({
            from: {
                folderPath: fromPath
            },
            to: {
                folderPath: toPath
            }
        });
    }
    checkFileExists(params) {
        const driver = this.fileStorageDriverFactory.getCurrentDriver();
        const { onStorageFilePath } = this.validateAndBuildFileStoragePathOrThrow(params);
        return driver.checkFileExists({
            filePath: onStorageFilePath
        });
    }
    constructor(fileStorageDriverFactory, fileRepository, applicationRepository){
        this.fileStorageDriverFactory = fileStorageDriverFactory;
        this.fileRepository = fileRepository;
        this.applicationRepository = applicationRepository;
    }
};
FileStorageService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(1, (0, _injectworkspacescopedrepositorydecorator.InjectWorkspaceScopedRepository)(_fileentity.FileEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_applicationentity.ApplicationEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _filestoragedriverfactory.FileStorageDriverFactory === "undefined" ? Object : _filestoragedriverfactory.FileStorageDriverFactory,
        typeof _workspacescopedrepository.WorkspaceScopedRepository === "undefined" ? Object : _workspacescopedrepository.WorkspaceScopedRepository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], FileStorageService);

//# sourceMappingURL=file-storage.service.js.map