"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MicrosoftAPIsOauthExchangeCodeForTokenGuard", {
    enumerable: true,
    get: function() {
        return MicrosoftAPIsOauthExchangeCodeForTokenGuard;
    }
});
const _common = require("@nestjs/common");
const _passport = require("@nestjs/passport");
const _authexception = require("../auth.exception");
const _microsoftapisoauthexchangecodefortokenauthstrategy = require("../strategies/microsoft-apis-oauth-exchange-code-for-token.auth.strategy");
const _googleapissetrequestextraparamsutil = require("../utils/google-apis-set-request-extra-params.util");
const _guardredirectservice = require("../../guard-redirect/services/guard-redirect.service");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let MicrosoftAPIsOauthExchangeCodeForTokenGuard = class MicrosoftAPIsOauthExchangeCodeForTokenGuard extends (0, _passport.AuthGuard)('microsoft-apis') {
    async canActivate(context) {
        try {
            const request = context.switchToHttp().getRequest();
            const state = JSON.parse(request.query.state);
            if (!this.twentyConfigService.get('MESSAGING_PROVIDER_MICROSOFT_ENABLED') && !this.twentyConfigService.get('CALENDAR_PROVIDER_MICROSOFT_ENABLED')) {
                throw new _authexception.AuthException('Microsoft apis auth is not enabled', _authexception.AuthExceptionCode.MICROSOFT_API_AUTH_DISABLED);
            }
            new _microsoftapisoauthexchangecodefortokenauthstrategy.MicrosoftAPIsOauthExchangeCodeForTokenStrategy(this.twentyConfigService);
            (0, _googleapissetrequestextraparamsutil.setRequestExtraParams)(request, {
                transientToken: state.transientToken,
                redirectLocation: state.redirectLocation,
                calendarVisibility: state.calendarVisibility,
                messageVisibility: state.messageVisibility,
                skipMessageChannelConfiguration: state.skipMessageChannelConfiguration
            });
            return await super.canActivate(context);
        } catch (error) {
            this.guardRedirectService.dispatchErrorFromGuard(context, error?.oauthError?.statusCode === 403 ? new _authexception.AuthException(`Insufficient privileges to access this microsoft resource. Make sure you have the correct scopes or ask your admin to update your scopes. ${error?.message}`, _authexception.AuthExceptionCode.INSUFFICIENT_SCOPES) : error, this.guardRedirectService.getSubdomainAndCustomDomainFromContext(context));
            return false;
        }
    }
    constructor(guardRedirectService, twentyConfigService){
        super(), this.guardRedirectService = guardRedirectService, this.twentyConfigService = twentyConfigService;
    }
};
MicrosoftAPIsOauthExchangeCodeForTokenGuard = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _guardredirectservice.GuardRedirectService === "undefined" ? Object : _guardredirectservice.GuardRedirectService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], MicrosoftAPIsOauthExchangeCodeForTokenGuard);

//# sourceMappingURL=microsoft-apis-oauth-exchange-code-for-token.guard.js.map