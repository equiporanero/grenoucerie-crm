"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MicrosoftAPIsOauthRequestCodeStrategy", {
    enumerable: true,
    get: function() {
        return MicrosoftAPIsOauthRequestCodeStrategy;
    }
});
const _common = require("@nestjs/common");
const _microsoftapisoauthcommonauthstrategy = require("./microsoft-apis-oauth-common.auth.strategy");
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
let MicrosoftAPIsOauthRequestCodeStrategy = class MicrosoftAPIsOauthRequestCodeStrategy extends _microsoftapisoauthcommonauthstrategy.MicrosoftAPIsOauthCommonStrategy {
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    authenticate(req, options) {
        options = {
            ...options,
            accessType: 'offline',
            prompt: 'select_account',
            loginHint: req.params.loginHint,
            state: JSON.stringify({
                transientToken: req.params.transientToken,
                redirectLocation: req.params.redirectLocation,
                calendarVisibility: req.params.calendarVisibility,
                messageVisibility: req.params.messageVisibility,
                skipMessageChannelConfiguration: req.params.skipMessageChannelConfiguration
            })
        };
        return super.authenticate(req, options);
    }
    async validate(_request, _accessToken, _refreshToken, _profile, done) {
        // This strategy is only used for requesting authorization code
        // No validation is performed here
        done(null, {});
    }
    constructor(twentyConfigService){
        super(twentyConfigService);
    }
};
MicrosoftAPIsOauthRequestCodeStrategy = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], MicrosoftAPIsOauthRequestCodeStrategy);

//# sourceMappingURL=microsoft-apis-oauth-request-code.auth.strategy.js.map