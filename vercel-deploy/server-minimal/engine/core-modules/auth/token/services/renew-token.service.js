"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RenewTokenService", {
    enumerable: true,
    get: function() {
        return RenewTokenService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _apptokenentity = require("../../../app-token/app-token.entity");
const _authexception = require("../../auth.exception");
const _accesstokenservice = require("./access-token.service");
const _refreshtokenservice = require("./refresh-token.service");
const _workspaceagnostictokenservice = require("./workspace-agnostic-token.service");
const _authcontexttype = require("../../types/auth-context.type");
const _workspacetype = require("../../../workspace/types/workspace.type");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let RenewTokenService = class RenewTokenService {
    async generateTokensFromRefreshToken(token) {
        if (!token) {
            throw new _authexception.AuthException('Refresh token not found', _authexception.AuthExceptionCode.INVALID_INPUT);
        }
        const { user, token: { id, workspaceId }, authProvider, targetedTokenType: targetedTokenTypeFromPayload, isImpersonating, impersonatorUserWorkspaceId, impersonatedUserWorkspaceId } = await this.refreshTokenService.verifyRefreshToken(token);
        // Revoke old refresh token only if not already revoked.
        // If it was already revoked (concurrent race condition within grace
        // period), we preserve the original revokedAt timestamp so the grace
        // window stays anchored and cannot be extended by repeated reuse.
        await this.appTokenRepository.update({
            id,
            revokedAt: (0, _typeorm1.IsNull)()
        }, {
            revokedAt: new Date()
        });
        // Support legacy token when targetedTokenType is undefined.
        const targetedTokenType = targetedTokenTypeFromPayload ?? _authcontexttype.JwtTokenTypeEnum.ACCESS;
        const resolvedAuthProvider = authProvider ?? _workspacetype.AuthProviderEnum.Password;
        const accessToken = (0, _utils.isDefined)(authProvider) && targetedTokenType === _authcontexttype.JwtTokenTypeEnum.WORKSPACE_AGNOSTIC && !(0, _utils.isDefined)(workspaceId) ? await this.workspaceAgnosticTokenService.generateWorkspaceAgnosticToken({
            userId: user.id,
            authProvider
        }) : await this.accessTokenService.generateAccessToken({
            userId: user.id,
            workspaceId: workspaceId,
            authProvider: resolvedAuthProvider,
            isImpersonating,
            impersonatorUserWorkspaceId,
            impersonatedUserWorkspaceId
        });
        const refreshToken = await this.refreshTokenService.generateRefreshToken({
            userId: user.id,
            workspaceId,
            authProvider: resolvedAuthProvider,
            targetedTokenType,
            isImpersonating,
            impersonatorUserWorkspaceId,
            impersonatedUserWorkspaceId
        });
        return {
            accessOrWorkspaceAgnosticToken: accessToken,
            refreshToken
        };
    }
    constructor(appTokenRepository, accessTokenService, workspaceAgnosticTokenService, refreshTokenService){
        this.appTokenRepository = appTokenRepository;
        this.accessTokenService = accessTokenService;
        this.workspaceAgnosticTokenService = workspaceAgnosticTokenService;
        this.refreshTokenService = refreshTokenService;
    }
};
RenewTokenService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_apptokenentity.AppTokenEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _accesstokenservice.AccessTokenService === "undefined" ? Object : _accesstokenservice.AccessTokenService,
        typeof _workspaceagnostictokenservice.WorkspaceAgnosticTokenService === "undefined" ? Object : _workspaceagnostictokenservice.WorkspaceAgnosticTokenService,
        typeof _refreshtokenservice.RefreshTokenService === "undefined" ? Object : _refreshtokenservice.RefreshTokenService
    ])
], RenewTokenService);

//# sourceMappingURL=renew-token.service.js.map