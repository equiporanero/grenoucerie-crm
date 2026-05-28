"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "JwtWrapperService", {
    enumerable: true,
    get: function() {
        return JwtWrapperService;
    }
});
const _common = require("@nestjs/common");
const _jwt = require("@nestjs/jwt");
const _crypto = require("crypto");
const _jsonwebtoken = /*#__PURE__*/ _interop_require_wildcard(require("jsonwebtoken"));
const _passportjwt = require("passport-jwt");
const _utils = require("twenty-shared/utils");
const _zod = require("zod");
const _authexception = require("../../auth/auth.exception");
const _authcontexttype = require("../../auth/types/auth-context.type");
const _jwtalgorithmconstant = require("../constants/jwt-algorithm.constant");
const _jwtkeymanagerservice = require("./jwt-key-manager.service");
const _signingkeyverifycounterservice = require("./signing-key-verify-counter.service");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
const _decodejwtheaderutil = require("../utils/decode-jwt-header.util");
const _decodejwtpayloadutil = require("../utils/decode-jwt-payload.util");
const _isasymmetricjwtheaderutil = require("../utils/is-asymmetric-jwt-header.util");
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
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
const APP_SECRET_BODY_WORKSPACE_SCHEMA = _zod.z.object({
    workspaceId: _zod.z.string().min(1)
});
const APP_SECRET_BODY_USER_SCHEMA = _zod.z.object({
    userId: _zod.z.string().min(1)
});
let JwtWrapperService = class JwtWrapperService {
    async signAsyncOrThrow(payload, options) {
        const signingKey = await this.jwtKeyManagerService.getCurrentSigningKey();
        if (!(0, _utils.isDefined)(signingKey)) {
            throw new _authexception.AuthException('No active signing key available to sign asymmetric token', _authexception.AuthExceptionCode.INTERNAL_SERVER_ERROR);
        }
        const signOptions = {
            expiresIn: options.expiresIn,
            algorithm: _jwtalgorithmconstant.JWT_ASYMMETRIC_ALGORITHM,
            keyid: signingKey.id,
            ...(0, _utils.isDefined)(options.jwtid) ? {
                jwtid: options.jwtid
            } : {}
        };
        return _jsonwebtoken.sign(payload, signingKey.privateKeyPem, signOptions);
    }
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    verify(token, options) {
        return this.jwtService.verify(token, options);
    }
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    decode(payload, options) {
        return this.jwtService.decode(payload, options);
    }
    async resolveVerificationKey(rawToken) {
        const header = (0, _decodejwtheaderutil.decodeJwtHeader)(rawToken);
        if ((0, _isasymmetricjwtheaderutil.isAsymmetricJwtHeader)(header)) {
            const publicKeyPem = await this.jwtKeyManagerService.getValidPublicKeyPemById(header.kid);
            if (!(0, _utils.isDefined)(publicKeyPem)) {
                throw new _authexception.AuthException('Token invalid.', _authexception.AuthExceptionCode.UNAUTHENTICATED);
            }
            return {
                key: publicKeyPem,
                algorithm: _jwtalgorithmconstant.JWT_ASYMMETRIC_ALGORITHM
            };
        }
        const payload = (0, _decodejwtpayloadutil.decodeJwtPayload)(rawToken);
        if (!(0, _utils.isDefined)(payload)) {
            throw new _authexception.AuthException('Token invalid.', _authexception.AuthExceptionCode.UNAUTHENTICATED);
        }
        const appSecretBody = this.extractAppSecretBody(payload);
        if (!(0, _utils.isDefined)(appSecretBody)) {
            throw new _authexception.AuthException('Invalid token type', _authexception.AuthExceptionCode.INVALID_JWT_TOKEN_TYPE);
        }
        return {
            key: this.generateAppSecret(payload.type, appSecretBody),
            algorithm: _jwtalgorithmconstant.JWT_LEGACY_ALGORITHM
        };
    }
    async verifyJwtToken(token, options) {
        const header = (0, _decodejwtheaderutil.decodeJwtHeader)(token);
        const payload = this.decode(token, {
            json: true
        });
        if (!(0, _utils.isDefined)(payload)) {
            throw new _authexception.AuthException('Token invalid.', _authexception.AuthExceptionCode.UNAUTHENTICATED);
        }
        const { key, algorithm } = await this.resolveVerificationKey(token);
        try {
            const verified = _jsonwebtoken.verify(token, key, {
                ...options,
                algorithms: [
                    algorithm
                ]
            });
            this.recordVerifyForAlgorithm(algorithm, header);
            return verified;
        } catch (error) {
            // API_KEY tokens created before 12/12/2025 were accidentally signed
            // with ACCESS type instead of API_KEY. Fall back to the legacy ACCESS
            // secret for backward compatibility.
            // See https://github.com/twentyhq/twenty/pull/16504
            if (payload.type === _authcontexttype.JwtTokenTypeEnum.API_KEY && algorithm === _jwtalgorithmconstant.JWT_LEGACY_ALGORITHM) {
                const appSecretBody = this.extractAppSecretBody(payload);
                if ((0, _utils.isDefined)(appSecretBody)) {
                    try {
                        const verified = _jsonwebtoken.verify(token, this.generateAppSecret(_authcontexttype.JwtTokenTypeEnum.ACCESS, appSecretBody), {
                            ...options,
                            algorithms: [
                                _jwtalgorithmconstant.JWT_LEGACY_ALGORITHM
                            ]
                        });
                        this.recordVerifyForAlgorithm(_jwtalgorithmconstant.JWT_LEGACY_ALGORITHM, header);
                        return verified;
                    } catch  {
                        throw this.toAuthException(error);
                    }
                }
            }
            throw this.toAuthException(error);
        }
    }
    generateAppSecret(type, appSecretBody) {
        const appSecret = this.twentyConfigService.get('APP_SECRET');
        if (!appSecret) {
            throw new Error('APP_SECRET is not set');
        }
        return (0, _crypto.createHash)('sha256').update(`${appSecret}${appSecretBody}${type}`).digest('hex');
    }
    extractJwtFromRequest() {
        return _passportjwt.ExtractJwt.fromAuthHeaderAsBearerToken();
    }
    recordVerifyForAlgorithm(algorithm, header) {
        if (algorithm === _jwtalgorithmconstant.JWT_ASYMMETRIC_ALGORITHM && (0, _isasymmetricjwtheaderutil.isAsymmetricJwtHeader)(header)) {
            this.signingKeyVerifyCounterService.recordKidVerify(header.kid);
            return;
        }
        this.signingKeyVerifyCounterService.recordLegacyVerify();
    }
    extractAppSecretBody(payload) {
        const workspaceParse = APP_SECRET_BODY_WORKSPACE_SCHEMA.safeParse(payload);
        if (workspaceParse.success) {
            return workspaceParse.data.workspaceId;
        }
        const userParse = APP_SECRET_BODY_USER_SCHEMA.safeParse(payload);
        if (userParse.success) {
            return userParse.data.userId;
        }
        return undefined;
    }
    toAuthException(error) {
        if (error instanceof _jsonwebtoken.TokenExpiredError) {
            return new _authexception.AuthException('Token has expired.', _authexception.AuthExceptionCode.UNAUTHENTICATED);
        }
        if (error instanceof _jsonwebtoken.JsonWebTokenError) {
            return new _authexception.AuthException('Token invalid.', _authexception.AuthExceptionCode.UNAUTHENTICATED);
        }
        return new _authexception.AuthException('Unknown token error.', _authexception.AuthExceptionCode.INVALID_INPUT);
    }
    constructor(jwtService, twentyConfigService, jwtKeyManagerService, signingKeyVerifyCounterService){
        this.jwtService = jwtService;
        this.twentyConfigService = twentyConfigService;
        this.jwtKeyManagerService = jwtKeyManagerService;
        this.signingKeyVerifyCounterService = signingKeyVerifyCounterService;
    }
};
JwtWrapperService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _jwt.JwtService === "undefined" ? Object : _jwt.JwtService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _jwtkeymanagerservice.JwtKeyManagerService === "undefined" ? Object : _jwtkeymanagerservice.JwtKeyManagerService,
        typeof _signingkeyverifycounterservice.SigningKeyVerifyCounterService === "undefined" ? Object : _signingkeyverifycounterservice.SigningKeyVerifyCounterService
    ])
], JwtWrapperService);

//# sourceMappingURL=jwt-wrapper.service.js.map