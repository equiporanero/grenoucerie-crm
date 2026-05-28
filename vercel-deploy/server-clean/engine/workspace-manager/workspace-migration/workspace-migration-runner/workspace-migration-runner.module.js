"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMigrationRunnerModule", {
    enumerable: true,
    get: function() {
        return WorkspaceMigrationRunnerModule;
    }
});
const _common = require("@nestjs/common");
const _core = require("@nestjs/core");
const _typeorm = require("@nestjs/typeorm");
const _workspaceiteratormodule = require("../../../../database/commands/command-runners/workspace-iterator.module");
const _typeormmodule = require("../../../../database/typeorm/typeorm.module");
const _featureflagmodule = require("../../../core-modules/feature-flag/feature-flag.module");
const _workspaceentity = require("../../../core-modules/workspace/workspace.entity");
const _workspacemanyorallflatentitymapscachemodule = require("../../../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _workspacemetadataversionmodule = require("../../../metadata-modules/workspace-metadata-version/workspace-metadata-version.module");
const _workspacecachestoragemodule = require("../../../workspace-cache-storage/workspace-cache-storage.module");
const _workspacecachemodule = require("../../../workspace-cache/workspace-cache.module");
const _workspaceschemamigrationrunneractionhandlersmodule = require("./action-handlers/workspace-schema-migration-runner-action-handlers.module");
const _flatcacheinvalidatecommand = require("./commands/flat-cache-invalidate.command");
const _workspacemigrationrunneractionhandlerregistryservice = require("./registry/workspace-migration-runner-action-handler-registry.service");
const _workspacemigrationrunnerservice = require("./services/workspace-migration-runner.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WorkspaceMigrationRunnerModule = class WorkspaceMigrationRunnerModule {
};
WorkspaceMigrationRunnerModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _featureflagmodule.FeatureFlagModule,
            _typeormmodule.TypeORMModule,
            _workspacemetadataversionmodule.WorkspaceMetadataVersionModule,
            _workspaceschemamigrationrunneractionhandlersmodule.WorkspaceSchemaMigrationRunnerActionHandlersModule,
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule,
            _core.DiscoveryModule,
            _workspacecachestoragemodule.WorkspaceCacheStorageModule,
            _workspacecachemodule.WorkspaceCacheModule,
            _typeorm.TypeOrmModule.forFeature([
                _workspaceentity.WorkspaceEntity
            ]),
            _workspaceiteratormodule.WorkspaceIteratorModule
        ],
        providers: [
            _workspacemigrationrunnerservice.WorkspaceMigrationRunnerService,
            _workspacemigrationrunneractionhandlerregistryservice.WorkspaceMigrationRunnerActionHandlerRegistryService,
            _flatcacheinvalidatecommand.FlatCacheInvalidateCommand
        ],
        exports: [
            _workspacemigrationrunnerservice.WorkspaceMigrationRunnerService
        ]
    })
], WorkspaceMigrationRunnerModule);

//# sourceMappingURL=workspace-migration-runner.module.js.map