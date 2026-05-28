"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _common = require("@nestjs/common");
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _secretencryptionconstant = require("../../../../../engine/core-modules/secret-encryption/constants/secret-encryption.constant");
const _twentyconfigservice = require("../../../../../engine/core-modules/twenty-config/twenty-config.service");
const _connectedaccountentity = require("../../../../../engine/metadata-modules/connected-account/entities/connected-account.entity");
const _connectedaccountrefreshtokensexception = require("../../../../../engine/metadata-modules/connected-account/exceptions/connected-account-refresh-tokens.exception");
const _connectedaccounttokenencryptionservice = require("../../../../../engine/metadata-modules/connected-account/services/connected-account-token-encryption.service");
const _connectedaccountrefreshtokensservice = require("../../../refresh-tokens-manager/services/connected-account-refresh-tokens.service");
const _googleoauth2clientprovider = require("./google-oauth2-client.provider");
const FAKE_CIPHER_PREFIX = `${_secretencryptionconstant.SECRET_ENCRYPTION_ENVELOPE_V2_PREFIX}keyid:`;
const wrap = (value)=>`${FAKE_CIPHER_PREFIX}CIPHER(${value})`;
const buildEncryptionStub = ()=>({
        decrypt: jest.fn(({ ciphertext })=>{
            const match = ciphertext.match(new RegExp(`^${FAKE_CIPHER_PREFIX}CIPHER\\((.*)\\)$`));
            if (!(0, _utils.isDefined)(match)) {
                throw new Error(`fake encryption stub: decrypt called with a non-CIPHER value: ${ciphertext}`);
            }
            return match[1];
        })
    });
describe('GoogleOAuth2ClientProvider', ()=>{
    let provider;
    let connectedAccountRepository;
    let connectedAccountRefreshTokensService;
    let connectedAccountTokenEncryptionService;
    const mockWorkspaceId = 'workspace-123';
    const mockConnectedAccountId = 'account-456';
    const mockRefreshTokenPlaintext = 'valid-refresh-token';
    const mockEncryptedRefreshToken = wrap(mockRefreshTokenPlaintext);
    const mockConnectedAccount = {
        id: mockConnectedAccountId,
        workspaceId: mockWorkspaceId,
        provider: _types.ConnectedAccountProvider.GOOGLE,
        refreshToken: mockEncryptedRefreshToken,
        accessToken: wrap('access-token')
    };
    beforeEach(async ()=>{
        connectedAccountTokenEncryptionService = buildEncryptionStub();
        connectedAccountRepository = {
            findOne: jest.fn().mockResolvedValue(mockConnectedAccount)
        };
        connectedAccountRefreshTokensService = {
            resolveTokens: jest.fn().mockResolvedValue({
                refreshToken: mockEncryptedRefreshToken,
                accessToken: wrap('access-token')
            })
        };
        const module = await _testing.Test.createTestingModule({
            providers: [
                _googleoauth2clientprovider.GoogleOAuth2ClientProvider,
                {
                    provide: _twentyconfigservice.TwentyConfigService,
                    useValue: {
                        get: jest.fn().mockImplementation((key)=>{
                            if (key === 'AUTH_GOOGLE_CLIENT_ID') return 'google-client-id';
                            if (key === 'AUTH_GOOGLE_CLIENT_SECRET') return 'google-client-secret';
                            return undefined;
                        })
                    }
                },
                {
                    provide: _common.Logger,
                    useValue: {
                        error: jest.fn()
                    }
                },
                {
                    provide: _connectedaccountrefreshtokensservice.ConnectedAccountRefreshTokensService,
                    useValue: connectedAccountRefreshTokensService
                },
                {
                    provide: _connectedaccounttokenencryptionservice.ConnectedAccountTokenEncryptionService,
                    useValue: connectedAccountTokenEncryptionService
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_connectedaccountentity.ConnectedAccountEntity),
                    useValue: connectedAccountRepository
                }
            ]
        }).compile();
        provider = module.get(_googleoauth2clientprovider.GoogleOAuth2ClientProvider);
    });
    afterEach(()=>{
        jest.clearAllMocks();
    });
    describe('getClient', ()=>{
        it('should load the entity, resolve tokens, decrypt the refresh token, and return an OAuth2Client', async ()=>{
            const client = await provider.getClient(mockConnectedAccountId);
            expect(connectedAccountRepository.findOne).toHaveBeenCalledWith({
                where: {
                    id: mockConnectedAccountId
                }
            });
            expect(connectedAccountRefreshTokensService.resolveTokens).toHaveBeenCalledWith(mockConnectedAccount, mockWorkspaceId);
            expect(connectedAccountTokenEncryptionService.decrypt).toHaveBeenCalledWith({
                ciphertext: mockEncryptedRefreshToken,
                workspaceId: mockWorkspaceId
            });
            expect(client).toBeDefined();
        });
        it('should throw when the connected account does not exist', async ()=>{
            connectedAccountRepository.findOne.mockResolvedValue(null);
            await expect(provider.getClient(mockConnectedAccountId)).rejects.toThrow(_connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenException);
            await expect(provider.getClient(mockConnectedAccountId)).rejects.toMatchObject({
                code: _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.REFRESH_TOKEN_NOT_FOUND
            });
        });
        it('should throw when resolveTokens returns no refresh token', async ()=>{
            connectedAccountRefreshTokensService.resolveTokens.mockResolvedValue({
                refreshToken: null,
                accessToken: wrap('access-token')
            });
            await expect(provider.getClient(mockConnectedAccountId)).rejects.toThrow(_connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenException);
            await expect(provider.getClient(mockConnectedAccountId)).rejects.toMatchObject({
                code: _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.REFRESH_TOKEN_NOT_FOUND
            });
        });
    });
});

//# sourceMappingURL=google-oauth2-client.provider.spec.js.map