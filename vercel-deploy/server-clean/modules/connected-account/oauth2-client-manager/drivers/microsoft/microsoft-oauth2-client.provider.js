"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MicrosoftOAuth2ClientProvider", {
    enumerable: true,
    get: function() {
        return MicrosoftOAuth2ClientProvider;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _microsoftgraphclient = require("@microsoft/microsoft-graph-client");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _connectedaccountentity = require("../../../../../engine/metadata-modules/connected-account/entities/connected-account.entity");
const _connectedaccountrefreshtokensexception = require("../../../../../engine/metadata-modules/connected-account/exceptions/connected-account-refresh-tokens.exception");
const _connectedaccounttokenencryptionservice = require("../../../../../engine/metadata-modules/connected-account/services/connected-account-token-encryption.service");
const _microsoftoauth2clientauthprovider = require("./microsoft-oauth2-client-auth-provider");
const _connectedaccountrefreshtokensservice = require("../../../refresh-tokens-manager/services/connected-account-refresh-tokens.service");
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
let MicrosoftOAuth2ClientProvider = class MicrosoftOAuth2ClientProvider {
    async getClient(connectedAccountId) {
        const connectedAccount = await this.connectedAccountRepository.findOne({
            where: {
                id: connectedAccountId
            }
        });
        if (!(0, _utils.isDefined)(connectedAccount)) {
            throw new _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenException(`Connected account ${connectedAccountId} not found`, _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.REFRESH_TOKEN_NOT_FOUND);
        }
        if (connectedAccount.provider !== _types.ConnectedAccountProvider.MICROSOFT) {
            throw new _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenException(`Connected account ${connectedAccountId} is not a Microsoft provider (got ${connectedAccount.provider})`, _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.PROVIDER_NOT_SUPPORTED);
        }
        const { accessToken: encryptedAccessToken } = await this.connectedAccountRefreshTokensService.resolveTokens(connectedAccount, connectedAccount.workspaceId);
        if (!(0, _utils.isDefined)(encryptedAccessToken)) {
            throw new _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenException(`Access token missing for connected account ${connectedAccountId}`, _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.ACCESS_TOKEN_NOT_FOUND);
        }
        const plaintextAccessToken = this.connectedAccountTokenEncryptionService.decrypt({
            ciphertext: encryptedAccessToken,
            workspaceId: connectedAccount.workspaceId
        });
        const authProvider = new _microsoftoauth2clientauthprovider.MicrosoftOAuth2ClientAuthProvider(plaintextAccessToken);
        return _microsoftgraphclient.Client.initWithMiddleware({
            defaultVersion: 'v1.0',
            debugLogging: false,
            authProvider
        });
    }
    constructor(connectedAccountRefreshTokensService, connectedAccountTokenEncryptionService, connectedAccountRepository){
        this.connectedAccountRefreshTokensService = connectedAccountRefreshTokensService;
        this.connectedAccountTokenEncryptionService = connectedAccountTokenEncryptionService;
        this.connectedAccountRepository = connectedAccountRepository;
    }
};
MicrosoftOAuth2ClientProvider = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(2, (0, _typeorm.InjectRepository)(_connectedaccountentity.ConnectedAccountEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _connectedaccountrefreshtokensservice.ConnectedAccountRefreshTokensService === "undefined" ? Object : _connectedaccountrefreshtokensservice.ConnectedAccountRefreshTokensService,
        typeof _connectedaccounttokenencryptionservice.ConnectedAccountTokenEncryptionService === "undefined" ? Object : _connectedaccounttokenencryptionservice.ConnectedAccountTokenEncryptionService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], MicrosoftOAuth2ClientProvider);

//# sourceMappingURL=microsoft-oauth2-client.provider.js.map