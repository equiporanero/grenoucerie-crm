"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AccessTokenService", {
    enumerable: true,
    get: function() {
        return AccessTokenService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _datefns = require("date-fns");
const _ms = /*#__PURE__*/ _interop_require_default(require("ms"));
const _utils = require("twenty-shared/utils");
const _workspace = require("twenty-shared/workspace");
const _typeorm1 = require("typeorm");
const _authexception = require("../../auth.exception");
const _jwtauthstrategy = require("../../strategies/jwt.auth.strategy");
const _authcontexttype = require("../../types/auth-context.type");
const _jwtwrapperservice = require("../../../jwt/services/jwt-wrapper.service");
const _twentyconfigservice = require("../../../twenty-config/twenty-config.service");
const _userworkspaceentity = require("../../../user-workspace/user-workspace.entity");
const _userworkspaceexception = require("../../../user-workspace/user-workspace.exception");
const _userentity = require("../../../user/user.entity");
const _uservalidate = require("../../../user/user.validate");
const _workspaceentity = require("../../../workspace/workspace.entity");
const _workspaceexception = require("../../../workspace/workspace.exception");
const _globalworkspaceormmanager = require("../../../../twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../twenty-orm/utils/build-system-auth-context.util");
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
let AccessTokenService = class AccessTokenService {
    async generateAccessToken({ userId, workspaceId, authProvider, isImpersonating, impersonatorUserWorkspaceId, impersonatedUserWorkspaceId }) {
        const expiresIn = this.twentyConfigService.get('ACCESS_TOKEN_EXPIRES_IN');
        const expiresAt = (0, _datefns.addMilliseconds)(new Date().getTime(), (0, _ms.default)(expiresIn));
        const user = await this.userRepository.findOne({
            where: {
                id: userId
            }
        });
        _uservalidate.userValidator.assertIsDefinedOrThrow(user, new _authexception.AuthException('User is not found', _authexception.AuthExceptionCode.INVALID_INPUT));
        let tokenWorkspaceMemberId;
        const workspace = await this.workspaceRepository.findOne({
            where: {
                id: workspaceId
            }
        });
        (0, _utils.assertIsDefinedOrThrow)(workspace, _workspaceexception.WorkspaceNotFoundDefaultError);
        if ((0, _workspace.isWorkspaceActiveOrSuspended)(workspace)) {
            const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
            tokenWorkspaceMemberId = await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
                const workspaceMemberRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workspaceMember', {
                    shouldBypassPermissionChecks: true
                });
                const workspaceMember = await workspaceMemberRepository.findOne({
                    where: {
                        userId: user.id
                    }
                });
                (0, _utils.assertIsDefinedOrThrow)(workspaceMember, new _authexception.AuthException('User is not a member of the workspace', _authexception.AuthExceptionCode.FORBIDDEN_EXCEPTION, {
                    userFriendlyMessage: /*i18n*/ {
                        id: "pMOjQa",
                        message: "User is not a member of the workspace."
                    }
                }));
                return workspaceMember.id;
            }, authContext);
        }
        const userWorkspace = await this.userWorkspaceRepository.findOne({
            where: {
                userId: user.id,
                workspaceId
            }
        });
        (0, _utils.assertIsDefinedOrThrow)(userWorkspace, _userworkspaceexception.UserWorkspaceNotFoundDefaultError);
        const payloadImpersonatorUserWorkspaceId = isImpersonating === true ? impersonatorUserWorkspaceId : undefined;
        const payloadOriginalUserWorkspaceId = isImpersonating === true ? impersonatedUserWorkspaceId : undefined;
        const jwtPayload = {
            sub: user.id,
            userId: user.id,
            workspaceId,
            workspaceMemberId: tokenWorkspaceMemberId,
            userWorkspaceId: userWorkspace.id,
            type: _authcontexttype.JwtTokenTypeEnum.ACCESS,
            authProvider,
            isImpersonating: isImpersonating === true,
            impersonatorUserWorkspaceId: payloadImpersonatorUserWorkspaceId,
            impersonatedUserWorkspaceId: payloadOriginalUserWorkspaceId
        };
        const token = await this.jwtWrapperService.signAsyncOrThrow(jwtPayload, {
            expiresIn
        });
        return {
            token,
            expiresAt
        };
    }
    async validateToken(token) {
        await this.jwtWrapperService.verifyJwtToken(token);
        const decoded = this.jwtWrapperService.decode(token);
        const context = await this.jwtStrategy.validate(decoded);
        return context;
    }
    async validateTokenByRequest(request) {
        const token = this.jwtWrapperService.extractJwtFromRequest()(request);
        if (!token) {
            throw new _authexception.AuthException('Missing authentication token', _authexception.AuthExceptionCode.FORBIDDEN_EXCEPTION);
        }
        return this.validateToken(token);
    }
    constructor(jwtWrapperService, jwtStrategy, twentyConfigService, userRepository, workspaceRepository, globalWorkspaceOrmManager, userWorkspaceRepository){
        this.jwtWrapperService = jwtWrapperService;
        this.jwtStrategy = jwtStrategy;
        this.twentyConfigService = twentyConfigService;
        this.userRepository = userRepository;
        this.workspaceRepository = workspaceRepository;
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.userWorkspaceRepository = userWorkspaceRepository;
    }
};
AccessTokenService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(3, (0, _typeorm.InjectRepository)(_userentity.UserEntity)),
    _ts_param(4, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_param(6, (0, _typeorm.InjectRepository)(_userworkspaceentity.UserWorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _jwtwrapperservice.JwtWrapperService === "undefined" ? Object : _jwtwrapperservice.JwtWrapperService,
        typeof _jwtauthstrategy.JwtAuthStrategy === "undefined" ? Object : _jwtauthstrategy.JwtAuthStrategy,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], AccessTokenService);

//# sourceMappingURL=access-token.service.js.map