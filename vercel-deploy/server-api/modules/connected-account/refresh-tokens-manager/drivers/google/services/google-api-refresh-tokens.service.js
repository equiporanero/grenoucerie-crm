"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GoogleAPIRefreshAccessTokenService", {
    enumerable: true,
    get: function() {
        return GoogleAPIRefreshAccessTokenService;
    }
});
const _common = require("@nestjs/common");
const _googleapis = require("googleapis");
const _utils = require("twenty-shared/utils");
const _twentyconfigservice = require("../../../../../../engine/core-modules/twenty-config/twenty-config.service");
const _connectedaccountrefreshtokensexception = require("../../../../../../engine/metadata-modules/connected-account/exceptions/connected-account-refresh-tokens.exception");
const _parsegoogleoautherrorutil = require("../utils/parse-google-oauth-error.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let GoogleAPIRefreshAccessTokenService = class GoogleAPIRefreshAccessTokenService {
    async refreshTokens(refreshToken) {
        const oAuth2Client = new _googleapis.google.auth.OAuth2(this.twentyConfigService.get('AUTH_GOOGLE_CLIENT_ID'), this.twentyConfigService.get('AUTH_GOOGLE_CLIENT_SECRET'));
        oAuth2Client.setCredentials({
            refresh_token: refreshToken
        });
        try {
            const { token } = await oAuth2Client.getAccessToken();
            if (!(0, _utils.isDefined)(token)) {
                throw new _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenException('Error refreshing Google tokens: Invalid refresh token', _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.INVALID_REFRESH_TOKEN);
            }
            return {
                accessToken: token,
                refreshToken
            };
        } catch (error) {
            if (error instanceof _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenException) {
                throw error;
            }
            throw (0, _parsegoogleoautherrorutil.parseGoogleOAuthError)(error);
        }
    }
    constructor(twentyConfigService){
        this.twentyConfigService = twentyConfigService;
    }
};
GoogleAPIRefreshAccessTokenService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], GoogleAPIRefreshAccessTokenService);

//# sourceMappingURL=google-api-refresh-tokens.service.js.map