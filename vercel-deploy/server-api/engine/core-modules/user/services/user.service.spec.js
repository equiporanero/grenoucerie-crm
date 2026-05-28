"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _workspace = require("twenty-shared/workspace");
const _applicationservice = require("../../application/application.service");
const _authexception = require("../../auth/auth.exception");
const _workspacedomainsservice = require("../../domain/workspace-domains/services/workspace-domains.service");
const _emailverificationservice = require("../../email-verification/services/email-verification.service");
const _messagequeueconstants = require("../../message-queue/message-queue.constants");
const _userworkspaceservice = require("../../user-workspace/user-workspace.service");
const _userservice = require("./user.service");
const _workspacemembertranspilerservice = require("./workspace-member-transpiler.service");
const _userentity = require("../user.entity");
const _workspaceservice = require("../../workspace/services/workspace.service");
const _permissionsexception = require("../../../metadata-modules/permissions/permissions.exception");
const _coreentitycacheservice = require("../../../core-entity-cache/services/core-entity-cache.service");
const _userroleservice = require("../../../metadata-modules/user-role/user-role.service");
const _globalworkspaceormmanager = require("../../../twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
describe('UserService', ()=>{
    let service;
    let userRepository;
    let workspaceService;
    let globalWorkspaceOrmManager;
    let userRoleService;
    const mockWorkspaceMemberRepo = {
        findOne: jest.fn(),
        find: jest.fn(),
        delete: jest.fn()
    };
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _userservice.UserService,
                {
                    provide: (0, _typeorm.getRepositoryToken)(_userentity.UserEntity),
                    useValue: {
                        findOne: jest.fn(),
                        save: jest.fn(),
                        softDelete: jest.fn(),
                        update: jest.fn()
                    }
                },
                {
                    provide: _workspaceservice.WorkspaceService,
                    useValue: {
                        deleteWorkspace: jest.fn(),
                        suspendWorkspace: jest.fn()
                    }
                },
                {
                    provide: _workspacedomainsservice.WorkspaceDomainsService,
                    useValue: {
                        getSubdomainAndCustomDomainFromWorkspaceFallbackOnDefaultSubdomain: jest.fn()
                    }
                },
                {
                    provide: _emailverificationservice.EmailVerificationService,
                    useValue: {
                        sendVerificationEmail: jest.fn()
                    }
                },
                {
                    provide: `MESSAGE_QUEUE_${_messagequeueconstants.MessageQueue.workspaceQueue}`,
                    useValue: {
                        add: jest.fn()
                    }
                },
                {
                    provide: _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
                    useValue: {
                        getRepository: jest.fn(),
                        executeInWorkspaceContext: jest.fn().mockImplementation((fn, _authContext)=>fn())
                    }
                },
                {
                    provide: _userroleservice.UserRoleService,
                    useValue: {
                        validateUserWorkspaceIsNotUniqueAdminOrThrow: jest.fn()
                    }
                },
                {
                    provide: _userworkspaceservice.UserWorkspaceService,
                    useValue: {
                        deleteUserWorkspace: jest.fn()
                    }
                },
                {
                    provide: _applicationservice.ApplicationService,
                    useValue: {}
                },
                {
                    provide: _coreentitycacheservice.CoreEntityCacheService,
                    useValue: {
                        invalidate: jest.fn()
                    }
                },
                {
                    provide: _workspacemembertranspilerservice.WorkspaceMemberTranspiler,
                    useValue: {
                        generateSignedAvatarUrl: jest.fn().mockReturnValue('')
                    }
                }
            ]
        }).compile();
        service = module.get(_userservice.UserService);
        userRepository = module.get((0, _typeorm.getRepositoryToken)(_userentity.UserEntity));
        userRoleService = module.get(_userroleservice.UserRoleService);
        globalWorkspaceOrmManager = module.get(_globalworkspaceormmanager.GlobalWorkspaceOrmManager);
        workspaceService = module.get(_workspaceservice.WorkspaceService);
    });
    describe('loadWorkspaceMember', ()=>{
        it('returns null when workspace is not active/suspended', async ()=>{
            // isWorkspaceActiveOrSuspendedSpy.mockReturnValue(false);
            const res = await service.loadWorkspaceMember({
                id: 'u1'
            }, {
                id: 'w1'
            });
            expect(res).toBeNull();
            expect(globalWorkspaceOrmManager.getRepository).not.toHaveBeenCalled();
        });
        it('fetches from workspace member repo when workspace active', async ()=>{
            jest.spyOn(mockWorkspaceMemberRepo, 'findOne').mockResolvedValue({
                id: 'wm1',
                userId: 'u1'
            });
            jest.spyOn(globalWorkspaceOrmManager, 'getRepository').mockResolvedValue(mockWorkspaceMemberRepo);
            const res = await service.loadWorkspaceMember({
                id: 'u1'
            }, {
                id: 'w1',
                activationStatus: _workspace.WorkspaceActivationStatus.ACTIVE
            });
            expect(globalWorkspaceOrmManager.getRepository).toHaveBeenCalledWith('w1', 'workspaceMember', {
                shouldBypassPermissionChecks: true
            });
            expect(mockWorkspaceMemberRepo.findOne).toHaveBeenCalledWith({
                where: {
                    userId: 'u1'
                }
            });
            expect(res).toEqual({
                id: 'wm1',
                userId: 'u1'
            });
        });
    });
    describe('loadWorkspaceMembers', ()=>{
        it('returns [] when workspace is not active/suspended', async ()=>{
            const res = await service.loadWorkspaceMembers({
                id: 'w1',
                activationStatus: _workspace.WorkspaceActivationStatus.INACTIVE
            });
            expect(res).toEqual([]);
            expect(globalWorkspaceOrmManager.getRepository).not.toHaveBeenCalled();
        });
        it('fetches members withDeleted flag', async ()=>{
            jest.spyOn(mockWorkspaceMemberRepo, 'find').mockResolvedValue([
                {
                    id: 'wm1'
                }
            ]);
            jest.spyOn(globalWorkspaceOrmManager, 'getRepository').mockResolvedValue(mockWorkspaceMemberRepo);
            const res = await service.loadWorkspaceMembers({
                id: 'w2',
                activationStatus: _workspace.WorkspaceActivationStatus.ACTIVE
            }, true);
            expect(mockWorkspaceMemberRepo.find).toHaveBeenCalledWith({
                withDeleted: true
            });
            expect(res).toEqual([
                {
                    id: 'wm1'
                }
            ]);
        });
    });
    describe('loadDeletedWorkspaceMembersOnly', ()=>{
        it('returns [] when workspace is not active/suspended', async ()=>{
            const res = await service.loadDeletedWorkspaceMembersOnly({
                id: 'w1',
                activationStatus: _workspace.WorkspaceActivationStatus.INACTIVE
            });
            expect(res).toEqual([]);
        });
        it('fetches only deleted members with withDeleted:true', async ()=>{
            jest.spyOn(mockWorkspaceMemberRepo, 'find').mockResolvedValue([
                {
                    id: 'wm-del'
                }
            ]);
            jest.spyOn(globalWorkspaceOrmManager, 'getRepository').mockResolvedValue(mockWorkspaceMemberRepo);
            await service.loadDeletedWorkspaceMembersOnly({
                id: 'w3',
                activationStatus: _workspace.WorkspaceActivationStatus.ACTIVE
            });
            expect(mockWorkspaceMemberRepo.find).toHaveBeenCalledWith({
                where: {
                    deletedAt: expect.any(Object)
                },
                withDeleted: true
            });
        });
    });
    describe('findUserByEmailOrThrow', ()=>{
        it('returns user when found', async ()=>{
            const user = {
                id: 'u1',
                email: 'a@b.com'
            };
            userRepository.findOne.mockResolvedValue(user);
            await expect(service.findUserByEmailOrThrow('a@b.com')).resolves.toEqual(user);
        });
        it('throws when not found', async ()=>{
            userRepository.findOne.mockResolvedValue(null);
            await expect(service.findUserByEmailOrThrow('none@b.com')).rejects.toBeTruthy();
        });
    });
    describe('findUserByEmail', ()=>{
        it('returns the user when found', async ()=>{
            const user = {
                id: 'u1',
                email: 'john@doe.com'
            };
            userRepository.findOne.mockResolvedValue(user);
            const result = await service.findUserByEmail('john@doe.com');
            expect(userRepository.findOne).toHaveBeenCalledWith({
                where: {
                    email: 'john@doe.com'
                }
            });
            expect(result).toEqual(user);
        });
        it('returns null when not found', async ()=>{
            userRepository.findOne.mockResolvedValue(null);
            const result = await service.findUserByEmail('missing@doe.com');
            expect(result).toBeNull();
        });
    });
    describe('hasUserAccessToWorkspaceOrThrow', ()=>{
        it('resolves when user has access', async ()=>{
            userRepository.findOne.mockResolvedValue({
                id: 'u1'
            });
            await expect(service.hasUserAccessToWorkspaceOrThrow('u1', 'w1')).resolves.toBeUndefined();
            expect(userRepository.findOne).toHaveBeenCalledWith({
                where: {
                    id: 'u1',
                    userWorkspaces: {
                        workspaceId: 'w1'
                    }
                },
                relations: {
                    userWorkspaces: true
                }
            });
        });
        it('throws AuthException when user has no access', async ()=>{
            userRepository.findOne.mockResolvedValue(null);
            await expect(service.hasUserAccessToWorkspaceOrThrow('u2', 'w2')).rejects.toBeInstanceOf(_authexception.AuthException);
        });
    });
    describe('markEmailAsVerified', ()=>{
        it('sets isEmailVerified and saves', async ()=>{
            const user = {
                id: 'u1',
                isEmailVerified: false
            };
            userRepository.findOne.mockResolvedValue(user);
            userRepository.save.mockImplementation(async (u)=>u);
            const res = await service.markEmailAsVerified('u1');
            expect(userRepository.findOne).toHaveBeenCalledWith({
                where: {
                    id: 'u1'
                }
            });
            expect(res.isEmailVerified).toBe(true);
            expect(userRepository.save).toHaveBeenCalledWith({
                id: 'u1',
                isEmailVerified: true
            });
        });
        it('throws when user not found', async ()=>{
            userRepository.findOne.mockResolvedValue(null);
            await expect(service.markEmailAsVerified('nope')).rejects.toBeTruthy();
        });
    });
    describe('deleteUser', ()=>{
        const wmForUser = (userId)=>({
                id: 'wm-1',
                userId
            });
        it('throws mapped PermissionsException when cannot unassign last admin', async ()=>{
            userRepository.findOne.mockResolvedValue({
                id: 'u1',
                userWorkspaces: [
                    {
                        id: 'uw1',
                        workspaceId: 'w1'
                    }
                ]
            });
            jest.spyOn(mockWorkspaceMemberRepo, 'find').mockResolvedValue([
                wmForUser('u1'),
                {
                    id: 'wm-2',
                    userId: 'uX'
                }
            ]);
            jest.spyOn(globalWorkspaceOrmManager, 'getRepository').mockResolvedValue(mockWorkspaceMemberRepo);
            jest.spyOn(userRoleService, 'validateUserWorkspaceIsNotUniqueAdminOrThrow').mockRejectedValue(new _permissionsexception.PermissionsException('x', _permissionsexception.PermissionsExceptionCode.CANNOT_UNASSIGN_LAST_ADMIN));
            await expect(service.deleteUser('u1')).rejects.toBeInstanceOf(_permissionsexception.PermissionsException);
            await expect(service.deleteUser('u1')).rejects.toMatchObject({
                code: _permissionsexception.PermissionsExceptionCode.CANNOT_DELETE_LAST_ADMIN_USER
            });
        });
        it('deletes workspace member and workspace when user is sole member', async ()=>{
            const mockedUserWorkspace = {
                id: 'uw2',
                workspaceId: 'w2'
            };
            userRepository.findOne.mockResolvedValue({
                id: 'u2',
                userWorkspaces: [
                    mockedUserWorkspace
                ]
            });
            jest.spyOn(mockWorkspaceMemberRepo, 'find').mockResolvedValue([
                wmForUser('u2')
            ]);
            jest.spyOn(globalWorkspaceOrmManager, 'getRepository').mockResolvedValue(mockWorkspaceMemberRepo);
            userRepository.softDelete.mockResolvedValue({
                affected: 1,
                raw: [],
                generatedMaps: []
            });
            const res = await service.deleteUser('u2');
            expect(workspaceService.suspendWorkspace).toHaveBeenCalledWith('w2');
            expect(workspaceService.deleteWorkspace).toHaveBeenCalledWith('w2', true);
            expect(res).toMatchObject({
                id: 'u2'
            });
        });
        it('throws when user not found', async ()=>{
            userRepository.findOne.mockResolvedValue(null);
            await expect(service.deleteUser('missing')).rejects.toBeTruthy();
        });
    });
    describe('findUserById', ()=>{
        it('returns the user when found', async ()=>{
            const user = {
                id: 'u42'
            };
            userRepository.findOne.mockResolvedValue(user);
            const result = await service.findUserById('u42');
            expect(userRepository.findOne).toHaveBeenCalledWith({
                where: {
                    id: 'u42'
                }
            });
            expect(result).toEqual(user);
        });
        it('returns null when not found', async ()=>{
            userRepository.findOne.mockResolvedValue(null);
            const result = await service.findUserById('missing');
            expect(result).toBeNull();
        });
    });
    describe('findUserByIdOrThrow', ()=>{
        it('returns user when found', async ()=>{
            const user = {
                id: 'u99'
            };
            userRepository.findOne.mockResolvedValue(user);
            await expect(service.findUserByIdOrThrow('u99')).resolves.toEqual(user);
        });
        it('throws provided error when not found', async ()=>{
            userRepository.findOne.mockResolvedValue(null);
            const error = new Error('not found');
            await expect(service.findUserByIdOrThrow('nope', error)).rejects.toThrow(error);
        });
    });
});

//# sourceMappingURL=user.service.spec.js.map