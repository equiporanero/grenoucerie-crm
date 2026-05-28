"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FileService", {
    enumerable: true,
    get: function() {
        return FileService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _applicationentity = require("../../application/application.entity");
const _filestorageservice = require("../../file-storage/file-storage.service");
const _filestorageexception = require("../../file-storage/interfaces/file-storage-exception");
const _fileentity = require("../entities/file.entity");
const _getcontentdispositionutils = require("../utils/get-content-disposition.utils");
const _removefilefolderfromfileentitypathutils = require("../utils/remove-file-folder-from-file-entity-path.utils");
const _jwtwrapperservice = require("../../jwt/services/jwt-wrapper.service");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
const _injectworkspacescopedrepositorydecorator = require("../../../twenty-orm/workspace-scoped-repository/inject-workspace-scoped-repository.decorator");
const _workspacescopedrepository = require("../../../twenty-orm/workspace-scoped-repository/workspace-scoped-repository");
const _streamtobuffer = require("../../../../utils/stream-to-buffer");
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
let FileService = class FileService {
    async getFileStreamByPath({ workspaceId, applicationId, filepath, fileFolder }) {
        const application = await this.applicationRepository.findOne({
            where: {
                id: applicationId,
                workspaceId
            }
        });
        if (application === null) {
            return null;
        }
        const file = await this.fileRepository.findOne(workspaceId, {
            where: {
                path: `${fileFolder}/${filepath}`,
                applicationId
            }
        });
        if (file === null) {
            return null;
        }
        try {
            const stream = await this.fileStorageService.readFile({
                resourcePath: filepath,
                fileFolder,
                applicationUniversalIdentifier: application.universalIdentifier,
                workspaceId
            });
            return {
                stream,
                mimeType: file.mimeType
            };
        } catch (error) {
            if (error instanceof _filestorageexception.FileStorageException && error.code === _filestorageexception.FileStorageExceptionCode.FILE_NOT_FOUND) {
                return null;
            }
            throw error;
        }
    }
    async getFileStreamById({ fileId, workspaceId, fileFolder }) {
        const file = await this.fileRepository.findOne(workspaceId, {
            where: {
                id: fileId,
                path: (0, _typeorm1.Like)(`${fileFolder}/%`)
            }
        });
        if (file === null) {
            return null;
        }
        const application = await this.applicationRepository.findOne({
            where: {
                id: file.applicationId,
                workspaceId
            }
        });
        if (application === null) {
            this.logger.warn(`File ${file.id} references missing application ${file.applicationId} in workspace ${workspaceId}`);
            return null;
        }
        try {
            const stream = await this.fileStorageService.readFile({
                resourcePath: (0, _removefilefolderfromfileentitypathutils.removeFileFolderFromFileEntityPath)(file.path),
                fileFolder,
                applicationUniversalIdentifier: application.universalIdentifier,
                workspaceId
            });
            return {
                stream,
                mimeType: file.mimeType
            };
        } catch (error) {
            if (error instanceof _filestorageexception.FileStorageException && error.code === _filestorageexception.FileStorageExceptionCode.FILE_NOT_FOUND) {
                return null;
            }
            throw error;
        }
    }
    async getFileResponseById(params) {
        const file = await this.fileRepository.findOne(params.workspaceId, {
            where: {
                id: params.fileId,
                path: (0, _typeorm1.Like)(`${params.fileFolder}/%`)
            }
        });
        if (file === null) {
            return null;
        }
        const application = await this.applicationRepository.findOne({
            where: {
                id: file.applicationId,
                workspaceId: params.workspaceId
            }
        });
        if (application === null) {
            this.logger.warn(`File ${file.id} references missing application ${file.applicationId} in workspace ${params.workspaceId}`);
            return null;
        }
        const mimeType = file.mimeType ?? 'application/octet-stream';
        const resourceIdentifier = {
            resourcePath: (0, _removefilefolderfromfileentitypathutils.removeFileFolderFromFileEntityPath)(file.path),
            fileFolder: params.fileFolder,
            applicationUniversalIdentifier: application.universalIdentifier,
            workspaceId: params.workspaceId
        };
        const presignedUrl = await this.fileStorageService.getPresignedUrl({
            ...resourceIdentifier,
            expiresInSeconds: this.twentyConfigService.get('STORAGE_S3_PRESIGNED_URL_EXPIRES_IN'),
            responseContentType: mimeType,
            responseContentDisposition: (0, _getcontentdispositionutils.getContentDisposition)(mimeType)
        });
        if (presignedUrl) {
            return {
                type: 'redirect',
                presignedUrl
            };
        }
        try {
            const stream = await this.fileStorageService.readFile(resourceIdentifier);
            return {
                type: 'stream',
                stream,
                mimeType
            };
        } catch (error) {
            if (error instanceof _filestorageexception.FileStorageException && error.code === _filestorageexception.FileStorageExceptionCode.FILE_NOT_FOUND) {
                return null;
            }
            throw error;
        }
    }
    async getFileContentById({ fileId, workspaceId, fileFolder }) {
        const file = await this.fileRepository.findOne(workspaceId, {
            where: {
                id: fileId,
                path: (0, _typeorm1.Like)(`${fileFolder}/%`)
            }
        });
        if (file === null) {
            return null;
        }
        const application = await this.applicationRepository.findOne({
            where: {
                id: file.applicationId,
                workspaceId
            }
        });
        if (application === null) {
            this.logger.warn(`File ${file.id} references missing application ${file.applicationId} in workspace ${workspaceId}`);
            return null;
        }
        try {
            const stream = await this.fileStorageService.readFile({
                resourcePath: (0, _removefilefolderfromfileentitypathutils.removeFileFolderFromFileEntityPath)(file.path),
                fileFolder,
                applicationUniversalIdentifier: application.universalIdentifier,
                workspaceId
            });
            const buffer = await (0, _streamtobuffer.streamToBuffer)(stream);
            return {
                buffer,
                mimeType: file.mimeType ?? 'application/octet-stream'
            };
        } catch (error) {
            if (error instanceof _filestorageexception.FileStorageException && error.code === _filestorageexception.FileStorageExceptionCode.FILE_NOT_FOUND) {
                return null;
            }
            throw error;
        }
    }
    async deleteWorkspaceFolder(workspaceId) {
        const isWorkspaceFolderFound = await this.fileStorageService.checkIfWorkspaceFolderExists(workspaceId);
        if (!isWorkspaceFolderFound) {
            return;
        }
        return await this.fileStorageService.deleteWorkspaceFolder(workspaceId);
    }
    constructor(jwtWrapperService, fileStorageService, twentyConfigService, fileRepository, applicationRepository){
        this.jwtWrapperService = jwtWrapperService;
        this.fileStorageService = fileStorageService;
        this.twentyConfigService = twentyConfigService;
        this.fileRepository = fileRepository;
        this.applicationRepository = applicationRepository;
        this.logger = new _common.Logger(FileService.name);
    }
};
FileService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(3, (0, _injectworkspacescopedrepositorydecorator.InjectWorkspaceScopedRepository)(_fileentity.FileEntity)),
    _ts_param(4, (0, _typeorm.InjectRepository)(_applicationentity.ApplicationEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _jwtwrapperservice.JwtWrapperService === "undefined" ? Object : _jwtwrapperservice.JwtWrapperService,
        typeof _filestorageservice.FileStorageService === "undefined" ? Object : _filestorageservice.FileStorageService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _workspacescopedrepository.WorkspaceScopedRepository === "undefined" ? Object : _workspacescopedrepository.WorkspaceScopedRepository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], FileService);

//# sourceMappingURL=file.service.js.map