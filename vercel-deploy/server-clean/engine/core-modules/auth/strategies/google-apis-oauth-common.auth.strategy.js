"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GoogleAPIsOauthCommonStrategy", {
    enumerable: true,
    get: function() {
        return GoogleAPIsOauthCommonStrategy;
    }
});
const _passport = require("@nestjs/passport");
const _passportgoogleoauth20 = require("passport-google-oauth20");
const _getgoogleapisoauthscopes = require("../utils/get-google-apis-oauth-scopes");
let GoogleAPIsOauthCommonStrategy = class GoogleAPIsOauthCommonStrategy extends (0, _passport.PassportStrategy)(_passportgoogleoauth20.Strategy, 'google-apis') {
    constructor(twentyConfigService){
        const scopes = (0, _getgoogleapisoauthscopes.getGoogleApisOauthScopes)();
        super({
            clientID: twentyConfigService.get('AUTH_GOOGLE_CLIENT_ID'),
            clientSecret: twentyConfigService.get('AUTH_GOOGLE_CLIENT_SECRET'),
            callbackURL: twentyConfigService.get('AUTH_GOOGLE_APIS_CALLBACK_URL'),
            scope: scopes,
            passReqToCallback: true
        });
    }
};

//# sourceMappingURL=google-apis-oauth-common.auth.strategy.js.map