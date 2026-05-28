"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplicationTokenService", {
    enumerable: true,
    get: function() {
        return ApplicationTokenService;
    }
});
const _typeorm = require("@nestjs/typeorm");
const _common = require("@nestjs/common");
const _datefns = require("date-fns");
const _utils = require("twenty-shared/utils");
const _ms = /*#__PURE__*/ _interop_require_default(require("ms"));
const _jwtwrapperservice = require("../../../jwt/services/jwt-wrapper.service");
const _workspaceentity = require("../../../workspace/workspace.entity");
const _authcontexttype = require("../../types/auth-context.type");
const _workspaceexception = require("../../../workspace/workspace.exception");
const _applicationentity = require("../../../application/application.entity");
const _applicationexception = require("../../../application/application.exception");
const _authexception = require("../../auth.exception");
const _twentyconfigservice = require("../../../twenty-config/twenty-config.service");
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
const APPLICATION_REFRESH_TOKEN_INVALID_OR_EXPIRED_MESSAGE = 'Application refresh token invalid or expired';
let ApplicationTokenService = class ApplicationTokenService {
    async generateApplicationAccessToken({ workspaceId, applicationId, userWorkspaceId, userId }) {
        await this.validateWorkspaceAndApplication(workspaceId, applicationId);
        const expiresIn = this.twentyConfigService.get('APPLICATION_ACCESS_TOKEN_EXPIRES_IN');
        return this.signApplicationToken({
            workspaceId,
            applicationId,
            userWorkspaceId,
            userId,
            tokenType: _authcontexttype.JwtTokenTypeEnum.APPLICATION_ACCESS,
            expiresIn
        });
    }
    async generateApplicationTokenPair({ workspaceId, applicationId, userWorkspaceId, userId }) {
        await this.validateWorkspaceAndApplication(workspaceId, applicationId);
        const accessTokenExpiresIn = this.twentyConfigService.get('APPLICATION_ACCESS_TOKEN_EXPIRES_IN');
        const refreshTokenExpiresIn = this.twentyConfigService.get('APPLICATION_REFRESH_TOKEN_EXPIRES_IN');
        const [applicationAccessToken, applicationRefreshToken] = await Promise.all([
            this.signApplicationToken({
                workspaceId,
                applicationId,
                userWorkspaceId,
                userId,
                tokenType: _authcontexttype.JwtTokenTypeEnum.APPLICATION_ACCESS,
                expiresIn: accessTokenExpiresIn
            }),
            this.signApplicationToken({
                workspaceId,
                applicationId,
                userWorkspaceId,
                userId,
                tokenType: _authcontexttype.JwtTokenTypeEnum.APPLICATION_REFRESH,
                expiresIn: refreshTokenExpiresIn
            })
        ]);
        return {
            applicationAccessToken,
            applicationRefreshToken
        };
    }
    async validateApplicationRefreshToken(refreshToken) {
        try {
            await this.jwtWrapperService.verifyJwtToken(refreshToken);
            const payload = this.jwtWrapperService.decode(refreshToken, {
                json: true
            });
            if (payload.type !== _authcontexttype.JwtTokenTypeEnum.APPLICATION_REFRESH) {
                throw new _authexception.AuthException('Expected an application refresh token', _authexception.AuthExceptionCode.INVALID_JWT_TOKEN_TYPE);
            }
            return payload;
        } catch (error) {
            if (error instanceof _authexception.AuthException && (error.code === _authexception.AuthExceptionCode.UNAUTHENTICATED || error.code === _authexception.AuthExceptionCode.INVALID_JWT_TOKEN_TYPE)) {
                throw new _authexception.AuthException(APPLICATION_REFRESH_TOKEN_INVALID_OR_EXPIRED_MESSAGE, _authexception.AuthExceptionCode.APPLICATION_REFRESH_TOKEN_INVALID_OR_EXPIRED);
            }
            throw error;
        }
    }
    async validateApplicationAccessToken(token) {
        try {
            await this.jwtWrapperService.verifyJwtToken(token);
            const payload = this.jwtWrapperService.decode(token, {
                json: true
            });
            if (payload.type !== _authcontexttype.JwtTokenTypeEnum.APPLICATION_ACCESS) {
                throw new _authexception.AuthException('Expected an application access token', _authexception.AuthExceptionCode.INVALID_JWT_TOKEN_TYPE);
            }
            return payload;
        } catch (error) {
            if (error instanceof _authexception.AuthException) {
                throw error;
            }
            throw new _authexception.AuthException('Invalid application access token', _authexception.AuthExceptionCode.UNAUTHENTICATED);
        }
    }
    decodeToken(token) {
        return this.jwtWrapperService.decode(token, {
            json: true
        });
    }
    async renewApplicationTokens(payload) {
        return this.generateApplicationTokenPair({
            workspaceId: payload.workspaceId,
            applicationId: payload.applicationId,
            userWorkspaceId: payload.userWorkspaceId,
            userId: payload.userId
        });
    }
    async validateWorkspaceAndApplication(workspaceId, applicationId) {
        const workspace = await this.workspaceRepository.findOne({
            where: {
                id: workspaceId
            }
        });
        (0, _utils.assertIsDefinedOrThrow)(workspace, _workspaceexception.WorkspaceNotFoundDefaultError);
        const application = await this.applicationRepository.findOne({
            where: {
                id: applicationId,
                workspaceId
            }
        });
        (0, _utils.assertIsDefinedOrThrow)(application, new _applicationexception.ApplicationException('Application not found', _applicationexception.ApplicationExceptionCode.APPLICATION_NOT_FOUND));
    }
    async signApplicationToken({ workspaceId, applicationId, userWorkspaceId, userId, tokenType, expiresIn }) {
        const expiresAt = (0, _datefns.addMilliseconds)(new Date().getTime(), (0, _ms.default)(expiresIn));
        const jwtPayload = {
            sub: applicationId,
            applicationId,
            workspaceId,
            type: tokenType,
            ...userWorkspaceId ? {
                userWorkspaceId
            } : {},
            ...userId ? {
                userId
            } : {}
        };
        return {
            token: await this.jwtWrapperService.signAsyncOrThrow(jwtPayload, {
                expiresIn
            }),
            expiresAt
        };
    }
    constructor(jwtWrapperService, workspaceRepository, applicationRepository, twentyConfigService){
        this.jwtWrapperService = jwtWrapperService;
        this.workspaceRepository = workspaceRepository;
        this.applicationRepository = applicationRepository;
        this.twentyConfigService = twentyConfigService;
    }
};
ApplicationTokenService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _common.Inject)(_jwtwrapperservice.JwtWrapperService)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_applicationentity.ApplicationEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _jwtwrapperservice.JwtWrapperService === "undefined" ? Object : _jwtwrapperservice.JwtWrapperService,
        typeof Repository === "undefined" ? Object : Repository,
        typeof Repository === "undefined" ? Object : Repository,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], ApplicationTokenService);

//# sourceMappingURL=application-token.service.js.map