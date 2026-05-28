"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SdkClientArchiveService", {
    enumerable: true,
    get: function() {
        return SdkClientArchiveService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _promises = /*#__PURE__*/ _interop_require_wildcard(require("node:fs/promises"));
const _types = require("twenty-shared/types");
const _typeorm1 = require("typeorm");
const _applicationentity = require("../application/application.entity");
const _filestorageservice = require("../file-storage/file-storage.service");
const _filestorageexception = require("../file-storage/interfaces/file-storage-exception");
const _sdkclientexception = require("./exceptions/sdk-client.exception");
const _sdkclientgenerationservice = require("./sdk-client-generation.service");
const _workspacecacheservice = require("../../workspace-cache/services/workspace-cache.service");
const _streamtobuffer = require("../../../utils/stream-to-buffer");
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
const SDK_CLIENT_ARCHIVE_NAME = 'twenty-client-sdk.zip';
let SdkClientArchiveService = class SdkClientArchiveService {
    async downloadAndExtractToPackage({ workspaceId, applicationId, applicationUniversalIdentifier, targetPackagePath }) {
        const archiveBuffer = await this.downloadArchiveBufferOrGenerate({
            workspaceId,
            applicationId,
            applicationUniversalIdentifier
        });
        await _promises.rm(targetPackagePath, {
            recursive: true,
            force: true
        });
        await _promises.mkdir(targetPackagePath, {
            recursive: true
        });
        const { default: unzipper } = await Promise.resolve().then(()=>/*#__PURE__*/ _interop_require_wildcard(require("unzipper")));
        const directory = await unzipper.Open.buffer(archiveBuffer);
        await directory.extract({
            path: targetPackagePath
        });
    }
    async downloadArchiveBuffer({ workspaceId, applicationId, applicationUniversalIdentifier }) {
        return this.downloadArchiveBufferOrGenerate({
            workspaceId,
            applicationId,
            applicationUniversalIdentifier
        });
    }
    async getClientModuleFromArchive({ workspaceId, applicationId, applicationUniversalIdentifier, moduleName }) {
        const filePath = `dist/${moduleName}.mjs`;
        const archiveBuffer = await this.downloadArchiveBufferOrGenerate({
            workspaceId,
            applicationId,
            applicationUniversalIdentifier
        });
        const { default: unzipper } = await Promise.resolve().then(()=>/*#__PURE__*/ _interop_require_wildcard(require("unzipper")));
        const directory = await unzipper.Open.buffer(archiveBuffer);
        const entry = directory.files.find((file)=>file.path === filePath || file.path === `./${filePath}`);
        if (!entry) {
            throw new _sdkclientexception.SdkClientException(`Module "${moduleName}" not found in SDK client archive for application "${applicationUniversalIdentifier}" in workspace "${workspaceId}"`, _sdkclientexception.SdkClientExceptionCode.FILE_NOT_FOUND_IN_ARCHIVE);
        }
        return entry.buffer();
    }
    async markSdkLayerFresh({ applicationId, workspaceId }) {
        await this.applicationRepository.update({
            id: applicationId,
            workspaceId
        }, {
            isSdkLayerStale: false
        });
        await this.workspaceCacheService.invalidateAndRecompute(workspaceId, [
            'flatApplicationMaps'
        ]);
    }
    async downloadArchiveBufferOrGenerate({ workspaceId, applicationId, applicationUniversalIdentifier }) {
        try {
            const stream = await this.fileStorageService.readFile({
                workspaceId,
                applicationUniversalIdentifier,
                fileFolder: _types.FileFolder.GeneratedSdkClient,
                resourcePath: SDK_CLIENT_ARCHIVE_NAME
            });
            return await (0, _streamtobuffer.streamToBuffer)(stream);
        } catch (error) {
            if (!(error instanceof _filestorageexception.FileStorageException) || error.code !== _filestorageexception.FileStorageExceptionCode.FILE_NOT_FOUND) {
                throw error;
            }
        }
        this.logger.warn(`SDK client archive missing for application "${applicationUniversalIdentifier}" in workspace "${workspaceId}", generating on-the-fly`);
        return this.sdkClientGenerationService.generateSdkClientForApplication({
            workspaceId,
            applicationId,
            applicationUniversalIdentifier
        });
    }
    constructor(fileStorageService, applicationRepository, workspaceCacheService, sdkClientGenerationService){
        this.fileStorageService = fileStorageService;
        this.applicationRepository = applicationRepository;
        this.workspaceCacheService = workspaceCacheService;
        this.sdkClientGenerationService = sdkClientGenerationService;
        this.logger = new _common.Logger(SdkClientArchiveService.name);
    }
};
SdkClientArchiveService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(1, (0, _typeorm.InjectRepository)(_applicationentity.ApplicationEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _filestorageservice.FileStorageService === "undefined" ? Object : _filestorageservice.FileStorageService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService,
        typeof _sdkclientgenerationservice.SdkClientGenerationService === "undefined" ? Object : _sdkclientgenerationservice.SdkClientGenerationService
    ])
], SdkClientArchiveService);

//# sourceMappingURL=sdk-client-archive.service.js.map