"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AppOAuthRefreshAccessTokenService", {
    enumerable: true,
    get: function() {
        return AppOAuthRefreshAccessTokenService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _connectionproviderexception = require("../../connection-provider.exception");
const _connectionproviderservice = require("../../connection-provider.service");
const _assertoauthproviderutil = require("../../utils/assert-oauth-provider.util");
const _exchangerefreshtokenfortokenutil = require("../../utils/exchange-refresh-token-for-token.util");
const _postoauthtokenrequestutil = require("../../utils/post-oauth-token-request.util");
const _securehttpclientservice = require("../../../../secure-http-client/secure-http-client.service");
const _connectedaccountrefreshtokensexception = require("../../../../../metadata-modules/connected-account/exceptions/connected-account-refresh-tokens.exception");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AppOAuthRefreshAccessTokenService = class AppOAuthRefreshAccessTokenService {
    async refreshTokens(connectedAccount, refreshToken) {
        if (!(0, _utils.isDefined)(connectedAccount.connectionProviderId)) {
            throw new _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenException(`Connected account ${connectedAccount.id} has no connectionProviderId`, _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.PROVIDER_NOT_SUPPORTED);
        }
        const { provider, clientId, clientSecret } = await this.resolveProvider(connectedAccount.connectionProviderId);
        try {
            const tokenResponse = await (0, _exchangerefreshtokenfortokenutil.exchangeRefreshTokenForToken)({
                fetchFn: this.secureHttpClientService.createSsrfSafeFetch(),
                tokenEndpoint: provider.oauthConfig.tokenEndpoint,
                clientId,
                clientSecret,
                refreshToken,
                contentType: provider.oauthConfig.tokenRequestContentType
            });
            return {
                accessToken: tokenResponse.accessToken,
                // Fall back to the original when the response omits one — some
                // providers don't rotate refresh tokens.
                refreshToken: tokenResponse.refreshToken ?? refreshToken
            };
        } catch (error) {
            this.logger.warn(`App OAuth refresh failed for connected account ${connectedAccount.id}: ${error.message}`);
            // Only 4xx token-endpoint responses (esp. invalid_grant) imply the
            // user must reconnect — 5xx and transport errors stay transient.
            const isTransient = !(error instanceof _postoauthtokenrequestutil.OAuthTokenEndpointError) || error.status >= 500;
            throw new _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenException(`App OAuth refresh failed: ${error.message}`, isTransient ? _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.TEMPORARY_NETWORK_ERROR : _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.INVALID_REFRESH_TOKEN);
        }
    }
    async resolveProvider(connectionProviderId) {
        try {
            const provider = await this.connectionProviderService.findOneByIdOrThrow(connectionProviderId);
            (0, _assertoauthproviderutil.assertOAuthProvider)(provider);
            const { clientId, clientSecret } = await this.connectionProviderService.getClientCredentials(provider);
            return {
                provider,
                clientId,
                clientSecret
            };
        } catch (error) {
            if (error instanceof _connectionproviderexception.ConnectionProviderException) {
                throw new _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenException(error.message, _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.PROVIDER_NOT_SUPPORTED);
            }
            throw error;
        }
    }
    constructor(connectionProviderService, secureHttpClientService){
        this.connectionProviderService = connectionProviderService;
        this.secureHttpClientService = secureHttpClientService;
        this.logger = new _common.Logger(AppOAuthRefreshAccessTokenService.name);
    }
};
AppOAuthRefreshAccessTokenService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _connectionproviderservice.ConnectionProviderService === "undefined" ? Object : _connectionproviderservice.ConnectionProviderService,
        typeof _securehttpclientservice.SecureHttpClientService === "undefined" ? Object : _securehttpclientservice.SecureHttpClientService
    ])
], AppOAuthRefreshAccessTokenService);

//# sourceMappingURL=app-oauth-refresh-tokens.service.js.map