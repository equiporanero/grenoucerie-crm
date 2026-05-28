"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GlobalWorkspaceDataSourceModule", {
    enumerable: true,
    get: function() {
        return GlobalWorkspaceDataSourceModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _twentyconfigmodule = require("../../core-modules/twenty-config/twenty-config.module");
const _workspaceentity = require("../../core-modules/workspace/workspace.entity");
const _fieldmetadataentity = require("../../metadata-modules/field-metadata/field-metadata.entity");
const _workspacemanyorallflatentitymapscachemodule = require("../../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _objectmetadataentity = require("../../metadata-modules/object-metadata/object-metadata.entity");
const _workspacefeatureflagsmapcachemodule = require("../../metadata-modules/workspace-feature-flags-map-cache/workspace-feature-flags-map-cache.module");
const _entityschemacolumnfactory = require("../factories/entity-schema-column.factory");
const _entityschemarelationfactory = require("../factories/entity-schema-relation.factory");
const _entityschemafactory = require("../factories/entity-schema.factory");
const _globalworkspacedatasourceservice = require("./global-workspace-datasource.service");
const _globalworkspaceormmanager = require("./global-workspace-orm.manager");
const _workspaceormentitymetadatascacheservice = require("./workspace-orm-entity-metadatas-cache.service");
const _twentyormmodule = require("../twenty-orm.module");
const _workspacecachestoragemodule = require("../../workspace-cache-storage/workspace-cache-storage.module");
const _workspacecachemodule = require("../../workspace-cache/workspace-cache.module");
const _workspaceeventemittermodule = require("../../workspace-event-emitter/workspace-event-emitter.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let GlobalWorkspaceDataSourceModule = class GlobalWorkspaceDataSourceModule {
};
GlobalWorkspaceDataSourceModule = _ts_decorate([
    (0, _common.Global)(),
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _workspaceentity.WorkspaceEntity,
                _objectmetadataentity.ObjectMetadataEntity,
                _fieldmetadataentity.FieldMetadataEntity
            ]),
            _workspacecachestoragemodule.WorkspaceCacheStorageModule,
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule,
            _workspacefeatureflagsmapcachemodule.WorkspaceFeatureFlagsMapCacheModule,
            _twentyconfigmodule.TwentyConfigModule,
            _workspaceeventemittermodule.WorkspaceEventEmitterModule,
            _workspacecachemodule.WorkspaceCacheModule,
            _twentyormmodule.TwentyORMModule
        ],
        providers: [
            _globalworkspacedatasourceservice.GlobalWorkspaceDataSourceService,
            _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
            _entityschemafactory.EntitySchemaFactory,
            _entityschemacolumnfactory.EntitySchemaColumnFactory,
            _entityschemarelationfactory.EntitySchemaRelationFactory,
            _workspaceormentitymetadatascacheservice.WorkspaceORMEntityMetadatasCacheService
        ],
        exports: [
            _globalworkspacedatasourceservice.GlobalWorkspaceDataSourceService,
            _globalworkspaceormmanager.GlobalWorkspaceOrmManager
        ]
    })
], GlobalWorkspaceDataSourceModule);

//# sourceMappingURL=global-workspace-datasource.module.js.map