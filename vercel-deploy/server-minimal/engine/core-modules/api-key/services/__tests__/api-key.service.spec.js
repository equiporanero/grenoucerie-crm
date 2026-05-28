"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _apikeyentity = require("../../api-key.entity");
const _apikeyexception = require("../../exceptions/api-key.exception");
const _apikeyroleservice = require("../api-key-role.service");
const _apikeyservice = require("../api-key.service");
const _authcontexttype = require("../../../auth/types/auth-context.type");
const _jwtwrapperservice = require("../../../jwt/services/jwt-wrapper.service");
const _roletargetentity = require("../../../../metadata-modules/role-target/role-target.entity");
const _roletargetservice = require("../../../../metadata-modules/role-target/services/role-target.service");
const _getworkspacescopedrepositorytokenutil = require("../../../../twenty-orm/workspace-scoped-repository/get-workspace-scoped-repository-token.util");
const _workspacecacheservice = require("../../../../workspace-cache/services/workspace-cache.service");
describe('ApiKeyService', ()=>{
    let service;
    let mockApiKeyRepository;
    let mockroleTargetRepository;
    let mockJwtWrapperService;
    let mockApiKeyRoleService;
    let mockRoleTargetService;
    let mockDataSource;
    const mockWorkspaceId = 'workspace-123';
    const mockApiKeyId = 'api-key-456';
    const mockApiKey = {
        id: mockApiKeyId,
        name: 'Test API Key',
        expiresAt: new Date('2030-12-31'),
        revokedAt: undefined,
        workspaceId: mockWorkspaceId,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        workspace: {}
    };
    const mockRevokedApiKey = {
        ...mockApiKey,
        id: 'revoked-api-key',
        revokedAt: new Date('2024-06-01')
    };
    const mockExpiredApiKey = {
        ...mockApiKey,
        id: 'expired-api-key',
        expiresAt: new Date('2024-01-01')
    };
    beforeEach(async ()=>{
        mockApiKeyRepository = {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn()
        };
        mockroleTargetRepository = {
            delete: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn()
        };
        mockJwtWrapperService = {
            signAsyncOrThrow: jest.fn()
        };
        mockApiKeyRoleService = {
            recomputeCache: jest.fn(),
            assignRoleToApiKey: jest.fn(),
            assignRoleToApiKeyWithManager: jest.fn()
        };
        mockRoleTargetService = {
            create: jest.fn()
        };
        mockDataSource = {
            transaction: jest.fn()
        };
        const module = await _testing.Test.createTestingModule({
            providers: [
                _apikeyservice.ApiKeyService,
                {
                    provide: (0, _getworkspacescopedrepositorytokenutil.getWorkspaceScopedRepositoryToken)(_apikeyentity.ApiKeyEntity),
                    useValue: mockApiKeyRepository
                },
                {
                    provide: _jwtwrapperservice.JwtWrapperService,
                    useValue: mockJwtWrapperService
                },
                {
                    provide: _roletargetservice.RoleTargetService,
                    useValue: mockRoleTargetService
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_roletargetentity.RoleTargetEntity),
                    useValue: mockroleTargetRepository
                },
                {
                    provide: _apikeyroleservice.ApiKeyRoleService,
                    useValue: mockApiKeyRoleService
                },
                {
                    provide: (0, _typeorm.getDataSourceToken)(),
                    useValue: mockDataSource
                },
                {
                    provide: _workspacecacheservice.WorkspaceCacheService,
                    useValue: {
                        invalidateAndRecompute: jest.fn()
                    }
                }
            ]
        }).compile();
        service = module.get(_apikeyservice.ApiKeyService);
    });
    afterEach(()=>{
        jest.clearAllMocks();
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
    describe('create', ()=>{
        it('should create and save an API key and assign role', async ()=>{
            const apiKeyData = {
                name: 'New API Key',
                expiresAt: new Date('2025-12-31'),
                workspaceId: mockWorkspaceId,
                roleId: 'mock-role-id'
            };
            const expectedApiKeyFields = {
                name: 'New API Key',
                expiresAt: new Date('2025-12-31')
            };
            mockApiKeyRepository.save.mockResolvedValue(mockApiKey);
            mockRoleTargetService.create.mockResolvedValue(undefined);
            const result = await service.create(apiKeyData);
            expect(mockApiKeyRepository.save).toHaveBeenCalledWith(mockWorkspaceId, expectedApiKeyFields);
            expect(mockRoleTargetService.create).toHaveBeenCalledWith({
                createRoleTargetInput: {
                    roleId: 'mock-role-id',
                    targetId: mockApiKey.id,
                    targetMetadataForeignKey: 'apiKeyId'
                },
                workspaceId: mockWorkspaceId
            });
            expect(result).toEqual(mockApiKey);
        });
        it('should delete API key if role assignment fails', async ()=>{
            const apiKeyData = {
                name: 'New API Key',
                expiresAt: new Date('2025-12-31'),
                workspaceId: mockWorkspaceId,
                roleId: 'mock-role-id'
            };
            mockApiKeyRepository.save.mockResolvedValue(mockApiKey);
            mockApiKeyRepository.delete = jest.fn().mockResolvedValue(undefined);
            mockRoleTargetService.create.mockRejectedValue(new Error('Role assignment failed'));
            await expect(service.create(apiKeyData)).rejects.toThrow('Role assignment failed');
            expect(mockApiKeyRepository.save).toHaveBeenCalled();
            expect(mockRoleTargetService.create).toHaveBeenCalled();
            expect(mockApiKeyRepository.delete).toHaveBeenCalledWith(mockWorkspaceId, {
                id: mockApiKey.id
            });
        });
        it('should handle save failures gracefully', async ()=>{
            const apiKeyData = {
                name: 'New API Key',
                expiresAt: new Date('2025-12-31'),
                workspaceId: mockWorkspaceId,
                roleId: 'mock-role-id'
            };
            mockApiKeyRepository.save.mockRejectedValue(new Error('Save failed'));
            await expect(service.create(apiKeyData)).rejects.toThrow('Save failed');
            expect(mockApiKeyRepository.save).toHaveBeenCalled();
            expect(mockRoleTargetService.create).not.toHaveBeenCalled();
        });
    });
    describe('findById', ()=>{
        it('should find an API key by ID and workspace ID', async ()=>{
            mockApiKeyRepository.findOne.mockResolvedValue(mockApiKey);
            const result = await service.findById(mockApiKeyId, mockWorkspaceId);
            expect(mockApiKeyRepository.findOne).toHaveBeenCalledWith(mockWorkspaceId, {
                where: {
                    id: mockApiKeyId
                }
            });
            expect(result).toEqual(mockApiKey);
        });
        it('should return null if API key not found', async ()=>{
            mockApiKeyRepository.findOne.mockResolvedValue(null);
            const result = await service.findById('non-existent', mockWorkspaceId);
            expect(result).toBeNull();
        });
    });
    describe('findByWorkspaceId', ()=>{
        it('should find all API keys for a workspace', async ()=>{
            const mockApiKeys = [
                mockApiKey,
                {
                    ...mockApiKey,
                    id: 'another-key'
                }
            ];
            mockApiKeyRepository.find.mockResolvedValue(mockApiKeys);
            const result = await service.findByWorkspaceId(mockWorkspaceId);
            expect(mockApiKeyRepository.find).toHaveBeenCalledWith(mockWorkspaceId);
            expect(result).toEqual(mockApiKeys);
        });
    });
    describe('findActiveByWorkspaceId', ()=>{
        it('should find only active (non-revoked) API keys', async ()=>{
            const activeApiKeys = [
                mockApiKey
            ];
            mockApiKeyRepository.find.mockResolvedValue(activeApiKeys);
            const result = await service.findActiveByWorkspaceId(mockWorkspaceId);
            expect(mockApiKeyRepository.find).toHaveBeenCalledWith(mockWorkspaceId, {
                where: {
                    revokedAt: (0, _typeorm1.IsNull)()
                }
            });
            expect(result).toEqual(activeApiKeys);
        });
    });
    describe('update', ()=>{
        it('should update an existing API key', async ()=>{
            const updateData = {
                name: 'Updated API Key'
            };
            const updatedApiKey = {
                ...mockApiKey,
                ...updateData
            };
            mockApiKeyRepository.findOne.mockResolvedValueOnce(mockApiKey).mockResolvedValueOnce(updatedApiKey);
            mockApiKeyRepository.update.mockResolvedValue({
                affected: 1
            });
            const result = await service.update(mockApiKeyId, mockWorkspaceId, updateData);
            expect(mockApiKeyRepository.update).toHaveBeenCalledWith(mockWorkspaceId, {
                id: mockApiKeyId
            }, updateData);
            expect(result).toEqual(updatedApiKey);
        });
        it('should return null if API key to update does not exist', async ()=>{
            mockApiKeyRepository.findOne.mockResolvedValue(null);
            const result = await service.update('non-existent', mockWorkspaceId, {
                name: 'Updated'
            });
            expect(mockApiKeyRepository.update).not.toHaveBeenCalled();
            expect(result).toBeNull();
        });
    });
    describe('revoke', ()=>{
        it('should revoke an API key by setting revokedAt', async ()=>{
            const revokedApiKey = {
                ...mockApiKey,
                revokedAt: new Date()
            };
            mockApiKeyRepository.findOne.mockResolvedValueOnce(mockApiKey).mockResolvedValueOnce(revokedApiKey);
            mockApiKeyRepository.update.mockResolvedValue({
                affected: 1
            });
            const result = await service.revoke(mockApiKeyId, mockWorkspaceId);
            expect(mockApiKeyRepository.update).toHaveBeenCalledWith(mockWorkspaceId, {
                id: mockApiKeyId
            }, expect.objectContaining({
                revokedAt: expect.any(Date)
            }));
            expect(result).toEqual(revokedApiKey);
        });
    });
    describe('validateApiKey', ()=>{
        it('should validate an active API key', async ()=>{
            mockApiKeyRepository.findOne.mockResolvedValue(mockApiKey);
            const result = await service.validateApiKey(mockApiKeyId, mockWorkspaceId);
            expect(result).toEqual(mockApiKey);
        });
        it('should throw ApiKeyException if API key does not exist', async ()=>{
            mockApiKeyRepository.findOne.mockResolvedValue(null);
            await expect(service.validateApiKey('non-existent', mockWorkspaceId)).rejects.toThrow(_apikeyexception.ApiKeyException);
            await expect(service.validateApiKey('non-existent', mockWorkspaceId)).rejects.toMatchObject({
                code: _apikeyexception.ApiKeyExceptionCode.API_KEY_NOT_FOUND
            });
        });
        it('should throw ApiKeyException if API key is revoked', async ()=>{
            mockApiKeyRepository.findOne.mockResolvedValue(mockRevokedApiKey);
            await expect(service.validateApiKey(mockRevokedApiKey.id, mockWorkspaceId)).rejects.toThrow(_apikeyexception.ApiKeyException);
            await expect(service.validateApiKey(mockRevokedApiKey.id, mockWorkspaceId)).rejects.toMatchObject({
                code: _apikeyexception.ApiKeyExceptionCode.API_KEY_REVOKED
            });
        });
        it('should throw ApiKeyException if API key is expired', async ()=>{
            mockApiKeyRepository.findOne.mockResolvedValue(mockExpiredApiKey);
            await expect(service.validateApiKey(mockExpiredApiKey.id, mockWorkspaceId)).rejects.toThrow(_apikeyexception.ApiKeyException);
            await expect(service.validateApiKey(mockExpiredApiKey.id, mockWorkspaceId)).rejects.toMatchObject({
                code: _apikeyexception.ApiKeyExceptionCode.API_KEY_EXPIRED
            });
        });
    });
    describe('generateApiKeyToken', ()=>{
        const mockToken = 'mock-jwt-token';
        beforeEach(()=>{
            mockJwtWrapperService.signAsyncOrThrow.mockResolvedValue(mockToken);
        });
        it('should generate a JWT token for a valid API key', async ()=>{
            mockApiKeyRepository.findOne.mockResolvedValue(mockApiKey);
            const expiresAt = new Date('2025-12-31');
            const result = await service.generateApiKeyToken(mockWorkspaceId, mockApiKeyId, expiresAt);
            expect(mockJwtWrapperService.signAsyncOrThrow).toHaveBeenCalledWith({
                sub: mockWorkspaceId,
                type: _authcontexttype.JwtTokenTypeEnum.API_KEY,
                workspaceId: mockWorkspaceId
            }, {
                expiresIn: expect.any(Number),
                jwtid: mockApiKeyId
            });
            expect(result).toEqual({
                token: mockToken
            });
        });
        it('should return undefined if no API key ID provided', async ()=>{
            const result = await service.generateApiKeyToken(mockWorkspaceId);
            expect(result).toBeUndefined();
            expect(mockJwtWrapperService.signAsyncOrThrow).not.toHaveBeenCalled();
        });
        it('should use default expiration if no expiresAt provided', async ()=>{
            mockApiKeyRepository.findOne.mockResolvedValue(mockApiKey);
            await service.generateApiKeyToken(mockWorkspaceId, mockApiKeyId);
            expect(mockJwtWrapperService.signAsyncOrThrow).toHaveBeenCalledWith(expect.any(Object), expect.objectContaining({
                expiresIn: '100y'
            }));
        });
        it('should use custom expiration time if provided', async ()=>{
            mockApiKeyRepository.findOne.mockResolvedValue(mockApiKey);
            const expiresAt = new Date(Date.now() + 3600000); // 1 hour from now
            await service.generateApiKeyToken(mockWorkspaceId, mockApiKeyId, expiresAt);
            expect(mockJwtWrapperService.signAsyncOrThrow).toHaveBeenCalledWith({
                sub: mockWorkspaceId,
                type: _authcontexttype.JwtTokenTypeEnum.API_KEY,
                workspaceId: mockWorkspaceId
            }, expect.objectContaining({
                expiresIn: expect.any(Number),
                jwtid: mockApiKeyId
            }));
        });
    });
    describe('utility methods', ()=>{
        describe('isExpired', ()=>{
            it('should return true for expired API key', ()=>{
                const result = service.isExpired(mockExpiredApiKey);
                expect(result).toBe(true);
            });
            it('should return false for non-expired API key', ()=>{
                const result = service.isExpired(mockApiKey);
                expect(result).toBe(false);
            });
        });
        describe('isRevoked', ()=>{
            it('should return true for revoked API key', ()=>{
                const result = service.isRevoked(mockRevokedApiKey);
                expect(result).toBe(true);
            });
            it('should return false for non-revoked API key', ()=>{
                const result = service.isRevoked(mockApiKey);
                expect(result).toBe(false);
            });
        });
        describe('isActive', ()=>{
            it('should return true for active API key', ()=>{
                const result = service.isActive(mockApiKey);
                expect(result).toBe(true);
            });
            it('should return false for revoked API key', ()=>{
                const result = service.isActive(mockRevokedApiKey);
                expect(result).toBe(false);
            });
            it('should return false for expired API key', ()=>{
                const result = service.isActive(mockExpiredApiKey);
                expect(result).toBe(false);
            });
        });
    });
});

//# sourceMappingURL=api-key.service.spec.js.map