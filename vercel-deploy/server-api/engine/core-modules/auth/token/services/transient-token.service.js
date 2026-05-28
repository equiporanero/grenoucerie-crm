"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TransientTokenService", {
    enumerable: true,
    get: function() {
        return TransientTokenService;
    }
});
const _common = require("@nestjs/common");
const _datefns = require("date-fns");
const _ms = /*#__PURE__*/ _interop_require_default(require("ms"));
const _authexception = require("../../auth.exception");
const _jwtwrapperservice = require("../../../jwt/services/jwt-wrapper.service");
const _twentyconfigservice = require("../../../twenty-config/twenty-config.service");
const _authcontexttype = require("../../types/auth-context.type");
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
let TransientTokenService = class TransientTokenService {
    async generateTransientToken({ workspaceMemberId, workspaceId, userId }) {
        const jwtPayload = {
            sub: workspaceMemberId,
            userId: userId,
            workspaceId: workspaceId,
            workspaceMemberId: workspaceMemberId,
            type: _authcontexttype.JwtTokenTypeEnum.LOGIN
        };
        const expiresIn = this.twentyConfigService.get('SHORT_TERM_TOKEN_EXPIRES_IN');
        const expiresAt = (0, _datefns.addMilliseconds)(new Date().getTime(), (0, _ms.default)(expiresIn));
        return {
            token: await this.jwtWrapperService.signAsyncOrThrow(jwtPayload, {
                expiresIn
            }),
            expiresAt
        };
    }
    async verifyTransientToken(transientToken) {
        await this.jwtWrapperService.verifyJwtToken(transientToken);
        const { type, ...payload } = this.jwtWrapperService.decode(transientToken);
        if (type !== _authcontexttype.JwtTokenTypeEnum.LOGIN) {
            throw new _authexception.AuthException('Expected a transient token', _authexception.AuthExceptionCode.INVALID_JWT_TOKEN_TYPE);
        }
        return payload;
    }
    constructor(jwtWrapperService, twentyConfigService){
        this.jwtWrapperService = jwtWrapperService;
        this.twentyConfigService = twentyConfigService;
    }
};
TransientTokenService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _jwtwrapperservice.JwtWrapperService === "undefined" ? Object : _jwtwrapperservice.JwtWrapperService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], TransientTokenService);

//# sourceMappingURL=transient-token.service.js.map