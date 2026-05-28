"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ConnectionProviderOAuthFlowService", {
    enumerable: true,
    get: function() {
        return ConnectionProviderOAuthFlowService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _connectionproviderexceptioncodeenum = require("./connection-provider-exception-code.enum");
const _connectionproviderexception = require("./connection-provider.exception");
const _connectionproviderservice = require("./connection-provider.service");
const _assertoauthproviderutil = require("./utils/assert-oauth-provider.util");
const _buildcallbackurlutil = require("./utils/build-callback-url.util");
const _computepkcechallengeutil = require("./utils/compute-pkce-challenge.util");
const _exchangecodefortokenutil = require("./utils/exchange-code-for-token.util");
const _generatepkceverifierutil = require("./utils/generate-pkce-verifier.util");
const _authcontexttype = require("../../auth/types/auth-context.type");
const _jwtwrapperservice = require("../../jwt/services/jwt-wrapper.service");
const _securehttpclientservice = require("../../secure-http-client/secure-http-client.service");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
const _connectedaccountentity = require("../../../metadata-modules/connected-account/entities/connected-account.entity");
const _connectedaccounttokenencryptionservice = require("../../../metadata-modules/connected-account/services/connected-account-token-encryption.service");
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
const STATE_JWT_EXPIRES_IN = '10m';
let ConnectionProviderOAuthFlowService = class ConnectionProviderOAuthFlowService {
    async startAuthorizationFlow(args) {
        const { connectionProvider, workspaceId, userId, userWorkspaceId } = args;
        (0, _assertoauthproviderutil.assertOAuthProvider)(connectionProvider);
        // Reconnect target must live in the requesting workspace and belong to
        // the same provider — without this guard a foreign id would silently
        // leak through findOneByOrFail later in the flow.
        if ((0, _utils.isDefined)(args.reconnectingConnectedAccountId)) {
            const target = await this.connectedAccountRepository.findOne({
                where: {
                    id: args.reconnectingConnectedAccountId,
                    workspaceId,
                    connectionProviderId: connectionProvider.id
                }
            });
            if (!(0, _utils.isDefined)(target)) {
                throw new _connectionproviderexception.ConnectionProviderException(`Cannot reconnect connectedAccount ${args.reconnectingConnectedAccountId}: not found in this workspace for the requested provider.`, _connectionproviderexceptioncodeenum.ConnectionProviderExceptionCode.FORBIDDEN);
            }
        }
        const { clientId } = await this.oauthProviderService.getClientCredentials(connectionProvider);
        const { authorizationEndpoint, scopes, authorizationParams, usePkce } = connectionProvider.oauthConfig;
        const codeVerifier = usePkce ? (0, _generatepkceverifierutil.generatePkceVerifier)() : null;
        const state = await this.signState({
            sub: connectionProvider.id,
            type: _authcontexttype.JwtTokenTypeEnum.APP_OAUTH_STATE,
            connectionProviderId: connectionProvider.id,
            workspaceId,
            userId,
            userWorkspaceId,
            visibility: args.visibility,
            reconnectingConnectedAccountId: args.reconnectingConnectedAccountId,
            redirectLocation: args.redirectLocation,
            codeVerifier
        });
        const callbackUrl = (0, _buildcallbackurlutil.buildAppOAuthCallbackUrl)(this.getServerUrl());
        const authorizationUrl = new URL(authorizationEndpoint);
        authorizationUrl.searchParams.set('client_id', clientId);
        authorizationUrl.searchParams.set('redirect_uri', callbackUrl);
        authorizationUrl.searchParams.set('response_type', 'code');
        authorizationUrl.searchParams.set('scope', scopes.join(' '));
        authorizationUrl.searchParams.set('state', state);
        if (codeVerifier) {
            authorizationUrl.searchParams.set('code_challenge', (0, _computepkcechallengeutil.computePkceChallenge)(codeVerifier));
            authorizationUrl.searchParams.set('code_challenge_method', 'S256');
        }
        for (const [key, value] of Object.entries(authorizationParams ?? {})){
            authorizationUrl.searchParams.set(key, value);
        }
        return {
            authorizationUrl: authorizationUrl.toString()
        };
    }
    async completeAuthorizationFlow(args) {
        const statePayload = await this.verifyState(args.state);
        const provider = await this.oauthProviderService.findOneByIdOrThrow(statePayload.connectionProviderId);
        (0, _assertoauthproviderutil.assertOAuthProvider)(provider);
        const { clientId, clientSecret } = await this.oauthProviderService.getClientCredentials(provider);
        const callbackUrl = (0, _buildcallbackurlutil.buildAppOAuthCallbackUrl)(this.getServerUrl());
        let tokenResponse;
        try {
            tokenResponse = await (0, _exchangecodefortokenutil.exchangeCodeForToken)({
                fetchFn: this.secureHttpClientService.createSsrfSafeFetch(),
                tokenEndpoint: provider.oauthConfig.tokenEndpoint,
                clientId,
                clientSecret,
                code: args.code,
                redirectUri: callbackUrl,
                codeVerifier: statePayload.codeVerifier,
                contentType: provider.oauthConfig.tokenRequestContentType
            });
        } catch (error) {
            this.logger.error(`OAuth token exchange failed for provider ${provider.id}: ${error.message}`);
            throw new _connectionproviderexception.ConnectionProviderException(error.message, _connectionproviderexceptioncodeenum.ConnectionProviderExceptionCode.TOKEN_EXCHANGE_FAILED);
        }
        const connectedAccount = await this.persistConnectedAccount({
            provider,
            tokenResponse,
            workspaceId: statePayload.workspaceId,
            userWorkspaceId: statePayload.userWorkspaceId,
            visibility: statePayload.visibility,
            reconnectingConnectedAccountId: statePayload.reconnectingConnectedAccountId
        });
        return {
            connectedAccountId: connectedAccount.id,
            workspaceId: statePayload.workspaceId,
            applicationId: provider.applicationId,
            redirectLocation: statePayload.redirectLocation
        };
    }
    async signState(payload) {
        return this.jwtWrapperService.signAsyncOrThrow(payload, {
            expiresIn: STATE_JWT_EXPIRES_IN
        });
    }
    async verifyState(state) {
        try {
            const verified = await this.jwtWrapperService.verifyJwtToken(state);
            if (verified.type !== _authcontexttype.JwtTokenTypeEnum.APP_OAUTH_STATE) {
                throw new Error('Wrong JWT type for OAuth state');
            }
            return verified;
        } catch (error) {
            this.logger.warn(`Rejected OAuth state: ${error.message ?? 'unknown reason'}`);
            throw new _connectionproviderexception.ConnectionProviderException('OAuth state signature invalid or expired', _connectionproviderexceptioncodeenum.ConnectionProviderExceptionCode.INVALID_STATE);
        }
    }
    getServerUrl() {
        return this.twentyConfigService.get('SERVER_URL');
    }
    async persistConnectedAccount({ provider, tokenResponse, workspaceId, userWorkspaceId, visibility, reconnectingConnectedAccountId }) {
        const { encryptedAccessToken, encryptedRefreshToken } = this.connectedAccountTokenEncryptionService.encryptTokenPair({
            accessToken: tokenResponse.accessToken,
            refreshToken: tokenResponse.refreshToken,
            workspaceId
        });
        const sharedFields = {
            accessToken: encryptedAccessToken,
            refreshToken: encryptedRefreshToken,
            scopes: tokenResponse.scopes ?? provider.oauthConfig.scopes,
            lastCredentialsRefreshedAt: new Date(),
            authFailedAt: null,
            visibility
        };
        if ((0, _utils.isDefined)(reconnectingConnectedAccountId)) {
            // Workspace-scope both the update and the read so a foreign id can't
            // leak through findOneByOrFail.
            await this.connectedAccountRepository.update({
                id: reconnectingConnectedAccountId,
                workspaceId
            }, sharedFields);
            return this.connectedAccountRepository.findOneByOrFail({
                id: reconnectingConnectedAccountId,
                workspaceId
            });
        }
        const existingCount = await this.connectedAccountRepository.count({
            where: {
                connectionProviderId: provider.id,
                workspaceId
            }
        });
        const name = `${provider.displayName} #${existingCount + 1}`;
        const created = this.connectedAccountRepository.create({
            ...sharedFields,
            handle: name,
            name,
            visibility,
            provider: _types.ConnectedAccountProvider.APP,
            workspaceId,
            applicationId: provider.applicationId,
            connectionProviderId: provider.id,
            userWorkspaceId
        });
        return this.connectedAccountRepository.save(created);
    }
    constructor(oauthProviderService, jwtWrapperService, secureHttpClientService, twentyConfigService, connectedAccountTokenEncryptionService, connectedAccountRepository){
        this.oauthProviderService = oauthProviderService;
        this.jwtWrapperService = jwtWrapperService;
        this.secureHttpClientService = secureHttpClientService;
        this.twentyConfigService = twentyConfigService;
        this.connectedAccountTokenEncryptionService = connectedAccountTokenEncryptionService;
        this.connectedAccountRepository = connectedAccountRepository;
        this.logger = new _common.Logger(ConnectionProviderOAuthFlowService.name);
    }
};
ConnectionProviderOAuthFlowService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(5, (0, _typeorm.InjectRepository)(_connectedaccountentity.ConnectedAccountEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _connectionproviderservice.ConnectionProviderService === "undefined" ? Object : _connectionproviderservice.ConnectionProviderService,
        typeof _jwtwrapperservice.JwtWrapperService === "undefined" ? Object : _jwtwrapperservice.JwtWrapperService,
        typeof _securehttpclientservice.SecureHttpClientService === "undefined" ? Object : _securehttpclientservice.SecureHttpClientService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _connectedaccounttokenencryptionservice.ConnectedAccountTokenEncryptionService === "undefined" ? Object : _connectedaccounttokenencryptionservice.ConnectedAccountTokenEncryptionService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], ConnectionProviderOAuthFlowService);

//# sourceMappingURL=connection-provider-oauth-flow.service.js.map