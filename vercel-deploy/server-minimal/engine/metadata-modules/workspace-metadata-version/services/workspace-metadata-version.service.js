"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMetadataVersionService", {
    enumerable: true,
    get: function() {
        return WorkspaceMetadataVersionService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _coreentitycacheservice = require("../../../core-entity-cache/services/core-entity-cache.service");
const _workspaceentity = require("../../../core-modules/workspace/workspace.entity");
const _workspacemetadataversionexception = require("../exceptions/workspace-metadata-version.exception");
const _workspacecachestorageservice = require("../../../workspace-cache-storage/workspace-cache-storage.service");
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
let WorkspaceMetadataVersionService = class WorkspaceMetadataVersionService {
    async incrementMetadataVersion(workspaceId) {
        const workspace = await this.workspaceRepository.findOne({
            select: [
                'id',
                'metadataVersion'
            ],
            where: {
                id: workspaceId
            },
            withDeleted: true
        });
        const metadataVersion = workspace?.metadataVersion;
        if (!(0, _utils.isDefined)(metadataVersion)) {
            throw new _workspacemetadataversionexception.WorkspaceMetadataVersionException('Metadata version not found', _workspacemetadataversionexception.WorkspaceMetadataVersionExceptionCode.METADATA_VERSION_NOT_FOUND);
        }
        const newMetadataVersion = metadataVersion + 1;
        await this.workspaceRepository.update({
            id: workspaceId
        }, {
            metadataVersion: newMetadataVersion
        });
        await this.workspaceCacheStorageService.setMetadataVersion(workspaceId, newMetadataVersion);
        await this.coreEntityCacheService.invalidate('workspaceEntity', workspaceId);
    }
    constructor(workspaceRepository, workspaceCacheStorageService, coreEntityCacheService){
        this.workspaceRepository = workspaceRepository;
        this.workspaceCacheStorageService = workspaceCacheStorageService;
        this.coreEntityCacheService = coreEntityCacheService;
        this.logger = new _common.Logger(WorkspaceMetadataVersionService.name);
    }
};
WorkspaceMetadataVersionService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _workspacecachestorageservice.WorkspaceCacheStorageService === "undefined" ? Object : _workspacecachestorageservice.WorkspaceCacheStorageService,
        typeof _coreentitycacheservice.CoreEntityCacheService === "undefined" ? Object : _coreentitycacheservice.CoreEntityCacheService
    ])
], WorkspaceMetadataVersionService);

//# sourceMappingURL=workspace-metadata-version.service.js.map