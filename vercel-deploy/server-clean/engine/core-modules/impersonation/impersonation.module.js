"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ImpersonationModule", {
    enumerable: true,
    get: function() {
        return ImpersonationModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _auditmodule = require("../audit/audit.module");
const _authmodule = require("../auth/auth.module");
const _workspacedomainsmodule = require("../domain/workspace-domains/workspace-domains.module");
const _impersonationresolver = require("./impersonation.resolver");
const _impersonationservice = require("./services/impersonation.service");
const _userworkspaceentity = require("../user-workspace/user-workspace.entity");
const _userworkspacemodule = require("../user-workspace/user-workspace.module");
const _userentity = require("../user/user.entity");
const _workspaceentity = require("../workspace/workspace.entity");
const _permissionsmodule = require("../../metadata-modules/permissions/permissions.module");
const _rolemodule = require("../../metadata-modules/role/role.module");
const _userrolemodule = require("../../metadata-modules/user-role/user-role.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ImpersonationModule = class ImpersonationModule {
};
ImpersonationModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _authmodule.AuthModule,
            _userworkspacemodule.UserWorkspaceModule,
            _permissionsmodule.PermissionsModule,
            _rolemodule.RoleModule,
            _userrolemodule.UserRoleModule,
            _auditmodule.AuditModule,
            _typeorm.TypeOrmModule.forFeature([
                _userworkspaceentity.UserWorkspaceEntity,
                _workspaceentity.WorkspaceEntity,
                _userentity.UserEntity
            ]),
            _workspacedomainsmodule.WorkspaceDomainsModule,
            _permissionsmodule.PermissionsModule
        ],
        providers: [
            _impersonationservice.ImpersonationService,
            _impersonationresolver.ImpersonationResolver
        ],
        exports: [
            _impersonationservice.ImpersonationService
        ]
    })
], ImpersonationModule);

//# sourceMappingURL=impersonation.module.js.map