"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RefreshTokenService", {
    enumerable: true,
    get: function() {
        return RefreshTokenService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _datefns = require("date-fns");
const _ms = /*#__PURE__*/ _interop_require_default(require("ms"));
const _typeorm1 = require("typeorm");
const _apptokenentity = require("../../../app-token/app-token.entity");
const _authexception = require("../../auth.exception");
const _authcontexttype = require("../../types/auth-context.type");
const _jwtwrapperservice = require("../../../jwt/services/jwt-wrapper.service");
const _twentyconfigservice = require("../../../twenty-config/twenty-config.service");
const _userentity = require("../../../user/user.entity");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
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
let RefreshTokenService = class RefreshTokenService {
    async verifyRefreshToken(refreshToken) {
        const reuseGracePeriod = this.twentyConfigService.get('REFRESH_TOKEN_REUSE_GRACE_PERIOD');
        await this.jwtWrapperService.verifyJwtToken(refreshToken);
        const jwtPayload = this.jwtWrapperService.decode(refreshToken);
        if (jwtPayload.type !== _authcontexttype.JwtTokenTypeEnum.REFRESH) {
            throw new _authexception.AuthException('Expected a refresh token', _authexception.AuthExceptionCode.INVALID_JWT_TOKEN_TYPE);
        }
        if (!(jwtPayload.jti && jwtPayload.sub)) {
            throw new _authexception.AuthException('This refresh token is malformed', _authexception.AuthExceptionCode.INVALID_INPUT);
        }
        const token = await this.appTokenRepository.findOneBy({
            id: jwtPayload.jti
        });
        if (!token) {
            throw new _authexception.AuthException("This refresh token doesn't exist", _authexception.AuthExceptionCode.INVALID_INPUT);
        }
        const user = await this.userRepository.findOneBy({
            id: jwtPayload.sub
        });
        if (!user) {
            throw new _authexception.AuthException('User not found', _authexception.AuthExceptionCode.INVALID_INPUT);
        }
        if (token.revokedAt) {
            const wasRevokedBeforeGracePeriod = token.revokedAt.getTime() <= Date.now() - (0, _ms.default)(reuseGracePeriod);
            if (wasRevokedBeforeGracePeriod) {
                // Reject the stale token but don't revoke all tokens — the most
                // common cause is a lost renewal response, not actual token theft.
                throw new _authexception.AuthException('This refresh token has been revoked.', _authexception.AuthExceptionCode.FORBIDDEN_EXCEPTION);
            }
        // Token was revoked recently (within grace period). This is expected
        // when concurrent requests (e.g. two browser tabs) race to refresh
        // at the same time. Allow it but don't reset the original revokedAt
        // timestamp so the grace window stays anchored and cannot be extended.
        }
        return {
            user,
            token,
            authProvider: jwtPayload.authProvider,
            targetedTokenType: jwtPayload.targetedTokenType,
            isImpersonating: jwtPayload.isImpersonating,
            impersonatorUserWorkspaceId: jwtPayload.impersonatorUserWorkspaceId,
            impersonatedUserWorkspaceId: jwtPayload.impersonatedUserWorkspaceId
        };
    }
    async generateRefreshToken(payload, isImpersonationToken = false) {
        const expiresIn = isImpersonationToken ? '1d' : this.twentyConfigService.get('REFRESH_TOKEN_EXPIRES_IN');
        if (!expiresIn) {
            throw new _authexception.AuthException('Expiration time for access token is not set', _authexception.AuthExceptionCode.INTERNAL_SERVER_ERROR);
        }
        const expiresAt = (0, _datefns.addMilliseconds)(new Date().getTime(), (0, _ms.default)(expiresIn));
        const refreshToken = this.appTokenRepository.create({
            ...payload,
            expiresAt,
            type: _apptokenentity.AppTokenType.RefreshToken
        });
        await this.appTokenRepository.save(refreshToken);
        const jwtPayload = {
            ...payload,
            sub: payload.userId,
            type: _authcontexttype.JwtTokenTypeEnum.REFRESH
        };
        const token = await this.jwtWrapperService.signAsyncOrThrow(jwtPayload, {
            expiresIn,
            jwtid: refreshToken.id
        });
        return {
            token,
            expiresAt
        };
    }
    constructor(jwtWrapperService, twentyConfigService, appTokenRepository, userRepository){
        this.jwtWrapperService = jwtWrapperService;
        this.twentyConfigService = twentyConfigService;
        this.appTokenRepository = appTokenRepository;
        this.userRepository = userRepository;
    }
};
RefreshTokenService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(2, (0, _typeorm.InjectRepository)(_apptokenentity.AppTokenEntity)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_userentity.UserEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _jwtwrapperservice.JwtWrapperService === "undefined" ? Object : _jwtwrapperservice.JwtWrapperService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], RefreshTokenService);

//# sourceMappingURL=refresh-token.service.js.map