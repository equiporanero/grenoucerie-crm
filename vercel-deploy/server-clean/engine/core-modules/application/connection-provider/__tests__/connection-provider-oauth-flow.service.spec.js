"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _connectionprovideroauthflowservice = require("../connection-provider-oauth-flow.service");
const _connectionproviderservice = require("../connection-provider.service");
const _authcontexttype = require("../../../auth/types/auth-context.type");
const _jwtwrapperservice = require("../../../jwt/services/jwt-wrapper.service");
const _securehttpclientservice = require("../../../secure-http-client/secure-http-client.service");
const _twentyconfigservice = require("../../../twenty-config/twenty-config.service");
const _secretencryptionconstant = require("../../../secret-encryption/constants/secret-encryption.constant");
const _connectedaccountentity = require("../../../../metadata-modules/connected-account/entities/connected-account.entity");
const _connectedaccounttokenencryptionservice = require("../../../../metadata-modules/connected-account/services/connected-account-token-encryption.service");
// SecureHttpClientService transitively depends on `@lifeomic/axios-fetch`,
// which is an optional native-binding dep that's flaky in some test envs.
// We never use the real implementation here (the test always injects a
// mock via `useValue`), so stub the module to avoid loading the dep at all.
jest.mock('src/engine/core-modules/secure-http-client/secure-http-client.service', ()=>({
        SecureHttpClientService: class {
        }
    }));
const FAKE_CIPHER_PREFIX = `${_secretencryptionconstant.SECRET_ENCRYPTION_ENVELOPE_V2_PREFIX}keyid:`;
describe('ConnectionProviderOAuthFlowService', ()=>{
    let service;
    let connectionProviderService;
    let jwtWrapperService;
    let secureHttpClientService;
    let connectedAccountRepository;
    const baseProvider = {
        id: 'provider-1',
        universalIdentifier: 'provider-uid',
        applicationId: 'app-1',
        workspaceId: 'workspace-1',
        name: 'linear',
        displayName: 'Linear',
        type: 'oauth',
        oauthConfig: {
            authorizationEndpoint: 'https://linear.app/oauth/authorize',
            tokenEndpoint: 'https://api.linear.app/oauth/token',
            revokeEndpoint: null,
            scopes: [
                'read',
                'write'
            ],
            clientIdVariable: 'LINEAR_CLIENT_ID',
            clientSecretVariable: 'LINEAR_CLIENT_SECRET',
            authorizationParams: null,
            tokenRequestContentType: 'form-urlencoded',
            usePkce: false
        },
        createdAt: new Date(),
        updatedAt: new Date()
    };
    beforeEach(async ()=>{
        connectionProviderService = {
            findOneByIdOrThrow: jest.fn(),
            getClientCredentials: jest.fn(async ()=>({
                    clientId: 'lin_client_id',
                    clientSecret: 'lin_client_secret'
                }))
        };
        jwtWrapperService = {
            signAsyncOrThrow: jest.fn(),
            verifyJwtToken: jest.fn()
        };
        secureHttpClientService = {
            createSsrfSafeFetch: jest.fn()
        };
        connectedAccountRepository = {
            count: jest.fn(async ()=>0),
            update: jest.fn(),
            create: jest.fn((entity)=>entity),
            save: jest.fn(async (entity)=>({
                    ...entity,
                    id: 'new-account-id'
                })),
            findOne: jest.fn(async ()=>null),
            findOneByOrFail: jest.fn(async ({ id })=>({
                    id,
                    provider: _types.ConnectedAccountProvider.APP
                }))
        };
        const module = await _testing.Test.createTestingModule({
            providers: [
                _connectionprovideroauthflowservice.ConnectionProviderOAuthFlowService,
                {
                    provide: _connectionproviderservice.ConnectionProviderService,
                    useValue: connectionProviderService
                },
                {
                    provide: _jwtwrapperservice.JwtWrapperService,
                    useValue: jwtWrapperService
                },
                {
                    provide: _securehttpclientservice.SecureHttpClientService,
                    useValue: secureHttpClientService
                },
                {
                    provide: _twentyconfigservice.TwentyConfigService,
                    useValue: {
                        get: jest.fn(()=>'https://api.example.com')
                    }
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_connectedaccountentity.ConnectedAccountEntity),
                    useValue: connectedAccountRepository
                },
                {
                    // Real prefix/round-trip behavior is asserted in
                    // connected-account-token-encryption.service.spec.ts; here we use a
                    // CIPHER(...) wrapper so assertions can match exact ciphertext.
                    provide: _connectedaccounttokenencryptionservice.ConnectedAccountTokenEncryptionService,
                    useValue: {
                        encryptTokenPair: jest.fn(({ accessToken, refreshToken })=>({
                                encryptedAccessToken: `${FAKE_CIPHER_PREFIX}CIPHER(${accessToken})`,
                                encryptedRefreshToken: (0, _utils.isDefined)(refreshToken) ? `${FAKE_CIPHER_PREFIX}CIPHER(${refreshToken})` : null
                            }))
                    }
                }
            ]
        }).compile();
        service = module.get(_connectionprovideroauthflowservice.ConnectionProviderOAuthFlowService);
    });
    afterEach(()=>jest.clearAllMocks());
    describe('startAuthorizationFlow', ()=>{
        it('builds the provider authorization URL with the workspace + visibility context signed into state', async ()=>{
            jwtWrapperService.signAsyncOrThrow.mockResolvedValue('signed-state-token');
            const { authorizationUrl } = await service.startAuthorizationFlow({
                connectionProvider: baseProvider,
                workspaceId: 'workspace-1',
                userId: 'user-1',
                userWorkspaceId: 'uws-1',
                visibility: 'user',
                reconnectingConnectedAccountId: null,
                redirectLocation: null
            });
            const url = new URL(authorizationUrl);
            expect(url.origin + url.pathname).toBe('https://linear.app/oauth/authorize');
            expect(url.searchParams.get('client_id')).toBe('lin_client_id');
            expect(url.searchParams.get('response_type')).toBe('code');
            // OAuth-standard `scope` (plural meaning) - these are the upstream
            // permissions we're requesting, unrelated to the row-visibility field.
            expect(url.searchParams.get('scope')).toBe('read write');
            expect(url.searchParams.get('state')).toBe('signed-state-token');
            expect(url.searchParams.get('redirect_uri')).toBe('https://api.example.com/apps/oauth/callback');
            expect(url.searchParams.has('code_challenge')).toBe(false);
            // signed payload carries workspace identity for the callback to use
            expect(jwtWrapperService.signAsyncOrThrow).toHaveBeenCalledWith(expect.objectContaining({
                type: _authcontexttype.JwtTokenTypeEnum.APP_OAUTH_STATE,
                workspaceId: 'workspace-1',
                connectionProviderId: 'provider-1',
                visibility: 'user',
                reconnectingConnectedAccountId: null
            }), expect.objectContaining({
                expiresIn: expect.any(String)
            }));
        });
        it('emits PKCE challenge params when usePkce is enabled', async ()=>{
            jwtWrapperService.signAsyncOrThrow.mockResolvedValue('signed-state');
            const { authorizationUrl } = await service.startAuthorizationFlow({
                connectionProvider: {
                    ...baseProvider,
                    oauthConfig: {
                        ...baseProvider.oauthConfig,
                        usePkce: true
                    }
                },
                workspaceId: 'workspace-1',
                userId: 'user-1',
                userWorkspaceId: 'uws-1',
                visibility: 'user',
                reconnectingConnectedAccountId: null,
                redirectLocation: null
            });
            const url = new URL(authorizationUrl);
            expect(url.searchParams.get('code_challenge_method')).toBe('S256');
            expect(url.searchParams.get('code_challenge')).toMatch(/^[\w-]+$/);
        });
        describe('reconnect target validation', ()=>{
            // Cross-workspace reconnect was a real bug: the persist UPDATE filtered
            // by (id, workspaceId) so it wrote nothing, but the subsequent
            // findOneByOrFail({ id }) returned the foreign-workspace row with stale
            // tokens, making the reconnect look successful. Catch it at authorize
            // time before the upstream OAuth round-trip.
            const validateArgs = {
                connectionProvider: baseProvider,
                workspaceId: 'workspace-1',
                userId: 'user-1',
                userWorkspaceId: 'uws-1',
                visibility: 'user',
                redirectLocation: null
            };
            it('throws FORBIDDEN when reconnecting an id that lives in another workspace', async ()=>{
                connectedAccountRepository.findOne.mockResolvedValue(null);
                const error = await service.startAuthorizationFlow({
                    ...validateArgs,
                    reconnectingConnectedAccountId: 'foreign-account-id'
                }).catch((caught)=>caught);
                expect(error).toMatchObject({
                    code: 'FORBIDDEN'
                });
                expect(error.message).toContain('foreign-account-id');
                expect(connectedAccountRepository.findOne).toHaveBeenCalledWith({
                    where: {
                        id: 'foreign-account-id',
                        workspaceId: 'workspace-1',
                        connectionProviderId: 'provider-1'
                    }
                });
                // No state JWT signed, no upstream URL built.
                expect(jwtWrapperService.signAsyncOrThrow).not.toHaveBeenCalled();
            });
            it('throws FORBIDDEN when reconnecting an id that belongs to a different provider in the same workspace', async ()=>{
                // findOne with the provider filter returns null even though the row
                // exists in this workspace under a different provider.
                connectedAccountRepository.findOne.mockResolvedValue(null);
                await expect(service.startAuthorizationFlow({
                    ...validateArgs,
                    reconnectingConnectedAccountId: 'wrong-provider-account-id'
                })).rejects.toMatchObject({
                    code: 'FORBIDDEN'
                });
            });
            it('proceeds when the reconnect target matches workspace and provider', async ()=>{
                connectedAccountRepository.findOne.mockResolvedValue({
                    id: 'existing-account-id',
                    workspaceId: 'workspace-1',
                    connectionProviderId: 'provider-1'
                });
                jwtWrapperService.signAsyncOrThrow.mockResolvedValue('state');
                const { authorizationUrl } = await service.startAuthorizationFlow({
                    ...validateArgs,
                    reconnectingConnectedAccountId: 'existing-account-id'
                });
                expect(new URL(authorizationUrl).searchParams.get('state')).toBe('state');
                expect(jwtWrapperService.signAsyncOrThrow).toHaveBeenCalled();
            });
            it('skips the lookup entirely when reconnectingConnectedAccountId is null', async ()=>{
                jwtWrapperService.signAsyncOrThrow.mockResolvedValue('state');
                await service.startAuthorizationFlow({
                    ...validateArgs,
                    reconnectingConnectedAccountId: null
                });
                expect(connectedAccountRepository.findOne).not.toHaveBeenCalled();
            });
        });
    });
    describe('completeAuthorizationFlow', ()=>{
        const stateClaims = {
            sub: 'provider-1',
            type: _authcontexttype.JwtTokenTypeEnum.APP_OAUTH_STATE,
            connectionProviderId: 'provider-1',
            workspaceId: 'workspace-1',
            userId: 'user-1',
            userWorkspaceId: 'uws-1',
            visibility: 'user',
            reconnectingConnectedAccountId: null,
            redirectLocation: null,
            codeVerifier: null
        };
        const successfulTokenResponse = {
            ok: true,
            status: 200,
            json: async ()=>({
                    access_token: 'new_access',
                    refresh_token: 'new_refresh',
                    scope: 'read write'
                }),
            text: async ()=>''
        };
        beforeEach(()=>{
            jwtWrapperService.verifyJwtToken.mockResolvedValue(stateClaims);
            connectionProviderService.findOneByIdOrThrow.mockResolvedValue(baseProvider);
            secureHttpClientService.createSsrfSafeFetch.mockReturnValue(jest.fn(async ()=>successfulTokenResponse));
        });
        it('always creates a new ConnectedAccount when no reconnect id is supplied', async ()=>{
            const result = await service.completeAuthorizationFlow({
                code: 'auth_code',
                state: 'signed-state'
            });
            expect(result.connectedAccountId).toBe('new-account-id');
            expect(result.workspaceId).toBe('workspace-1');
            expect(result.applicationId).toBe('app-1');
            // Encrypt-at-receipt: the entity must never hold the IDP plaintext.
            expect(connectedAccountRepository.create).toHaveBeenCalledWith(expect.objectContaining({
                provider: _types.ConnectedAccountProvider.APP,
                accessToken: `${FAKE_CIPHER_PREFIX}CIPHER(new_access)`,
                refreshToken: `${FAKE_CIPHER_PREFIX}CIPHER(new_refresh)`,
                connectionProviderId: 'provider-1',
                applicationId: 'app-1',
                workspaceId: 'workspace-1',
                userWorkspaceId: 'uws-1',
                visibility: 'user'
            }));
            expect(connectedAccountRepository.save).toHaveBeenCalled();
            expect(connectedAccountRepository.update).not.toHaveBeenCalled();
        });
        it('updates the existing ConnectedAccount when reconnectingConnectedAccountId is supplied', async ()=>{
            jwtWrapperService.verifyJwtToken.mockResolvedValue({
                ...stateClaims,
                reconnectingConnectedAccountId: 'existing-account-id'
            });
            const result = await service.completeAuthorizationFlow({
                code: 'auth_code',
                state: 'signed-state'
            });
            expect(result.connectedAccountId).toBe('existing-account-id');
            expect(connectedAccountRepository.update).toHaveBeenCalledWith({
                id: 'existing-account-id',
                workspaceId: 'workspace-1'
            }, expect.objectContaining({
                accessToken: `${FAKE_CIPHER_PREFIX}CIPHER(new_access)`,
                refreshToken: `${FAKE_CIPHER_PREFIX}CIPHER(new_refresh)`,
                authFailedAt: null,
                visibility: 'user'
            }));
            // Defense-in-depth: the post-update read MUST also be workspace-scoped,
            // otherwise a foreign-id that slipped past the authorize-time guard
            // would still surface stale fields from another workspace.
            expect(connectedAccountRepository.findOneByOrFail).toHaveBeenCalledWith({
                id: 'existing-account-id',
                workspaceId: 'workspace-1'
            });
            expect(connectedAccountRepository.create).not.toHaveBeenCalled();
        });
        it('updates visibility on an existing ConnectedAccount when reconnecting', async ()=>{
            jwtWrapperService.verifyJwtToken.mockResolvedValue({
                ...stateClaims,
                visibility: 'workspace',
                reconnectingConnectedAccountId: 'existing-account-id'
            });
            await service.completeAuthorizationFlow({
                code: 'auth_code',
                state: 'signed-state'
            });
            expect(connectedAccountRepository.update).toHaveBeenCalledWith({
                id: 'existing-account-id',
                workspaceId: 'workspace-1'
            }, expect.objectContaining({
                visibility: 'workspace'
            }));
        });
        it('persists the workspace visibility when state asks for it', async ()=>{
            jwtWrapperService.verifyJwtToken.mockResolvedValue({
                ...stateClaims,
                visibility: 'workspace'
            });
            await service.completeAuthorizationFlow({
                code: 'auth_code',
                state: 'signed-state'
            });
            expect(connectedAccountRepository.create).toHaveBeenCalledWith(expect.objectContaining({
                visibility: 'workspace'
            }));
        });
        it('rejects an invalid state', async ()=>{
            jwtWrapperService.verifyJwtToken.mockRejectedValue(new Error('JWT expired'));
            await expect(service.completeAuthorizationFlow({
                code: 'auth_code',
                state: 'bad-state'
            })).rejects.toThrow(/state/);
        });
    });
});

//# sourceMappingURL=connection-provider-oauth-flow.service.spec.js.map