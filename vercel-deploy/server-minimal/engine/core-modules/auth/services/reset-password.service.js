"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ResetPasswordService", {
    enumerable: true,
    get: function() {
        return ResetPasswordService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _crypto = /*#__PURE__*/ _interop_require_default(require("crypto"));
const _render = require("@react-email/render");
const _datefns = require("date-fns");
const _ms = /*#__PURE__*/ _interop_require_default(require("ms"));
const _twentyemails = require("twenty-emails");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _apptokenentity = require("../../app-token/app-token.entity");
const _authexception = require("../auth.exception");
const _workspacedomainsservice = require("../../domain/workspace-domains/services/workspace-domains.service");
const _emailservice = require("../../email/email.service");
const _i18nservice = require("../../i18n/i18n.service");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
const _userservice = require("../../user/services/user.service");
const _workspaceentity = require("../../workspace/workspace.entity");
const _workspaceexception = require("../../workspace/workspace.exception");
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
let ResetPasswordService = class ResetPasswordService {
    async generatePasswordResetToken(email, workspaceId) {
        const user = await this.userService.findUserByEmailOrThrow(email, new _authexception.AuthException('User not found', _authexception.AuthExceptionCode.INVALID_INPUT, {
            userFriendlyMessage: /*i18n*/ {
                id: "siJgSI",
                message: "User not found."
            }
        }));
        const targetWorkspaceId = workspaceId ?? await this.findFirstPasswordAuthEnabledWorkspaceIdOrThrow(user.id);
        const expiresIn = this.twentyConfigService.get('PASSWORD_RESET_TOKEN_EXPIRES_IN');
        if (!expiresIn) {
            throw new _authexception.AuthException('PASSWORD_RESET_TOKEN_EXPIRES_IN constant value not found', _authexception.AuthExceptionCode.INTERNAL_SERVER_ERROR);
        }
        const expiresAt = (0, _datefns.addMilliseconds)(new Date().getTime(), (0, _ms.default)(expiresIn));
        const existingToken = await this.appTokenRepository.findOne({
            where: {
                userId: user.id,
                type: _apptokenentity.AppTokenType.PasswordResetToken,
                expiresAt: (0, _typeorm1.MoreThan)(new Date()),
                revokedAt: (0, _typeorm1.IsNull)()
            }
        });
        if (existingToken) {
            const timeToWait = (0, _ms.default)((0, _datefns.differenceInMilliseconds)(existingToken.expiresAt, new Date()), {
                long: true
            });
            throw new _authexception.AuthException(`Token has already been generated. Please wait for ${timeToWait} to generate again.`, _authexception.AuthExceptionCode.INVALID_INPUT, {
                userFriendlyMessage: /*i18n*/ {
                    id: "cd6AP5",
                    message: "Password reset token has already been generated. Please wait for {timeToWait} to generate again.",
                    values: {
                        timeToWait: timeToWait
                    }
                }
            });
        }
        const plainResetToken = _crypto.default.randomBytes(32).toString('hex');
        const hashedResetToken = _crypto.default.createHash('sha256').update(plainResetToken).digest('hex');
        await this.appTokenRepository.save({
            userId: user.id,
            workspaceId: targetWorkspaceId,
            value: hashedResetToken,
            expiresAt,
            type: _apptokenentity.AppTokenType.PasswordResetToken
        });
        return {
            workspaceId: targetWorkspaceId,
            passwordResetToken: plainResetToken,
            passwordResetTokenExpiresAt: expiresAt
        };
    }
    async sendEmailPasswordResetLink({ resetToken, email, locale }) {
        const user = await this.userService.findUserByEmailOrThrow(email, new _authexception.AuthException('User not found', _authexception.AuthExceptionCode.INVALID_INPUT));
        const hasPassword = (0, _utils.isDefined)(user.passwordHash);
        const resetPasswordPath = (0, _utils.getAppPath)(_types.AppPath.ResetPassword, {
            passwordResetToken: resetToken.passwordResetToken
        });
        const workspace = await this.workspaceRepository.findOneBy({
            id: resetToken.workspaceId
        });
        (0, _utils.assertIsDefinedOrThrow)(workspace, _workspaceexception.WorkspaceNotFoundDefaultError);
        const link = this.workspaceDomainsService.buildWorkspaceURL({
            workspace,
            pathname: resetPasswordPath
        });
        const emailData = {
            link: link.toString(),
            duration: (0, _ms.default)((0, _datefns.differenceInMilliseconds)(resetToken.passwordResetTokenExpiresAt, new Date()), {
                long: true
            }),
            hasPassword,
            locale
        };
        const emailTemplate = (0, _twentyemails.PasswordResetLinkEmail)(emailData);
        const html = await (0, _render.render)(emailTemplate, {
            pretty: true
        });
        const text = await (0, _render.render)(emailTemplate, {
            plainText: true
        });
        const i18n = this.i18nService.getI18nInstance(locale);
        const subjectTemplate = hasPassword ? /*i18n*/ {
            id: "j0DfGR",
            message: "Action Needed to Reset Password"
        } : /*i18n*/ {
            id: "8Q5bRY",
            message: "Action Needed to Set Password"
        };
        const subject = i18n._(subjectTemplate);
        await this.emailService.send({
            from: `${this.twentyConfigService.get('EMAIL_FROM_NAME')} <${this.twentyConfigService.get('EMAIL_FROM_ADDRESS')}>`,
            to: user.email,
            subject,
            text,
            html
        });
        return {
            success: true
        };
    }
    async validatePasswordResetToken(resetToken) {
        const hashedResetToken = _crypto.default.createHash('sha256').update(resetToken).digest('hex');
        const token = await this.appTokenRepository.findOne({
            where: {
                value: hashedResetToken,
                type: _apptokenentity.AppTokenType.PasswordResetToken,
                expiresAt: (0, _typeorm1.MoreThan)(new Date()),
                revokedAt: (0, _typeorm1.IsNull)()
            }
        });
        if (!token || !token.userId) {
            throw new _authexception.AuthException('Token is invalid', _authexception.AuthExceptionCode.FORBIDDEN_EXCEPTION);
        }
        const user = await this.userService.findUserByIdOrThrow(token.userId, new _authexception.AuthException('User not found', _authexception.AuthExceptionCode.INVALID_INPUT));
        return {
            id: user.id,
            email: user.email,
            hasPassword: (0, _utils.isDefined)(user.passwordHash)
        };
    }
    async invalidatePasswordResetToken(userId) {
        const user = await this.userService.findUserByIdOrThrow(userId, new _authexception.AuthException('User not found', _authexception.AuthExceptionCode.INVALID_INPUT));
        await this.appTokenRepository.update({
            userId: user.id,
            type: _apptokenentity.AppTokenType.PasswordResetToken
        }, {
            revokedAt: new Date()
        });
        return {
            success: true
        };
    }
    async findFirstPasswordAuthEnabledWorkspaceIdOrThrow(userId) {
        const workspace = await this.workspaceRepository.findOne({
            where: {
                workspaceUsers: {
                    user: {
                        id: userId
                    }
                },
                isPasswordAuthEnabled: true
            },
            order: {
                createdAt: 'ASC'
            }
        });
        if (!(0, _utils.isDefined)(workspace)) {
            throw new _authexception.AuthException('No password auth enabled workspace found', _authexception.AuthExceptionCode.INVALID_INPUT, {
                userFriendlyMessage: /*i18n*/ {
                    id: "AzXrd9",
                    message: "No workspace found with password auth enabled."
                }
            });
        }
        return workspace.id;
    }
    constructor(twentyConfigService, workspaceDomainsService, workspaceRepository, appTokenRepository, emailService, i18nService, userService){
        this.twentyConfigService = twentyConfigService;
        this.workspaceDomainsService = workspaceDomainsService;
        this.workspaceRepository = workspaceRepository;
        this.appTokenRepository = appTokenRepository;
        this.emailService = emailService;
        this.i18nService = i18nService;
        this.userService = userService;
    }
};
ResetPasswordService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(2, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_apptokenentity.AppTokenEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _workspacedomainsservice.WorkspaceDomainsService === "undefined" ? Object : _workspacedomainsservice.WorkspaceDomainsService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _emailservice.EmailService === "undefined" ? Object : _emailservice.EmailService,
        typeof _i18nservice.I18nService === "undefined" ? Object : _i18nservice.I18nService,
        typeof _userservice.UserService === "undefined" ? Object : _userservice.UserService
    ])
], ResetPasswordService);

//# sourceMappingURL=reset-password.service.js.map