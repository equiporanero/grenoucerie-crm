"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _approvedaccessdomainservice = require("../approved-access-domain/services/approved-access-domain.service");
const _coreentitycacheservice = require("../../core-entity-cache/services/core-entity-cache.service");
const _authexception = require("../auth/auth.exception");
const _logintokenservice = require("../auth/token/services/login-token.service");
const _workspacedomainsservice = require("../domain/workspace-domains/services/workspace-domains.service");
const _featureflagservice = require("../feature-flag/services/feature-flag.service");
const _filestorageservice = require("../file-storage/file-storage.service");
const _filecorepictureservice = require("../file/file-core-picture/services/file-core-picture.service");
const _fileurlservice = require("../file/file-url/file-url.service");
const _onboardingservice = require("../onboarding/onboarding.service");
const _userworkspaceentity = require("./user-workspace.entity");
const _userworkspaceservice = require("./user-workspace.service");
const _userentity = require("../user/user.entity");
const _workspaceinvitationservice = require("../workspace-invitation/services/workspace-invitation.service");
const _objectmetadataentity = require("../../metadata-modules/object-metadata/object-metadata.entity");
const _permissionsexception = require("../../metadata-modules/permissions/permissions.exception");
const _roletargetentity = require("../../metadata-modules/role-target/role-target.entity");
const _rolevalidationservice = require("../../metadata-modules/role-validation/services/role-validation.service");
const _userroleservice = require("../../metadata-modules/user-role/user-role.service");
const _globalworkspaceormmanager = require("../../twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
describe('UserWorkspaceService', ()=>{
    let service;
    let userWorkspaceRepository;
    let userRepository;
    let workspaceInvitationService;
    let approvedAccessDomainService;
    let globalWorkspaceOrmManager;
    let userRoleService;
    let onboardingService;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _userworkspaceservice.UserWorkspaceService,
                {
                    provide: (0, _typeorm.getRepositoryToken)(_userworkspaceentity.UserWorkspaceEntity),
                    useValue: {
                        create: jest.fn(),
                        save: jest.fn(),
                        findOneBy: jest.fn(),
                        countBy: jest.fn(),
                        exists: jest.fn(),
                        findOne: jest.fn(),
                        findOneOrFail: jest.fn()
                    }
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_userentity.UserEntity),
                    useValue: {
                        findOne: jest.fn()
                    }
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_objectmetadataentity.ObjectMetadataEntity),
                    useValue: {
                        findOneOrFail: jest.fn()
                    }
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_roletargetentity.RoleTargetEntity),
                    useValue: {
                        findOneOrFail: jest.fn()
                    }
                },
                {
                    provide: _rolevalidationservice.RoleValidationService,
                    useValue: {
                        validateRoleAssignableToUsersOrThrow: jest.fn()
                    }
                },
                {
                    provide: _workspaceinvitationservice.WorkspaceInvitationService,
                    useValue: {
                        invalidateWorkspaceInvitation: jest.fn(),
                        findInvitationsByEmail: jest.fn()
                    }
                },
                {
                    provide: _workspacedomainsservice.WorkspaceDomainsService,
                    useValue: {
                        getWorkspaceUrls: jest.fn()
                    }
                },
                {
                    provide: _approvedaccessdomainservice.ApprovedAccessDomainService,
                    useValue: {
                        findValidatedApprovedAccessDomainWithWorkspacesAndSSOIdentityProvidersDomain: jest.fn().mockResolvedValue([])
                    }
                },
                {
                    provide: _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
                    useValue: {
                        executeInWorkspaceContext: jest.fn().mockImplementation(async (callback, _authContext)=>callback()),
                        getRepository: jest.fn()
                    }
                },
                {
                    provide: _userroleservice.UserRoleService,
                    useValue: {
                        assignRoleToManyUserWorkspace: jest.fn()
                    }
                },
                {
                    provide: _filecorepictureservice.FileCorePictureService,
                    useValue: {}
                },
                {
                    provide: _fileurlservice.FileUrlService,
                    useValue: {}
                },
                {
                    provide: _filestorageservice.FileStorageService,
                    useValue: {
                        copy: jest.fn()
                    }
                },
                {
                    provide: _logintokenservice.LoginTokenService,
                    useValue: {}
                },
                {
                    provide: _onboardingservice.OnboardingService,
                    useValue: {
                        setOnboardingCreateProfilePending: jest.fn()
                    }
                },
                {
                    provide: _coreentitycacheservice.CoreEntityCacheService,
                    useValue: {
                        invalidate: jest.fn().mockResolvedValue(undefined)
                    }
                },
                {
                    provide: _featureflagservice.FeatureFlagService,
                    useValue: {
                        isFeatureEnabled: jest.fn()
                    }
                }
            ]
        }).compile();
        service = module.get(_userworkspaceservice.UserWorkspaceService);
        userWorkspaceRepository = module.get((0, _typeorm.getRepositoryToken)(_userworkspaceentity.UserWorkspaceEntity));
        userRepository = module.get((0, _typeorm.getRepositoryToken)(_userentity.UserEntity));
        workspaceInvitationService = module.get(_workspaceinvitationservice.WorkspaceInvitationService);
        approvedAccessDomainService = module.get(_approvedaccessdomainservice.ApprovedAccessDomainService);
        globalWorkspaceOrmManager = module.get(_globalworkspaceormmanager.GlobalWorkspaceOrmManager);
        globalWorkspaceOrmManager.getRepository.mockResolvedValue({
            findOne: jest.fn(),
            update: jest.fn()
        });
        userRoleService = module.get(_userroleservice.UserRoleService);
        onboardingService = module.get(_onboardingservice.OnboardingService);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
    describe('create', ()=>{
        it("should create a user workspace without a default avatar url if it's an existing user without any user workspace having a default avatar url", async ()=>{
            const userId = 'user-id';
            const workspaceId = 'workspace-id';
            const userWorkspace = {
                userId,
                workspaceId
            };
            jest.spyOn(userWorkspaceRepository, 'create').mockReturnValue(userWorkspace);
            jest.spyOn(userWorkspaceRepository, 'save').mockResolvedValue(userWorkspace);
            jest.spyOn(userWorkspaceRepository, 'findOne').mockResolvedValue(null);
            const result = await service.create({
                userId,
                workspaceId,
                isExistingUser: true
            });
            expect(userWorkspaceRepository.create).toHaveBeenCalledWith({
                userId,
                workspaceId,
                defaultAvatarUrl: undefined
            });
            expect(userWorkspaceRepository.save).toHaveBeenCalledWith(userWorkspace);
            expect(result).toEqual(userWorkspace);
        });
        it("should create a user workspace without a default avatar url if it's a new user without a picture url", async ()=>{
            const userId = 'user-id';
            const workspaceId = 'workspace-id';
            const userWorkspace = {
                userId,
                workspaceId
            };
            jest.spyOn(userWorkspaceRepository, 'create').mockReturnValue(userWorkspace);
            jest.spyOn(userWorkspaceRepository, 'save').mockResolvedValue(userWorkspace);
            const result = await service.create({
                userId,
                workspaceId,
                isExistingUser: false,
                pictureUrl: undefined
            });
            expect(userWorkspaceRepository.save).toHaveBeenCalledWith(userWorkspace);
            expect(result).toEqual(userWorkspace);
        });
    });
    describe('createWorkspaceMember', ()=>{
        it('should create a workspace member', async ()=>{
            const workspaceId = 'workspace-id';
            const user = {
                id: 'user-id',
                email: 'test@example.com',
                firstName: 'John',
                lastName: 'Doe',
                locale: 'en',
                isEmailVerified: false,
                disabled: false,
                canImpersonate: false,
                canAccessFullAdminPanel: false,
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-01T00:00:00.000Z',
                deletedAt: null
            };
            const mainDataSource = {
                query: jest.fn()
            };
            const workspaceMember = [
                {
                    id: 'workspace-member-id',
                    nameFirstName: 'John',
                    nameLastName: 'Doe',
                    userId: 'user-id',
                    userEmail: 'test@example.com'
                }
            ];
            const workspaceMemberRepository = {
                insert: jest.fn(),
                find: jest.fn().mockResolvedValue(workspaceMember)
            };
            jest.spyOn(mainDataSource, 'query').mockResolvedValueOnce(undefined).mockResolvedValueOnce(workspaceMember);
            jest.spyOn(globalWorkspaceOrmManager, 'getRepository').mockResolvedValue(workspaceMemberRepository);
            jest.spyOn(userWorkspaceRepository, 'findOneOrFail').mockResolvedValue({
                defaultAvatarUrl: 'userWorkspace-avatar-url'
            });
            await service.createWorkspaceMember(workspaceId, user);
            expect(workspaceMemberRepository.insert).toHaveBeenCalledWith({
                name: {
                    firstName: user.firstName,
                    lastName: user.lastName
                },
                colorScheme: 'System',
                userId: user.id,
                userEmail: user.email,
                locale: 'en',
                avatarUrl: 'userWorkspace-avatar-url'
            });
        });
    });
    describe('addUserToWorkspaceIfUserNotInWorkspace', ()=>{
        it('should add user to workspace if not already in workspace', async ()=>{
            const user = {
                id: 'user-id',
                email: 'test@example.com',
                createdAt: new Date('2024-01-01'),
                updatedAt: new Date('2024-01-01'),
                deletedAt: null
            };
            const workspace = {
                id: 'workspace-id',
                defaultRoleId: 'default-role-id'
            };
            const userWorkspace = {
                id: 'user-workspace-id',
                userId: user.id,
                workspaceId: workspace.id
            };
            jest.spyOn(service, 'checkUserWorkspaceExists').mockResolvedValue(null);
            jest.spyOn(service, 'create').mockResolvedValue(userWorkspace);
            jest.spyOn(service, 'createWorkspaceMember').mockResolvedValue(undefined);
            jest.spyOn(userRoleService, 'assignRoleToManyUserWorkspace').mockResolvedValue(undefined);
            jest.spyOn(workspaceInvitationService, 'invalidateWorkspaceInvitation').mockResolvedValue(undefined);
            await service.addUserToWorkspaceIfUserNotInWorkspace(user, workspace);
            expect(service.checkUserWorkspaceExists).toHaveBeenCalledWith(user.id, workspace.id);
            expect(service.create).toHaveBeenCalled();
            expect(service.create).toHaveBeenCalledWith({
                workspaceId: workspace.id,
                userId: user.id,
                isExistingUser: true
            });
            expect(service.createWorkspaceMember).toHaveBeenCalledWith(workspace.id, expect.objectContaining({
                id: user.id,
                email: user.email
            }));
            expect(userRoleService.assignRoleToManyUserWorkspace).toHaveBeenCalledWith({
                workspaceId: workspace.id,
                userWorkspaceIds: [
                    userWorkspace.id
                ],
                roleId: workspace.defaultRoleId
            });
            expect(workspaceInvitationService.invalidateWorkspaceInvitation).toHaveBeenCalledWith(workspace.id, user.email);
            expect(onboardingService.setOnboardingCreateProfilePending).toHaveBeenCalledWith({
                userId: user.id,
                workspaceId: workspace.id,
                value: true
            });
        });
        it('should not add user to workspace if already in workspace', async ()=>{
            const user = {
                id: 'user-id',
                email: 'test@example.com',
                createdAt: new Date('2024-01-01'),
                updatedAt: new Date('2024-01-01'),
                deletedAt: null
            };
            const workspace = {
                id: 'workspace-id',
                defaultRoleId: 'default-role-id'
            };
            const userWorkspace = {
                id: 'user-workspace-id',
                userId: user.id,
                workspaceId: workspace.id
            };
            jest.spyOn(service, 'checkUserWorkspaceExists').mockResolvedValue(userWorkspace);
            jest.spyOn(service, 'create').mockResolvedValue(userWorkspace);
            jest.spyOn(service, 'createWorkspaceMember').mockResolvedValue(undefined);
            await service.addUserToWorkspaceIfUserNotInWorkspace(user, workspace);
            expect(service.checkUserWorkspaceExists).toHaveBeenCalledWith(user.id, workspace.id);
            expect(service.create).not.toHaveBeenCalled();
            expect(service.createWorkspaceMember).not.toHaveBeenCalled();
        });
        it('should throw an exception if workspace has no default role', async ()=>{
            const user = {
                id: 'user-id',
                email: 'test@example.com',
                createdAt: new Date('2024-01-01'),
                updatedAt: new Date('2024-01-01'),
                deletedAt: null
            };
            const workspace = {
                id: 'workspace-id',
                defaultRoleId: undefined
            };
            jest.spyOn(service, 'checkUserWorkspaceExists').mockResolvedValue(null);
            jest.spyOn(service, 'create').mockResolvedValue({});
            jest.spyOn(service, 'createWorkspaceMember').mockResolvedValue(undefined);
            await expect(service.addUserToWorkspaceIfUserNotInWorkspace(user, workspace)).rejects.toThrow(_permissionsexception.PermissionsException);
        });
    });
    describe('getUserCount', ()=>{
        it('should return the count of users in a workspace', async ()=>{
            const workspaceId = 'workspace-id';
            const count = 5;
            jest.spyOn(userWorkspaceRepository, 'countBy').mockResolvedValue(count);
            const result = await service.getUserCount(workspaceId);
            expect(userWorkspaceRepository.countBy).toHaveBeenCalledWith({
                workspaceId
            });
            expect(result).toEqual(count);
        });
    });
    describe('checkUserWorkspaceExists', ()=>{
        it('should check if a user workspace exists', async ()=>{
            const userId = 'user-id';
            const workspaceId = 'workspace-id';
            const userWorkspace = {
                userId,
                workspaceId
            };
            jest.spyOn(userWorkspaceRepository, 'findOneBy').mockResolvedValue(userWorkspace);
            const result = await service.checkUserWorkspaceExists(userId, workspaceId);
            expect(userWorkspaceRepository.findOneBy).toHaveBeenCalledWith({
                userId,
                workspaceId
            });
            expect(result).toEqual(userWorkspace);
        });
        it('should return null if user workspace does not exist', async ()=>{
            const userId = 'user-id';
            const workspaceId = 'workspace-id';
            jest.spyOn(userWorkspaceRepository, 'findOneBy').mockResolvedValue(null);
            const result = await service.checkUserWorkspaceExists(userId, workspaceId);
            expect(userWorkspaceRepository.findOneBy).toHaveBeenCalledWith({
                userId,
                workspaceId
            });
            expect(result).toBeNull();
        });
    });
    describe('checkUserWorkspaceExistsByEmail', ()=>{
        it('should check if a user workspace exists by email', async ()=>{
            const email = 'test@example.com';
            const workspaceId = 'workspace-id';
            jest.spyOn(userWorkspaceRepository, 'exists').mockResolvedValue(true);
            const result = await service.checkUserWorkspaceExistsByEmail(email, workspaceId);
            expect(userWorkspaceRepository.exists).toHaveBeenCalledWith({
                where: {
                    workspaceId,
                    user: {
                        email
                    }
                },
                relations: {
                    user: true
                }
            });
            expect(result).toBe(true);
        });
    });
    describe('findAvailableWorkspacesByEmail', ()=>{
        it('should find available workspaces for an email', async ()=>{
            const email = 'test@example.com';
            const workspace1 = {
                id: 'workspace-id-1',
                displayName: 'Workspace 1',
                logo: 'logo1.png',
                workspaceSSOIdentityProviders: [
                    {
                        id: 'sso-id-1',
                        name: 'SSO Provider 1',
                        issuer: 'issuer1',
                        type: 'type1',
                        status: 'Active'
                    },
                    {
                        id: 'sso-id-2',
                        name: 'SSO Provider 2',
                        issuer: 'issuer2',
                        type: 'type2',
                        status: 'Inactive'
                    }
                ]
            };
            const workspace2 = {
                id: 'workspace-id-2',
                displayName: 'Workspace 2',
                logo: 'logo2.png',
                workspaceSSOIdentityProviders: []
            };
            const user = {
                email,
                userWorkspaces: [
                    {
                        workspaceId: workspace1.id,
                        workspace: workspace1
                    },
                    {
                        workspaceId: workspace2.id,
                        workspace: workspace2
                    }
                ]
            };
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
            jest.spyOn(approvedAccessDomainService, 'findValidatedApprovedAccessDomainWithWorkspacesAndSSOIdentityProvidersDomain').mockResolvedValue([]);
            jest.spyOn(workspaceInvitationService, 'findInvitationsByEmail').mockResolvedValue([]);
            const result = await service.findAvailableWorkspacesByEmail(email);
            expect(userRepository.findOne).toHaveBeenCalledWith({
                where: {
                    email
                },
                relations: {
                    userWorkspaces: {
                        workspace: {
                            workspaceSSOIdentityProviders: true,
                            approvedAccessDomains: true
                        }
                    }
                }
            });
            expect(result).toEqual({
                availableWorkspacesForSignIn: [
                    {
                        workspace: workspace1
                    },
                    {
                        workspace: workspace2
                    }
                ],
                availableWorkspacesForSignUp: []
            });
        });
        it('should find available workspaces including approved domain workspace for an email', async ()=>{
            const email = 'test@example.com';
            const workspace1 = {
                id: 'workspace-id-1',
                displayName: 'Workspace 1',
                logo: 'logo1.png',
                workspaceSSOIdentityProviders: [
                    {
                        id: 'sso-id-1',
                        name: 'SSO Provider 1',
                        issuer: 'issuer1',
                        type: 'type1',
                        status: 'Active'
                    },
                    {
                        id: 'sso-id-2',
                        name: 'SSO Provider 2',
                        issuer: 'issuer2',
                        type: 'type2',
                        status: 'Inactive'
                    }
                ]
            };
            const workspace2 = {
                id: 'workspace-id-2',
                displayName: 'Workspace 2',
                logo: 'logo2.png',
                workspaceSSOIdentityProviders: []
            };
            const user = {
                email,
                userWorkspaces: [
                    {
                        workspaceId: workspace1.id,
                        workspace: workspace1
                    }
                ]
            };
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
            jest.spyOn(approvedAccessDomainService, 'findValidatedApprovedAccessDomainWithWorkspacesAndSSOIdentityProvidersDomain').mockResolvedValueOnce([
                {
                    id: 'domain-id-2',
                    workspaceId: workspace2.id,
                    workspace: workspace2,
                    isValidated: true
                }
            ]);
            jest.spyOn(workspaceInvitationService, 'findInvitationsByEmail').mockResolvedValue([]);
            const result = await service.findAvailableWorkspacesByEmail(email);
            expect(userRepository.findOne).toHaveBeenCalledWith({
                where: {
                    email
                },
                relations: {
                    userWorkspaces: {
                        workspace: {
                            workspaceSSOIdentityProviders: true,
                            approvedAccessDomains: true
                        }
                    }
                }
            });
            expect(result).toEqual({
                availableWorkspacesForSignIn: [
                    {
                        workspace: workspace1
                    }
                ],
                availableWorkspacesForSignUp: [
                    {
                        workspace: workspace2
                    }
                ]
            });
        });
        it('should return workspace with approved access domain if user is not found', async ()=>{
            const email = 'nonexistent@example.com';
            const workspace1 = {
                id: 'workspace-id-1',
                displayName: 'Workspace 1',
                logo: 'logo1.png',
                workspaceSSOIdentityProviders: []
            };
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
            jest.spyOn(approvedAccessDomainService, 'findValidatedApprovedAccessDomainWithWorkspacesAndSSOIdentityProvidersDomain').mockResolvedValueOnce([
                {
                    id: 'domain-id-1',
                    workspaceId: workspace1.id,
                    workspace: workspace1,
                    isValidated: true
                }
            ]);
            jest.spyOn(workspaceInvitationService, 'findInvitationsByEmail').mockResolvedValue([]);
            const result = await service.findAvailableWorkspacesByEmail(email);
            expect(result).toEqual({
                availableWorkspacesForSignIn: [],
                availableWorkspacesForSignUp: [
                    {
                        workspace: workspace1
                    }
                ]
            });
        });
    });
    describe('findFirstWorkspaceByUserId', ()=>{
        it('should find the first workspace for a user', async ()=>{
            const userId = 'user-id';
            const workspace1 = {
                id: 'workspace-id',
                createdAt: '2025-01-02T00:00:00.000Z'
            };
            const workspace2 = {
                id: 'workspace-id-2',
                createdAt: '2025-01-01T00:00:00.000Z'
            };
            const user = {
                id: userId,
                userWorkspaces: [
                    {
                        workspace: workspace1
                    },
                    {
                        workspace: workspace2
                    }
                ]
            };
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
            const result = await service.findFirstWorkspaceByUserId(userId);
            expect(userRepository.findOne).toHaveBeenCalledWith({
                where: {
                    id: userId
                },
                relations: {
                    userWorkspaces: {
                        workspace: true
                    }
                },
                order: {
                    userWorkspaces: {
                        workspace: {
                            createdAt: 'ASC'
                        }
                    }
                }
            });
            expect(result).toEqual(workspace1);
        });
        it('should throw an exception if no workspace is found', async ()=>{
            const userId = 'user-id';
            const user = {
                id: userId,
                workspaces: []
            };
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
            await expect(service.findFirstWorkspaceByUserId(userId)).rejects.toThrow(_authexception.AuthException);
        });
    });
    describe('getUserWorkspaceForUserOrThrow', ()=>{
        it('should get a user workspace or throw', async ()=>{
            const userId = 'user-id';
            const workspaceId = 'workspace-id';
            const userWorkspace = {
                userId,
                workspaceId
            };
            jest.spyOn(userWorkspaceRepository, 'findOne').mockResolvedValue(userWorkspace);
            const result = await service.getUserWorkspaceForUserOrThrow({
                userId,
                workspaceId
            });
            expect(userWorkspaceRepository.findOne).toHaveBeenCalledWith({
                where: {
                    userId,
                    workspaceId
                },
                relations: [
                    'twoFactorAuthenticationMethods'
                ]
            });
            expect(result).toEqual(userWorkspace);
        });
        it('should throw an exception if user workspace is not found', async ()=>{
            const userId = 'user-id';
            const workspaceId = 'workspace-id';
            jest.spyOn(userWorkspaceRepository, 'findOne').mockResolvedValue(null);
            await expect(service.getUserWorkspaceForUserOrThrow({
                userId,
                workspaceId
            })).rejects.toThrow('User workspace not found');
        });
    });
    describe('getWorkspaceMemberOrThrow', ()=>{
        it('should get a workspace member or throw', async ()=>{
            const workspaceMemberId = 'workspace-member-id';
            const workspaceId = 'workspace-id';
            const workspaceMember = {
                id: workspaceMemberId
            };
            const workspaceMemberRepository = {
                findOne: jest.fn().mockResolvedValue(workspaceMember)
            };
            jest.spyOn(globalWorkspaceOrmManager, 'getRepository').mockResolvedValue(workspaceMemberRepository);
            const result = await service.getWorkspaceMemberOrThrow({
                workspaceMemberId,
                workspaceId
            });
            expect(globalWorkspaceOrmManager.getRepository).toHaveBeenCalledWith(workspaceId, 'workspaceMember', {
                shouldBypassPermissionChecks: true
            });
            expect(workspaceMemberRepository.findOne).toHaveBeenCalledWith({
                where: {
                    id: workspaceMemberId
                }
            });
            expect(result).toEqual(workspaceMember);
        });
        it('should throw an exception if workspace member is not found', async ()=>{
            const workspaceMemberId = 'workspace-member-id';
            const workspaceId = 'workspace-id';
            const workspaceMemberRepository = {
                findOne: jest.fn().mockResolvedValue(null)
            };
            jest.spyOn(globalWorkspaceOrmManager, 'getRepository').mockResolvedValue(workspaceMemberRepository);
            await expect(service.getWorkspaceMemberOrThrow({
                workspaceMemberId,
                workspaceId
            })).rejects.toThrow('Workspace member not found');
        });
    });
});

//# sourceMappingURL=user-workspace.service.spec.js.map