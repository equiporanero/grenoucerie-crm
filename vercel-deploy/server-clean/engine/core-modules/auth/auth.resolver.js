"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthResolver", {
    enumerable: true,
    get: function() {
        return AuthResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _typeorm = require("@nestjs/typeorm");
const _lodashomit = /*#__PURE__*/ _interop_require_default(require("lodash.omit"));
const _constants = require("twenty-shared/constants");
const _translations = require("twenty-shared/translations");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _metadataresolverdecorator = require("../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _apikeyservice = require("../api-key/services/api-key.service");
const _apptokenentity = require("../app-token/app-token.entity");
const _auditservice = require("../audit/services/audit.service");
const _monitoring = require("../audit/utils/events/workspace-event/monitoring/monitoring");
const _authexception = require("./auth.exception");
const _apikeytokeninput = require("./dto/api-key-token.input");
const _apptokeninput = require("./dto/app-token.input");
const _authorizeappdto = require("./dto/authorize-app.dto");
const _authorizeappinput = require("./dto/authorize-app.input");
const _availableworkspacesandaccesstokensdto = require("./dto/available-workspaces-and-access-tokens.dto");
const _emailpasswordresetlinkdto = require("./dto/email-password-reset-link.dto");
const _emailpasswordresetlinkinput = require("./dto/email-password-reset-link.input");
const _getauthtokenfromemailverificationtokeninput = require("./dto/get-auth-token-from-email-verification-token.input");
const _getauthorizationurlforssodto = require("./dto/get-authorization-url-for-sso.dto");
const _getauthorizationurlforssoinput = require("./dto/get-authorization-url-for-sso.input");
const _invalidatepassworddto = require("./dto/invalidate-password.dto");
const _signupdto = require("./dto/sign-up.dto");
const _transienttokendto = require("./dto/transient-token.dto");
const _updatepasswordviaresettokeninput = require("./dto/update-password-via-reset-token.input");
const _validatepasswordresettokendto = require("./dto/validate-password-reset-token.dto");
const _validatepasswordresettokeninput = require("./dto/validate-password-reset-token.input");
const _verifyemailandgetlogintokendto = require("./dto/verify-email-and-get-login-token.dto");
const _authgraphqlapiexceptionfilter = require("./filters/auth-graphql-api-exception.filter");
const _resetpasswordservice = require("./services/reset-password.service");
const _signinupservice = require("./services/sign-in-up.service");
const _emailverificationtokenservice = require("./token/services/email-verification-token.service");
const _logintokenservice = require("./token/services/login-token.service");
const _refreshtokenservice = require("./token/services/refresh-token.service");
const _renewtokenservice = require("./token/services/renew-token.service");
const _transienttokenservice = require("./token/services/transient-token.service");
const _workspaceagnostictokenservice = require("./token/services/workspace-agnostic-token.service");
const _authcontexttype = require("./types/auth-context.type");
const _captchaguard = require("../captcha/captcha.guard");
const _captchagraphqlapiexceptionfilter = require("../captcha/filters/captcha-graphql-api-exception.filter");
const _workspacedomainsservice = require("../domain/workspace-domains/services/workspace-domains.service");
const _emailverificationexceptionfilterutil = require("../email-verification/email-verification-exception-filter.util");
const _emailverificationconstants = require("../email-verification/email-verification.constants");
const _emailverificationservice = require("../email-verification/services/email-verification.service");
const _preventnesttoautologgraphqlerrorsfilter = require("../graphql/filters/prevent-nest-to-auto-log-graphql-errors.filter");
const _resolvervalidationpipe = require("../graphql/pipes/resolver-validation.pipe");
const _i18ncontexttype = require("../i18n/types/i18n-context.type");
const _ssoservice = require("../sso/services/sso.service");
const _twofactorauthenticationverificationinput = require("../two-factor-authentication/dto/two-factor-authentication-verification.input");
const _twofactorauthenticationexceptionfilter = require("../two-factor-authentication/two-factor-authentication-exception.filter");
const _twofactorauthenticationservice = require("../two-factor-authentication/two-factor-authentication.service");
const _userworkspaceentity = require("../user-workspace/user-workspace.entity");
const _userworkspaceservice = require("../user-workspace/user-workspace.service");
const _userservice = require("../user/services/user.service");
const _workspacetype = require("../workspace/types/workspace.type");
const _workspaceentity = require("../workspace/workspace.entity");
const _authproviderdecorator = require("../../decorators/auth/auth-provider.decorator");
const _authuserdecorator = require("../../decorators/auth/auth-user.decorator");
const _authworkspacedecorator = require("../../decorators/auth/auth-workspace.decorator");
const _nopermissionguard = require("../../guards/no-permission.guard");
const _publicendpointguard = require("../../guards/public-endpoint.guard");
const _settingspermissionguard = require("../../guards/settings-permission.guard");
const _userauthguard = require("../../guards/user-auth.guard");
const _workspaceauthguard = require("../../guards/workspace-auth.guard");
const _permissionsservice = require("../../metadata-modules/permissions/permissions.service");
const _permissionsgraphqlapiexceptionfilter = require("../../metadata-modules/permissions/utils/permissions-graphql-api-exception.filter");
const _apikeytokendto = require("./dto/api-key-token.dto");
const _authtokensdto = require("./dto/auth-tokens.dto");
const _getauthtokensfromlogintokeninput = require("./dto/get-auth-tokens-from-login-token.input");
const _logintokendto = require("./dto/login-token.dto");
const _signupinput = require("./dto/sign-up.input");
const _usercredentialsinput = require("./dto/user-credentials.input");
const _userexistsdto = require("./dto/user-exists.dto");
const _userexistsinput = require("./dto/user-exists.input");
const _workspaceinvitehashvaliddto = require("./dto/workspace-invite-hash-valid.dto");
const _workspaceinvitehashinput = require("./dto/workspace-invite-hash.input");
const _authservice = require("./services/auth.service");
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
let AuthResolver = class AuthResolver {
    async checkUserExists(checkUserExistsInput) {
        return await this.authService.checkUserExists(checkUserExistsInput.email.toLowerCase());
    }
    async getAuthorizationUrlForSSO(params) {
        return await this.ssoService.getAuthorizationUrlForSSO(params.identityProviderId, (0, _lodashomit.default)(params, [
            'identityProviderId'
        ]));
    }
    async checkWorkspaceInviteHashIsValid(workspaceInviteHashValidInput) {
        return await this.authService.checkWorkspaceInviteHashIsValid(workspaceInviteHashValidInput.inviteHash);
    }
    async findWorkspaceFromInviteHash(workspaceInviteHashValidInput) {
        return await this.authService.findWorkspaceFromInviteHashOrFail(workspaceInviteHashValidInput.inviteHash);
    }
    async getLoginTokenFromCredentials(getLoginTokenFromCredentialsInput, origin) {
        const workspace = await this.workspaceDomainsService.getWorkspaceByOriginOrDefaultWorkspace(origin);
        (0, _utils.assertIsDefinedOrThrow)(workspace, new _authexception.AuthException('Workspace not found', _authexception.AuthExceptionCode.WORKSPACE_NOT_FOUND));
        const user = await this.authService.validateLoginWithPassword(getLoginTokenFromCredentialsInput, workspace);
        const loginToken = await this.loginTokenService.generateLoginToken(user.email, workspace.id, // email validation is active only for password flow
        _workspacetype.AuthProviderEnum.Password);
        return {
            loginToken
        };
    }
    async signIn(userCredentials) {
        const user = await this.authService.validateLoginWithPassword(userCredentials);
        const availableWorkspaces = await this.userWorkspaceService.findAvailableWorkspacesByEmail(user.email);
        return {
            availableWorkspaces: await this.userWorkspaceService.setLoginTokenToAvailableWorkspacesWhenAuthProviderMatch(availableWorkspaces, user, _workspacetype.AuthProviderEnum.Password),
            tokens: {
                accessOrWorkspaceAgnosticToken: await this.workspaceAgnosticTokenService.generateWorkspaceAgnosticToken({
                    userId: user.id,
                    authProvider: _workspacetype.AuthProviderEnum.Password
                }),
                refreshToken: await this.refreshTokenService.generateRefreshToken({
                    userId: user.id,
                    authProvider: _workspacetype.AuthProviderEnum.Password,
                    targetedTokenType: _authcontexttype.JwtTokenTypeEnum.WORKSPACE_AGNOSTIC
                })
            }
        };
    }
    async verifyEmailAndGetLoginToken(getAuthTokenFromEmailVerificationTokenInput, origin, authProvider) {
        const appToken = await this.emailVerificationTokenService.validateEmailVerificationTokenOrThrow(getAuthTokenFromEmailVerificationTokenInput);
        if (appToken.context?.email && appToken.context.email !== appToken.user.email) {
            await this.userService.updateEmailFromVerificationToken(appToken.user.id, appToken.context.email);
        }
        const user = await this.userService.markEmailAsVerified(appToken.user.id);
        await this.appTokenRepository.remove(appToken);
        const workspace = await this.workspaceDomainsService.getWorkspaceByOriginOrDefaultWorkspace(origin) ?? await this.userWorkspaceService.findFirstWorkspaceByUserId(user.id);
        const loginToken = await this.loginTokenService.generateLoginToken(user.email, workspace.id, authProvider);
        const workspaceUrls = this.workspaceDomainsService.getWorkspaceUrls(workspace);
        return {
            loginToken,
            workspaceUrls
        };
    }
    async verifyEmailAndGetWorkspaceAgnosticToken(getAuthTokenFromEmailVerificationTokenInput, authProvider) {
        const appToken = await this.emailVerificationTokenService.validateEmailVerificationTokenOrThrow(getAuthTokenFromEmailVerificationTokenInput);
        if (appToken.context?.email && appToken.context.email !== appToken.user.email) {
            await this.userService.updateEmailFromVerificationToken(appToken.user.id, appToken.context.email);
        }
        const user = await this.userService.markEmailAsVerified(appToken.user.id);
        await this.appTokenRepository.remove(appToken);
        const availableWorkspaces = await this.userWorkspaceService.findAvailableWorkspacesByEmail(user.email);
        return {
            availableWorkspaces: await this.userWorkspaceService.setLoginTokenToAvailableWorkspacesWhenAuthProviderMatch(availableWorkspaces, user, authProvider),
            tokens: {
                accessOrWorkspaceAgnosticToken: await this.workspaceAgnosticTokenService.generateWorkspaceAgnosticToken({
                    userId: user.id,
                    authProvider: _workspacetype.AuthProviderEnum.Password
                }),
                refreshToken: await this.refreshTokenService.generateRefreshToken({
                    userId: user.id,
                    authProvider: _workspacetype.AuthProviderEnum.Password,
                    targetedTokenType: _authcontexttype.JwtTokenTypeEnum.WORKSPACE_AGNOSTIC
                })
            }
        };
    }
    async getAuthTokensFromOTP(twoFactorAuthenticationVerificationInput, origin) {
        const { sub: email, authProvider } = await this.loginTokenService.verifyLoginToken(twoFactorAuthenticationVerificationInput.loginToken);
        const workspace = await this.workspaceDomainsService.getWorkspaceByOriginOrDefaultWorkspace(origin);
        (0, _utils.assertIsDefinedOrThrow)(workspace, new _authexception.AuthException('Workspace not found', _authexception.AuthExceptionCode.WORKSPACE_NOT_FOUND));
        const user = await this.userService.findUserByEmailOrThrow(email);
        await this.twoFactorAuthenticationService.validateStrategy(user.id, twoFactorAuthenticationVerificationInput.otp, workspace.id, _types.TwoFactorAuthenticationStrategy.TOTP);
        return await this.authService.verify(email, workspace.id, authProvider);
    }
    async signUp(signUpInput) {
        const user = await this.signInUpService.signUpWithoutWorkspace({
            email: signUpInput.email
        }, {
            provider: _workspacetype.AuthProviderEnum.Password,
            password: signUpInput.password
        });
        const availableWorkspaces = await this.userWorkspaceService.findAvailableWorkspacesByEmail(user.email);
        await this.emailVerificationService.sendVerificationEmail({
            userId: user.id,
            email: user.email,
            workspace: undefined,
            locale: signUpInput.locale ?? _translations.SOURCE_LOCALE,
            verifyEmailRedirectPath: signUpInput.verifyEmailRedirectPath,
            verificationTrigger: _emailverificationconstants.EmailVerificationTrigger.SIGN_UP
        });
        return {
            availableWorkspaces: await this.userWorkspaceService.setLoginTokenToAvailableWorkspacesWhenAuthProviderMatch(availableWorkspaces, user, _workspacetype.AuthProviderEnum.Password),
            tokens: {
                accessOrWorkspaceAgnosticToken: await this.workspaceAgnosticTokenService.generateWorkspaceAgnosticToken({
                    userId: user.id,
                    authProvider: _workspacetype.AuthProviderEnum.Password
                }),
                refreshToken: await this.refreshTokenService.generateRefreshToken({
                    userId: user.id,
                    authProvider: _workspacetype.AuthProviderEnum.Password,
                    targetedTokenType: _authcontexttype.JwtTokenTypeEnum.WORKSPACE_AGNOSTIC
                })
            }
        };
    }
    async signUpInWorkspace(signUpInput, authProvider) {
        const currentWorkspace = await this.authService.findWorkspaceForSignInUp({
            workspaceInviteHash: signUpInput.workspaceInviteHash,
            authProvider: _workspacetype.AuthProviderEnum.Password,
            workspaceId: signUpInput.workspaceId
        });
        const invitation = currentWorkspace && signUpInput.workspacePersonalInviteToken ? await this.authService.findInvitationForSignInUp({
            currentWorkspace,
            workspacePersonalInviteToken: signUpInput.workspacePersonalInviteToken
        }) : undefined;
        const existingUser = await this.userService.findUserByEmail(signUpInput.email);
        const { userData } = this.authService.formatUserDataPayload({
            email: signUpInput.email,
            locale: signUpInput.locale
        }, existingUser);
        await this.authService.checkAccessForSignIn({
            userData,
            invitation,
            workspaceInviteHash: signUpInput.workspaceInviteHash,
            workspace: currentWorkspace
        });
        const { user, workspace } = await this.authService.signInUp({
            userData,
            workspace: currentWorkspace,
            invitation,
            authParams: {
                provider: _workspacetype.AuthProviderEnum.Password,
                password: signUpInput.password
            }
        });
        await this.emailVerificationService.sendVerificationEmail({
            userId: user.id,
            email: user.email,
            workspace,
            locale: signUpInput.locale ?? _translations.SOURCE_LOCALE,
            verifyEmailRedirectPath: signUpInput.verifyEmailRedirectPath,
            verificationTrigger: _emailverificationconstants.EmailVerificationTrigger.SIGN_UP
        });
        const loginToken = await this.loginTokenService.generateLoginToken(user.email, workspace.id, authProvider);
        return {
            loginToken,
            workspace: {
                id: workspace.id,
                workspaceUrls: this.workspaceDomainsService.getWorkspaceUrls(workspace)
            }
        };
    }
    async signUpInNewWorkspace(currentUser, authProvider) {
        const fullUser = await this.userService.findUserByIdOrThrow(currentUser.id);
        const { user, workspace } = await this.signInUpService.signUpOnNewWorkspace({
            type: 'existingUser',
            existingUser: fullUser
        });
        const loginToken = await this.loginTokenService.generateLoginToken(user.email, workspace.id, authProvider);
        return {
            loginToken,
            workspace: {
                id: workspace.id,
                workspaceUrls: this.workspaceDomainsService.getWorkspaceUrls(workspace)
            }
        };
    }
    async generateTransientToken(user, workspace) {
        const workspaceMember = await this.userService.loadWorkspaceMember(user, workspace);
        if (!workspaceMember) {
            return;
        }
        const transientToken = await this.transientTokenService.generateTransientToken({
            workspaceId: workspace.id,
            userId: user.id,
            workspaceMemberId: workspaceMember.id
        });
        return {
            transientToken
        };
    }
    async getAuthTokensFromLoginToken(getAuthTokensFromLoginTokenInput, origin) {
        const tokenPayload = await this.validateAndDecodeLoginToken(getAuthTokensFromLoginTokenInput.loginToken);
        const workspace = await this.validateWorkspaceAccess(origin, tokenPayload.workspaceId);
        const { user, userWorkspace } = await this.validateUserAccess(tokenPayload.sub, tokenPayload.workspaceId);
        if (tokenPayload.authProvider === _workspacetype.AuthProviderEnum.Impersonation) {
            const { workspaceId, impersonatorUserWorkspaceId, impersonatedUserWorkspaceId, impersonatorUserId, impersonatedUserId } = await this.validateAndLogImpersonation(tokenPayload, workspace, user.email);
            return await this.authService.generateImpersonationAccessTokenAndRefreshToken({
                workspaceId,
                impersonatorUserWorkspaceId,
                impersonatedUserWorkspaceId,
                _impersonatorUserId: impersonatorUserId,
                impersonatedUserId
            });
        } else {
            await this.validateRegularAuthentication(workspace, userWorkspace);
            return await this.authService.verify(user.email, workspace.id, tokenPayload.authProvider);
        }
    }
    async validateAndDecodeLoginToken(loginToken) {
        return await this.loginTokenService.verifyLoginToken(loginToken);
    }
    async validateWorkspaceAccess(origin, tokenWorkspaceId) {
        const workspace = await this.workspaceDomainsService.getWorkspaceByOriginOrDefaultWorkspace(origin);
        (0, _utils.assertIsDefinedOrThrow)(workspace, new _authexception.AuthException('Workspace not found', _authexception.AuthExceptionCode.WORKSPACE_NOT_FOUND));
        if (tokenWorkspaceId !== workspace.id) {
            throw new _authexception.AuthException('Token is not valid for this workspace', _authexception.AuthExceptionCode.FORBIDDEN_EXCEPTION);
        }
        return workspace;
    }
    async validateUserAccess(email, workspaceId) {
        const user = await this.userService.findUserByEmailOrThrow(email);
        await this.authService.checkIsEmailVerified(user.isEmailVerified);
        const userWorkspace = await this.userWorkspaceService.getUserWorkspaceForUserOrThrow({
            userId: user.id,
            workspaceId
        });
        return {
            user,
            userWorkspace
        };
    }
    async validateRegularAuthentication(workspace, userWorkspace) {
        await this.twoFactorAuthenticationService.validateTwoFactorAuthenticationRequirement(workspace, userWorkspace.twoFactorAuthenticationMethods);
    }
    async validateAndLogImpersonation(tokenPayload, workspace, targetUserEmail) {
        const { impersonatorUserWorkspaceId } = tokenPayload;
        const impersonatorUserWorkspace = await this.userWorkspaceRepository.findOne({
            where: {
                id: impersonatorUserWorkspaceId
            },
            relations: [
                'user',
                'workspace'
            ]
        });
        const toImpersonateUserWorkspace = await this.userWorkspaceRepository.findOne({
            where: {
                user: {
                    email: targetUserEmail
                },
                workspaceId: workspace.id
            },
            relations: [
                'user',
                'workspace'
            ]
        });
        if (!(0, _utils.isDefined)(impersonatorUserWorkspace) || !(0, _utils.isDefined)(toImpersonateUserWorkspace)) {
            throw new _authexception.AuthException('Impersonator or target user workspace not found', _authexception.AuthExceptionCode.FORBIDDEN_EXCEPTION);
        }
        const isServerLevelImpersonation = toImpersonateUserWorkspace.workspace.id !== impersonatorUserWorkspace.workspace.id;
        const auditService = this.auditService.createContext({
            workspaceId: workspace.id,
            userId: impersonatorUserWorkspace.user.id
        });
        await auditService.insertWorkspaceEvent(_monitoring.MONITORING_EVENT, {
            eventName: `${isServerLevelImpersonation ? 'server' : 'workspace'}.impersonation.token_exchange_attempt`,
            message: `Impersonation token exchange attempt for ${targetUserEmail} by ${impersonatorUserWorkspace.user.id}`
        });
        const hasServerLevelImpersonatePermission = impersonatorUserWorkspace.user.canImpersonate === true && toImpersonateUserWorkspace.workspace.allowImpersonation === true;
        if (isServerLevelImpersonation) {
            if (!hasServerLevelImpersonatePermission) {
                await auditService.insertWorkspaceEvent(_monitoring.MONITORING_EVENT, {
                    eventName: 'server.impersonation.token_exchange_failed',
                    message: `Server level impersonation not allowed for ${targetUserEmail} by userId ${impersonatorUserWorkspace.user.id}`
                });
                throw new _authexception.AuthException('Server level impersonation not allowed on this workspace', _authexception.AuthExceptionCode.FORBIDDEN_EXCEPTION);
            }
            await auditService.insertWorkspaceEvent(_monitoring.MONITORING_EVENT, {
                eventName: `server.impersonation.token_exchange_success`,
                message: `Impersonation token exchanged for ${targetUserEmail} by userId ${impersonatorUserWorkspace.user.id}`
            });
            return {
                workspaceId: workspace.id,
                impersonatorUserWorkspaceId: impersonatorUserWorkspace.id,
                impersonatedUserWorkspaceId: toImpersonateUserWorkspace.id,
                impersonatorUserId: impersonatorUserWorkspace.user.id,
                impersonatedUserId: toImpersonateUserWorkspace.user.id
            };
        }
        const hasWorkspaceLevelImpersonatePermission = await this.permissionsService.userHasWorkspaceSettingPermission({
            userWorkspaceId: impersonatorUserWorkspace.id,
            setting: _constants.PermissionFlagType.IMPERSONATE,
            workspaceId: workspace.id
        });
        if (!hasWorkspaceLevelImpersonatePermission) {
            await auditService.insertWorkspaceEvent(_monitoring.MONITORING_EVENT, {
                eventName: 'workspace.impersonation.token_exchange_failed',
                message: `Impersonation not allowed for ${targetUserEmail} by userId ${impersonatorUserWorkspace.user.id}`
            });
            throw new _authexception.AuthException('Impersonation not allowed', _authexception.AuthExceptionCode.FORBIDDEN_EXCEPTION);
        }
        await auditService.insertWorkspaceEvent(_monitoring.MONITORING_EVENT, {
            eventName: 'workspace.impersonation.token_exchange_success',
            message: `Impersonation token exchanged for ${targetUserEmail} by userId ${impersonatorUserWorkspace.user.id}`
        });
        return {
            workspaceId: workspace.id,
            impersonatorUserWorkspaceId: impersonatorUserWorkspace.id,
            impersonatedUserWorkspaceId: toImpersonateUserWorkspace.id,
            impersonatorUserId: impersonatorUserWorkspace.user.id,
            impersonatedUserId: toImpersonateUserWorkspace.user.id
        };
    }
    async authorizeApp(authorizeAppInput, user, workspace) {
        return await this.authService.generateAuthorizationCode(authorizeAppInput, user, workspace);
    }
    async renewToken(args) {
        const tokens = await this.renewTokenService.generateTokensFromRefreshToken(args.appToken);
        return {
            tokens: tokens
        };
    }
    async generateApiKeyToken(args, { id: workspaceId }) {
        return await this.apiKeyService.generateApiKeyToken(workspaceId, args.apiKeyId, args.expiresAt);
    }
    async emailPasswordResetLink(emailPasswordResetInput, context) {
        const resetToken = await this.resetPasswordService.generatePasswordResetToken(emailPasswordResetInput.email, emailPasswordResetInput.workspaceId);
        return await this.resetPasswordService.sendEmailPasswordResetLink({
            resetToken,
            email: emailPasswordResetInput.email,
            locale: context.req.locale
        });
    }
    async updatePasswordViaResetToken({ passwordResetToken, newPassword }) {
        const { id } = await this.resetPasswordService.validatePasswordResetToken(passwordResetToken);
        await this.authService.updatePassword(id, newPassword);
        return await this.resetPasswordService.invalidatePasswordResetToken(id);
    }
    async validatePasswordResetToken(args) {
        return this.resetPasswordService.validatePasswordResetToken(args.passwordResetToken);
    }
    constructor(userWorkspaceRepository, appTokenRepository, twoFactorAuthenticationService, authService, renewTokenService, userService, apiKeyService, resetPasswordService, loginTokenService, workspaceAgnosticTokenService, refreshTokenService, signInUpService, transientTokenService, emailVerificationService, workspaceDomainsService, userWorkspaceService, emailVerificationTokenService, ssoService, auditService, permissionsService){
        this.userWorkspaceRepository = userWorkspaceRepository;
        this.appTokenRepository = appTokenRepository;
        this.twoFactorAuthenticationService = twoFactorAuthenticationService;
        this.authService = authService;
        this.renewTokenService = renewTokenService;
        this.userService = userService;
        this.apiKeyService = apiKeyService;
        this.resetPasswordService = resetPasswordService;
        this.loginTokenService = loginTokenService;
        this.workspaceAgnosticTokenService = workspaceAgnosticTokenService;
        this.refreshTokenService = refreshTokenService;
        this.signInUpService = signInUpService;
        this.transientTokenService = transientTokenService;
        this.emailVerificationService = emailVerificationService;
        this.workspaceDomainsService = workspaceDomainsService;
        this.userWorkspaceService = userWorkspaceService;
        this.emailVerificationTokenService = emailVerificationTokenService;
        this.ssoService = ssoService;
        this.auditService = auditService;
        this.permissionsService = permissionsService;
    }
};
_ts_decorate([
    (0, _common.UseGuards)(_captchaguard.CaptchaGuard, _publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    (0, _graphql.Query)(()=>_userexistsdto.CheckUserExistDTO),
    _ts_param(0, (0, _graphql.Args)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _userexistsinput.EmailAndCaptchaInput === "undefined" ? Object : _userexistsinput.EmailAndCaptchaInput
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthResolver.prototype, "checkUserExists", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_getauthorizationurlforssodto.GetAuthorizationUrlForSSODTO),
    (0, _common.UseGuards)(_publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _getauthorizationurlforssoinput.GetAuthorizationUrlForSSOInput === "undefined" ? Object : _getauthorizationurlforssoinput.GetAuthorizationUrlForSSOInput
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthResolver.prototype, "getAuthorizationUrlForSSO", null);
_ts_decorate([
    (0, _graphql.Query)(()=>_workspaceinvitehashvaliddto.WorkspaceInviteHashValidDTO),
    (0, _common.UseGuards)(_publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceinvitehashinput.WorkspaceInviteHashValidInput === "undefined" ? Object : _workspaceinvitehashinput.WorkspaceInviteHashValidInput
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthResolver.prototype, "checkWorkspaceInviteHashIsValid", null);
_ts_decorate([
    (0, _graphql.Query)(()=>_workspaceentity.WorkspaceEntity),
    (0, _common.UseGuards)(_publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceinvitehashinput.WorkspaceInviteHashValidInput === "undefined" ? Object : _workspaceinvitehashinput.WorkspaceInviteHashValidInput
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthResolver.prototype, "findWorkspaceFromInviteHash", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_logintokendto.LoginTokenDTO),
    (0, _common.UseGuards)(_captchaguard.CaptchaGuard, _publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)()),
    _ts_param(1, (0, _graphql.Args)('origin')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _usercredentialsinput.UserCredentialsInput === "undefined" ? Object : _usercredentialsinput.UserCredentialsInput,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthResolver.prototype, "getLoginTokenFromCredentials", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_availableworkspacesandaccesstokensdto.AvailableWorkspacesAndAccessTokensDTO),
    (0, _common.UseGuards)(_captchaguard.CaptchaGuard, _publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _usercredentialsinput.UserCredentialsInput === "undefined" ? Object : _usercredentialsinput.UserCredentialsInput
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthResolver.prototype, "signIn", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_verifyemailandgetlogintokendto.VerifyEmailAndGetLoginTokenDTO),
    (0, _common.UseGuards)(_publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)()),
    _ts_param(1, (0, _graphql.Args)('origin')),
    _ts_param(2, (0, _authproviderdecorator.AuthProvider)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _getauthtokenfromemailverificationtokeninput.GetAuthTokenFromEmailVerificationTokenInput === "undefined" ? Object : _getauthtokenfromemailverificationtokeninput.GetAuthTokenFromEmailVerificationTokenInput,
        String,
        typeof _workspacetype.AuthProviderEnum === "undefined" ? Object : _workspacetype.AuthProviderEnum
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthResolver.prototype, "verifyEmailAndGetLoginToken", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_availableworkspacesandaccesstokensdto.AvailableWorkspacesAndAccessTokensDTO),
    (0, _common.UseGuards)(_publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)()),
    _ts_param(1, (0, _authproviderdecorator.AuthProvider)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _getauthtokenfromemailverificationtokeninput.GetAuthTokenFromEmailVerificationTokenInput === "undefined" ? Object : _getauthtokenfromemailverificationtokeninput.GetAuthTokenFromEmailVerificationTokenInput,
        typeof _workspacetype.AuthProviderEnum === "undefined" ? Object : _workspacetype.AuthProviderEnum
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthResolver.prototype, "verifyEmailAndGetWorkspaceAgnosticToken", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_authtokensdto.AuthTokens),
    (0, _common.UseGuards)(_captchaguard.CaptchaGuard, _publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)()),
    _ts_param(1, (0, _graphql.Args)('origin')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twofactorauthenticationverificationinput.TwoFactorAuthenticationVerificationInput === "undefined" ? Object : _twofactorauthenticationverificationinput.TwoFactorAuthenticationVerificationInput,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthResolver.prototype, "getAuthTokensFromOTP", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_availableworkspacesandaccesstokensdto.AvailableWorkspacesAndAccessTokensDTO),
    (0, _common.UseGuards)(_captchaguard.CaptchaGuard, _publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _usercredentialsinput.UserCredentialsInput === "undefined" ? Object : _usercredentialsinput.UserCredentialsInput
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthResolver.prototype, "signUp", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_signupdto.SignUpDTO),
    (0, _common.UseGuards)(_captchaguard.CaptchaGuard, _publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)()),
    _ts_param(1, (0, _authproviderdecorator.AuthProvider)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _signupinput.SignUpInput === "undefined" ? Object : _signupinput.SignUpInput,
        typeof _workspacetype.AuthProviderEnum === "undefined" ? Object : _workspacetype.AuthProviderEnum
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthResolver.prototype, "signUpInWorkspace", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_signupdto.SignUpDTO),
    (0, _common.UseGuards)(_userauthguard.UserAuthGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _authuserdecorator.AuthUser)()),
    _ts_param(1, (0, _authproviderdecorator.AuthProvider)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _authcontexttype.AuthContextUser === "undefined" ? Object : _authcontexttype.AuthContextUser,
        typeof _workspacetype.AuthProviderEnum === "undefined" ? Object : _workspacetype.AuthProviderEnum
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthResolver.prototype, "signUpInNewWorkspace", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_transienttokendto.TransientTokenDTO),
    (0, _common.UseGuards)(_userauthguard.UserAuthGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _authuserdecorator.AuthUser)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _authcontexttype.AuthContextUser === "undefined" ? Object : _authcontexttype.AuthContextUser,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthResolver.prototype, "generateTransientToken", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_authtokensdto.AuthTokens),
    (0, _common.UseGuards)(_publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)()),
    _ts_param(1, (0, _graphql.Args)('origin')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _getauthtokensfromlogintokeninput.GetAuthTokensFromLoginTokenInput === "undefined" ? Object : _getauthtokensfromlogintokeninput.GetAuthTokensFromLoginTokenInput,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthResolver.prototype, "getAuthTokensFromLoginToken", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_authorizeappdto.AuthorizeAppDTO),
    (0, _common.UseGuards)(_userauthguard.UserAuthGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)()),
    _ts_param(1, (0, _authuserdecorator.AuthUser)()),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _authorizeappinput.AuthorizeAppInput === "undefined" ? Object : _authorizeappinput.AuthorizeAppInput,
        typeof _authcontexttype.AuthContextUser === "undefined" ? Object : _authcontexttype.AuthContextUser,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthResolver.prototype, "authorizeApp", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_authtokensdto.AuthTokens),
    (0, _common.UseGuards)(_publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _apptokeninput.AppTokenInput === "undefined" ? Object : _apptokeninput.AppTokenInput
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthResolver.prototype, "renewToken", null);
_ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.API_KEYS_AND_WEBHOOKS)),
    (0, _graphql.Mutation)(()=>_apikeytokendto.ApiKeyToken),
    _ts_param(0, (0, _graphql.Args)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _apikeytokeninput.ApiKeyTokenInput === "undefined" ? Object : _apikeytokeninput.ApiKeyTokenInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthResolver.prototype, "generateApiKeyToken", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_emailpasswordresetlinkdto.EmailPasswordResetLinkDTO),
    (0, _common.UseGuards)(_publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)()),
    _ts_param(1, (0, _graphql.Context)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _emailpasswordresetlinkinput.EmailPasswordResetLinkInput === "undefined" ? Object : _emailpasswordresetlinkinput.EmailPasswordResetLinkInput,
        typeof _i18ncontexttype.I18nContext === "undefined" ? Object : _i18ncontexttype.I18nContext
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthResolver.prototype, "emailPasswordResetLink", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_invalidatepassworddto.InvalidatePasswordDTO),
    (0, _common.UseGuards)(_publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _updatepasswordviaresettokeninput.UpdatePasswordViaResetTokenInput === "undefined" ? Object : _updatepasswordviaresettokeninput.UpdatePasswordViaResetTokenInput
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthResolver.prototype, "updatePasswordViaResetToken", null);
_ts_decorate([
    (0, _graphql.Query)(()=>_validatepasswordresettokendto.ValidatePasswordResetTokenDTO),
    (0, _common.UseGuards)(_publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _validatepasswordresettokeninput.ValidatePasswordResetTokenInput === "undefined" ? Object : _validatepasswordresettokeninput.ValidatePasswordResetTokenInput
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthResolver.prototype, "validatePasswordResetToken", null);
AuthResolver = _ts_decorate([
    (0, _common.UsePipes)(_resolvervalidationpipe.ResolverValidationPipe),
    (0, _metadataresolverdecorator.MetadataResolver)(),
    (0, _common.UseFilters)(_captchagraphqlapiexceptionfilter.CaptchaGraphqlApiExceptionFilter, _authgraphqlapiexceptionfilter.AuthGraphqlApiExceptionFilter, _permissionsgraphqlapiexceptionfilter.PermissionsGraphqlApiExceptionFilter, _emailverificationexceptionfilterutil.EmailVerificationExceptionFilter, _twofactorauthenticationexceptionfilter.TwoFactorAuthenticationExceptionFilter, _preventnesttoautologgraphqlerrorsfilter.PreventNestToAutoLogGraphqlErrorsFilter),
    _ts_param(0, (0, _typeorm.InjectRepository)(_userworkspaceentity.UserWorkspaceEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_apptokenentity.AppTokenEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _twofactorauthenticationservice.TwoFactorAuthenticationService === "undefined" ? Object : _twofactorauthenticationservice.TwoFactorAuthenticationService,
        typeof _authservice.AuthService === "undefined" ? Object : _authservice.AuthService,
        typeof _renewtokenservice.RenewTokenService === "undefined" ? Object : _renewtokenservice.RenewTokenService,
        typeof _userservice.UserService === "undefined" ? Object : _userservice.UserService,
        typeof _apikeyservice.ApiKeyService === "undefined" ? Object : _apikeyservice.ApiKeyService,
        typeof _resetpasswordservice.ResetPasswordService === "undefined" ? Object : _resetpasswordservice.ResetPasswordService,
        typeof _logintokenservice.LoginTokenService === "undefined" ? Object : _logintokenservice.LoginTokenService,
        typeof _workspaceagnostictokenservice.WorkspaceAgnosticTokenService === "undefined" ? Object : _workspaceagnostictokenservice.WorkspaceAgnosticTokenService,
        typeof _refreshtokenservice.RefreshTokenService === "undefined" ? Object : _refreshtokenservice.RefreshTokenService,
        typeof _signinupservice.SignInUpService === "undefined" ? Object : _signinupservice.SignInUpService,
        typeof _transienttokenservice.TransientTokenService === "undefined" ? Object : _transienttokenservice.TransientTokenService,
        typeof _emailverificationservice.EmailVerificationService === "undefined" ? Object : _emailverificationservice.EmailVerificationService,
        typeof _workspacedomainsservice.WorkspaceDomainsService === "undefined" ? Object : _workspacedomainsservice.WorkspaceDomainsService,
        typeof _userworkspaceservice.UserWorkspaceService === "undefined" ? Object : _userworkspaceservice.UserWorkspaceService,
        typeof _emailverificationtokenservice.EmailVerificationTokenService === "undefined" ? Object : _emailverificationtokenservice.EmailVerificationTokenService,
        typeof _ssoservice.SSOService === "undefined" ? Object : _ssoservice.SSOService,
        typeof _auditservice.AuditService === "undefined" ? Object : _auditservice.AuditService,
        typeof _permissionsservice.PermissionsService === "undefined" ? Object : _permissionsservice.PermissionsService
    ])
], AuthResolver);

//# sourceMappingURL=auth.resolver.js.map