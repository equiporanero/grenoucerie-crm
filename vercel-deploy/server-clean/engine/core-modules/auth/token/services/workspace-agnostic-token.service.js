"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceAgnosticTokenService", {
    enumerable: true,
    get: function() {
        return WorkspaceAgnosticTokenService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _datefns = require("date-fns");
const _ms = /*#__PURE__*/ _interop_require_default(require("ms"));
const _typeorm1 = require("typeorm");
const _fromuserentitytoflatutil = require("../../../user/utils/from-user-entity-to-flat.util");
const _authexception = require("../../auth.exception");
const _authcontexttype = require("../../types/auth-context.type");
const _jwtwrapperservice = require("../../../jwt/services/jwt-wrapper.service");
const _twentyconfigservice = require("../../../twenty-config/twenty-config.service");
const _userentity = require("../../../user/user.entity");
const _uservalidate = require("../../../user/user.validate");
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
let WorkspaceAgnosticTokenService = class WorkspaceAgnosticTokenService {
    async generateWorkspaceAgnosticToken({ userId, authProvider }) {
        const expiresIn = this.twentyConfigService.get('WORKSPACE_AGNOSTIC_TOKEN_EXPIRES_IN');
        const expiresAt = (0, _datefns.addMilliseconds)(new Date().getTime(), (0, _ms.default)(expiresIn));
        const user = await this.userRepository.findOne({
            where: {
                id: userId
            }
        });
        _uservalidate.userValidator.assertIsDefinedOrThrow(user, new _authexception.AuthException('User is not found', _authexception.AuthExceptionCode.INVALID_INPUT));
        const jwtPayload = {
            sub: user.id,
            userId: user.id,
            authProvider,
            type: _authcontexttype.JwtTokenTypeEnum.WORKSPACE_AGNOSTIC
        };
        return {
            token: await this.jwtWrapperService.signAsyncOrThrow(jwtPayload, {
                expiresIn
            }),
            expiresAt
        };
    }
    async validateToken(token) {
        try {
            await this.jwtWrapperService.verifyJwtToken(token);
            const decoded = this.jwtWrapperService.decode(token);
            if (decoded.type !== _authcontexttype.JwtTokenTypeEnum.WORKSPACE_AGNOSTIC) {
                throw new _authexception.AuthException('Expected a workspace-agnostic token', _authexception.AuthExceptionCode.INVALID_JWT_TOKEN_TYPE);
            }
            const user = await this.userRepository.findOne({
                where: {
                    id: decoded.sub
                }
            });
            _uservalidate.userValidator.assertIsDefinedOrThrow(user);
            return {
                user: (0, _fromuserentitytoflatutil.fromUserEntityToFlat)(user)
            };
        } catch (error) {
            if (error instanceof _authexception.AuthException) {
                throw error;
            }
            throw new _authexception.AuthException('Invalid token', _authexception.AuthExceptionCode.UNAUTHENTICATED);
        }
    }
    constructor(jwtWrapperService, twentyConfigService, userRepository){
        this.jwtWrapperService = jwtWrapperService;
        this.twentyConfigService = twentyConfigService;
        this.userRepository = userRepository;
    }
};
WorkspaceAgnosticTokenService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(2, (0, _typeorm.InjectRepository)(_userentity.UserEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _jwtwrapperservice.JwtWrapperService === "undefined" ? Object : _jwtwrapperservice.JwtWrapperService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], WorkspaceAgnosticTokenService);

//# sourceMappingURL=workspace-agnostic-token.service.js.map