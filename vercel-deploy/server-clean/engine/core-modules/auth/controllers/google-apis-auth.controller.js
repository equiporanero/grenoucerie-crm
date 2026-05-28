"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GoogleAPIsAuthController", {
    enumerable: true,
    get: function() {
        return GoogleAPIsAuthController;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _express = require("express");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _authexception = require("../auth.exception");
const _authrestapiexceptionfilter = require("../filters/auth-rest-api-exception.filter");
const _googleapisoauthexchangecodefortokenguard = require("../guards/google-apis-oauth-exchange-code-for-token.guard");
const _googleapisoauthrequestcodeguard = require("../guards/google-apis-oauth-request-code.guard");
const _googleapisservice = require("../services/google-apis.service");
const _transienttokenservice = require("../token/services/transient-token.service");
const _apisoauthrequesttype = require("../types/apis-oauth-request.type");
const _workspacedomainsservice = require("../../domain/workspace-domains/services/workspace-domains.service");
const _guardredirectservice = require("../../guard-redirect/services/guard-redirect.service");
const _onboardingservice = require("../../onboarding/onboarding.service");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
const _workspaceentity = require("../../workspace/workspace.entity");
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
let GoogleAPIsAuthController = class GoogleAPIsAuthController {
    async googleAuth() {
        // As this method is protected by Google Auth guard, it will trigger Google SSO flow
        return;
    }
    async googleAuthGetAccessToken(req, res) {
        let workspace = null;
        try {
            const { user } = req;
            const { emails, accessToken, refreshToken, transientToken, redirectLocation, calendarVisibility, messageVisibility, skipMessageChannelConfiguration } = user;
            const { workspaceMemberId, userId, workspaceId } = await this.transientTokenService.verifyTransientToken(transientToken);
            if (!workspaceId) {
                throw new _authexception.AuthException('Workspace not found', _authexception.AuthExceptionCode.WORKSPACE_NOT_FOUND);
            }
            workspace = await this.workspaceRepository.findOneBy({
                id: workspaceId
            });
            const handle = emails[0].value;
            const connectedAccountId = await this.googleAPIsService.refreshGoogleRefreshToken({
                handle,
                userId,
                workspaceMemberId,
                workspaceId,
                accessToken,
                refreshToken,
                calendarVisibility,
                messageVisibility,
                skipMessageChannelConfiguration
            });
            if (userId) {
                await this.onboardingService.setOnboardingConnectAccountPending({
                    userId,
                    workspaceId,
                    value: false
                });
            }
            if (!workspace) {
                throw new _authexception.AuthException('Workspace not found', _authexception.AuthExceptionCode.WORKSPACE_NOT_FOUND);
            }
            const pathname = redirectLocation || (0, _utils.getSettingsPath)(_types.SettingsPath.AccountsConfiguration, {
                connectedAccountId
            });
            const url = this.workspaceDomainsService.buildWorkspaceURL({
                workspace,
                pathname
            });
            return res.redirect(url.toString());
        } catch (error) {
            return res.redirect(this.guardRedirectService.getRedirectErrorUrlAndCaptureExceptions({
                error,
                workspace: workspace ?? {
                    subdomain: this.twentyConfigService.get('DEFAULT_SUBDOMAIN'),
                    customDomain: null
                },
                pathname: (0, _utils.getSettingsPath)(_types.SettingsPath.Accounts)
            }));
        }
    }
    constructor(googleAPIsService, transientTokenService, twentyConfigService, onboardingService, workspaceDomainsService, guardRedirectService, workspaceRepository){
        this.googleAPIsService = googleAPIsService;
        this.transientTokenService = transientTokenService;
        this.twentyConfigService = twentyConfigService;
        this.onboardingService = onboardingService;
        this.workspaceDomainsService = workspaceDomainsService;
        this.guardRedirectService = guardRedirectService;
        this.workspaceRepository = workspaceRepository;
    }
};
_ts_decorate([
    (0, _common.Get)(),
    (0, _common.UseGuards)(_googleapisoauthrequestcodeguard.GoogleAPIsOauthRequestCodeGuard, _publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], GoogleAPIsAuthController.prototype, "googleAuth", null);
_ts_decorate([
    (0, _common.Get)('get-access-token'),
    (0, _common.UseGuards)(_googleapisoauthexchangecodefortokenguard.GoogleAPIsOauthExchangeCodeForTokenGuard, _publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Res)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _apisoauthrequesttype.APIsOAuthRequest === "undefined" ? Object : _apisoauthrequesttype.APIsOAuthRequest,
        typeof _express.Response === "undefined" ? Object : _express.Response
    ]),
    _ts_metadata("design:returntype", Promise)
], GoogleAPIsAuthController.prototype, "googleAuthGetAccessToken", null);
GoogleAPIsAuthController = _ts_decorate([
    (0, _common.Controller)('auth/google-apis'),
    (0, _common.UseFilters)(_authrestapiexceptionfilter.AuthRestApiExceptionFilter),
    _ts_param(6, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _googleapisservice.GoogleAPIsService === "undefined" ? Object : _googleapisservice.GoogleAPIsService,
        typeof _transienttokenservice.TransientTokenService === "undefined" ? Object : _transienttokenservice.TransientTokenService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _onboardingservice.OnboardingService === "undefined" ? Object : _onboardingservice.OnboardingService,
        typeof _workspacedomainsservice.WorkspaceDomainsService === "undefined" ? Object : _workspacedomainsservice.WorkspaceDomainsService,
        typeof _guardredirectservice.GuardRedirectService === "undefined" ? Object : _guardredirectservice.GuardRedirectService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], GoogleAPIsAuthController);

//# sourceMappingURL=google-apis-auth.controller.js.map