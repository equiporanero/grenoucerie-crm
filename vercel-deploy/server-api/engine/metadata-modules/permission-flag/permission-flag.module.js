"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PermissionFlagModule", {
    enumerable: true,
    get: function() {
        return PermissionFlagModule;
    }
});
const _common = require("@nestjs/common");
const _applicationmodule = require("../../core-modules/application/application.module");
const _workspacemanyorallflatentitymapscachemodule = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _flatpermissionflagmodule = require("../flat-permission-flag/flat-permission-flag.module");
const _permissionflagservice = require("./permission-flag.service");
const _permissionsmodule = require("../permissions/permissions.module");
const _workspacecachestoragemodule = require("../../workspace-cache-storage/workspace-cache-storage.module");
const _workspacemigrationmodule = require("../../workspace-manager/workspace-migration/workspace-migration.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let PermissionFlagModule = class PermissionFlagModule {
};
PermissionFlagModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule,
            _workspacemigrationmodule.WorkspaceMigrationModule,
            _workspacecachestoragemodule.WorkspaceCacheStorageModule,
            _applicationmodule.ApplicationModule,
            _flatpermissionflagmodule.FlatPermissionFlagModule,
            _permissionsmodule.PermissionsModule
        ],
        providers: [
            _permissionflagservice.PermissionFlagService
        ],
        exports: [
            _permissionflagservice.PermissionFlagService
        ]
    })
], PermissionFlagModule);

//# sourceMappingURL=permission-flag.module.js.map