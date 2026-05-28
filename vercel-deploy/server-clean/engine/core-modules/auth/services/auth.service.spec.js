"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _bcrypt = /*#__PURE__*/ _interop_require_default(require("bcrypt"));
const _apptokenentity = require("../../app-token/app-token.entity");
const _auditservice = require("../../audit/services/audit.service");
const _authexception = require("../auth.exception");
const _authssoservice = require("./auth-sso.service");
const _signinupservice = require("./sign-in-up.service");
const _accesstokenservice = require("../token/services/access-token.service");
const _logintokenservice = require("../token/services/login-token.service");
const _refreshtokenservice = require("../token/services/refresh-token.service");
const _workspaceagnostictokenservice = require("../token/services/workspace-agnostic-token.service");
const _domainserverconfigservice = require("../../domain/domain-server-config/services/domain-server-config.service");
const _workspacedomainsservice = require("../../domain/workspace-domains/services/workspace-domains.service");
const _emailservice = require("../../email/email.service");
const _guardredirectservice = require("../../guard-redirect/services/guard-redirect.service");
const _i18nservice = require("../../i18n/i18n.service");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
const _userworkspaceservice = require("../../user-workspace/user-workspace.service");
const _userservice = require("../../user/services/user.service");
const _userentity = require("../../user/user.entity");
const _workspaceinvitationservice = require("../../workspace-invitation/services/workspace-invitation.service");
const _workspacetype = require("../../workspace/types/workspace.type");
const _workspaceentity = require("../../workspace/workspace.entity");
const _applicationregistrationservice = require("../../application/application-registration/application-registration.service");
const _createssoconnectedaccountservice = require("./create-sso-connected-account.service");
const _featureflagservice = require("../../feature-flag/services/feature-flag.service");
const _permissionsservice = require("../../../metadata-modules/permissions/permissions.service");
const _authservice = require("./auth.service");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
jest.mock('bcrypt');
const twentyConfigServiceGetMock = jest.fn();
describe('AuthService', ()=>{
    let service;
    let userService;
    let workspaceRepository;
    let userRepository;
    let authSsoService;
    let userWorkspaceService;
    let workspaceInvitationService;
    let permissionsService;
    let signInUpServiceMock;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _authservice.AuthService,
                {
                    provide: (0, _typeorm.getRepositoryToken)(_workspaceentity.WorkspaceEntity),
                    useValue: {
                        findOne: jest.fn()
                    }
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_userentity.UserEntity),
                    useValue: {
                        findOne: jest.fn()
                    }
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_apptokenentity.AppTokenEntity),
                    useValue: {
                        createQueryBuilder: jest.fn().mockReturnValue({
                            leftJoin: jest.fn().mockReturnThis(),
                            andWhere: jest.fn().mockReturnThis(),
                            where: jest.fn().mockReturnThis(),
                            getOne: jest.fn().mockImplementation(()=>null)
                        })
                    }
                },
                {
                    provide: _logintokenservice.LoginTokenService,
                    useValue: {}
                },
                {
                    provide: _workspacedomainsservice.WorkspaceDomainsService,
                    useValue: {}
                },
                {
                    provide: _domainserverconfigservice.DomainServerConfigService,
                    useValue: {}
                },
                {
                    provide: _workspaceagnostictokenservice.WorkspaceAgnosticTokenService,
                    useValue: {}
                },
                {
                    provide: _guardredirectservice.GuardRedirectService,
                    useValue: {}
                },
                {
                    provide: _signinupservice.SignInUpService,
                    useValue: {
                        validatePassword: jest.fn().mockResolvedValue(undefined),
                        generateHash: jest.fn()
                    }
                },
                {
                    provide: _twentyconfigservice.TwentyConfigService,
                    useValue: {
                        get: twentyConfigServiceGetMock
                    }
                },
                {
                    provide: _emailservice.EmailService,
                    useValue: {}
                },
                {
                    provide: _accesstokenservice.AccessTokenService,
                    useValue: {}
                },
                {
                    provide: _refreshtokenservice.RefreshTokenService,
                    useValue: {}
                },
                {
                    provide: _userworkspaceservice.UserWorkspaceService,
                    useValue: {
                        checkUserWorkspaceExists: jest.fn(),
                        addUserToWorkspaceIfUserNotInWorkspace: jest.fn(),
                        findAvailableWorkspacesByEmail: jest.fn()
                    }
                },
                {
                    provide: _userservice.UserService,
                    useValue: {
                        hasUserAccessToWorkspaceOrThrow: jest.fn()
                    }
                },
                {
                    provide: _workspaceinvitationservice.WorkspaceInvitationService,
                    useValue: {
                        getOneWorkspaceInvitation: jest.fn(),
                        validatePersonalInvitation: jest.fn()
                    }
                },
                {
                    provide: _authssoservice.AuthSsoService,
                    useValue: {
                        findWorkspaceFromWorkspaceIdOrAuthProvider: jest.fn()
                    }
                },
                {
                    provide: _i18nservice.I18nService,
                    useValue: {
                        getI18nInstance: jest.fn().mockReturnValue({
                            _: jest.fn().mockReturnValue('mocked-translation')
                        })
                    }
                },
                {
                    provide: _auditservice.AuditService,
                    useValue: {}
                },
                {
                    provide: _permissionsservice.PermissionsService,
                    useValue: {
                        userHasWorkspaceSettingPermission: jest.fn().mockResolvedValue(false)
                    }
                },
                {
                    provide: _applicationregistrationservice.ApplicationRegistrationService,
                    useValue: {}
                },
                {
                    provide: _featureflagservice.FeatureFlagService,
                    useValue: {
                        isFeatureEnabled: jest.fn().mockResolvedValue(false)
                    }
                },
                {
                    provide: _createssoconnectedaccountservice.CreateSSOConnectedAccountService,
                    useValue: {
                        createOrUpdateSSOConnectedAccount: jest.fn().mockResolvedValue(undefined)
                    }
                }
            ]
        }).compile();
        service = module.get(_authservice.AuthService);
        userService = module.get(_userservice.UserService);
        workspaceInvitationService = module.get(_workspaceinvitationservice.WorkspaceInvitationService);
        authSsoService = module.get(_authssoservice.AuthSsoService);
        userWorkspaceService = module.get(_userworkspaceservice.UserWorkspaceService);
        workspaceRepository = module.get((0, _typeorm.getRepositoryToken)(_workspaceentity.WorkspaceEntity));
        userRepository = module.get((0, _typeorm.getRepositoryToken)(_userentity.UserEntity));
        permissionsService = module.get(_permissionsservice.PermissionsService);
        signInUpServiceMock = module.get(_signinupservice.SignInUpService);
    });
    beforeEach(()=>{
        twentyConfigServiceGetMock.mockReturnValue(false);
        signInUpServiceMock.validatePassword.mockClear();
    });
    it('should be defined', async ()=>{
        expect(service).toBeDefined();
    });
    it('challenge - user already member of workspace', async ()=>{
        const workspace = {
            isPasswordAuthEnabled: true
        };
        const user = {
            email: 'email',
            password: 'password',
            captchaToken: 'captchaToken'
        };
        _bcrypt.default.compare.mockReturnValueOnce(true);
        jest.spyOn(userRepository, 'findOne').mockReturnValueOnce({
            email: user.email,
            passwordHash: 'passwordHash',
            captchaToken: user.captchaToken
        });
        jest.spyOn(userWorkspaceService, 'checkUserWorkspaceExists').mockReturnValueOnce({});
        const response = await service.validateLoginWithPassword({
            email: 'email',
            password: 'password',
            captchaToken: 'captchaToken'
        }, workspace);
        expect(response).toStrictEqual({
            email: user.email,
            passwordHash: 'passwordHash',
            captchaToken: user.captchaToken
        });
    });
    it('allows password login through SSO bypass when user has permission', async ()=>{
        const workspace = {
            id: 'workspace-id',
            isPasswordAuthEnabled: false,
            isPasswordAuthBypassEnabled: true
        };
        const userEntity = {
            id: 'user-id',
            email: 'email',
            passwordHash: 'password-hash',
            userWorkspaces: [
                {
                    id: 'user-workspace-id',
                    workspaceId: workspace.id
                }
            ]
        };
        _bcrypt.default.compare.mockResolvedValue(true);
        jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(userEntity);
        jest.spyOn(userWorkspaceService, 'checkUserWorkspaceExists').mockResolvedValueOnce({
            id: 'user-workspace-id'
        });
        jest.spyOn(permissionsService, 'userHasWorkspaceSettingPermission').mockResolvedValueOnce(true);
        const response = await service.validateLoginWithPassword({
            email: 'email',
            password: 'password',
            captchaToken: 'captcha-token'
        }, workspace);
        expect(response).toBe(userEntity);
    });
    it('throws when bypass permission is missing for disabled password auth', async ()=>{
        const workspace = {
            id: 'workspace-id',
            isPasswordAuthEnabled: false,
            isPasswordAuthBypassEnabled: true
        };
        const userEntity = {
            id: 'user-id',
            email: 'email',
            passwordHash: 'password-hash',
            userWorkspaces: [
                {
                    id: 'user-workspace-id',
                    workspaceId: workspace.id
                }
            ]
        };
        jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(userEntity);
        jest.spyOn(userWorkspaceService, 'checkUserWorkspaceExists').mockResolvedValueOnce(null);
        jest.spyOn(permissionsService, 'userHasWorkspaceSettingPermission').mockResolvedValueOnce(false);
        await expect(service.validateLoginWithPassword({
            email: 'email',
            password: 'password',
            captchaToken: 'captcha-token'
        }, workspace)).rejects.toThrow(new _authexception.AuthException('Email/Password auth is not enabled for this workspace', _authexception.AuthExceptionCode.FORBIDDEN_EXCEPTION));
        expect(signInUpServiceMock.validatePassword).not.toHaveBeenCalled();
    });
    it('challenge - user who have an invitation', async ()=>{
        const user = {
            email: 'email',
            password: 'password',
            captchaToken: 'captchaToken'
        };
        const UserFindOneSpy = jest.spyOn(userRepository, 'findOne').mockReturnValueOnce({
            email: user.email,
            passwordHash: 'passwordHash',
            captchaToken: user.captchaToken
        });
        _bcrypt.default.compare.mockReturnValueOnce(true);
        jest.spyOn(userWorkspaceService, 'checkUserWorkspaceExists').mockReturnValueOnce(null);
        const getOneWorkspaceInvitationSpy = jest.spyOn(workspaceInvitationService, 'getOneWorkspaceInvitation').mockReturnValueOnce({});
        const workspaceInvitationValidatePersonalInvitationSpy = jest.spyOn(workspaceInvitationService, 'validatePersonalInvitation').mockReturnValueOnce({});
        const addUserToWorkspaceIfUserNotInWorkspaceSpy = jest.spyOn(userWorkspaceService, 'addUserToWorkspaceIfUserNotInWorkspace').mockReturnValueOnce({});
        const response = await service.validateLoginWithPassword({
            email: 'email',
            password: 'password',
            captchaToken: 'captchaToken'
        }, {
            isPasswordAuthEnabled: true
        });
        expect(response).toStrictEqual({
            email: user.email,
            passwordHash: 'passwordHash',
            captchaToken: user.captchaToken
        });
        expect(getOneWorkspaceInvitationSpy).toHaveBeenCalledTimes(1);
        expect(workspaceInvitationValidatePersonalInvitationSpy).toHaveBeenCalledTimes(1);
        expect(addUserToWorkspaceIfUserNotInWorkspaceSpy).toHaveBeenCalledTimes(1);
        expect(UserFindOneSpy).toHaveBeenCalledTimes(1);
    });
    describe('checkAccessForSignIn', ()=>{
        it('checkAccessForSignIn - allow signin for existing user who target a workspace with right access', async ()=>{
            const spy = jest.spyOn(userService, 'hasUserAccessToWorkspaceOrThrow').mockResolvedValue();
            await service.checkAccessForSignIn({
                userData: {
                    type: 'existingUser',
                    existingUser: {
                        id: 'user-id'
                    }
                },
                invitation: undefined,
                workspaceInviteHash: undefined,
                workspace: {
                    id: 'workspace-id',
                    isPublicInviteLinkEnabled: true,
                    approvedAccessDomains: []
                }
            });
            expect(spy).toHaveBeenCalledTimes(1);
        });
        it('checkAccessForSignIn - trigger error on existing user signin in unauthorized workspace', async ()=>{
            const spy = jest.spyOn(userService, 'hasUserAccessToWorkspaceOrThrow').mockRejectedValue(new Error('Access denied'));
            await expect(service.checkAccessForSignIn({
                userData: {
                    type: 'existingUser',
                    existingUser: {
                        id: 'user-id'
                    }
                },
                invitation: undefined,
                workspaceInviteHash: undefined,
                workspace: {
                    id: 'workspace-id',
                    isPublicInviteLinkEnabled: true,
                    approvedAccessDomains: []
                }
            })).rejects.toThrow(new Error('Access denied'));
            expect(spy).toHaveBeenCalledTimes(1);
        });
        it('checkAccessForSignIn - trigger an error when a user attempts to sign up using a public link in a workspace where public links are disabled', async ()=>{
            const spy = jest.spyOn(userService, 'hasUserAccessToWorkspaceOrThrow');
            await expect(service.checkAccessForSignIn({
                userData: {
                    type: 'existingUser',
                    existingUser: {
                        id: 'user-id'
                    }
                },
                invitation: undefined,
                workspaceInviteHash: 'workspaceInviteHash',
                workspace: {
                    id: 'workspace-id',
                    isPublicInviteLinkEnabled: false,
                    approvedAccessDomains: []
                }
            })).rejects.toThrow(new _authexception.AuthException('Public invite link is disabled for this workspace', _authexception.AuthExceptionCode.FORBIDDEN_EXCEPTION));
            expect(spy).toHaveBeenCalledTimes(0);
        });
        it("checkAccessForSignIn - allow signup for new user who don't target a workspace", async ()=>{
            const spy = jest.spyOn(userService, 'hasUserAccessToWorkspaceOrThrow').mockResolvedValue();
            await service.checkAccessForSignIn({
                userData: {
                    type: 'newUser',
                    newUserPayload: {}
                },
                invitation: undefined,
                workspaceInviteHash: undefined,
                workspace: undefined
            });
            expect(spy).toHaveBeenCalledTimes(0);
        });
        it("checkAccessForSignIn - allow signup for existing user who don't target a workspace", async ()=>{
            const spy = jest.spyOn(userService, 'hasUserAccessToWorkspaceOrThrow').mockResolvedValue();
            await service.checkAccessForSignIn({
                userData: {
                    type: 'existingUser',
                    existingUser: {
                        id: 'user-id'
                    }
                },
                invitation: undefined,
                workspaceInviteHash: undefined,
                workspace: undefined
            });
            expect(spy).toHaveBeenCalledTimes(0);
        });
        it('checkAccessForSignIn - allow signup for new user who target a workspace with invitation', async ()=>{
            const spy = jest.spyOn(userService, 'hasUserAccessToWorkspaceOrThrow').mockResolvedValue();
            await service.checkAccessForSignIn({
                userData: {
                    type: 'existingUser',
                    existingUser: {
                        id: 'user-id'
                    }
                },
                invitation: {},
                workspaceInviteHash: undefined,
                workspace: {
                    approvedAccessDomains: []
                }
            });
            expect(spy).toHaveBeenCalledTimes(0);
        });
        it('checkAccessForSignIn - allow signup for new user who target a workspace with public invitation', async ()=>{
            const spy = jest.spyOn(userService, 'hasUserAccessToWorkspaceOrThrow').mockResolvedValue();
            await service.checkAccessForSignIn({
                userData: {
                    type: 'newUser',
                    newUserPayload: {}
                },
                invitation: undefined,
                workspaceInviteHash: 'workspaceInviteHash',
                workspace: {
                    isPublicInviteLinkEnabled: true,
                    approvedAccessDomains: []
                }
            });
            expect(spy).toHaveBeenCalledTimes(0);
        });
        it('checkAccessForSignIn - allow signup for new user who target a workspace with valid trusted domain', async ()=>{
            expect(async ()=>{
                await service.checkAccessForSignIn({
                    userData: {
                        type: 'newUser',
                        newUserPayload: {
                            email: 'email@domain.com'
                        }
                    },
                    invitation: undefined,
                    workspaceInviteHash: 'workspaceInviteHash',
                    workspace: {
                        isPublicInviteLinkEnabled: true,
                        approvedAccessDomains: [
                            {
                                domain: 'domain.com',
                                isValidated: true
                            }
                        ]
                    }
                });
            }).not.toThrow();
        });
    });
    describe('findWorkspaceForSignInUp', ()=>{
        it('findWorkspaceForSignInUp - signup password auth', async ()=>{
            const spyWorkspaceRepository = jest.spyOn(workspaceRepository, 'findOne');
            const spyAuthSsoService = jest.spyOn(authSsoService, 'findWorkspaceFromWorkspaceIdOrAuthProvider');
            const result = await service.findWorkspaceForSignInUp({
                authProvider: _workspacetype.AuthProviderEnum.Password,
                workspaceId: 'workspaceId'
            });
            expect(result).toBeUndefined();
            expect(spyWorkspaceRepository).toHaveBeenCalledTimes(1);
            expect(spyAuthSsoService).toHaveBeenCalledTimes(0);
        });
        it('findWorkspaceForSignInUp - signup password auth with workspaceInviteHash', async ()=>{
            const spyWorkspaceRepository = jest.spyOn(workspaceRepository, 'findOne').mockResolvedValue({
                approvedAccessDomains: []
            });
            const spyAuthSsoService = jest.spyOn(authSsoService, 'findWorkspaceFromWorkspaceIdOrAuthProvider');
            const result = await service.findWorkspaceForSignInUp({
                authProvider: _workspacetype.AuthProviderEnum.Password,
                workspaceId: 'workspaceId',
                workspaceInviteHash: 'workspaceInviteHash'
            });
            expect(result).toBeDefined();
            expect(spyWorkspaceRepository).toHaveBeenCalledTimes(1);
            expect(spyAuthSsoService).toHaveBeenCalledTimes(0);
        });
        it('findWorkspaceForSignInUp - signup social sso auth with workspaceInviteHash', async ()=>{
            const spyWorkspaceRepository = jest.spyOn(workspaceRepository, 'findOne').mockResolvedValue({
                approvedAccessDomains: []
            });
            const spyAuthSsoService = jest.spyOn(authSsoService, 'findWorkspaceFromWorkspaceIdOrAuthProvider');
            const result = await service.findWorkspaceForSignInUp({
                authProvider: _workspacetype.AuthProviderEnum.Password,
                workspaceId: 'workspaceId',
                workspaceInviteHash: 'workspaceInviteHash'
            });
            expect(result).toBeDefined();
            expect(spyWorkspaceRepository).toHaveBeenCalledTimes(1);
            expect(spyAuthSsoService).toHaveBeenCalledTimes(0);
        });
        it('findWorkspaceForSignInUp - signup social sso auth', async ()=>{
            const spyWorkspaceRepository = jest.spyOn(workspaceRepository, 'findOne');
            const spyAuthSsoService = jest.spyOn(authSsoService, 'findWorkspaceFromWorkspaceIdOrAuthProvider').mockResolvedValue({});
            const result = await service.findWorkspaceForSignInUp({
                authProvider: _workspacetype.AuthProviderEnum.Google,
                workspaceId: 'workspaceId',
                email: 'email'
            });
            expect(result).toBeDefined();
            expect(spyWorkspaceRepository).toHaveBeenCalledTimes(0);
            expect(spyAuthSsoService).toHaveBeenCalledTimes(1);
        });
        it('findWorkspaceForSignInUp - sso auth', async ()=>{
            const spyWorkspaceRepository = jest.spyOn(workspaceRepository, 'findOne');
            const spyAuthSsoService = jest.spyOn(authSsoService, 'findWorkspaceFromWorkspaceIdOrAuthProvider').mockResolvedValue({});
            const result = await service.findWorkspaceForSignInUp({
                authProvider: _workspacetype.AuthProviderEnum.SSO,
                workspaceId: 'workspaceId',
                email: 'email'
            });
            expect(result).toBeDefined();
            expect(spyWorkspaceRepository).toHaveBeenCalledTimes(0);
            expect(spyAuthSsoService).toHaveBeenCalledTimes(1);
        });
    });
});

//# sourceMappingURL=auth.service.spec.js.map