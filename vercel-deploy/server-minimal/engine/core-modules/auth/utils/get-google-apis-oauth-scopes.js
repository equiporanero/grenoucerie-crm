/** email, profile and openid permission can be called without the https://www.googleapis.com/auth/ prefix
 * see https://developers.google.com/identity/protocols/oauth2/scopes
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getGoogleApisOauthScopes", {
    enumerable: true,
    get: function() {
        return getGoogleApisOauthScopes;
    }
});
const getGoogleApisOauthScopes = ()=>{
    return [
        'email',
        'profile',
        'https://www.googleapis.com/auth/gmail.readonly',
        'https://www.googleapis.com/auth/calendar.events',
        'https://www.googleapis.com/auth/profile.emails.read',
        'https://www.googleapis.com/auth/gmail.send',
        'https://www.googleapis.com/auth/gmail.compose'
    ];
};

//# sourceMappingURL=get-google-apis-oauth-scopes.js.map