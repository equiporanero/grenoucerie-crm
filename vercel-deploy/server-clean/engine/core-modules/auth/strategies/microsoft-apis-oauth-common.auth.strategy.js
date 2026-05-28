"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MicrosoftAPIsOauthCommonStrategy", {
    enumerable: true,
    get: function() {
        return MicrosoftAPIsOauthCommonStrategy;
    }
});
const _passport = require("@nestjs/passport");
const _passportmicrosoft = require("passport-microsoft");
const _getmicrosoftapisoauthscopes = require("../utils/get-microsoft-apis-oauth-scopes");
let MicrosoftAPIsOauthCommonStrategy = class MicrosoftAPIsOauthCommonStrategy extends (0, _passport.PassportStrategy)(_passportmicrosoft.Strategy, 'microsoft-apis') {
    constructor(twentyConfigService){
        const scopes = (0, _getmicrosoftapisoauthscopes.getMicrosoftApisOauthScopes)();
        super({
            clientID: twentyConfigService.get('AUTH_MICROSOFT_CLIENT_ID'),
            clientSecret: twentyConfigService.get('AUTH_MICROSOFT_CLIENT_SECRET'),
            tenant: 'common',
            callbackURL: twentyConfigService.get('AUTH_MICROSOFT_APIS_CALLBACK_URL'),
            scope: scopes,
            passReqToCallback: true
        });
    }
};

//# sourceMappingURL=microsoft-apis-oauth-common.auth.strategy.js.map