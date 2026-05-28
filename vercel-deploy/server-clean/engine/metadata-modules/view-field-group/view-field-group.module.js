"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewFieldGroupModule", {
    enumerable: true,
    get: function() {
        return ViewFieldGroupModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _applicationmodule = require("../../core-modules/application/application.module");
const _workspacemanyorallflatentitymapscachemodule = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _permissionsmodule = require("../permissions/permissions.module");
const _viewfieldgroupentity = require("./entities/view-field-group.entity");
const _viewfieldgroupresolver = require("./resolvers/view-field-group.resolver");
const _fieldswidgetupsertservice = require("./services/fields-widget-upsert.service");
const _viewfieldgroupservice = require("./services/view-field-group.service");
const _viewentity = require("../view/entities/view.entity");
const _workspacecachestoragemodule = require("../../workspace-cache-storage/workspace-cache-storage.module");
const _workspacemigrationmodule = require("../../workspace-manager/workspace-migration/workspace-migration.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ViewFieldGroupModule = class ViewFieldGroupModule {
};
ViewFieldGroupModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _viewfieldgroupentity.ViewFieldGroupEntity,
                _viewentity.ViewEntity
            ]),
            _workspacecachestoragemodule.WorkspaceCacheStorageModule,
            _applicationmodule.ApplicationModule,
            _permissionsmodule.PermissionsModule,
            _workspacemigrationmodule.WorkspaceMigrationModule,
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule
        ],
        providers: [
            _viewfieldgroupresolver.ViewFieldGroupResolver,
            _viewfieldgroupservice.ViewFieldGroupService,
            _fieldswidgetupsertservice.FieldsWidgetUpsertService
        ],
        exports: [
            _viewfieldgroupservice.ViewFieldGroupService
        ]
    })
], ViewFieldGroupModule);

//# sourceMappingURL=view-field-group.module.js.map