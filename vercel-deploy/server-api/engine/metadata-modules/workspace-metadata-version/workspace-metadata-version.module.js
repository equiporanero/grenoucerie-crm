"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMetadataVersionModule", {
    enumerable: true,
    get: function() {
        return WorkspaceMetadataVersionModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _coreentitycachemodule = require("../../core-entity-cache/core-entity-cache.module");
const _workspaceentity = require("../../core-modules/workspace/workspace.entity");
const _workspacemanyorallflatentitymapscachemodule = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _workspacemetadataversionservice = require("./services/workspace-metadata-version.service");
const _workspacecachestoragemodule = require("../../workspace-cache-storage/workspace-cache-storage.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WorkspaceMetadataVersionModule = class WorkspaceMetadataVersionModule {
};
WorkspaceMetadataVersionModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _workspaceentity.WorkspaceEntity
            ]),
            _coreentitycachemodule.CoreEntityCacheModule,
            _workspacecachestoragemodule.WorkspaceCacheStorageModule,
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule
        ],
        exports: [
            _workspacemetadataversionservice.WorkspaceMetadataVersionService
        ],
        providers: [
            _workspacemetadataversionservice.WorkspaceMetadataVersionService
        ]
    })
], WorkspaceMetadataVersionModule);

//# sourceMappingURL=workspace-metadata-version.module.js.map