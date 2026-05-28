"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GoogleAPIsOauthRequestCodeGuard", {
    enumerable: true,
    get: function() {
        return GoogleAPIsOauthRequestCodeGuard;
    }
});
const _common = require("@nestjs/common");
const _passport = require("@nestjs/passport");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _authexception = require("../auth.exception");
const _googleapisoauthrequestcodeauthstrategy = require("../strategies/google-apis-oauth-request-code.auth.strategy");
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
let GoogleAPIsOauthRequestCodeGuard = class GoogleAPIsOauthRequestCodeGuard extends (0, _passport.AuthGuard)('google-apis') {
    async canActivate(context) {
        let workspace = null;
        try {
            const request = context.switchToHttp().getRequest();
            const { workspaceId, userId } = await this.transientTokenService.verifyTransientToken(request.query.transientToken);
            workspace = await this.workspaceRepository.findOneBy({
                id: workspaceId
            });
            (0, _googleapissetrequestextraparamsutil.setRequestExtraParams)(request, {
                transientToken: request.query.transientToken,
                redirectLocation: request.query.redirectLocation,
                calendarVisibility: request.query.calendarVisibility,
                messageVisibility: request.query.messageVisibility,
                skipMessageChannelConfiguration: request.query.skipMessageChannelConfiguration,
                loginHint: request.query.loginHint,
                userId: userId,
                workspaceId: workspaceId
            });
            if (!this.twentyConfigService.get('MESSAGING_PROVIDER_GMAIL_ENABLED') && !this.twentyConfigService.get('CALENDAR_PROVIDER_GOOGLE_ENABLED')) {
                throw new _authexception.AuthException('Google apis auth is not enabled', _authexception.AuthExceptionCode.GOOGLE_API_AUTH_DISABLED);
            }
            new _googleapisoauthrequestcodeauthstrategy.GoogleAPIsOauthRequestCodeStrategy(this.twentyConfigService);
            return await super.canActivate(context);
        } catch (err) {
            this.guardRedirectService.dispatchErrorFromGuard(context, err, this.workspaceDomainsService.getSubdomainAndCustomDomainFromWorkspaceFallbackOnDefaultSubdomain(workspace));
            return false;
        }
    }
    constructor(twentyConfigService, transientTokenService, guardRedirectService, workspaceRepository, workspaceDomainsService){
        super({
            prompt: 'select_account'
        }), this.twentyConfigService = twentyConfigService, this.transientTokenService = transientTokenService, this.guardRedirectService = guardRedirectService, this.workspaceRepository = workspaceRepository, this.workspaceDomainsService = workspaceDomainsService;
    }
};
GoogleAPIsOauthRequestCodeGuard = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(3, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _transienttokenservice.TransientTokenService === "undefined" ? Object : _transienttokenservice.TransientTokenService,
        typeof _guardredirectservice.GuardRedirectService === "undefined" ? Object : _guardredirectservice.GuardRedirectService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _workspacedomainsservice.WorkspaceDomainsService === "undefined" ? Object : _workspacedomainsservice.WorkspaceDomainsService
    ])
], GoogleAPIsOauthRequestCodeGuard);

//# sourceMappingURL=google-apis-oauth-request-code.guard.js.map