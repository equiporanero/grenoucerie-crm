"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ConnectionProviderOAuthController", {
    enumerable: true,
    get: function() {
        return ConnectionProviderOAuthController;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _connectionprovideroauthflowservice = require("./connection-provider-oauth-flow.service");
const _connectionproviderexceptioncodeenum = require("./connection-provider-exception-code.enum");
const _connectionproviderexception = require("./connection-provider.exception");
const _connectionproviderservice = require("./connection-provider.service");
const _authexception = require("../../auth/auth.exception");
const _transienttokenservice = require("../../auth/token/services/transient-token.service");
const _workspacedomainsservice = require("../../domain/workspace-domains/services/workspace-domains.service");
const _guardredirectservice = require("../../guard-redirect/services/guard-redirect.service");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
const _userworkspaceentity = require("../../user-workspace/user-workspace.entity");
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
let ConnectionProviderOAuthController = class ConnectionProviderOAuthController {
    // Public endpoint — the transient token carries workspace + user context
    // so we don't need a session cookie here.
    async authorize(applicationId, providerName, transientToken, visibility, reconnectingConnectedAccountId, redirectLocation, res) {
        // Captured early so the error-redirect lands on the user's own
        // subdomain (different cookie domain otherwise = de-facto logout).
        let workspace = null;
        try {
            if (!applicationId || !providerName || !transientToken) {
                throw new _connectionproviderexception.ConnectionProviderException('Missing required query parameters: applicationId, providerName, transientToken', _connectionproviderexceptioncodeenum.ConnectionProviderExceptionCode.INVALID_REQUEST);
            }
            if (visibility !== undefined && visibility !== 'user' && visibility !== 'workspace') {
                throw new _connectionproviderexception.ConnectionProviderException(`Invalid visibility "${visibility}" — must be 'user' or 'workspace'`, _connectionproviderexceptioncodeenum.ConnectionProviderExceptionCode.INVALID_REQUEST);
            }
            const { userId, workspaceId } = await this.transientTokenService.verifyTransientToken(transientToken);
            if (!workspaceId || !userId) {
                throw new _authexception.AuthException('Workspace or user not found in transient token', _authexception.AuthExceptionCode.WORKSPACE_NOT_FOUND);
            }
            workspace = await this.workspaceRepository.findOneBy({
                id: workspaceId
            });
            if (!workspace) {
                throw new _authexception.AuthException(`Workspace ${workspaceId} not found`, _authexception.AuthExceptionCode.WORKSPACE_NOT_FOUND);
            }
            const provider = await this.oauthProviderService.findOneByApplicationAndName({
                applicationId,
                name: providerName
            });
            if (!provider) {
                throw new _connectionproviderexception.ConnectionProviderException(`OAuth provider "${providerName}" not found for application ${applicationId}`, _connectionproviderexceptioncodeenum.ConnectionProviderExceptionCode.PROVIDER_NOT_FOUND);
            }
            if (provider.workspaceId !== workspaceId) {
                throw new _connectionproviderexception.ConnectionProviderException('OAuth provider does not belong to the requesting workspace', _connectionproviderexceptioncodeenum.ConnectionProviderExceptionCode.FORBIDDEN);
            }
            const userWorkspace = await this.userWorkspaceRepository.findOne({
                where: {
                    userId,
                    workspaceId
                }
            });
            if (!(0, _utils.isDefined)(userWorkspace)) {
                throw new _authexception.AuthException(`UserWorkspace not found for user ${userId} in workspace ${workspaceId}`, _authexception.AuthExceptionCode.WORKSPACE_NOT_FOUND);
            }
            const { authorizationUrl } = await this.oauthProviderFlowService.startAuthorizationFlow({
                connectionProvider: provider,
                workspaceId,
                userId,
                userWorkspaceId: userWorkspace.id,
                visibility: visibility ?? 'user',
                reconnectingConnectedAccountId: reconnectingConnectedAccountId ?? null,
                redirectLocation: redirectLocation ?? null
            });
            return res.redirect(authorizationUrl);
        } catch (error) {
            // Without an explicit log, CustomException would 500 silently
            // (it doesn't extend HttpException, so Nest's default filter swallows it).
            this.logger.error(`OAuth authorize failed (applicationId=${applicationId}, providerName=${providerName}): ${error instanceof Error ? error.message : String(error)}`, error instanceof Error ? error.stack : undefined);
            return this.redirectToError(res, error, workspace);
        }
    }
    async callback(code, state, errorParam, errorDescription, res) {
        let workspace = null;
        if (errorParam) {
            return this.redirectToError(res, new Error(`OAuth provider returned error: ${errorParam}${errorDescription ? `: ${errorDescription}` : ''}`), workspace);
        }
        if (!code || !state) {
            return this.redirectToError(res, new Error('OAuth callback is missing the `code` or `state` query parameter'), workspace);
        }
        try {
            const { workspaceId, applicationId, redirectLocation } = await this.oauthProviderFlowService.completeAuthorizationFlow({
                code,
                state
            });
            workspace = await this.workspaceRepository.findOneBy({
                id: workspaceId
            });
            if (!workspace) {
                throw new _connectionproviderexception.ConnectionProviderException(`Workspace ${workspaceId} not found after OAuth callback`, _connectionproviderexceptioncodeenum.ConnectionProviderExceptionCode.PROVIDER_NOT_FOUND);
            }
            const pathname = redirectLocation || (0, _utils.getSettingsPath)(_types.SettingsPath.ApplicationDetail, {
                applicationId
            });
            const url = this.workspaceDomainsService.buildWorkspaceURL({
                workspace,
                pathname
            });
            // Frontend tab list reads the URL hash to pick the active tab.
            if (!redirectLocation) {
                url.hash = 'settings';
            }
            return res.redirect(url.toString());
        } catch (error) {
            return this.redirectToError(res, error, workspace);
        }
    }
    redirectToError(res, error, workspace) {
        return res.redirect(this.guardRedirectService.getRedirectErrorUrlAndCaptureExceptions({
            error: error instanceof Error ? error : new Error(String(error)),
            workspace: {
                id: workspace?.id,
                subdomain: workspace?.subdomain ?? this.twentyConfigService.get('DEFAULT_SUBDOMAIN'),
                customDomain: workspace?.customDomain ?? null
            },
            pathname: (0, _utils.getSettingsPath)(_types.SettingsPath.Accounts)
        }));
    }
    constructor(oauthProviderService, oauthProviderFlowService, transientTokenService, workspaceDomainsService, guardRedirectService, twentyConfigService, workspaceRepository, userWorkspaceRepository){
        this.oauthProviderService = oauthProviderService;
        this.oauthProviderFlowService = oauthProviderFlowService;
        this.transientTokenService = transientTokenService;
        this.workspaceDomainsService = workspaceDomainsService;
        this.guardRedirectService = guardRedirectService;
        this.twentyConfigService = twentyConfigService;
        this.workspaceRepository = workspaceRepository;
        this.userWorkspaceRepository = userWorkspaceRepository;
        this.logger = new _common.Logger(ConnectionProviderOAuthController.name);
    }
};
_ts_decorate([
    (0, _common.Get)('authorize'),
    _ts_param(0, (0, _common.Query)('applicationId')),
    _ts_param(1, (0, _common.Query)('providerName')),
    _ts_param(2, (0, _common.Query)('transientToken')),
    _ts_param(3, (0, _common.Query)('visibility')),
    _ts_param(4, (0, _common.Query)('reconnectingConnectedAccountId')),
    _ts_param(5, (0, _common.Query)('redirectLocation')),
    _ts_param(6, (0, _common.Res)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String,
        String,
        Object,
        Object,
        Object,
        typeof Response === "undefined" ? Object : Response
    ]),
    _ts_metadata("design:returntype", Promise)
], ConnectionProviderOAuthController.prototype, "authorize", null);
_ts_decorate([
    (0, _common.Get)('callback'),
    _ts_param(0, (0, _common.Query)('code')),
    _ts_param(1, (0, _common.Query)('state')),
    _ts_param(2, (0, _common.Query)('error')),
    _ts_param(3, (0, _common.Query)('error_description')),
    _ts_param(4, (0, _common.Res)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String,
        Object,
        Object,
        typeof Response === "undefined" ? Object : Response
    ]),
    _ts_metadata("design:returntype", Promise)
], ConnectionProviderOAuthController.prototype, "callback", null);
ConnectionProviderOAuthController = _ts_decorate([
    (0, _common.Controller)('apps/oauth'),
    (0, _common.UseGuards)(_publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(6, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_param(7, (0, _typeorm.InjectRepository)(_userworkspaceentity.UserWorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _connectionproviderservice.ConnectionProviderService === "undefined" ? Object : _connectionproviderservice.ConnectionProviderService,
        typeof _connectionprovideroauthflowservice.ConnectionProviderOAuthFlowService === "undefined" ? Object : _connectionprovideroauthflowservice.ConnectionProviderOAuthFlowService,
        typeof _transienttokenservice.TransientTokenService === "undefined" ? Object : _transienttokenservice.TransientTokenService,
        typeof _workspacedomainsservice.WorkspaceDomainsService === "undefined" ? Object : _workspacedomainsservice.WorkspaceDomainsService,
        typeof _guardredirectservice.GuardRedirectService === "undefined" ? Object : _guardredirectservice.GuardRedirectService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], ConnectionProviderOAuthController);

//# sourceMappingURL=connection-provider-oauth.controller.js.map