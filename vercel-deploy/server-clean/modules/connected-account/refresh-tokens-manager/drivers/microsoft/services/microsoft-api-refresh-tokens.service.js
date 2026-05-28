"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MicrosoftAPIRefreshAccessTokenService", {
    enumerable: true,
    get: function() {
        return MicrosoftAPIRefreshAccessTokenService;
    }
});
const _common = require("@nestjs/common");
const _msalnode = require("@azure/msal-node");
const _twentyconfigservice = require("../../../../../../engine/core-modules/twenty-config/twenty-config.service");
const _connectedaccountrefreshtokensexception = require("../../../../../../engine/metadata-modules/connected-account/exceptions/connected-account-refresh-tokens.exception");
const _parsemsalerrorutil = require("../utils/parse-msal-error.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let MicrosoftAPIRefreshAccessTokenService = class MicrosoftAPIRefreshAccessTokenService {
    async refreshTokens(refreshToken) {
        const msalClient = new _msalnode.ConfidentialClientApplication({
            auth: {
                clientId: this.config.get('AUTH_MICROSOFT_CLIENT_ID'),
                clientSecret: this.config.get('AUTH_MICROSOFT_CLIENT_SECRET'),
                authority: 'https://login.microsoftonline.com/common'
            }
        });
        try {
            const response = await msalClient.acquireTokenByRefreshToken({
                refreshToken,
                scopes: [
                    'https://graph.microsoft.com/.default'
                ],
                forceCache: true
            });
            if (!response) {
                throw new _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenException('No response received from Microsoft token endpoint', _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.INVALID_REFRESH_TOKEN);
            }
            return {
                accessToken: response.accessToken,
                refreshToken: this.extractRefreshTokenFromCache(msalClient)
            };
        } catch (error) {
            if (error instanceof _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenException) {
                throw error;
            }
            throw (0, _parsemsalerrorutil.parseMsalError)(error);
        }
    }
    extractRefreshTokenFromCache(msalClient) {
        const tokenCache = JSON.parse(msalClient.getTokenCache().serialize());
        const refreshTokenKey = Object.keys(tokenCache.RefreshToken)[0];
        return tokenCache.RefreshToken[refreshTokenKey].secret;
    }
    constructor(config){
        this.config = config;
    }
};
MicrosoftAPIRefreshAccessTokenService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], MicrosoftAPIRefreshAccessTokenService);

//# sourceMappingURL=microsoft-api-refresh-tokens.service.js.map