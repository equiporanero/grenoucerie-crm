"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MicrosoftAPIsAuthController", {
    enumerable: true,
    get: function() {
        return MicrosoftAPIsAuthController;
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
const _microsoftapisoauthexchangecodefortokenguard = require("../guards/microsoft-apis-oauth-exchange-code-for-token.guard");
const _microsoftapisoauthrequestcodeguard = require("../guards/microsoft-apis-oauth-request-code.guard");
const _microsoftapisservice = require("../services/microsoft-apis.service");
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
let MicrosoftAPIsAuthController = class MicrosoftAPIsAuthController {
    async MicrosoftAuth() {
        // As this method is protected by Microsoft Auth guard, it will trigger Microsoft SSO flow
        return;
    }
    async MicrosoftAuthGetAccessToken(req, res) {
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
            if (emails.length === 0) {
                throw new _authexception.AuthException('No email - Ask your Azure Entra Admin to add you one on top of your User Principal Name', _authexception.AuthExceptionCode.USER_NOT_FOUND);
            }
            const handle = emails[0].value;
            const connectedAccountId = await this.microsoftAPIsService.refreshMicrosoftRefreshToken({
                handle,
                userId,
                workspaceMemberId,
                workspaceId: workspaceId,
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
                pathname: _types.AppPath.Verify
            }));
        }
    }
    constructor(microsoftAPIsService, transientTokenService, twentyConfigService, workspaceDomainsService, onboardingService, guardRedirectService, workspaceRepository){
        this.microsoftAPIsService = microsoftAPIsService;
        this.transientTokenService = transientTokenService;
        this.twentyConfigService = twentyConfigService;
        this.workspaceDomainsService = workspaceDomainsService;
        this.onboardingService = onboardingService;
        this.guardRedirectService = guardRedirectService;
        this.workspaceRepository = workspaceRepository;
    }
};
_ts_decorate([
    (0, _common.Get)(),
    (0, _common.UseGuards)(_microsoftapisoauthrequestcodeguard.MicrosoftAPIsOauthRequestCodeGuard, _publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], MicrosoftAPIsAuthController.prototype, "MicrosoftAuth", null);
_ts_decorate([
    (0, _common.Get)('get-access-token'),
    (0, _common.UseGuards)(_microsoftapisoauthexchangecodefortokenguard.MicrosoftAPIsOauthExchangeCodeForTokenGuard, _publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Res)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _apisoauthrequesttype.APIsOAuthRequest === "undefined" ? Object : _apisoauthrequesttype.APIsOAuthRequest,
        typeof _express.Response === "undefined" ? Object : _express.Response
    ]),
    _ts_metadata("design:returntype", Promise)
], MicrosoftAPIsAuthController.prototype, "MicrosoftAuthGetAccessToken", null);
MicrosoftAPIsAuthController = _ts_decorate([
    (0, _common.Controller)('auth/microsoft-apis'),
    (0, _common.UseFilters)(_authrestapiexceptionfilter.AuthRestApiExceptionFilter),
    _ts_param(6, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _microsoftapisservice.MicrosoftAPIsService === "undefined" ? Object : _microsoftapisservice.MicrosoftAPIsService,
        typeof _transienttokenservice.TransientTokenService === "undefined" ? Object : _transienttokenservice.TransientTokenService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _workspacedomainsservice.WorkspaceDomainsService === "undefined" ? Object : _workspacedomainsservice.WorkspaceDomainsService,
        typeof _onboardingservice.OnboardingService === "undefined" ? Object : _onboardingservice.OnboardingService,
        typeof _guardredirectservice.GuardRedirectService === "undefined" ? Object : _guardredirectservice.GuardRedirectService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], MicrosoftAPIsAuthController);

//# sourceMappingURL=microsoft-apis-auth.controller.js.map