"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GoogleAPIScopesService", {
    enumerable: true,
    get: function() {
        return GoogleAPIScopesService;
    }
});
const _common = require("@nestjs/common");
const _authexception = require("../auth.exception");
const _googleapisscopesserviceutil = require("./google-apis-scopes.service.util");
const _getgoogleapisoauthscopes = require("../utils/get-google-apis-oauth-scopes");
const _securehttpclientservice = require("../../secure-http-client/secure-http-client.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let GoogleAPIScopesService = class GoogleAPIScopesService {
    async getScopesFromGoogleAccessTokenAndCheckIfExpectedScopesArePresent(accessToken) {
        try {
            const httpClient = this.secureHttpClientService.getHttpClient();
            const response = await httpClient.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`, {
                timeout: 600
            });
            const scopes = response.data.scope.split(' ');
            const expectedScopes = (0, _getgoogleapisoauthscopes.getGoogleApisOauthScopes)();
            return {
                scopes,
                isValid: (0, _googleapisscopesserviceutil.includesExpectedScopes)(scopes, expectedScopes)
            };
        } catch  {
            throw new _authexception.AuthException('Google account connect error: cannot read scopes from token', _authexception.AuthExceptionCode.INSUFFICIENT_SCOPES);
        }
    }
    constructor(secureHttpClientService){
        this.secureHttpClientService = secureHttpClientService;
    }
};
GoogleAPIScopesService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _securehttpclientservice.SecureHttpClientService === "undefined" ? Object : _securehttpclientservice.SecureHttpClientService
    ])
], GoogleAPIScopesService);

//# sourceMappingURL=google-apis-scopes.js.map