/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SSOAuthController", {
    enumerable: true,
    get: function() {
        return SSOAuthController;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _nodesaml = require("@node-saml/node-saml");
const _express = require("express");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _authexception = require("../auth.exception");
const _authrestapiexceptionfilter = require("../filters/auth-rest-api-exception.filter");
const _enterprisefeaturesenabledguard = require("../guards/enterprise-features-enabled.guard");
const _oidcauthguard = require("../guards/oidc-auth.guard");
const _samlauthguard = require("../guards/saml-auth.guard");
const _authservice = require("../services/auth.service");
const _oidcauthstrategy = require("../strategies/oidc.auth.strategy");
const _samlauthstrategy = require("../strategies/saml.auth.strategy");
const _logintokenservice = require("../token/services/login-token.service");
const _workspacedomainsservice = require("../../domain/workspace-domains/services/workspace-domains.service");
const _guardredirectservice = require("../../guard-redirect/services/guard-redirect.service");
const _ssoservice = require("../../sso/services/sso.service");
const _workspacessoidentityproviderentity = require("../../sso/workspace-sso-identity-provider.entity");
const _userservice = require("../../user/services/user.service");
const _workspacetype = require("../../workspace/types/workspace.type");
const _nopermissionguard = require("../../../guards/no-permission.guard");
const _publicendpointguard = require("../../../guards/public-endpoint.guard");
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
let SSOAuthController = class SSOAuthController {
    async generateMetadata(req) {
        return (0, _nodesaml.generateServiceProviderMetadata)({
            wantAssertionsSigned: true,
            issuer: this.ssoService.buildIssuerURL({
                id: req.params.identityProviderId,
                type: _workspacessoidentityproviderentity.IdentityProviderType.SAML
            }),
            callbackUrl: this.ssoService.buildCallbackUrl({
                id: req.params.identityProviderId,
                type: _workspacessoidentityproviderentity.IdentityProviderType.SAML
            })
        });
    }
    async oidcAuth() {
        // As this method is protected by OIDC Auth guard, it will trigger OIDC SSO flow
        return;
    }
    async samlAuth() {
        // As this method is protected by SAML Auth guard, it will trigger SAML SSO flow
        return;
    }
    async oidcAuthCallback(req, res) {
        return await this.authCallback(req, res);
    }
    async samlAuthCallback(req, res) {
        try {
            return await this.authCallback(req, res);
        } catch (err) {
            return new _authexception.AuthException(err.message ?? 'Access denied', _authexception.AuthExceptionCode.OAUTH_ACCESS_DENIED);
        }
    }
    async authCallback(req, res) {
        const workspaceIdentityProvider = await this.workspaceSSOIdentityProviderRepository.findOne({
            where: {
                id: req.user.identityProviderId
            },
            relations: {
                workspace: true
            }
        });
        try {
            if (!workspaceIdentityProvider) {
                throw new _authexception.AuthException('Identity provider not found', _authexception.AuthExceptionCode.OAUTH_ACCESS_DENIED);
            }
            if (!req.user.email) {
                throw new _authexception.AuthException('Email not found from identity provider.', _authexception.AuthExceptionCode.OAUTH_ACCESS_DENIED);
            }
            const currentWorkspace = await this.authService.findWorkspaceForSignInUp({
                workspaceId: workspaceIdentityProvider.workspaceId,
                workspaceInviteHash: req.user.workspaceInviteHash,
                email: req.user.email,
                authProvider: _workspacetype.AuthProviderEnum.SSO
            });
            (0, _utils.assertIsDefinedOrThrow)(currentWorkspace, new _authexception.AuthException('Workspace not found', _authexception.AuthExceptionCode.OAUTH_ACCESS_DENIED));
            const oidcTokenClaims = 'oidcTokenClaims' in req.user ? req.user.oidcTokenClaims : undefined;
            const connectedAccountProvider = workspaceIdentityProvider.type === _workspacessoidentityproviderentity.IdentityProviderType.SAML ? _types.ConnectedAccountProvider.SAML : _types.ConnectedAccountProvider.OIDC;
            const { loginToken } = await this.generateLoginToken(req.user, currentWorkspace, {
                oidcTokenClaims,
                connectedAccountProvider
            });
            return res.redirect(this.authService.computeRedirectURI({
                loginToken: loginToken.token,
                workspace: currentWorkspace
            }));
        } catch (error) {
            return res.redirect(this.guardRedirectService.getRedirectErrorUrlAndCaptureExceptions({
                error,
                workspace: this.workspaceDomainsService.getSubdomainAndCustomDomainFromWorkspaceFallbackOnDefaultSubdomain(workspaceIdentityProvider?.workspace),
                pathname: _types.AppPath.Verify
            }));
        }
    }
    async generateLoginToken(payload, currentWorkspace, ssoContext) {
        const invitation = payload.email ? await this.authService.findInvitationForSignInUp({
            currentWorkspace,
            email: payload.email
        }) : undefined;
        const existingUser = await this.userService.findUserByEmail(payload.email);
        const { userData } = this.authService.formatUserDataPayload(payload, existingUser);
        await this.authService.checkAccessForSignIn({
            userData,
            invitation,
            workspaceInviteHash: payload.workspaceInviteHash,
            workspace: currentWorkspace
        });
        const { workspace, user } = await this.authService.signInUp({
            userData,
            workspace: currentWorkspace,
            invitation,
            authParams: {
                provider: _workspacetype.AuthProviderEnum.SSO
            }
        });
        if (ssoContext) {
            await this.authService.createSSOConnectedAccountIfFeatureFlagIsOn({
                workspaceId: workspace.id,
                userId: user.id,
                handle: payload.email.toLowerCase(),
                authProvider: _workspacetype.AuthProviderEnum.SSO,
                oidcTokenClaims: ssoContext.oidcTokenClaims,
                connectedAccountProvider: ssoContext.connectedAccountProvider
            });
        }
        return {
            workspace,
            loginToken: await this.loginTokenService.generateLoginToken(user.email, workspace.id, _workspacetype.AuthProviderEnum.SSO)
        };
    }
    constructor(loginTokenService, authService, guardRedirectService, workspaceDomainsService, userService, ssoService, workspaceSSOIdentityProviderRepository){
        this.loginTokenService = loginTokenService;
        this.authService = authService;
        this.guardRedirectService = guardRedirectService;
        this.workspaceDomainsService = workspaceDomainsService;
        this.userService = userService;
        this.ssoService = ssoService;
        this.workspaceSSOIdentityProviderRepository = workspaceSSOIdentityProviderRepository;
    }
};
_ts_decorate([
    (0, _common.Get)('saml/metadata/:identityProviderId'),
    (0, _common.UseGuards)(_enterprisefeaturesenabledguard.EnterpriseFeaturesEnabledGuard, _publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _common.Req)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], SSOAuthController.prototype, "generateMetadata", null);
_ts_decorate([
    (0, _common.Get)('oidc/login/:identityProviderId'),
    (0, _common.UseGuards)(_enterprisefeaturesenabledguard.EnterpriseFeaturesEnabledGuard, _oidcauthguard.OIDCAuthGuard, _publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], SSOAuthController.prototype, "oidcAuth", null);
_ts_decorate([
    (0, _common.Get)('saml/login/:identityProviderId'),
    (0, _common.UseGuards)(_enterprisefeaturesenabledguard.EnterpriseFeaturesEnabledGuard, _samlauthguard.SAMLAuthGuard, _publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], SSOAuthController.prototype, "samlAuth", null);
_ts_decorate([
    (0, _common.Get)('oidc/callback'),
    (0, _common.UseGuards)(_enterprisefeaturesenabledguard.EnterpriseFeaturesEnabledGuard, _oidcauthguard.OIDCAuthGuard, _publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Res)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _oidcauthstrategy.OIDCRequest === "undefined" ? Object : _oidcauthstrategy.OIDCRequest,
        typeof _express.Response === "undefined" ? Object : _express.Response
    ]),
    _ts_metadata("design:returntype", Promise)
], SSOAuthController.prototype, "oidcAuthCallback", null);
_ts_decorate([
    (0, _common.Post)('saml/callback/:identityProviderId'),
    (0, _common.UseGuards)(_enterprisefeaturesenabledguard.EnterpriseFeaturesEnabledGuard, _samlauthguard.SAMLAuthGuard, _publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Res)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _samlauthstrategy.SAMLRequest === "undefined" ? Object : _samlauthstrategy.SAMLRequest,
        typeof _express.Response === "undefined" ? Object : _express.Response
    ]),
    _ts_metadata("design:returntype", Promise)
], SSOAuthController.prototype, "samlAuthCallback", null);
SSOAuthController = _ts_decorate([
    (0, _common.Controller)('auth'),
    (0, _common.UseFilters)(_authrestapiexceptionfilter.AuthRestApiExceptionFilter),
    _ts_param(6, (0, _typeorm.InjectRepository)(_workspacessoidentityproviderentity.WorkspaceSSOIdentityProviderEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _logintokenservice.LoginTokenService === "undefined" ? Object : _logintokenservice.LoginTokenService,
        typeof _authservice.AuthService === "undefined" ? Object : _authservice.AuthService,
        typeof _guardredirectservice.GuardRedirectService === "undefined" ? Object : _guardredirectservice.GuardRedirectService,
        typeof _workspacedomainsservice.WorkspaceDomainsService === "undefined" ? Object : _workspacedomainsservice.WorkspaceDomainsService,
        typeof _userservice.UserService === "undefined" ? Object : _userservice.UserService,
        typeof _ssoservice.SSOService === "undefined" ? Object : _ssoservice.SSOService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], SSOAuthController);

//# sourceMappingURL=sso-auth.controller.js.map