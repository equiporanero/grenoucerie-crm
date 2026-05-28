"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UserRoleModule", {
    enumerable: true,
    get: function() {
        return UserRoleModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _userworkspaceentity = require("../../core-modules/user-workspace/user-workspace.entity");
const _roletargetentity = require("../role-target/role-target.entity");
const _roletargetmodule = require("../role-target/role-target.module");
const _roleentity = require("../role/role.entity");
const _userroleservice = require("./user-role.service");
const _workspacecachemodule = require("../../workspace-cache/workspace-cache.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let UserRoleModule = class UserRoleModule {
};
UserRoleModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _roleentity.RoleEntity,
                _roletargetentity.RoleTargetEntity
            ]),
            _typeorm.TypeOrmModule.forFeature([
                _userworkspaceentity.UserWorkspaceEntity
            ]),
            _workspacecachemodule.WorkspaceCacheModule,
            _roletargetmodule.RoleTargetModule
        ],
        providers: [
            _userroleservice.UserRoleService
        ],
        exports: [
            _userroleservice.UserRoleService
        ]
    })
], UserRoleModule);

//# sourceMappingURL=user-role.module.js.map