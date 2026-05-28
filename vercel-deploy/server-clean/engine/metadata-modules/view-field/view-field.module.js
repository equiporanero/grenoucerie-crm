"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewFieldModule", {
    enumerable: true,
    get: function() {
        return ViewFieldModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _applicationmodule = require("../../core-modules/application/application.module");
const _workspacemanyorallflatentitymapscachemodule = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _permissionsmodule = require("../permissions/permissions.module");
const _viewfieldcontroller = require("./controllers/view-field.controller");
const _viewfieldentity = require("./entities/view-field.entity");
const _viewfieldresolver = require("./resolvers/view-field.resolver");
const _viewfieldservice = require("./services/view-field.service");
const _viewfieldtoolsfactory = require("./tools/view-field-tools.factory");
const _viewpermissionsmodule = require("../view-permissions/view-permissions.module");
const _viewentity = require("../view/entities/view.entity");
const _workspacecachestoragemodule = require("../../workspace-cache-storage/workspace-cache-storage.module");
const _workspacemigrationmodule = require("../../workspace-manager/workspace-migration/workspace-migration.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ViewFieldModule = class ViewFieldModule {
};
ViewFieldModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _viewfieldentity.ViewFieldEntity,
                _viewentity.ViewEntity
            ]),
            _workspacecachestoragemodule.WorkspaceCacheStorageModule,
            _applicationmodule.ApplicationModule,
            _permissionsmodule.PermissionsModule,
            _workspacemigrationmodule.WorkspaceMigrationModule,
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule,
            _viewpermissionsmodule.ViewPermissionsModule
        ],
        controllers: [
            _viewfieldcontroller.ViewFieldController
        ],
        providers: [
            _viewfieldresolver.ViewFieldResolver,
            _viewfieldservice.ViewFieldService,
            _viewfieldtoolsfactory.ViewFieldToolsFactory
        ],
        exports: [
            _viewfieldservice.ViewFieldService,
            _viewfieldtoolsfactory.ViewFieldToolsFactory
        ]
    })
], ViewFieldModule);

//# sourceMappingURL=view-field.module.js.map