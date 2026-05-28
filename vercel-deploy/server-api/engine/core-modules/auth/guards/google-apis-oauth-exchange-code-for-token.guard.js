"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GoogleAPIsOauthExchangeCodeForTokenGuard", {
    enumerable: true,
    get: function() {
        return GoogleAPIsOauthExchangeCodeForTokenGuard;
    }
});
const _common = require("@nestjs/common");
const _passport = require("@nestjs/passport");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _authexception = require("../auth.exception");
const _googleapisoauthexchangecodefortokenauthstrategy = require("../strategies/google-apis-oauth-exchange-code-for-token.auth.strategy");
const _transienttokenservice = require("../token/services/transient-token.service");
const _googleapissetrequestextraparamsutil = require("../utils/google-apis-set-request-extra-params.util");
const _workspacedomainsservice = require("../../domain/workspace-domains/services/workspace-domains.service");
const _guardredirectservice = require("../../guard-redirect/services/guard-redirect.service");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
const _workspaceentity = require("../../workspace/workspace.entity");
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
let GoogleAPIsOauthExchangeCodeForTokenGuard = class GoogleAPIsOauthExchangeCodeForTokenGuard extends (0, _passport.AuthGuard)('google-apis') {
    async canActivate(context) {
        try {
            const request = context.switchToHttp().getRequest();
            const state = JSON.parse(request.query.state);
            if (!this.twentyConfigService.get('MESSAGING_PROVIDER_GMAIL_ENABLED') && !this.twentyConfigService.get('CALENDAR_PROVIDER_GOOGLE_ENABLED')) {
                throw new _authexception.AuthException('Google apis auth is not enabled', _authexception.AuthExceptionCode.GOOGLE_API_AUTH_DISABLED);
            }
            await this.transientTokenService.verifyTransientToken(state.transientToken);
            new _googleapisoauthexchangecodefortokenauthstrategy.GoogleAPIsOauthExchangeCodeForTokenStrategy(this.twentyConfigService);
            (0, _googleapissetrequestextraparamsutil.setRequestExtraParams)(request, {
                transientToken: state.transientToken,
                redirectLocation: state.redirectLocation,
                calendarVisibility: state.calendarVisibility,
                messageVisibility: state.messageVisibility,
                skipMessageChannelConfiguration: state.skipMessageChannelConfiguration
            });
            return await super.canActivate(context);
        } catch (err) {
            if (err.status === 401) {
                const request = context.switchToHttp().getRequest();
                const state = JSON.parse(request.query.state);
                const workspace = await this.getWorkspaceFromTransientToken(state.transientToken);
                const redirectErrorUrl = this.workspaceDomainsService.computeWorkspaceRedirectErrorUrl('We cannot connect to your Google account, please try again with more permissions, or a valid account', {
                    subdomain: workspace.subdomain,
                    customDomain: workspace.customDomain,
                    isCustomDomainEnabled: workspace.isCustomDomainEnabled ?? false
                }, '/settings/accounts');
                context.switchToHttp().getResponse().redirect(redirectErrorUrl);
                return false;
            }
            this.guardRedirectService.dispatchErrorFromGuard(context, err, this.guardRedirectService.getSubdomainAndCustomDomainFromContext(context));
            return false;
        }
    }
    async getWorkspaceFromTransientToken(transientToken) {
        const { workspaceId } = await this.transientTokenService.verifyTransientToken(transientToken);
        const workspace = await this.workspaceRepository.findOneBy({
            id: workspaceId
        });
        if (!workspace) {
            throw new _authexception.AuthException(`Error extracting workspace from transientToken for Google APIs connect for ${workspaceId}`, _authexception.AuthExceptionCode.WORKSPACE_NOT_FOUND);
        }
        return workspace;
    }
    constructor(guardRedirectService, twentyConfigService, transientTokenService, workspaceRepository, workspaceDomainsService){
        super(), this.guardRedirectService = guardRedirectService, this.twentyConfigService = twentyConfigService, this.transientTokenService = transientTokenService, this.workspaceRepository = workspaceRepository, this.workspaceDomainsService = workspaceDomainsService;
    }
};
GoogleAPIsOauthExchangeCodeForTokenGuard = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(3, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _guardredirectservice.GuardRedirectService === "undefined" ? Object : _guardredirectservice.GuardRedirectService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _transienttokenservice.TransientTokenService === "undefined" ? Object : _transienttokenservice.TransientTokenService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _workspacedomainsservice.WorkspaceDomainsService === "undefined" ? Object : _workspacedomainsservice.WorkspaceDomainsService
    ])
], GoogleAPIsOauthExchangeCodeForTokenGuard);

//# sourceMappingURL=google-apis-oauth-exchange-code-for-token.guard.js.map