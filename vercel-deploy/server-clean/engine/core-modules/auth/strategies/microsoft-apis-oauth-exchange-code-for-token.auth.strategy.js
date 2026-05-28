"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MicrosoftAPIsOauthExchangeCodeForTokenStrategy", {
    enumerable: true,
    get: function() {
        return MicrosoftAPIsOauthExchangeCodeForTokenStrategy;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
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
let MicrosoftAPIsOauthExchangeCodeForTokenStrategy = class MicrosoftAPIsOauthExchangeCodeForTokenStrategy extends _microsoftapisoauthcommonauthstrategy.MicrosoftAPIsOauthCommonStrategy {
    async validate(request, accessToken, refreshToken, profile, done) {
        const { name, emails, photos } = profile;
        const state = (0, _utils.parseJson)(request.query.state);
        const user = {
            emails: emails ?? [],
            firstName: name?.givenName,
            lastName: name?.familyName,
            picture: photos?.[0]?.value ?? null,
            accessToken,
            refreshToken,
            transientToken: state?.transientToken ?? '',
            redirectLocation: state?.redirectLocation,
            calendarVisibility: state?.calendarVisibility,
            messageVisibility: state?.messageVisibility,
            skipMessageChannelConfiguration: state?.skipMessageChannelConfiguration
        };
        done(null, user);
    }
    constructor(twentyConfigService){
        super(twentyConfigService);
    }
};
MicrosoftAPIsOauthExchangeCodeForTokenStrategy = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], MicrosoftAPIsOauthExchangeCodeForTokenStrategy);

//# sourceMappingURL=microsoft-apis-oauth-exchange-code-for-token.auth.strategy.js.map