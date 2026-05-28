"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TwentyORMModule", {
    enumerable: true,
    get: function() {
        return TwentyORMModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _featureflagmodule = require("../core-modules/feature-flag/feature-flag.module");
const _twentyconfigmodule = require("../core-modules/twenty-config/twenty-config.module");
const _workspaceentity = require("../core-modules/workspace/workspace.entity");
const _workspacemanyorallflatentitymapscachemodule = require("../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _objectmetadataentity = require("../metadata-modules/object-metadata/object-metadata.entity");
const _permissionsmodule = require("../metadata-modules/permissions/permissions.module");
const _roletargetentity = require("../metadata-modules/role-target/role-target.entity");
const _workspacefeatureflagsmapcachemodule = require("../metadata-modules/workspace-feature-flags-map-cache/workspace-feature-flags-map-cache.module");
const _factories = require("./factories");
const _entityschemafactory = require("./factories/entity-schema.factory");
const _workspacecachestoragemodule = require("../workspace-cache-storage/workspace-cache-storage.module");
const _workspacecachemodule = require("../workspace-cache/workspace-cache.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let TwentyORMModule = class TwentyORMModule {
};
TwentyORMModule = _ts_decorate([
    (0, _common.Global)(),
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _objectmetadataentity.ObjectMetadataEntity,
                _roletargetentity.RoleTargetEntity,
                _workspaceentity.WorkspaceEntity
            ]),
            _workspacecachestoragemodule.WorkspaceCacheStorageModule,
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule,
            _permissionsmodule.PermissionsModule,
            _workspacefeatureflagsmapcachemodule.WorkspaceFeatureFlagsMapCacheModule,
            _featureflagmodule.FeatureFlagModule,
            _twentyconfigmodule.TwentyConfigModule,
            _workspacecachemodule.WorkspaceCacheModule
        ],
        providers: [
            ..._factories.entitySchemaFactories
        ],
        exports: [
            _entityschemafactory.EntitySchemaFactory
        ]
    })
], TwentyORMModule);

//# sourceMappingURL=twenty-orm.module.js.map