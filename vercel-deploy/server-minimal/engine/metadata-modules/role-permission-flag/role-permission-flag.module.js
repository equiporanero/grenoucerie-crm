"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RolePermissionFlagModule", {
    enumerable: true,
    get: function() {
        return RolePermissionFlagModule;
    }
});
const _common = require("@nestjs/common");
const _applicationmodule = require("../../core-modules/application/application.module");
const _workspacemanyorallflatentitymapscachemodule = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _rolepermissionflagservice = require("./role-permission-flag.service");
const _workspacecachemodule = require("../../workspace-cache/workspace-cache.module");
const _workspacemigrationmodule = require("../../workspace-manager/workspace-migration/workspace-migration.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let RolePermissionFlagModule = class RolePermissionFlagModule {
};
RolePermissionFlagModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _workspacecachemodule.WorkspaceCacheModule,
            _applicationmodule.ApplicationModule,
            _workspacemigrationmodule.WorkspaceMigrationModule,
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule
        ],
        providers: [
            _rolepermissionflagservice.RolePermissionFlagService
        ],
        exports: [
            _rolepermissionflagservice.RolePermissionFlagService
        ]
    })
], RolePermissionFlagModule);

//# sourceMappingURL=role-permission-flag.module.js.map