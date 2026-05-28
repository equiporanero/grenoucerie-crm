"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ConnectedAccountRefreshTokensService", {
    enumerable: true,
    get: function() {
        return ConnectedAccountRefreshTokensService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _appoauthrefreshtokensservice = require("../../../../engine/core-modules/application/connection-provider/refresh/services/app-oauth-refresh-tokens.service");
const _connectedaccountentity = require("../../../../engine/metadata-modules/connected-account/entities/connected-account.entity");
const _connectedaccountrefreshtokensexception = require("../../../../engine/metadata-modules/connected-account/exceptions/connected-account-refresh-tokens.exception");
const _connectedaccounttokenencryptionservice = require("../../../../engine/metadata-modules/connected-account/services/connected-account-token-encryption.service");
const _googleapirefreshtokensservice = require("../drivers/google/services/google-api-refresh-tokens.service");
const _microsoftapirefreshtokensservice = require("../drivers/microsoft/services/microsoft-api-refresh-tokens.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
const CONNECTED_ACCOUNT_ACCESS_TOKEN_EXPIRATION = 1000 * 60 * 60;
let ConnectedAccountRefreshTokensService = class ConnectedAccountRefreshTokensService {
    async resolveTokens(connectedAccount, workspaceId) {
        const isAccessTokenValid = await this.isAccessTokenStillValid(connectedAccount);
        if (isAccessTokenValid) {
            this.logger.debug(`Reusing valid access token for connected account ${connectedAccount.id.slice(0, 7)} in workspace ${workspaceId.slice(0, 7)}`);
            return this.getExistingEncryptedTokens(connectedAccount, workspaceId);
        }
        const encryptedRefreshToken = connectedAccount.refreshToken;
        if (!(0, _utils.isDefined)(encryptedRefreshToken)) {
            throw new _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenException(`No refresh token found for connected account ${connectedAccount.id} in workspace ${workspaceId}`, _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.REFRESH_TOKEN_NOT_FOUND);
        }
        this.logger.debug(`Access token expired for connected account ${connectedAccount.id} in workspace ${workspaceId}, refreshing...`);
        return this.performRefreshAndSave(connectedAccount, encryptedRefreshToken, workspaceId);
    }
    getExistingEncryptedTokens(connectedAccount, workspaceId) {
        if (!(0, _utils.isDefined)(connectedAccount.accessToken)) {
            throw new _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenException(`Access token is required for connected account ${connectedAccount.id} in workspace ${workspaceId}`, _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.ACCESS_TOKEN_NOT_FOUND);
        }
        return {
            accessToken: connectedAccount.accessToken,
            refreshToken: connectedAccount.refreshToken
        };
    }
    async performRefreshAndSave(connectedAccount, encryptedRefreshToken, workspaceId) {
        const decryptedRefreshToken = this.connectedAccountTokenEncryptionService.decrypt({
            ciphertext: encryptedRefreshToken,
            workspaceId
        });
        const plaintextTokens = await this.refreshTokens(connectedAccount, decryptedRefreshToken, workspaceId);
        const { encryptedAccessToken, encryptedRefreshToken: reEncryptedRefreshToken } = this.connectedAccountTokenEncryptionService.encryptTokenPair({
            accessToken: plaintextTokens.accessToken,
            refreshToken: plaintextTokens.refreshToken,
            workspaceId
        });
        await this.connectedAccountRepository.update({
            id: connectedAccount.id,
            workspaceId
        }, {
            accessToken: encryptedAccessToken,
            refreshToken: reEncryptedRefreshToken,
            lastCredentialsRefreshedAt: new Date()
        });
        return {
            accessToken: encryptedAccessToken,
            refreshToken: reEncryptedRefreshToken
        };
    }
    async isAccessTokenStillValid(connectedAccount) {
        switch(connectedAccount.provider){
            case _types.ConnectedAccountProvider.GOOGLE:
            case _types.ConnectedAccountProvider.MICROSOFT:
            case _types.ConnectedAccountProvider.APP:
                {
                    if (!connectedAccount.lastCredentialsRefreshedAt) {
                        return false;
                    }
                    const BUFFER_TIME = 5 * 60 * 1000;
                    const tokenExpirationTime = CONNECTED_ACCOUNT_ACCESS_TOKEN_EXPIRATION - BUFFER_TIME;
                    return connectedAccount.lastCredentialsRefreshedAt > new Date(Date.now() - tokenExpirationTime);
                }
            case _types.ConnectedAccountProvider.IMAP_SMTP_CALDAV:
            case _types.ConnectedAccountProvider.OIDC:
            case _types.ConnectedAccountProvider.SAML:
            case _types.ConnectedAccountProvider.EMAIL_GROUP:
                return true;
            default:
                return (0, _utils.assertUnreachable)(connectedAccount.provider, `Provider ${connectedAccount.provider} not supported`);
        }
    }
    async refreshTokens(connectedAccount, refreshToken, workspaceId) {
        try {
            switch(connectedAccount.provider){
                case _types.ConnectedAccountProvider.GOOGLE:
                    return await this.googleAPIRefreshAccessTokenService.refreshTokens(refreshToken);
                case _types.ConnectedAccountProvider.MICROSOFT:
                    return await this.microsoftAPIRefreshAccessTokenService.refreshTokens(refreshToken);
                case _types.ConnectedAccountProvider.APP:
                    return await this.appOAuthRefreshAccessTokenService.refreshTokens(connectedAccount, refreshToken);
                case _types.ConnectedAccountProvider.IMAP_SMTP_CALDAV:
                case _types.ConnectedAccountProvider.OIDC:
                case _types.ConnectedAccountProvider.SAML:
                case _types.ConnectedAccountProvider.EMAIL_GROUP:
                    throw new _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenException(`Token refresh is not supported for ${connectedAccount.provider} provider for connected account ${connectedAccount.id} in workspace ${workspaceId}`, _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.PROVIDER_NOT_SUPPORTED);
                default:
                    return (0, _utils.assertUnreachable)(connectedAccount.provider, `Provider ${connectedAccount.provider} not supported`);
            }
        } catch (error) {
            this.logger.log(`Error while refreshing tokens on connected account ${connectedAccount.id} in workspace ${workspaceId}`, error);
            throw error;
        }
    }
    constructor(googleAPIRefreshAccessTokenService, microsoftAPIRefreshAccessTokenService, appOAuthRefreshAccessTokenService, connectedAccountTokenEncryptionService, connectedAccountRepository){
        this.googleAPIRefreshAccessTokenService = googleAPIRefreshAccessTokenService;
        this.microsoftAPIRefreshAccessTokenService = microsoftAPIRefreshAccessTokenService;
        this.appOAuthRefreshAccessTokenService = appOAuthRefreshAccessTokenService;
        this.connectedAccountTokenEncryptionService = connectedAccountTokenEncryptionService;
        this.connectedAccountRepository = connectedAccountRepository;
        this.logger = new _common.Logger(ConnectedAccountRefreshTokensService.name);
    }
};
ConnectedAccountRefreshTokensService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(4, (0, _typeorm.InjectRepository)(_connectedaccountentity.ConnectedAccountEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _googleapirefreshtokensservice.GoogleAPIRefreshAccessTokenService === "undefined" ? Object : _googleapirefreshtokensservice.GoogleAPIRefreshAccessTokenService,
        typeof _microsoftapirefreshtokensservice.MicrosoftAPIRefreshAccessTokenService === "undefined" ? Object : _microsoftapirefreshtokensservice.MicrosoftAPIRefreshAccessTokenService,
        typeof _appoauthrefreshtokensservice.AppOAuthRefreshAccessTokenService === "undefined" ? Object : _appoauthrefreshtokensservice.AppOAuthRefreshAccessTokenService,
        typeof _connectedaccounttokenencryptionservice.ConnectedAccountTokenEncryptionService === "undefined" ? Object : _connectedaccounttokenencryptionservice.ConnectedAccountTokenEncryptionService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], ConnectedAccountRefreshTokensService);

//# sourceMappingURL=connected-account-refresh-tokens.service.js.map