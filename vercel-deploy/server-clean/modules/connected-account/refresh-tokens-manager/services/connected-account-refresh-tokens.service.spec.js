"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _appoauthrefreshtokensservice = require("../../../../engine/core-modules/application/connection-provider/refresh/services/app-oauth-refresh-tokens.service");
const _secretencryptionconstant = require("../../../../engine/core-modules/secret-encryption/constants/secret-encryption.constant");
const _connectedaccountentity = require("../../../../engine/metadata-modules/connected-account/entities/connected-account.entity");
const _connectedaccountrefreshtokensexception = require("../../../../engine/metadata-modules/connected-account/exceptions/connected-account-refresh-tokens.exception");
const _connectedaccounttokenencryptionservice = require("../../../../engine/metadata-modules/connected-account/services/connected-account-token-encryption.service");
const _googleapirefreshtokensservice = require("../drivers/google/services/google-api-refresh-tokens.service");
const _microsoftapirefreshtokensservice = require("../drivers/microsoft/services/microsoft-api-refresh-tokens.service");
const _connectedaccountrefreshtokensservice = require("./connected-account-refresh-tokens.service");
const FAKE_CIPHER_PREFIX = `${_secretencryptionconstant.SECRET_ENCRYPTION_ENVELOPE_V2_PREFIX}keyid:`;
describe('ConnectedAccountRefreshTokensService', ()=>{
    let service;
    let googleAPIRefreshAccessTokenService;
    let microsoftAPIRefreshAccessTokenService;
    let connectedAccountRepository;
    let connectedAccountTokenEncryptionService;
    const mockWorkspaceId = 'workspace-123';
    const mockConnectedAccountId = 'account-456';
    const mockAccessTokenPlaintext = 'valid-access-token';
    const mockRefreshTokenPlaintext = 'valid-refresh-token';
    const mockNewAccessTokenPlaintext = 'new-access-token';
    const mockEncryptedAccessToken = `${FAKE_CIPHER_PREFIX}CIPHER(${mockAccessTokenPlaintext})`;
    const mockEncryptedRefreshToken = `${FAKE_CIPHER_PREFIX}CIPHER(${mockRefreshTokenPlaintext})`;
    // Real prefix/round-trip invariants are asserted in
    // connected-account-token-encryption.service.spec.ts.
    const buildSymmetricEncryptionStub = ()=>{
        const wrap = (value)=>`${FAKE_CIPHER_PREFIX}CIPHER(${value})`;
        return {
            decrypt: jest.fn(({ ciphertext })=>{
                const match = ciphertext.match(new RegExp(`^${FAKE_CIPHER_PREFIX}CIPHER\\((.*)\\)$`));
                if (!(0, _utils.isDefined)(match)) {
                    throw new Error(`fake encryption stub: decrypt called with a non-CIPHER value: ${ciphertext}`);
                }
                return match[1];
            }),
            encryptTokenPair: jest.fn(({ accessToken, refreshToken })=>({
                    encryptedAccessToken: wrap(accessToken),
                    encryptedRefreshToken: (0, _utils.isDefined)(refreshToken) ? wrap(refreshToken) : null
                }))
        };
    };
    beforeEach(async ()=>{
        connectedAccountTokenEncryptionService = buildSymmetricEncryptionStub();
        const module = await _testing.Test.createTestingModule({
            providers: [
                _connectedaccountrefreshtokensservice.ConnectedAccountRefreshTokensService,
                {
                    provide: _googleapirefreshtokensservice.GoogleAPIRefreshAccessTokenService,
                    useValue: {
                        refreshTokens: jest.fn()
                    }
                },
                {
                    provide: _microsoftapirefreshtokensservice.MicrosoftAPIRefreshAccessTokenService,
                    useValue: {
                        refreshTokens: jest.fn()
                    }
                },
                {
                    provide: _appoauthrefreshtokensservice.AppOAuthRefreshAccessTokenService,
                    useValue: {
                        refreshTokens: jest.fn()
                    }
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_connectedaccountentity.ConnectedAccountEntity),
                    useValue: {
                        update: jest.fn()
                    }
                },
                {
                    provide: _connectedaccounttokenencryptionservice.ConnectedAccountTokenEncryptionService,
                    useValue: connectedAccountTokenEncryptionService
                }
            ]
        }).compile();
        service = module.get(_connectedaccountrefreshtokensservice.ConnectedAccountRefreshTokensService);
        googleAPIRefreshAccessTokenService = module.get(_googleapirefreshtokensservice.GoogleAPIRefreshAccessTokenService);
        microsoftAPIRefreshAccessTokenService = module.get(_microsoftapirefreshtokensservice.MicrosoftAPIRefreshAccessTokenService);
        connectedAccountRepository = module.get((0, _typeorm.getRepositoryToken)(_connectedaccountentity.ConnectedAccountEntity));
    });
    afterEach(()=>{
        jest.clearAllMocks();
    });
    describe('resolveTokens', ()=>{
        it('should reuse the cached encrypted tokens as-is when valid, skipping decrypt and the refresh call entirely', async ()=>{
            const connectedAccount = {
                id: mockConnectedAccountId,
                provider: _types.ConnectedAccountProvider.MICROSOFT,
                accessToken: mockEncryptedAccessToken,
                refreshToken: mockEncryptedRefreshToken,
                lastCredentialsRefreshedAt: new Date(Date.now() - 30 * 60 * 1000)
            };
            const result = await service.resolveTokens(connectedAccount, mockWorkspaceId);
            expect(result).toEqual({
                accessToken: mockEncryptedAccessToken,
                refreshToken: mockEncryptedRefreshToken
            });
            expect(connectedAccountTokenEncryptionService.decrypt).not.toHaveBeenCalled();
            expect(microsoftAPIRefreshAccessTokenService.refreshTokens).not.toHaveBeenCalled();
            expect(connectedAccountRepository.update).not.toHaveBeenCalled();
        });
        it('should decrypt the stored refresh token before sending to Microsoft, persist the re-encrypted tokens, and return them encrypted', async ()=>{
            const connectedAccount = {
                id: mockConnectedAccountId,
                provider: _types.ConnectedAccountProvider.MICROSOFT,
                accessToken: mockEncryptedAccessToken,
                refreshToken: mockEncryptedRefreshToken,
                lastCredentialsRefreshedAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
            };
            const newPlaintextTokens = {
                accessToken: mockNewAccessTokenPlaintext,
                refreshToken: mockRefreshTokenPlaintext
            };
            jest.spyOn(microsoftAPIRefreshAccessTokenService, 'refreshTokens').mockResolvedValue(newPlaintextTokens);
            const result = await service.resolveTokens(connectedAccount, mockWorkspaceId);
            const expectedEncryptedNewAccessToken = `${FAKE_CIPHER_PREFIX}CIPHER(${mockNewAccessTokenPlaintext})`;
            const expectedEncryptedNewRefreshToken = `${FAKE_CIPHER_PREFIX}CIPHER(${mockRefreshTokenPlaintext})`;
            expect(result).toEqual({
                accessToken: expectedEncryptedNewAccessToken,
                refreshToken: expectedEncryptedNewRefreshToken
            });
            expect(microsoftAPIRefreshAccessTokenService.refreshTokens).toHaveBeenCalledWith(mockRefreshTokenPlaintext);
            expect(connectedAccountRepository.update).toHaveBeenCalledWith({
                id: mockConnectedAccountId,
                workspaceId: mockWorkspaceId
            }, expect.objectContaining({
                accessToken: expectedEncryptedNewAccessToken,
                refreshToken: expectedEncryptedNewRefreshToken,
                lastCredentialsRefreshedAt: expect.any(Date)
            }));
        });
        it('should decrypt the stored refresh token before sending to Google, persist the re-encrypted tokens, and return them encrypted', async ()=>{
            const connectedAccount = {
                id: mockConnectedAccountId,
                provider: _types.ConnectedAccountProvider.GOOGLE,
                accessToken: mockEncryptedAccessToken,
                refreshToken: mockEncryptedRefreshToken,
                lastCredentialsRefreshedAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
            };
            const newPlaintextTokens = {
                accessToken: mockNewAccessTokenPlaintext,
                refreshToken: mockRefreshTokenPlaintext
            };
            jest.spyOn(googleAPIRefreshAccessTokenService, 'refreshTokens').mockResolvedValue(newPlaintextTokens);
            const result = await service.resolveTokens(connectedAccount, mockWorkspaceId);
            const expectedEncryptedNewAccessToken = `${FAKE_CIPHER_PREFIX}CIPHER(${mockNewAccessTokenPlaintext})`;
            const expectedEncryptedNewRefreshToken = `${FAKE_CIPHER_PREFIX}CIPHER(${mockRefreshTokenPlaintext})`;
            expect(result).toEqual({
                accessToken: expectedEncryptedNewAccessToken,
                refreshToken: expectedEncryptedNewRefreshToken
            });
            expect(googleAPIRefreshAccessTokenService.refreshTokens).toHaveBeenCalledWith(mockRefreshTokenPlaintext);
            expect(connectedAccountRepository.update).toHaveBeenCalledWith({
                id: mockConnectedAccountId,
                workspaceId: mockWorkspaceId
            }, expect.objectContaining({
                accessToken: expectedEncryptedNewAccessToken,
                refreshToken: expectedEncryptedNewRefreshToken,
                lastCredentialsRefreshedAt: expect.any(Date)
            }));
        });
        it('should treat null lastCredentialsRefreshedAt as expired and run the full decrypt → refresh → re-encrypt cycle', async ()=>{
            const connectedAccount = {
                id: mockConnectedAccountId,
                provider: _types.ConnectedAccountProvider.MICROSOFT,
                accessToken: mockEncryptedAccessToken,
                refreshToken: mockEncryptedRefreshToken,
                lastCredentialsRefreshedAt: null
            };
            const newPlaintextTokens = {
                accessToken: mockNewAccessTokenPlaintext,
                refreshToken: mockRefreshTokenPlaintext
            };
            jest.spyOn(microsoftAPIRefreshAccessTokenService, 'refreshTokens').mockResolvedValue(newPlaintextTokens);
            const result = await service.resolveTokens(connectedAccount, mockWorkspaceId);
            const expectedEncryptedNewAccessToken = `${FAKE_CIPHER_PREFIX}CIPHER(${mockNewAccessTokenPlaintext})`;
            const expectedEncryptedNewRefreshToken = `${FAKE_CIPHER_PREFIX}CIPHER(${mockRefreshTokenPlaintext})`;
            expect(result).toEqual({
                accessToken: expectedEncryptedNewAccessToken,
                refreshToken: expectedEncryptedNewRefreshToken
            });
            expect(microsoftAPIRefreshAccessTokenService.refreshTokens).toHaveBeenCalledWith(mockRefreshTokenPlaintext);
            expect(connectedAccountRepository.update).toHaveBeenCalledWith({
                id: mockConnectedAccountId,
                workspaceId: mockWorkspaceId
            }, expect.objectContaining({
                accessToken: expectedEncryptedNewAccessToken,
                refreshToken: expectedEncryptedNewRefreshToken,
                lastCredentialsRefreshedAt: expect.any(Date)
            }));
        });
        it('should return the encrypted access token and null refresh token when access token is valid but no refresh token exists', async ()=>{
            const connectedAccount = {
                id: mockConnectedAccountId,
                provider: _types.ConnectedAccountProvider.APP,
                accessToken: mockEncryptedAccessToken,
                refreshToken: null,
                lastCredentialsRefreshedAt: new Date(Date.now() - 30 * 60 * 1000)
            };
            const result = await service.resolveTokens(connectedAccount, mockWorkspaceId);
            expect(result).toEqual({
                accessToken: mockEncryptedAccessToken,
                refreshToken: null
            });
            expect(connectedAccountTokenEncryptionService.decrypt).not.toHaveBeenCalled();
            expect(connectedAccountRepository.update).not.toHaveBeenCalled();
        });
        it('should throw when refresh token is missing and access token is expired', async ()=>{
            const connectedAccount = {
                id: mockConnectedAccountId,
                provider: _types.ConnectedAccountProvider.GOOGLE,
                accessToken: mockEncryptedAccessToken,
                refreshToken: null,
                lastCredentialsRefreshedAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
            };
            await expect(service.resolveTokens(connectedAccount, mockWorkspaceId)).rejects.toThrow(new _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenException(`No refresh token found for connected account ${mockConnectedAccountId} in workspace ${mockWorkspaceId}`, _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.REFRESH_TOKEN_NOT_FOUND));
        });
        it('should throw exception when Microsoft refresh fails with invalid_grant', async ()=>{
            const connectedAccount = {
                id: mockConnectedAccountId,
                provider: _types.ConnectedAccountProvider.MICROSOFT,
                accessToken: mockEncryptedAccessToken,
                refreshToken: mockEncryptedRefreshToken,
                lastCredentialsRefreshedAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
            };
            const invalidGrantError = new _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenException('Microsoft OAuth error: invalid_grant - Token has been revoked', _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.INVALID_REFRESH_TOKEN);
            jest.spyOn(microsoftAPIRefreshAccessTokenService, 'refreshTokens').mockRejectedValue(invalidGrantError);
            await expect(service.resolveTokens(connectedAccount, mockWorkspaceId)).rejects.toMatchObject({
                message: expect.stringContaining('Microsoft OAuth error: invalid_grant - Token has been revoked'),
                code: _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.INVALID_REFRESH_TOKEN
            });
        });
        it('should throw TEMPORARY_NETWORK_ERROR when refresh fails with network error', async ()=>{
            const connectedAccount = {
                id: mockConnectedAccountId,
                provider: _types.ConnectedAccountProvider.GOOGLE,
                accessToken: mockEncryptedAccessToken,
                refreshToken: mockEncryptedRefreshToken,
                lastCredentialsRefreshedAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
            };
            const networkError = new _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenException('Google refresh token network error: ECONNRESET - Network error', _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.TEMPORARY_NETWORK_ERROR);
            jest.spyOn(googleAPIRefreshAccessTokenService, 'refreshTokens').mockRejectedValue(networkError);
            await expect(service.resolveTokens(connectedAccount, mockWorkspaceId)).rejects.toMatchObject({
                code: _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.TEMPORARY_NETWORK_ERROR
            });
        });
    });
    describe('isAccessTokenStillValid', ()=>{
        it('should return true when lastCredentialsRefreshedAt is within the valid window (30 minutes ago)', async ()=>{
            const connectedAccount = {
                id: mockConnectedAccountId,
                provider: _types.ConnectedAccountProvider.MICROSOFT,
                lastCredentialsRefreshedAt: new Date(Date.now() - 30 * 60 * 1000)
            };
            const result = await service.isAccessTokenStillValid(connectedAccount);
            expect(result).toBe(true);
        });
        it('should return false when lastCredentialsRefreshedAt is outside the valid window (2 hours ago)', async ()=>{
            const connectedAccount = {
                id: mockConnectedAccountId,
                provider: _types.ConnectedAccountProvider.GOOGLE,
                lastCredentialsRefreshedAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
            };
            const result = await service.isAccessTokenStillValid(connectedAccount);
            expect(result).toBe(false);
        });
        it('should return false when lastCredentialsRefreshedAt is null', async ()=>{
            const connectedAccount = {
                id: mockConnectedAccountId,
                provider: _types.ConnectedAccountProvider.MICROSOFT,
                lastCredentialsRefreshedAt: null
            };
            const result = await service.isAccessTokenStillValid(connectedAccount);
            expect(result).toBe(false);
        });
        it('should return true for IMAP_SMTP_CALDAV provider regardless of lastCredentialsRefreshedAt', async ()=>{
            const connectedAccount = {
                id: mockConnectedAccountId,
                provider: _types.ConnectedAccountProvider.IMAP_SMTP_CALDAV,
                lastCredentialsRefreshedAt: null
            };
            const result = await service.isAccessTokenStillValid(connectedAccount);
            expect(result).toBe(true);
        });
        it('should return true for OIDC provider regardless of lastCredentialsRefreshedAt', async ()=>{
            const connectedAccount = {
                id: mockConnectedAccountId,
                provider: _types.ConnectedAccountProvider.OIDC,
                lastCredentialsRefreshedAt: null
            };
            const result = await service.isAccessTokenStillValid(connectedAccount);
            expect(result).toBe(true);
        });
        it('should return true for SAML provider regardless of lastCredentialsRefreshedAt', async ()=>{
            const connectedAccount = {
                id: mockConnectedAccountId,
                provider: _types.ConnectedAccountProvider.SAML,
                lastCredentialsRefreshedAt: null
            };
            const result = await service.isAccessTokenStillValid(connectedAccount);
            expect(result).toBe(true);
        });
    });
    describe('resolveTokens - OIDC/SAML', ()=>{
        it('should return existing encrypted tokens for OIDC as-is without attempting a refresh', async ()=>{
            const connectedAccount = {
                id: mockConnectedAccountId,
                provider: _types.ConnectedAccountProvider.OIDC,
                accessToken: mockEncryptedAccessToken,
                refreshToken: mockEncryptedRefreshToken,
                lastCredentialsRefreshedAt: null
            };
            const result = await service.resolveTokens(connectedAccount, mockWorkspaceId);
            expect(result).toEqual({
                accessToken: mockEncryptedAccessToken,
                refreshToken: mockEncryptedRefreshToken
            });
            expect(connectedAccountTokenEncryptionService.decrypt).not.toHaveBeenCalled();
            expect(googleAPIRefreshAccessTokenService.refreshTokens).not.toHaveBeenCalled();
            expect(microsoftAPIRefreshAccessTokenService.refreshTokens).not.toHaveBeenCalled();
            expect(connectedAccountRepository.update).not.toHaveBeenCalled();
        });
        it('should return existing encrypted tokens for SAML as-is without attempting a refresh', async ()=>{
            const connectedAccount = {
                id: mockConnectedAccountId,
                provider: _types.ConnectedAccountProvider.SAML,
                accessToken: mockEncryptedAccessToken,
                refreshToken: mockEncryptedRefreshToken,
                lastCredentialsRefreshedAt: null
            };
            const result = await service.resolveTokens(connectedAccount, mockWorkspaceId);
            expect(result).toEqual({
                accessToken: mockEncryptedAccessToken,
                refreshToken: mockEncryptedRefreshToken
            });
            expect(connectedAccountTokenEncryptionService.decrypt).not.toHaveBeenCalled();
            expect(googleAPIRefreshAccessTokenService.refreshTokens).not.toHaveBeenCalled();
            expect(microsoftAPIRefreshAccessTokenService.refreshTokens).not.toHaveBeenCalled();
            expect(connectedAccountRepository.update).not.toHaveBeenCalled();
        });
    });
});

//# sourceMappingURL=connected-account-refresh-tokens.service.spec.js.map