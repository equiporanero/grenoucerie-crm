"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _crypto = require("crypto");
const _authexception = require("../auth.exception");
const _authcontexttype = require("../types/auth-context.type");
const _workspaceentity = require("../../workspace/workspace.entity");
const _jwtauthstrategy = require("./jwt.auth.strategy");
describe('JwtAuthStrategy', ()=>{
    let strategy;
    let userWorkspaceRepository;
    let applicationRepository;
    let jwtWrapperService;
    let permissionsService;
    let workspaceCacheService;
    let coreEntityCacheService;
    const jwt = {
        sub: 'sub-default',
        jti: 'jti-default'
    };
    let workspaceStore;
    let userStore;
    let apiKeyStore;
    beforeEach(()=>{
        workspaceStore = {};
        userStore = {};
        apiKeyStore = {};
        userWorkspaceRepository = {
            findOne: jest.fn()
        };
        applicationRepository = {
            findOne: jest.fn()
        };
        jwtWrapperService = {
            extractJwtFromRequest: jest.fn(()=>()=>'token'),
            resolveVerificationKey: jest.fn(async ()=>({
                    key: 'mock-key',
                    algorithm: 'HS256'
                }))
        };
        permissionsService = {
            userHasWorkspaceSettingPermission: jest.fn()
        };
        workspaceCacheService = {
            getOrRecompute: jest.fn(async (workspaceId, cacheKeys)=>{
                const result = {};
                if (cacheKeys.includes('flatWorkspaceMemberMaps')) {
                    result.flatWorkspaceMemberMaps = {
                        byId: {
                            'workspace-member-id': {
                                id: 'workspace-member-id',
                                userId: 'valid-user-id',
                                workspaceId: 'workspace-id',
                                createdAt: new Date(),
                                updatedAt: new Date(),
                                deletedAt: null
                            }
                        },
                        idByUserId: {
                            'valid-user-id': 'workspace-member-id'
                        }
                    };
                }
                if (cacheKeys.includes('apiKeyMap')) {
                    result.apiKeyMap = apiKeyStore[workspaceId] ?? {};
                }
                return result;
            })
        };
        coreEntityCacheService = {
            get: jest.fn(async (keyName, entityId)=>{
                if (keyName === 'workspaceEntity') {
                    return workspaceStore[entityId] ?? null;
                }
                if (keyName === 'user') {
                    return userStore[entityId] ?? null;
                }
                if (keyName === 'userWorkspaceEntity') {
                    return userWorkspaceRepository.findOne({
                        where: {
                            id: entityId
                        }
                    });
                }
                return null;
            }),
            invalidate: jest.fn()
        };
    });
    afterEach(()=>{
        jest.clearAllMocks();
    });
    const createStrategy = ()=>new _jwtauthstrategy.JwtAuthStrategy(jwtWrapperService, applicationRepository, userWorkspaceRepository, permissionsService, workspaceCacheService, coreEntityCacheService);
    describe('API_KEY validation', ()=>{
        it('should throw AuthException if type is API_KEY and workspace is not found', async ()=>{
            const payload = {
                ...jwt,
                type: _authcontexttype.JwtTokenTypeEnum.API_KEY
            };
            strategy = createStrategy();
            await expect(strategy.validate(payload)).rejects.toThrow(new _authexception.AuthException('Workspace not found', _authexception.AuthExceptionCode.WORKSPACE_NOT_FOUND));
        });
        it('should throw AuthExceptionCode if type is API_KEY not found', async ()=>{
            const payload = {
                ...jwt,
                type: _authcontexttype.JwtTokenTypeEnum.API_KEY
            };
            const mockWorkspace = new _workspaceentity.WorkspaceEntity();
            mockWorkspace.id = 'workspace-id';
            workspaceStore[payload.sub] = mockWorkspace;
            apiKeyStore['workspace-id'] = {};
            strategy = createStrategy();
            await expect(strategy.validate(payload)).rejects.toThrow(new _authexception.AuthException('This API Key is revoked', _authexception.AuthExceptionCode.FORBIDDEN_EXCEPTION));
        });
        it('should throw AuthExceptionCode if API_KEY is revoked', async ()=>{
            const payload = {
                ...jwt,
                type: _authcontexttype.JwtTokenTypeEnum.API_KEY
            };
            const mockWorkspace = new _workspaceentity.WorkspaceEntity();
            mockWorkspace.id = 'workspace-id';
            workspaceStore[payload.sub] = mockWorkspace;
            apiKeyStore['workspace-id'] = {
                [payload.jti]: {
                    id: 'api-key-id',
                    revokedAt: new Date()
                }
            };
            strategy = createStrategy();
            await expect(strategy.validate(payload)).rejects.toThrow(new _authexception.AuthException('This API Key is revoked', _authexception.AuthExceptionCode.FORBIDDEN_EXCEPTION));
        });
        it('should be truthy if type is API_KEY and API_KEY is not revoked', async ()=>{
            const payload = {
                ...jwt,
                type: _authcontexttype.JwtTokenTypeEnum.API_KEY
            };
            const mockWorkspace = new _workspaceentity.WorkspaceEntity();
            mockWorkspace.id = 'workspace-id';
            workspaceStore[payload.sub] = mockWorkspace;
            apiKeyStore['workspace-id'] = {
                [payload.jti]: {
                    id: 'api-key-id',
                    revokedAt: null
                }
            };
            strategy = createStrategy();
            const result = await strategy.validate(payload);
            expect(result).toBeTruthy();
            expect(result.apiKey?.id).toBe('api-key-id');
        });
    });
    describe('ACCESS token validation', ()=>{
        it('should throw AuthExceptionCode if type is ACCESS, no jti, and user not found', async ()=>{
            const validUserId = 'valid-user-id';
            const validUserWorkspaceId = (0, _crypto.randomUUID)();
            const validWorkspaceId = (0, _crypto.randomUUID)();
            const payload = {
                sub: validUserId,
                type: _authcontexttype.JwtTokenTypeEnum.ACCESS,
                userWorkspaceId: validUserWorkspaceId,
                workspaceId: validWorkspaceId
            };
            workspaceStore[validWorkspaceId] = new _workspaceentity.WorkspaceEntity();
            strategy = createStrategy();
            await expect(strategy.validate(payload)).rejects.toThrow(new _authexception.AuthException('User or user workspace not found', expect.any(String), {
                userFriendlyMessage: /*i18n*/ {
                    id: "l9dlVi",
                    message: "User does not have access to this workspace"
                }
            }));
            try {
                await strategy.validate(payload);
            } catch (e) {
                expect(e.code).toBe(_authexception.AuthExceptionCode.USER_NOT_FOUND);
            }
        });
        it('should throw AuthExceptionCode if type is ACCESS, no jti, and userWorkspace not found', async ()=>{
            const validUserId = 'valid-user-id';
            const validUserWorkspaceId = (0, _crypto.randomUUID)();
            const validWorkspaceId = (0, _crypto.randomUUID)();
            const payload = {
                sub: validUserId,
                type: _authcontexttype.JwtTokenTypeEnum.ACCESS,
                userWorkspaceId: validUserWorkspaceId,
                workspaceId: validWorkspaceId
            };
            workspaceStore[validWorkspaceId] = new _workspaceentity.WorkspaceEntity();
            userStore[validUserId] = {
                lastName: 'lastNameDefault'
            };
            userWorkspaceRepository.findOne.mockResolvedValue(null);
            strategy = createStrategy();
            await expect(strategy.validate(payload)).rejects.toThrow(new _authexception.AuthException('User or user workspace not found', expect.any(String), {
                userFriendlyMessage: /*i18n*/ {
                    id: "l9dlVi",
                    message: "User does not have access to this workspace"
                }
            }));
            try {
                await strategy.validate(payload);
            } catch (e) {
                expect(e.code).toBe(_authexception.AuthExceptionCode.USER_NOT_FOUND);
            }
        });
        it('should not throw if type is ACCESS, no jti, and user and userWorkspace exist', async ()=>{
            const validUserId = 'valid-user-id';
            const validUserWorkspaceId = (0, _crypto.randomUUID)();
            const validWorkspaceId = (0, _crypto.randomUUID)();
            const payload = {
                sub: validUserId,
                type: _authcontexttype.JwtTokenTypeEnum.ACCESS,
                userWorkspaceId: validUserWorkspaceId,
                workspaceId: validWorkspaceId
            };
            workspaceStore[validWorkspaceId] = new _workspaceentity.WorkspaceEntity();
            userStore[validUserId] = {
                id: validUserId,
                lastName: 'lastNameDefault'
            };
            coreEntityCacheService.get.mockImplementation(async (keyName, entityId)=>{
                if (keyName === 'workspaceEntity') {
                    return workspaceStore[entityId] ?? null;
                }
                if (keyName === 'user') {
                    return userStore[entityId] ?? null;
                }
                if (keyName === 'userWorkspaceEntity') {
                    return {
                        id: validUserWorkspaceId,
                        user: {
                            id: validUserId,
                            lastName: 'lastNameDefault'
                        },
                        workspace: {
                            id: validWorkspaceId
                        }
                    };
                }
                return null;
            });
            strategy = createStrategy();
            const user = await strategy.validate(payload);
            expect(user.user?.lastName).toBe('lastNameDefault');
            expect(user.userWorkspaceId).toBe(validUserWorkspaceId);
        });
    });
    describe('APPLICATION_ACCESS token validation', ()=>{
        it('should throw AuthExceptionCode if type is APPLICATION_ACCESS, and application not found', async ()=>{
            const validApplicationId = (0, _crypto.randomUUID)();
            const validWorkspaceId = (0, _crypto.randomUUID)();
            const payload = {
                sub: validApplicationId,
                type: _authcontexttype.JwtTokenTypeEnum.APPLICATION_ACCESS,
                applicationId: validApplicationId,
                workspaceId: validWorkspaceId
            };
            workspaceStore[validWorkspaceId] = new _workspaceentity.WorkspaceEntity();
            applicationRepository.findOne.mockResolvedValue(null);
            strategy = createStrategy();
            await expect(strategy.validate(payload)).rejects.toThrow(new _authexception.AuthException('Application not found', expect.any(String), {
                userFriendlyMessage: /*i18n*/ {
                    id: "ltvmAF",
                    message: "Application not found."
                }
            }));
            try {
                await strategy.validate(payload);
            } catch (e) {
                expect(e.code).toBe(_authexception.AuthExceptionCode.APPLICATION_NOT_FOUND);
            }
        });
    });
    describe('Impersonation validation', ()=>{
        it('should throw AuthException if impersonation token has missing impersonatorUserWorkspaceId', async ()=>{
            const validUserId = 'valid-user-id';
            const validUserWorkspaceId = (0, _crypto.randomUUID)();
            const validWorkspaceId = (0, _crypto.randomUUID)();
            const payload = {
                sub: validUserId,
                type: _authcontexttype.JwtTokenTypeEnum.ACCESS,
                userWorkspaceId: validUserWorkspaceId,
                workspaceId: validWorkspaceId,
                isImpersonating: true,
                impersonatedUserWorkspaceId: validUserWorkspaceId
            };
            const mockWorkspace = new _workspaceentity.WorkspaceEntity();
            mockWorkspace.id = validWorkspaceId;
            workspaceStore[validWorkspaceId] = mockWorkspace;
            userWorkspaceRepository.findOne.mockResolvedValue({
                id: validUserWorkspaceId,
                user: {
                    id: validUserId,
                    lastName: 'lastNameDefault'
                },
                workspace: {
                    id: validWorkspaceId
                }
            });
            strategy = createStrategy();
            await expect(strategy.validate(payload)).rejects.toThrow(new _authexception.AuthException('Invalid or missing user workspace ID in impersonation token', _authexception.AuthExceptionCode.FORBIDDEN_EXCEPTION));
        });
        it('should throw AuthException if impersonation token has missing impersonatedUserWorkspaceId', async ()=>{
            const validUserId = 'valid-user-id';
            const validUserWorkspaceId = (0, _crypto.randomUUID)();
            const validWorkspaceId = (0, _crypto.randomUUID)();
            const impersonatorUserWorkspaceId = (0, _crypto.randomUUID)();
            const payload = {
                sub: validUserId,
                type: _authcontexttype.JwtTokenTypeEnum.ACCESS,
                userWorkspaceId: validUserWorkspaceId,
                workspaceId: validWorkspaceId,
                isImpersonating: true,
                impersonatorUserWorkspaceId
            };
            const mockWorkspace = new _workspaceentity.WorkspaceEntity();
            mockWorkspace.id = validWorkspaceId;
            workspaceStore[validWorkspaceId] = mockWorkspace;
            userWorkspaceRepository.findOne.mockResolvedValue({
                id: validUserWorkspaceId,
                user: {
                    id: validUserId,
                    lastName: 'lastNameDefault'
                },
                workspace: {
                    id: validWorkspaceId
                }
            });
            strategy = createStrategy();
            await expect(strategy.validate(payload)).rejects.toThrow(new _authexception.AuthException('Invalid or missing user workspace ID in impersonation token', _authexception.AuthExceptionCode.FORBIDDEN_EXCEPTION));
        });
        it('should throw AuthException if user tries to impersonate themselves', async ()=>{
            const validUserId = 'valid-user-id';
            const validUserWorkspaceId = (0, _crypto.randomUUID)();
            const validWorkspaceId = (0, _crypto.randomUUID)();
            const payload = {
                sub: validUserId,
                type: _authcontexttype.JwtTokenTypeEnum.ACCESS,
                userWorkspaceId: validUserWorkspaceId,
                workspaceId: validWorkspaceId,
                isImpersonating: true,
                impersonatorUserWorkspaceId: validUserWorkspaceId,
                impersonatedUserWorkspaceId: validUserWorkspaceId
            };
            const mockWorkspace = new _workspaceentity.WorkspaceEntity();
            mockWorkspace.id = validWorkspaceId;
            workspaceStore[validWorkspaceId] = mockWorkspace;
            userWorkspaceRepository.findOne.mockResolvedValue({
                id: validUserWorkspaceId,
                user: {
                    id: validUserId,
                    lastName: 'lastNameDefault'
                },
                workspace: {
                    id: validWorkspaceId
                }
            });
            permissionsService.userHasWorkspaceSettingPermission.mockResolvedValue(true);
            strategy = createStrategy();
            await expect(strategy.validate(payload)).rejects.toThrow(new _authexception.AuthException('User cannot impersonate themselves', _authexception.AuthExceptionCode.FORBIDDEN_EXCEPTION));
        });
        it('should throw AuthException if impersonator user workspace not found', async ()=>{
            const validUserId = 'valid-user-id';
            const validUserWorkspaceId = (0, _crypto.randomUUID)();
            const validWorkspaceId = (0, _crypto.randomUUID)();
            const impersonatorUserWorkspaceId = (0, _crypto.randomUUID)();
            const payload = {
                sub: validUserId,
                type: _authcontexttype.JwtTokenTypeEnum.ACCESS,
                userWorkspaceId: validUserWorkspaceId,
                workspaceId: validWorkspaceId,
                isImpersonating: true,
                impersonatorUserWorkspaceId,
                impersonatedUserWorkspaceId: validUserWorkspaceId
            };
            const mockWorkspace = new _workspaceentity.WorkspaceEntity();
            mockWorkspace.id = validWorkspaceId;
            mockWorkspace.allowImpersonation = true;
            const mockUser = {
                id: validUserId,
                lastName: 'lastNameDefault'
            };
            workspaceStore[validWorkspaceId] = mockWorkspace;
            userStore[validUserId] = mockUser;
            coreEntityCacheService.get.mockImplementation(async (keyName, entityId)=>{
                if (keyName === 'workspaceEntity') {
                    return workspaceStore[entityId] ?? null;
                }
                if (keyName === 'user') {
                    return userStore[entityId] ?? null;
                }
                if (keyName === 'userWorkspaceEntity') {
                    return {
                        id: validUserWorkspaceId,
                        user: mockUser,
                        workspace: mockWorkspace
                    };
                }
                return null;
            });
            userWorkspaceRepository.findOne.mockResolvedValueOnce(null).mockResolvedValueOnce({
                id: validUserWorkspaceId,
                user: {
                    id: 'valid-user-id'
                },
                workspace: mockWorkspace
            });
            strategy = createStrategy();
            await expect(strategy.validate(payload)).rejects.toThrow(new _authexception.AuthException('Invalid impersonation token, cannot find impersonator or impersonated user workspace', _authexception.AuthExceptionCode.USER_WORKSPACE_NOT_FOUND, {
                userFriendlyMessage: /*i18n*/ {
                    id: "lUEEso",
                    message: "User workspace not found."
                }
            }));
        });
        it('should throw AuthException if impersonated user workspace not found', async ()=>{
            const validUserId = 'valid-user-id';
            const validUserWorkspaceId = (0, _crypto.randomUUID)();
            const validWorkspaceId = (0, _crypto.randomUUID)();
            const impersonatorUserWorkspaceId = (0, _crypto.randomUUID)();
            const payload = {
                sub: validUserId,
                type: _authcontexttype.JwtTokenTypeEnum.ACCESS,
                userWorkspaceId: validUserWorkspaceId,
                workspaceId: validWorkspaceId,
                isImpersonating: true,
                impersonatorUserWorkspaceId,
                impersonatedUserWorkspaceId: validUserWorkspaceId
            };
            const mockWorkspace = new _workspaceentity.WorkspaceEntity();
            mockWorkspace.id = validWorkspaceId;
            mockWorkspace.allowImpersonation = true;
            const mockUser = {
                id: validUserId,
                lastName: 'lastNameDefault'
            };
            workspaceStore[validWorkspaceId] = mockWorkspace;
            userStore[validUserId] = mockUser;
            coreEntityCacheService.get.mockImplementation(async (keyName, entityId)=>{
                if (keyName === 'workspaceEntity') {
                    return workspaceStore[entityId] ?? null;
                }
                if (keyName === 'user') {
                    return userStore[entityId] ?? null;
                }
                if (keyName === 'userWorkspaceEntity') {
                    return {
                        id: validUserWorkspaceId,
                        user: mockUser,
                        workspace: mockWorkspace
                    };
                }
                return null;
            });
            userWorkspaceRepository.findOne.mockResolvedValueOnce(null);
            strategy = createStrategy();
            await expect(strategy.validate(payload)).rejects.toThrow(new _authexception.AuthException('Invalid impersonation token, cannot find impersonator or impersonated user workspace', _authexception.AuthExceptionCode.USER_WORKSPACE_NOT_FOUND));
        });
        it('should throw AuthException for server level impersonation without permission', async ()=>{
            const validUserId = 'valid-user-id';
            const validUserWorkspaceId = (0, _crypto.randomUUID)();
            const validWorkspaceId = (0, _crypto.randomUUID)();
            const impersonatorUserWorkspaceId = (0, _crypto.randomUUID)();
            const differentWorkspaceId = (0, _crypto.randomUUID)();
            const payload = {
                sub: validUserId,
                type: _authcontexttype.JwtTokenTypeEnum.ACCESS,
                userWorkspaceId: validUserWorkspaceId,
                workspaceId: validWorkspaceId,
                isImpersonating: true,
                impersonatorUserWorkspaceId,
                impersonatedUserWorkspaceId: validUserWorkspaceId
            };
            const mockWorkspace = new _workspaceentity.WorkspaceEntity();
            mockWorkspace.id = validWorkspaceId;
            mockWorkspace.allowImpersonation = false;
            const mockUser = {
                id: validUserId,
                lastName: 'lastNameDefault'
            };
            workspaceStore[validWorkspaceId] = mockWorkspace;
            userStore[validUserId] = mockUser;
            coreEntityCacheService.get.mockImplementation(async (keyName, entityId)=>{
                if (keyName === 'workspaceEntity') {
                    return workspaceStore[entityId] ?? null;
                }
                if (keyName === 'user') {
                    return userStore[entityId] ?? null;
                }
                if (keyName === 'userWorkspaceEntity') {
                    return {
                        id: validUserWorkspaceId,
                        user: mockUser,
                        workspace: mockWorkspace
                    };
                }
                return null;
            });
            userWorkspaceRepository.findOne.mockResolvedValueOnce({
                id: impersonatorUserWorkspaceId,
                user: {
                    id: 'valid-user-id',
                    canImpersonate: false
                },
                workspace: {
                    id: differentWorkspaceId
                }
            }).mockResolvedValueOnce({
                id: validUserWorkspaceId,
                user: {
                    id: 'valid-user-id'
                },
                workspace: mockWorkspace
            });
            permissionsService.userHasWorkspaceSettingPermission.mockResolvedValue(false);
            strategy = createStrategy();
            await expect(strategy.validate(payload)).rejects.toThrow(new _authexception.AuthException('Server level impersonation not allowed', _authexception.AuthExceptionCode.FORBIDDEN_EXCEPTION));
        });
        it('should throw AuthException when no impersonation permissions are granted', async ()=>{
            const validUserId = 'valid-user-id';
            const validUserWorkspaceId = (0, _crypto.randomUUID)();
            const validWorkspaceId = (0, _crypto.randomUUID)();
            const impersonatorUserWorkspaceId = (0, _crypto.randomUUID)();
            const payload = {
                sub: validUserId,
                type: _authcontexttype.JwtTokenTypeEnum.ACCESS,
                userWorkspaceId: validUserWorkspaceId,
                workspaceId: validWorkspaceId,
                isImpersonating: true,
                impersonatorUserWorkspaceId,
                impersonatedUserWorkspaceId: validUserWorkspaceId
            };
            const mockWorkspace = new _workspaceentity.WorkspaceEntity();
            mockWorkspace.id = validWorkspaceId;
            mockWorkspace.allowImpersonation = false;
            const mockUser = {
                id: validUserId,
                lastName: 'lastNameDefault'
            };
            workspaceStore[validWorkspaceId] = mockWorkspace;
            userStore[validUserId] = mockUser;
            coreEntityCacheService.get.mockImplementation(async (keyName, entityId)=>{
                if (keyName === 'workspaceEntity') {
                    return workspaceStore[entityId] ?? null;
                }
                if (keyName === 'user') {
                    return userStore[entityId] ?? null;
                }
                if (keyName === 'userWorkspaceEntity') {
                    return {
                        id: validUserWorkspaceId,
                        user: mockUser,
                        workspace: mockWorkspace
                    };
                }
                return null;
            });
            userWorkspaceRepository.findOne.mockResolvedValueOnce({
                id: impersonatorUserWorkspaceId,
                user: {
                    id: 'valid-user-id',
                    canImpersonate: false
                },
                workspace: mockWorkspace
            }).mockResolvedValueOnce({
                id: validUserWorkspaceId,
                user: {
                    id: 'valid-user-id'
                },
                workspace: mockWorkspace
            });
            permissionsService.userHasWorkspaceSettingPermission.mockResolvedValue(false);
            strategy = createStrategy();
            await expect(strategy.validate(payload)).rejects.toThrow(new _authexception.AuthException('Impersonation not allowed', _authexception.AuthExceptionCode.FORBIDDEN_EXCEPTION));
        });
        it('should throw AuthException when impersonatedUserWorkspaceId does not match userWorkspaceId', async ()=>{
            const validUserId = 'valid-user-id';
            const validUserWorkspaceId = (0, _crypto.randomUUID)();
            const validWorkspaceId = (0, _crypto.randomUUID)();
            const impersonatorUserWorkspaceId = (0, _crypto.randomUUID)();
            const impersonatedUserWorkspaceId = (0, _crypto.randomUUID)();
            const payload = {
                sub: validUserId,
                type: _authcontexttype.JwtTokenTypeEnum.ACCESS,
                userWorkspaceId: validUserWorkspaceId,
                workspaceId: validWorkspaceId,
                isImpersonating: true,
                impersonatorUserWorkspaceId,
                impersonatedUserWorkspaceId
            };
            const mockWorkspace = new _workspaceentity.WorkspaceEntity();
            mockWorkspace.id = validWorkspaceId;
            mockWorkspace.allowImpersonation = true;
            workspaceStore[validWorkspaceId] = mockWorkspace;
            strategy = createStrategy();
            await expect(strategy.validate(payload)).rejects.toThrow(new _authexception.AuthException('Token user workspace ID does not match impersonated user workspace ID', _authexception.AuthExceptionCode.FORBIDDEN_EXCEPTION));
        });
        it('should successfully validate workspace level impersonation with permission', async ()=>{
            const validUserId = 'valid-user-id';
            const validUserWorkspaceId = (0, _crypto.randomUUID)();
            const validWorkspaceId = (0, _crypto.randomUUID)();
            const impersonatorUserWorkspaceId = (0, _crypto.randomUUID)();
            const payload = {
                sub: validUserId,
                type: _authcontexttype.JwtTokenTypeEnum.ACCESS,
                userWorkspaceId: validUserWorkspaceId,
                workspaceId: validWorkspaceId,
                isImpersonating: true,
                impersonatorUserWorkspaceId,
                impersonatedUserWorkspaceId: validUserWorkspaceId
            };
            const mockWorkspace = new _workspaceentity.WorkspaceEntity();
            mockWorkspace.id = validWorkspaceId;
            mockWorkspace.allowImpersonation = false;
            const mockUser = {
                id: validUserId,
                lastName: 'lastNameDefault'
            };
            workspaceStore[validWorkspaceId] = mockWorkspace;
            userStore[validUserId] = mockUser;
            coreEntityCacheService.get.mockImplementation(async (keyName, entityId)=>{
                if (keyName === 'workspaceEntity') {
                    return workspaceStore[entityId] ?? null;
                }
                if (keyName === 'user') {
                    return userStore[entityId] ?? null;
                }
                if (keyName === 'userWorkspaceEntity') {
                    return {
                        id: validUserWorkspaceId,
                        user: mockUser,
                        workspace: mockWorkspace
                    };
                }
                return null;
            });
            userWorkspaceRepository.findOne.mockResolvedValueOnce({
                id: impersonatorUserWorkspaceId,
                user: {
                    id: 'valid-user-id',
                    canImpersonate: false
                },
                workspace: mockWorkspace
            }).mockResolvedValueOnce({
                id: validUserWorkspaceId,
                user: mockUser,
                workspace: mockWorkspace
            });
            permissionsService.userHasWorkspaceSettingPermission.mockResolvedValue(true);
            strategy = createStrategy();
            const result = await strategy.validate(payload);
            expect(result.user?.lastName).toBe('lastNameDefault');
            expect(result.userWorkspaceId).toBe(validUserWorkspaceId);
            expect(result.impersonationContext).toBeDefined();
            expect(result.impersonationContext?.impersonatorUserWorkspaceId).toBe(impersonatorUserWorkspaceId);
            expect(result.impersonationContext?.impersonatedUserWorkspaceId).toBe(validUserWorkspaceId);
        });
        it('should successfully validate server level impersonation with permission', async ()=>{
            const validUserId = 'valid-user-id';
            const validUserWorkspaceId = (0, _crypto.randomUUID)();
            const validWorkspaceId = (0, _crypto.randomUUID)();
            const impersonatorUserWorkspaceId = (0, _crypto.randomUUID)();
            const differentWorkspaceId = (0, _crypto.randomUUID)();
            const payload = {
                sub: validUserId,
                type: _authcontexttype.JwtTokenTypeEnum.ACCESS,
                userWorkspaceId: validUserWorkspaceId,
                workspaceId: validWorkspaceId,
                isImpersonating: true,
                impersonatorUserWorkspaceId,
                impersonatedUserWorkspaceId: validUserWorkspaceId
            };
            const mockWorkspace = new _workspaceentity.WorkspaceEntity();
            mockWorkspace.id = validWorkspaceId;
            mockWorkspace.allowImpersonation = true;
            const mockUser = {
                id: validUserId,
                lastName: 'lastNameDefault'
            };
            workspaceStore[validWorkspaceId] = mockWorkspace;
            userStore[validUserId] = mockUser;
            coreEntityCacheService.get.mockImplementation(async (keyName, entityId)=>{
                if (keyName === 'workspaceEntity') {
                    return workspaceStore[entityId] ?? null;
                }
                if (keyName === 'user') {
                    return userStore[entityId] ?? null;
                }
                if (keyName === 'userWorkspaceEntity') {
                    return {
                        id: validUserWorkspaceId,
                        user: mockUser,
                        workspace: mockWorkspace
                    };
                }
                return null;
            });
            userWorkspaceRepository.findOne.mockResolvedValueOnce({
                id: impersonatorUserWorkspaceId,
                user: {
                    id: 'valid-user-id',
                    canImpersonate: true
                },
                workspace: {
                    id: differentWorkspaceId
                }
            }).mockResolvedValueOnce({
                id: validUserWorkspaceId,
                user: mockUser,
                workspace: mockWorkspace
            });
            strategy = createStrategy();
            const result = await strategy.validate(payload);
            expect(result.user?.lastName).toBe('lastNameDefault');
            expect(result.userWorkspaceId).toBe(validUserWorkspaceId);
            expect(result.impersonationContext).toBeDefined();
            expect(result.impersonationContext?.impersonatorUserWorkspaceId).toBe(impersonatorUserWorkspaceId);
            expect(result.impersonationContext?.impersonatedUserWorkspaceId).toBe(validUserWorkspaceId);
        });
    });
});

//# sourceMappingURL=jwt.auth.strategy.spec.js.map