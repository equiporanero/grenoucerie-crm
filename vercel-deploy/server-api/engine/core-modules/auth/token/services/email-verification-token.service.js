"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EmailVerificationTokenService", {
    enumerable: true,
    get: function() {
        return EmailVerificationTokenService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _crypto = /*#__PURE__*/ _interop_require_default(require("crypto"));
const _utils = require("twenty-shared/utils");
const _datefns = require("date-fns");
const _ms = /*#__PURE__*/ _interop_require_default(require("ms"));
const _typeorm1 = require("typeorm");
const _apptokenentity = require("../../../app-token/app-token.entity");
const _emailverificationexception = require("../../../email-verification/email-verification.exception");
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
let EmailVerificationTokenService = class EmailVerificationTokenService {
    async generateToken(userId, email) {
        const expiresIn = this.twentyConfigService.get('EMAIL_VERIFICATION_TOKEN_EXPIRES_IN');
        const expiresAt = (0, _datefns.addMilliseconds)(new Date().getTime(), (0, _ms.default)(expiresIn));
        const plainToken = _crypto.default.randomBytes(32).toString('hex');
        const hashedToken = _crypto.default.createHash('sha256').update(plainToken).digest('hex');
        const verificationToken = this.appTokenRepository.create({
            userId,
            expiresAt,
            type: _apptokenentity.AppTokenType.EmailVerificationToken,
            value: hashedToken,
            context: {
                email
            }
        });
        await this.appTokenRepository.save(verificationToken);
        return {
            token: plainToken,
            expiresAt
        };
    }
    async validateEmailVerificationTokenOrThrow({ emailVerificationToken, email }) {
        const user = await this.userRepository.findOne({
            where: {
                email,
                isEmailVerified: true
            }
        });
        if ((0, _utils.isDefined)(user)) {
            throw new _emailverificationexception.EmailVerificationException('Email already verified', _emailverificationexception.EmailVerificationExceptionCode.EMAIL_ALREADY_VERIFIED);
        }
        const hashedToken = _crypto.default.createHash('sha256').update(emailVerificationToken).digest('hex');
        const appToken = await this.appTokenRepository.findOne({
            where: {
                value: hashedToken,
                type: _apptokenentity.AppTokenType.EmailVerificationToken
            },
            relations: [
                'user'
            ]
        });
        if (!appToken) {
            throw new _emailverificationexception.EmailVerificationException('Invalid email verification token', _emailverificationexception.EmailVerificationExceptionCode.INVALID_TOKEN);
        }
        if (appToken.type !== _apptokenentity.AppTokenType.EmailVerificationToken) {
            throw new _emailverificationexception.EmailVerificationException('Invalid email verification token type', _emailverificationexception.EmailVerificationExceptionCode.INVALID_APP_TOKEN_TYPE);
        }
        if (new Date() > appToken.expiresAt) {
            throw new _emailverificationexception.EmailVerificationException('Email verification token expired', _emailverificationexception.EmailVerificationExceptionCode.TOKEN_EXPIRED);
        }
        if (!appToken.context?.email) {
            throw new _emailverificationexception.EmailVerificationException('Email missing in email verification token context', _emailverificationexception.EmailVerificationExceptionCode.EMAIL_MISSING);
        }
        if (appToken.context?.email !== email) {
            throw new _emailverificationexception.EmailVerificationException('Email does not match token', _emailverificationexception.EmailVerificationExceptionCode.INVALID_EMAIL);
        }
        return appToken;
    }
    constructor(appTokenRepository, userRepository, twentyConfigService){
        this.appTokenRepository = appTokenRepository;
        this.userRepository = userRepository;
        this.twentyConfigService = twentyConfigService;
    }
};
EmailVerificationTokenService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_apptokenentity.AppTokenEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_userentity.UserEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], EmailVerificationTokenService);

//# sourceMappingURL=email-verification-token.service.js.map