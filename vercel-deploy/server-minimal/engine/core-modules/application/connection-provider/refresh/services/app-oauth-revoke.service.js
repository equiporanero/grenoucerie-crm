"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AppOAuthRevokeService", {
    enumerable: true,
    get: function() {
        return AppOAuthRevokeService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _connectionproviderservice = require("../../connection-provider.service");
const _securehttpclientservice = require("../../../../secure-http-client/secure-http-client.service");
const _connectedaccounttokenencryptionservice = require("../../../../../metadata-modules/connected-account/services/connected-account-token-encryption.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AppOAuthRevokeService = class AppOAuthRevokeService {
    // Best-effort: failures are logged but never block disconnect.
    async revokeIfApp(connectedAccount) {
        if (!(0, _utils.isDefined)(connectedAccount.connectionProviderId) || !(0, _utils.isDefined)(connectedAccount.accessToken)) {
            return;
        }
        let provider;
        try {
            provider = await this.connectionProviderService.findOneByIdOrThrow(connectedAccount.connectionProviderId);
        } catch  {
            return;
        }
        const revokeEndpoint = provider.oauthConfig?.revokeEndpoint;
        if (provider.type !== 'oauth' || !(0, _utils.isDefined)(revokeEndpoint)) {
            return;
        }
        try {
            const decryptedAccessToken = this.connectedAccountTokenEncryptionService.decrypt({
                ciphertext: connectedAccount.accessToken,
                workspaceId: connectedAccount.workspaceId
            });
            const response = await this.secureHttpClientService.createSsrfSafeFetch()(revokeEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    token: decryptedAccessToken,
                    token_type_hint: 'access_token'
                }).toString()
            });
            if (!response.ok) {
                this.logger.warn(`Provider ${provider.id} revoke endpoint responded with ${response.status} for connected account ${connectedAccount.id}`);
            }
        } catch (error) {
            this.logger.warn(`Provider revoke call failed for connected account ${connectedAccount.id}: ${error.message}`);
        }
    }
    constructor(connectionProviderService, secureHttpClientService, connectedAccountTokenEncryptionService){
        this.connectionProviderService = connectionProviderService;
        this.secureHttpClientService = secureHttpClientService;
        this.connectedAccountTokenEncryptionService = connectedAccountTokenEncryptionService;
        this.logger = new _common.Logger(AppOAuthRevokeService.name);
    }
};
AppOAuthRevokeService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _connectionproviderservice.ConnectionProviderService === "undefined" ? Object : _connectionproviderservice.ConnectionProviderService,
        typeof _securehttpclientservice.SecureHttpClientService === "undefined" ? Object : _securehttpclientservice.SecureHttpClientService,
        typeof _connectedaccounttokenencryptionservice.ConnectedAccountTokenEncryptionService === "undefined" ? Object : _connectedaccounttokenencryptionservice.ConnectedAccountTokenEncryptionService
    ])
], AppOAuthRevokeService);

//# sourceMappingURL=app-oauth-revoke.service.js.map