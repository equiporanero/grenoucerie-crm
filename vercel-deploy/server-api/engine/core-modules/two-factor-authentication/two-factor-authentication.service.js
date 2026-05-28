"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TwoFactorAuthenticationService", {
    enumerable: true,
    get: function() {
        return TwoFactorAuthenticationService;
    }
});
const _common = require("@nestjs/common");
const _otplib = require("otplib");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _authexception = require("../auth/auth.exception");
const _secretencryptionconstant = require("../secret-encryption/constants/secret-encryption.constant");
const _secretencryptionservice = require("../secret-encryption/secret-encryption.service");
const _twofactorauthenticationmethodentity = require("./entities/two-factor-authentication-method.entity");
const _totpstrategyconstants = require("./strategies/otp/totp/constants/totp.strategy.constants");
const _totpstrategy = require("./strategies/otp/totp/totp.strategy");
const _injectworkspacescopedrepositorydecorator = require("../../twenty-orm/workspace-scoped-repository/inject-workspace-scoped-repository.decorator");
const _workspacescopedrepository = require("../../twenty-orm/workspace-scoped-repository/workspace-scoped-repository");
const _userworkspaceservice = require("../user-workspace/user-workspace.service");
const _twofactorauthenticationexception = require("./two-factor-authentication.exception");
const _twofactorauthenticationvalidation = require("./two-factor-authentication.validation");
const _otpconstants = require("./strategies/otp/otp.constants");
const _simplesecretencryptionutil = require("./utils/simple-secret-encryption.util");
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
const PENDING_METHOD_REUSE_WINDOW_MS = 60 * 60 * 1000;
// TODO: drop this helper, the `simpleSecretEncryptionUtil` dep, and the legacy
// branch in `decryptStoredSecret` below once the 2.5 cross-upgrade window
// closes and every TOTP secret row has been backfilled to enc:v2 by the
// matching slow instance command.
const buildLegacyTotpCbcPurpose = (userId, workspaceId)=>`${userId}${workspaceId}otp-secret`;
let TwoFactorAuthenticationService = class TwoFactorAuthenticationService {
    async decryptStoredSecret({ storedSecret, userId, workspaceId }) {
        if (storedSecret.startsWith(_secretencryptionconstant.SECRET_ENCRYPTION_ENVELOPE_V2_PREFIX)) {
            return this.secretEncryptionService.decryptVersioned(storedSecret, {
                workspaceId
            });
        }
        return this.simpleSecretEncryptionUtil.decryptSecret(storedSecret, buildLegacyTotpCbcPurpose(userId, workspaceId));
    }
    /**
   * Validates two-factor authentication requirements for a workspace.
   *
   * @throws {AuthException} with TWO_FACTOR_AUTHENTICATION_VERIFICATION_REQUIRED if 2FA is set up and needs verification
   * @throws {AuthException} with TWO_FACTOR_AUTHENTICATION_PROVISION_REQUIRED if 2FA is enforced but not set up
   * @param targetWorkspace - The workspace to check 2FA requirements for
   * @param userTwoFactorAuthenticationMethods - Optional array of user's 2FA methods
   */ async validateTwoFactorAuthenticationRequirement(targetWorkspace, userTwoFactorAuthenticationMethods) {
        if (_twofactorauthenticationvalidation.twoFactorAuthenticationMethodsValidator.areDefined(userTwoFactorAuthenticationMethods) && _twofactorauthenticationvalidation.twoFactorAuthenticationMethodsValidator.areVerified(userTwoFactorAuthenticationMethods)) {
            throw new _authexception.AuthException('Two factor authentication verification required', _authexception.AuthExceptionCode.TWO_FACTOR_AUTHENTICATION_VERIFICATION_REQUIRED);
        } else if (targetWorkspace?.isTwoFactorAuthenticationEnforced) {
            throw new _authexception.AuthException('Two factor authentication setup required', _authexception.AuthExceptionCode.TWO_FACTOR_AUTHENTICATION_PROVISION_REQUIRED);
        }
    }
    async initiateStrategyConfiguration(userId, userEmail, workspaceId, workspaceDisplayName) {
        const userWorkspace = await this.userWorkspaceService.getUserWorkspaceForUserOrThrow({
            userId,
            workspaceId
        });
        const existing2FAMethod = await this.twoFactorAuthenticationMethodRepository.findOne(workspaceId, {
            where: {
                userWorkspace: {
                    id: userWorkspace.id
                },
                strategy: _types.TwoFactorAuthenticationStrategy.TOTP
            }
        });
        if (existing2FAMethod && existing2FAMethod.status !== 'PENDING') {
            throw new _twofactorauthenticationexception.TwoFactorAuthenticationException('A two factor authentication method has already been set. Please delete it and try again.', _twofactorauthenticationexception.TwoFactorAuthenticationExceptionCode.TWO_FACTOR_AUTHENTICATION_METHOD_ALREADY_PROVISIONED);
        }
        if (existing2FAMethod && existing2FAMethod.status === 'PENDING' && existing2FAMethod.createdAt && Date.now() - existing2FAMethod.createdAt.getTime() < PENDING_METHOD_REUSE_WINDOW_MS) {
            const existingSecret = await this.decryptStoredSecret({
                storedSecret: existing2FAMethod.secret,
                userId,
                workspaceId
            });
            const issuer = `Twenty${workspaceDisplayName ? ` - ${workspaceDisplayName}` : ''}`;
            const reuseUri = _otplib.authenticator.keyuri(userEmail, issuer, existingSecret);
            return reuseUri;
        }
        const { uri, context } = new _totpstrategy.TotpStrategy(_totpstrategyconstants.TOTP_DEFAULT_CONFIGURATION).initiate(userEmail, `Twenty${workspaceDisplayName ? ` - ${workspaceDisplayName}` : ''}`);
        const encryptedSecret = this.secretEncryptionService.encryptVersioned(context.secret, {
            workspaceId
        });
        await this.twoFactorAuthenticationMethodRepository.save(workspaceId, {
            id: existing2FAMethod?.id,
            userWorkspace: userWorkspace,
            secret: encryptedSecret,
            status: context.status,
            strategy: _types.TwoFactorAuthenticationStrategy.TOTP
        });
        return uri;
    }
    async validateStrategy(userId, token, workspaceId, twoFactorAuthenticationStrategy) {
        const userTwoFactorAuthenticationMethod = await this.twoFactorAuthenticationMethodRepository.findOne(workspaceId, {
            where: {
                strategy: twoFactorAuthenticationStrategy,
                userWorkspace: {
                    userId,
                    workspaceId
                }
            }
        });
        if (!(0, _utils.isDefined)(userTwoFactorAuthenticationMethod)) {
            throw new _twofactorauthenticationexception.TwoFactorAuthenticationException('Two Factor Authentication Method not found.', _twofactorauthenticationexception.TwoFactorAuthenticationExceptionCode.INVALID_CONFIGURATION);
        }
        if (!(0, _utils.isDefined)(userTwoFactorAuthenticationMethod.secret)) {
            throw new _twofactorauthenticationexception.TwoFactorAuthenticationException('Malformed Two Factor Authentication Method object', _twofactorauthenticationexception.TwoFactorAuthenticationExceptionCode.MALFORMED_DATABASE_OBJECT);
        }
        const originalSecret = await this.decryptStoredSecret({
            storedSecret: userTwoFactorAuthenticationMethod.secret,
            userId,
            workspaceId
        });
        const otpContext = {
            status: userTwoFactorAuthenticationMethod.status,
            secret: originalSecret
        };
        const validationResult = new _totpstrategy.TotpStrategy(_totpstrategyconstants.TOTP_DEFAULT_CONFIGURATION).validate(token, otpContext);
        if (!validationResult.isValid) {
            throw new _twofactorauthenticationexception.TwoFactorAuthenticationException('Invalid OTP', _twofactorauthenticationexception.TwoFactorAuthenticationExceptionCode.INVALID_OTP);
        }
        await this.twoFactorAuthenticationMethodRepository.save(workspaceId, {
            ...userTwoFactorAuthenticationMethod,
            status: _otpconstants.OTPStatus.VERIFIED
        });
    }
    async verifyTwoFactorAuthenticationMethodForAuthenticatedUser(userId, token, workspaceId) {
        await this.validateStrategy(userId, token, workspaceId, _types.TwoFactorAuthenticationStrategy.TOTP);
        return {
            success: true
        };
    }
    constructor(twoFactorAuthenticationMethodRepository, userWorkspaceService, secretEncryptionService, simpleSecretEncryptionUtil){
        this.twoFactorAuthenticationMethodRepository = twoFactorAuthenticationMethodRepository;
        this.userWorkspaceService = userWorkspaceService;
        this.secretEncryptionService = secretEncryptionService;
        this.simpleSecretEncryptionUtil = simpleSecretEncryptionUtil;
    }
};
TwoFactorAuthenticationService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _injectworkspacescopedrepositorydecorator.InjectWorkspaceScopedRepository)(_twofactorauthenticationmethodentity.TwoFactorAuthenticationMethodEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacescopedrepository.WorkspaceScopedRepository === "undefined" ? Object : _workspacescopedrepository.WorkspaceScopedRepository,
        typeof _userworkspaceservice.UserWorkspaceService === "undefined" ? Object : _userworkspaceservice.UserWorkspaceService,
        typeof _secretencryptionservice.SecretEncryptionService === "undefined" ? Object : _secretencryptionservice.SecretEncryptionService,
        typeof _simplesecretencryptionutil.SimpleSecretEncryptionUtil === "undefined" ? Object : _simplesecretencryptionutil.SimpleSecretEncryptionUtil
    ])
], TwoFactorAuthenticationService);

//# sourceMappingURL=two-factor-authentication.service.js.map