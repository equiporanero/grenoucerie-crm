"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FileCorePictureService", {
    enumerable: true,
    get: function() {
        return FileCorePictureService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _consumers = require("node:stream/consumers");
const _guards = require("@sniptt/guards");
const _filetype = require("file-type");
const _pdf = require("@file-type/pdf");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _uuid = require("uuid");
const _applicationexception = require("../../../application/application.exception");
const _filestorageservice = require("../../../file-storage/file-storage.service");
const _fileentity = require("../../entities/file.entity");
const _fileurlservice = require("../../file-url/file-url.service");
const _extractfileinfoorthrowutils = require("../../utils/extract-file-info-or-throw.utils");
const _removefilefolderfromfileentitypathutils = require("../../utils/remove-file-folder-from-file-entity-path.utils");
const _securehttpclientservice = require("../../../secure-http-client/secure-http-client.service");
const _workspaceentity = require("../../../workspace/workspace.entity");
const _injectworkspacescopedrepositorydecorator = require("../../../../twenty-orm/workspace-scoped-repository/inject-workspace-scoped-repository.decorator");
const _workspacescopedrepository = require("../../../../twenty-orm/workspace-scoped-repository/workspace-scoped-repository");
const _image = require("../../../../../utils/image");
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
let FileCorePictureService = class FileCorePictureService {
    async findCustomApplicationUniversalIdentifier(workspaceId) {
        const workspace = await this.workspaceRepository.findOne({
            where: {
                id: workspaceId
            },
            select: [
                'workspaceCustomApplicationId'
            ],
            withDeleted: true
        });
        if (!(0, _utils.isDefined)(workspace)) {
            throw new _applicationexception.ApplicationException(`Could not find workspace ${workspaceId}`, _applicationexception.ApplicationExceptionCode.APPLICATION_NOT_FOUND);
        }
        return workspace.workspaceCustomApplicationId;
    }
    async uploadCorePicture({ file, filename, workspaceId, applicationUniversalIdentifier, queryRunner }) {
        const { ext } = await (0, _extractfileinfoorthrowutils.extractFileInfoOrThrow)({
            file,
            filename
        });
        const fileId = (0, _uuid.v4)();
        const finalName = `${fileId}${(0, _guards.isNonEmptyString)(ext) ? `.${ext}` : ''}`;
        const universalIdentifier = applicationUniversalIdentifier ?? await this.findCustomApplicationUniversalIdentifier(workspaceId);
        const savedFile = await this.fileStorageService.writeFile({
            sourceFile: file,
            resourcePath: finalName,
            fileFolder: _types.FileFolder.CorePicture,
            applicationUniversalIdentifier: universalIdentifier,
            workspaceId,
            fileId,
            settings: {
                isTemporaryFile: false,
                toDelete: false
            },
            queryRunner
        });
        return savedFile;
    }
    async uploadWorkspacePicture({ file, filename, workspace }) {
        const savedFile = await this.uploadCorePicture({
            file,
            filename,
            workspaceId: workspace.id
        });
        await this.workspaceRepository.update(workspace.id, {
            logoFileId: savedFile.id
        });
        if ((0, _utils.isDefined)(workspace.logoFileId)) {
            await this.deleteCorePicture({
                fileId: workspace.logoFileId,
                workspaceId: workspace.id
            });
        }
        const url = await this.fileUrlService.signFileByIdUrl({
            fileId: savedFile.id,
            fileFolder: _types.FileFolder.CorePicture,
            workspaceId: workspace.id
        });
        return {
            ...savedFile,
            url
        };
    }
    async uploadWorkspaceMemberProfilePicture({ file, filename, workspaceId, applicationUniversalIdentifier, queryRunner }) {
        const savedFile = await this.uploadCorePicture({
            file,
            filename,
            workspaceId,
            applicationUniversalIdentifier,
            queryRunner
        });
        const url = await this.fileUrlService.signFileByIdUrl({
            fileId: savedFile.id,
            workspaceId,
            fileFolder: _types.FileFolder.CorePicture
        });
        return {
            ...savedFile,
            url
        };
    }
    async deleteCorePicture({ fileId, workspaceId }) {
        const file = await this.fileRepository.findOneOrFail(workspaceId, {
            where: {
                id: fileId,
                path: (0, _typeorm1.Like)(`${_types.FileFolder.CorePicture}/%`)
            }
        });
        const customApplicationUniversalIdentifier = await this.findCustomApplicationUniversalIdentifier(workspaceId);
        await this.fileStorageService.deleteFile({
            workspaceId,
            applicationUniversalIdentifier: customApplicationUniversalIdentifier,
            fileFolder: _types.FileFolder.CorePicture,
            resourcePath: (0, _removefilefolderfromfileentitypathutils.removeFileFolderFromFileEntityPath)(file.path)
        });
    }
    async fetchImageBufferFromUrl(imageUrl) {
        try {
            const httpClient = this.secureHttpClientService.getHttpClient({
                retries: 2,
                shouldResetTimeout: true
            });
            const buffer = await (0, _image.getImageBufferFromUrl)(imageUrl, httpClient);
            const parser = new _filetype.FileTypeParser({
                customDetectors: [
                    _pdf.detectPdf
                ]
            });
            const type = await parser.fromBuffer(buffer);
            if (!(0, _utils.isDefined)(type) || !type.mime.startsWith('image/')) {
                return undefined;
            }
            return {
                buffer,
                extension: type.ext
            };
        } catch (error) {
            this.logger.warn(`Failed to fetch image from URL: ${imageUrl} — ${error instanceof Error ? error.message : String(error)}`);
            return undefined;
        }
    }
    async uploadWorkspaceMemberProfilePictureFromUrl({ imageUrl, workspaceId, applicationUniversalIdentifier, queryRunner }) {
        const imageData = await this.fetchImageBufferFromUrl(imageUrl);
        if (!(0, _utils.isDefined)(imageData)) {
            return undefined;
        }
        return this.uploadWorkspaceMemberProfilePicture({
            file: imageData.buffer,
            filename: `avatar.${imageData.extension}`,
            workspaceId,
            applicationUniversalIdentifier,
            queryRunner
        });
    }
    async uploadWorkspaceLogoFromUrl({ imageUrl, workspaceId, applicationUniversalIdentifier, queryRunner }) {
        const imageData = await this.fetchImageBufferFromUrl(imageUrl);
        if (!(0, _utils.isDefined)(imageData)) {
            return undefined;
        }
        return this.uploadCorePicture({
            file: imageData.buffer,
            filename: `logo.${imageData.extension}`,
            workspaceId,
            applicationUniversalIdentifier,
            queryRunner
        });
    }
    async copyWorkspaceMemberProfilePicture({ sourceWorkspaceId, sourceFileId, targetWorkspaceId, targetApplicationUniversalIdentifier, queryRunner }) {
        const sourceFile = await this.fileRepository.findOneOrFail(sourceWorkspaceId, {
            where: {
                id: sourceFileId,
                path: (0, _typeorm1.Like)(`${_types.FileFolder.CorePicture}/%`)
            }
        });
        const sourceApplicationUniversalIdentifier = await this.findCustomApplicationUniversalIdentifier(sourceWorkspaceId);
        const fileStream = await this.fileStorageService.readFile({
            workspaceId: sourceWorkspaceId,
            applicationUniversalIdentifier: sourceApplicationUniversalIdentifier,
            fileFolder: _types.FileFolder.CorePicture,
            resourcePath: (0, _removefilefolderfromfileentitypathutils.removeFileFolderFromFileEntityPath)(sourceFile.path)
        });
        const filename = sourceFile.path.split('/').pop() ?? '';
        return this.uploadWorkspaceMemberProfilePicture({
            file: await (0, _consumers.buffer)(fileStream),
            filename,
            workspaceId: targetWorkspaceId,
            applicationUniversalIdentifier: targetApplicationUniversalIdentifier,
            queryRunner
        });
    }
    constructor(fileStorageService, workspaceRepository, fileRepository, fileUrlService, secureHttpClientService){
        this.fileStorageService = fileStorageService;
        this.workspaceRepository = workspaceRepository;
        this.fileRepository = fileRepository;
        this.fileUrlService = fileUrlService;
        this.secureHttpClientService = secureHttpClientService;
        this.logger = new _common.Logger(FileCorePictureService.name);
    }
};
FileCorePictureService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(1, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_param(2, (0, _injectworkspacescopedrepositorydecorator.InjectWorkspaceScopedRepository)(_fileentity.FileEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _filestorageservice.FileStorageService === "undefined" ? Object : _filestorageservice.FileStorageService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _workspacescopedrepository.WorkspaceScopedRepository === "undefined" ? Object : _workspacescopedrepository.WorkspaceScopedRepository,
        typeof _fileurlservice.FileUrlService === "undefined" ? Object : _fileurlservice.FileUrlService,
        typeof _securehttpclientservice.SecureHttpClientService === "undefined" ? Object : _securehttpclientservice.SecureHttpClientService
    ])
], FileCorePictureService);

//# sourceMappingURL=file-core-picture.service.js.map