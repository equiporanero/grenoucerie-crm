"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TokenModule", {
    enumerable: true,
    get: function() {
        return TokenModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeormmodule = require("../../../../database/typeorm/typeorm.module");
const _apptokenentity = require("../../app-token/app-token.entity");
const _applicationentity = require("../../application/application.entity");
const _jwtauthstrategy = require("../strategies/jwt.auth.strategy");
const _accesstokenservice = require("./services/access-token.service");
const _applicationtokenservice = require("./services/application-token.service");
const _logintokenservice = require("./services/login-token.service");
const _refreshtokenservice = require("./services/refresh-token.service");
const _renewtokenservice = require("./services/renew-token.service");
const _workspaceagnostictokenservice = require("./services/workspace-agnostic-token.service");
const _jwtmodule = require("../../jwt/jwt.module");
const _userworkspaceentity = require("../../user-workspace/user-workspace.entity");
const _userentity = require("../../user/user.entity");
const _workspaceentity = require("../../workspace/workspace.entity");
const _coreentitycachemodule = require("../../../core-entity-cache/core-entity-cache.module");
const _permissionsmodule = require("../../../metadata-modules/permissions/permissions.module");
const _workspacecachemodule = require("../../../workspace-cache/workspace-cache.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let TokenModule = class TokenModule {
};
TokenModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _jwtmodule.JwtModule,
            _typeorm.TypeOrmModule.forFeature([
                _userentity.UserEntity,
                _apptokenentity.AppTokenEntity,
                _workspaceentity.WorkspaceEntity,
                _userworkspaceentity.UserWorkspaceEntity,
                _applicationentity.ApplicationEntity
            ]),
            _typeormmodule.TypeORMModule,
            _permissionsmodule.PermissionsModule,
            _workspacecachemodule.WorkspaceCacheModule,
            _coreentitycachemodule.CoreEntityCacheModule
        ],
        providers: [
            _renewtokenservice.RenewTokenService,
            _jwtauthstrategy.JwtAuthStrategy,
            _accesstokenservice.AccessTokenService,
            _logintokenservice.LoginTokenService,
            _refreshtokenservice.RefreshTokenService,
            _workspaceagnostictokenservice.WorkspaceAgnosticTokenService,
            _applicationtokenservice.ApplicationTokenService
        ],
        exports: [
            _renewtokenservice.RenewTokenService,
            _accesstokenservice.AccessTokenService,
            _logintokenservice.LoginTokenService,
            _refreshtokenservice.RefreshTokenService,
            _workspaceagnostictokenservice.WorkspaceAgnosticTokenService,
            _applicationtokenservice.ApplicationTokenService
        ]
    })
], TokenModule);

//# sourceMappingURL=token.module.js.map