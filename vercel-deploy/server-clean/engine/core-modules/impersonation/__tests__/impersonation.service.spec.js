"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _nodeenvironmentinterface = require("../../twenty-config/interfaces/node-environment.interface");
const _auditservice = require("../../audit/services/audit.service");
const _authexception = require("../../auth/auth.exception");
const _logintokenservice = require("../../auth/token/services/login-token.service");
const _workspacedomainsservice = require("../../domain/workspace-domains/services/workspace-domains.service");
const _impersonationservice = require("../services/impersonation.service");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
const _otpconstants = require("../../two-factor-authentication/strategies/otp/otp.constants");
const _userworkspaceentity = require("../../user-workspace/user-workspace.entity");
const _userentity = require("../../user/user.entity");
const _permissionsservice = require("../../../metadata-modules/permissions/permissions.service");
const UserWorkspaceFindOneMock = jest.fn();
const LoginTokenServiceGenerateLoginTokenMock = jest.fn();
const PermissionsServiceUserHasWorkspaceSettingPermissionMock = jest.fn();
const TwentyConfigServiceGetMock = jest.fn();
describe('ImpersonationService', ()=>{
    let service;
    beforeEach(async ()=>{
        TwentyConfigServiceGetMock.mockImplementation((key)=>{
            if (key === 'NODE_ENV') {
                return _nodeenvironmentinterface.NodeEnvironment.PRODUCTION;
            }
            return undefined;
        });
        const module = await _testing.Test.createTestingModule({
            providers: [
                _impersonationservice.ImpersonationService,
                {
                    provide: (0, _typeorm.getRepositoryToken)(_userentity.UserEntity),
                    useValue: {
                        findOne: jest.fn()
                    }
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_userworkspaceentity.UserWorkspaceEntity),
                    useValue: {
                        findOne: UserWorkspaceFindOneMock
                    }
                },
                {
                    provide: _logintokenservice.LoginTokenService,
                    useValue: {
                        generateLoginToken: LoginTokenServiceGenerateLoginTokenMock
                    }
                },
                {
                    provide: _twentyconfigservice.TwentyConfigService,
                    useValue: {
                        get: TwentyConfigServiceGetMock
                    }
                },
                {
                    provide: _workspacedomainsservice.WorkspaceDomainsService,
                    useValue: {
                        getWorkspaceUrls: jest.fn().mockReturnValue({
                            customUrl: undefined,
                            subdomainUrl: 'https://twenty.twenty.com'
                        })
                    }
                },
                {
                    provide: _auditservice.AuditService,
                    useValue: {
                        createContext: jest.fn().mockReturnValue({
                            insertWorkspaceEvent: jest.fn()
                        })
                    }
                },
                {
                    provide: _permissionsservice.PermissionsService,
                    useValue: {
                        userHasWorkspaceSettingPermission: PermissionsServiceUserHasWorkspaceSettingPermissionMock
                    }
                }
            ]
        }).compile();
        service = module.get(_impersonationservice.ImpersonationService);
    });
    afterEach(()=>{
        jest.clearAllMocks();
    });
    it('should be defined', async ()=>{
        expect(service).toBeDefined();
    });
    it('should impersonate a user and return workspace and loginToken on success', async ()=>{
        const mockToImpersonateUserWorkspace = {
            userId: 'target-user-id',
            workspaceId: 'workspace-id',
            user: {
                id: 'target-user-id',
                email: 'target@example.com'
            },
            workspace: {
                id: 'workspace-id',
                allowImpersonation: true,
                subdomain: 'example-subdomain'
            }
        };
        const mockImpersonatorUserWorkspace = {
            id: 'impersonator-user-workspace-id',
            userId: 'impersonator-user-id',
            workspaceId: 'workspace-id',
            user: {
                id: 'impersonator-user-id',
                email: 'impersonator@example.com'
            },
            workspace: {
                id: 'workspace-id',
                allowImpersonation: true,
                subdomain: 'example-subdomain'
            },
            twoFactorAuthenticationMethods: []
        };
        // Mock first call for target user workspace
        UserWorkspaceFindOneMock.mockResolvedValueOnce(mockToImpersonateUserWorkspace);
        // Mock second call for impersonator user workspace
        UserWorkspaceFindOneMock.mockResolvedValueOnce(mockImpersonatorUserWorkspace);
        // Mock workspace-level permission check to return true
        PermissionsServiceUserHasWorkspaceSettingPermissionMock.mockResolvedValueOnce(true);
        LoginTokenServiceGenerateLoginTokenMock.mockResolvedValueOnce({
            token: 'mock-login-token',
            expiresAt: new Date()
        });
        const result = await service.impersonate('target-user-id', 'workspace-id', 'impersonator-user-workspace-id');
        expect(UserWorkspaceFindOneMock).toHaveBeenCalledTimes(2);
        expect(UserWorkspaceFindOneMock).toHaveBeenNthCalledWith(1, {
            where: {
                userId: 'target-user-id',
                workspaceId: 'workspace-id'
            },
            relations: [
                'user',
                'workspace'
            ]
        });
        expect(UserWorkspaceFindOneMock).toHaveBeenNthCalledWith(2, {
            where: {
                id: 'impersonator-user-workspace-id'
            },
            relations: [
                'user',
                'workspace',
                'twoFactorAuthenticationMethods'
            ]
        });
        expect(LoginTokenServiceGenerateLoginTokenMock).toHaveBeenCalledWith('target@example.com', 'workspace-id', 'impersonation', {
            impersonatorUserWorkspaceId: 'impersonator-user-workspace-id'
        });
        expect(result).toEqual({
            workspace: {
                id: 'workspace-id',
                workspaceUrls: {
                    customUrl: undefined,
                    subdomainUrl: 'https://twenty.twenty.com'
                }
            },
            loginToken: {
                token: 'mock-login-token',
                expiresAt: expect.any(Date)
            }
        });
    });
    it('should allow impersonation within the same workspace even when allowImpersonation is false', async ()=>{
        const mockToImpersonateUserWorkspace = {
            userId: 'target-user-id',
            workspaceId: 'workspace-id',
            user: {
                id: 'target-user-id',
                email: 'target@example.com'
            },
            workspace: {
                id: 'workspace-id',
                allowImpersonation: false
            }
        };
        const mockImpersonatorUserWorkspace = {
            id: 'impersonator-user-workspace-id',
            userId: 'impersonator-user-id',
            workspaceId: 'workspace-id',
            user: {
                id: 'impersonator-user-id',
                canImpersonate: false
            },
            workspace: {
                id: 'workspace-id',
                allowImpersonation: false
            },
            twoFactorAuthenticationMethods: []
        };
        UserWorkspaceFindOneMock.mockResolvedValueOnce(mockToImpersonateUserWorkspace);
        UserWorkspaceFindOneMock.mockResolvedValueOnce(mockImpersonatorUserWorkspace);
        // Mock workspace-level permission check to return true
        PermissionsServiceUserHasWorkspaceSettingPermissionMock.mockResolvedValueOnce(true);
        LoginTokenServiceGenerateLoginTokenMock.mockResolvedValueOnce({
            token: 'mock-login-token',
            expiresAt: new Date()
        });
        // This should succeed because same-workspace impersonation doesn't check allowImpersonation
        const result = await service.impersonate('target-user-id', 'workspace-id', 'impersonator-user-workspace-id');
        expect(result).toEqual({
            workspace: {
                id: 'workspace-id',
                workspaceUrls: {
                    customUrl: undefined,
                    subdomainUrl: 'https://twenty.twenty.com'
                }
            },
            loginToken: {
                token: 'mock-login-token',
                expiresAt: expect.any(Date)
            }
        });
    });
    it('should throw an error when target user is not found', async ()=>{
        UserWorkspaceFindOneMock.mockResolvedValueOnce(null); // Target user not found
        UserWorkspaceFindOneMock.mockResolvedValueOnce({
            id: 'impersonator-user-workspace-id',
            userId: 'impersonator-user-id',
            workspaceId: 'workspace-id',
            user: {
                id: 'impersonator-user-id'
            },
            workspace: {
                id: 'workspace-id'
            },
            twoFactorAuthenticationMethods: []
        });
        await expect(service.impersonate('invalid-user-id', 'workspace-id', 'impersonator-user-workspace-id')).rejects.toThrow(new _authexception.AuthException('User not found in workspace or impersonation not enabled', _authexception.AuthExceptionCode.USER_WORKSPACE_NOT_FOUND));
    });
    it('should throw an error when impersonator user workspace is not found', async ()=>{
        UserWorkspaceFindOneMock.mockResolvedValueOnce({
            userId: 'target-user-id',
            workspaceId: 'workspace-id',
            user: {
                id: 'target-user-id'
            },
            workspace: {
                id: 'workspace-id'
            }
        });
        UserWorkspaceFindOneMock.mockResolvedValueOnce(null); // Impersonator workspace not found
        await expect(service.impersonate('target-user-id', 'workspace-id', 'invalid-impersonator-workspace-id')).rejects.toThrow(new _authexception.AuthException('User not found in workspace or impersonation not enabled', _authexception.AuthExceptionCode.USER_WORKSPACE_NOT_FOUND));
    });
    it('should throw an error when impersonation is not enabled for the workspace', async ()=>{
        const mockToImpersonateUserWorkspace = {
            userId: 'target-user-id',
            workspaceId: 'workspace-id',
            user: {
                id: 'target-user-id',
                email: 'target@example.com'
            },
            workspace: {
                id: 'workspace-id',
                allowImpersonation: false
            }
        };
        const mockImpersonatorUserWorkspace = {
            id: 'impersonator-user-workspace-id',
            userId: 'impersonator-user-id',
            workspaceId: 'other-workspace-id',
            user: {
                id: 'impersonator-user-id'
            },
            workspace: {
                id: 'other-workspace-id'
            },
            twoFactorAuthenticationMethods: []
        };
        UserWorkspaceFindOneMock.mockResolvedValueOnce(mockToImpersonateUserWorkspace);
        UserWorkspaceFindOneMock.mockResolvedValueOnce(mockImpersonatorUserWorkspace);
        await expect(service.impersonate('target-user-id', 'workspace-id', 'impersonator-user-workspace-id')).rejects.toThrow(new _authexception.AuthException('Impersonation not enabled for the impersonator user or the target workspace', _authexception.AuthExceptionCode.FORBIDDEN_EXCEPTION));
    });
    it('should throw an error when impersonation is not enabled at server level for the user', async ()=>{
        const mockToImpersonateUserWorkspace = {
            userId: 'target-user-id',
            workspaceId: 'target-workspace-id',
            user: {
                id: 'target-user-id',
                email: 'target@example.com'
            },
            workspace: {
                id: 'target-workspace-id',
                allowImpersonation: true
            }
        };
        const mockImpersonatorUserWorkspace = {
            id: 'impersonator-user-workspace-id',
            userId: 'impersonator-user-id',
            workspaceId: 'impersonator-workspace-id',
            user: {
                id: 'impersonator-user-id',
                canImpersonate: false
            },
            workspace: {
                id: 'impersonator-workspace-id',
                allowImpersonation: true
            },
            twoFactorAuthenticationMethods: []
        };
        UserWorkspaceFindOneMock.mockResolvedValueOnce(mockToImpersonateUserWorkspace);
        UserWorkspaceFindOneMock.mockResolvedValueOnce(mockImpersonatorUserWorkspace);
        // Mock workspace-level permission check to return false
        PermissionsServiceUserHasWorkspaceSettingPermissionMock.mockResolvedValueOnce(false);
        await expect(service.impersonate('target-user-id', 'target-workspace-id', 'impersonator-user-workspace-id')).rejects.toThrow(new _authexception.AuthException('Impersonation not enabled for the impersonator user or the target workspace', _authexception.AuthExceptionCode.FORBIDDEN_EXCEPTION));
    });
    describe('admin privilege escalation prevention', ()=>{
        beforeEach(()=>{
            PermissionsServiceUserHasWorkspaceSettingPermissionMock.mockReset();
        });
        it('should throw when non-admin tries to impersonate a user with canAccessFullAdminPanel', async ()=>{
            const mockToImpersonateUserWorkspace = {
                userId: 'target-user-id',
                workspaceId: 'workspace-id',
                user: {
                    id: 'target-user-id',
                    email: 'admin@example.com',
                    canAccessFullAdminPanel: true,
                    canImpersonate: false
                },
                workspace: {
                    id: 'workspace-id',
                    allowImpersonation: true
                }
            };
            const mockImpersonatorUserWorkspace = {
                id: 'impersonator-user-workspace-id',
                userId: 'impersonator-user-id',
                workspaceId: 'workspace-id',
                user: {
                    id: 'impersonator-user-id',
                    canImpersonate: false,
                    canAccessFullAdminPanel: false
                },
                workspace: {
                    id: 'workspace-id',
                    allowImpersonation: true
                },
                twoFactorAuthenticationMethods: []
            };
            UserWorkspaceFindOneMock.mockResolvedValueOnce(mockToImpersonateUserWorkspace);
            UserWorkspaceFindOneMock.mockResolvedValueOnce(mockImpersonatorUserWorkspace);
            PermissionsServiceUserHasWorkspaceSettingPermissionMock.mockResolvedValueOnce(true);
            await expect(service.impersonate('target-user-id', 'workspace-id', 'impersonator-user-workspace-id')).rejects.toThrow(new _authexception.AuthException('Cannot impersonate a user with admin privileges. Only administrators can impersonate other administrators.', _authexception.AuthExceptionCode.FORBIDDEN_EXCEPTION));
        });
        it('should throw when non-admin tries to impersonate a user with canImpersonate', async ()=>{
            const mockToImpersonateUserWorkspace = {
                userId: 'target-user-id',
                workspaceId: 'workspace-id',
                user: {
                    id: 'target-user-id',
                    email: 'admin@example.com',
                    canImpersonate: true,
                    canAccessFullAdminPanel: false
                },
                workspace: {
                    id: 'workspace-id',
                    allowImpersonation: true
                }
            };
            const mockImpersonatorUserWorkspace = {
                id: 'impersonator-user-workspace-id',
                userId: 'impersonator-user-id',
                workspaceId: 'workspace-id',
                user: {
                    id: 'impersonator-user-id',
                    canImpersonate: false,
                    canAccessFullAdminPanel: false
                },
                workspace: {
                    id: 'workspace-id',
                    allowImpersonation: true
                },
                twoFactorAuthenticationMethods: []
            };
            UserWorkspaceFindOneMock.mockResolvedValueOnce(mockToImpersonateUserWorkspace);
            UserWorkspaceFindOneMock.mockResolvedValueOnce(mockImpersonatorUserWorkspace);
            PermissionsServiceUserHasWorkspaceSettingPermissionMock.mockResolvedValueOnce(true);
            await expect(service.impersonate('target-user-id', 'workspace-id', 'impersonator-user-workspace-id')).rejects.toThrow(new _authexception.AuthException('Cannot impersonate a user with admin privileges. Only administrators can impersonate other administrators.', _authexception.AuthExceptionCode.FORBIDDEN_EXCEPTION));
        });
        it('should allow admin to impersonate another admin in the same workspace', async ()=>{
            const mockToImpersonateUserWorkspace = {
                userId: 'target-user-id',
                workspaceId: 'workspace-id',
                user: {
                    id: 'target-user-id',
                    email: 'admin@example.com',
                    canAccessFullAdminPanel: true,
                    canImpersonate: false
                },
                workspace: {
                    id: 'workspace-id',
                    allowImpersonation: true
                }
            };
            const mockImpersonatorUserWorkspace = {
                id: 'impersonator-user-workspace-id',
                userId: 'impersonator-user-id',
                workspaceId: 'workspace-id',
                user: {
                    id: 'impersonator-user-id',
                    canImpersonate: false,
                    canAccessFullAdminPanel: true
                },
                workspace: {
                    id: 'workspace-id',
                    allowImpersonation: true
                },
                twoFactorAuthenticationMethods: []
            };
            UserWorkspaceFindOneMock.mockResolvedValueOnce(mockToImpersonateUserWorkspace);
            UserWorkspaceFindOneMock.mockResolvedValueOnce(mockImpersonatorUserWorkspace);
            PermissionsServiceUserHasWorkspaceSettingPermissionMock.mockResolvedValueOnce(true);
            LoginTokenServiceGenerateLoginTokenMock.mockResolvedValueOnce({
                token: 'mock-login-token',
                expiresAt: new Date()
            });
            const result = await service.impersonate('target-user-id', 'workspace-id', 'impersonator-user-workspace-id');
            expect(result).toEqual({
                workspace: {
                    id: 'workspace-id',
                    workspaceUrls: {
                        customUrl: undefined,
                        subdomainUrl: 'https://twenty.twenty.com'
                    }
                },
                loginToken: {
                    token: 'mock-login-token',
                    expiresAt: expect.any(Date)
                }
            });
        });
    });
    describe('2FA requirements for server-level impersonation', ()=>{
        it('should allow server-level impersonation when 2FA is enabled and verified', async ()=>{
            TwentyConfigServiceGetMock.mockImplementation((key)=>{
                if (key === 'NODE_ENV') {
                    return _nodeenvironmentinterface.NodeEnvironment.PRODUCTION;
                }
                return undefined;
            });
            const mockToImpersonateUserWorkspace = {
                userId: 'target-user-id',
                workspaceId: 'target-workspace-id',
                user: {
                    id: 'target-user-id',
                    email: 'target@example.com'
                },
                workspace: {
                    id: 'target-workspace-id',
                    allowImpersonation: true
                }
            };
            const mockImpersonatorUserWorkspace = {
                id: 'impersonator-user-workspace-id',
                userId: 'impersonator-user-id',
                workspaceId: 'impersonator-workspace-id',
                user: {
                    id: 'impersonator-user-id',
                    canImpersonate: true
                },
                workspace: {
                    id: 'impersonator-workspace-id',
                    allowImpersonation: true
                },
                twoFactorAuthenticationMethods: [
                    {
                        id: '2fa-method-id',
                        status: _otpconstants.OTPStatus.VERIFIED,
                        strategy: 'TOTP'
                    }
                ]
            };
            UserWorkspaceFindOneMock.mockResolvedValueOnce(mockToImpersonateUserWorkspace);
            UserWorkspaceFindOneMock.mockResolvedValueOnce(mockImpersonatorUserWorkspace);
            LoginTokenServiceGenerateLoginTokenMock.mockResolvedValueOnce({
                token: 'mock-login-token',
                expiresAt: new Date()
            });
            const result = await service.impersonate('target-user-id', 'target-workspace-id', 'impersonator-user-workspace-id');
            expect(result).toEqual({
                workspace: {
                    id: 'target-workspace-id',
                    workspaceUrls: {
                        customUrl: undefined,
                        subdomainUrl: 'https://twenty.twenty.com'
                    }
                },
                loginToken: {
                    token: 'mock-login-token',
                    expiresAt: expect.any(Date)
                }
            });
        });
        it('should throw an error when 2FA is not enabled for server-level impersonation in production', async ()=>{
            TwentyConfigServiceGetMock.mockImplementation((key)=>{
                if (key === 'NODE_ENV') {
                    return _nodeenvironmentinterface.NodeEnvironment.PRODUCTION;
                }
                return undefined;
            });
            const mockToImpersonateUserWorkspace = {
                userId: 'target-user-id',
                workspaceId: 'target-workspace-id',
                user: {
                    id: 'target-user-id',
                    email: 'target@example.com'
                },
                workspace: {
                    id: 'target-workspace-id',
                    allowImpersonation: true
                }
            };
            const mockImpersonatorUserWorkspace = {
                id: 'impersonator-user-workspace-id',
                userId: 'impersonator-user-id',
                workspaceId: 'impersonator-workspace-id',
                user: {
                    id: 'impersonator-user-id',
                    canImpersonate: true
                },
                workspace: {
                    id: 'impersonator-workspace-id',
                    allowImpersonation: true
                },
                twoFactorAuthenticationMethods: []
            };
            UserWorkspaceFindOneMock.mockResolvedValueOnce(mockToImpersonateUserWorkspace);
            UserWorkspaceFindOneMock.mockResolvedValueOnce(mockImpersonatorUserWorkspace);
            await expect(service.impersonate('target-user-id', 'target-workspace-id', 'impersonator-user-workspace-id')).rejects.toThrow(new _authexception.AuthException('Two-factor authentication is required for server-level impersonation. Please enable 2FA in your workspace settings before attempting to impersonate users.', _authexception.AuthExceptionCode.FORBIDDEN_EXCEPTION));
        });
        it('should throw an error when 2FA is not verified for server-level impersonation in production', async ()=>{
            TwentyConfigServiceGetMock.mockImplementation((key)=>{
                if (key === 'NODE_ENV') {
                    return _nodeenvironmentinterface.NodeEnvironment.PRODUCTION;
                }
                return undefined;
            });
            const mockToImpersonateUserWorkspace = {
                userId: 'target-user-id',
                workspaceId: 'target-workspace-id',
                user: {
                    id: 'target-user-id',
                    email: 'target@example.com'
                },
                workspace: {
                    id: 'target-workspace-id',
                    allowImpersonation: true
                }
            };
            const mockImpersonatorUserWorkspace = {
                id: 'impersonator-user-workspace-id',
                userId: 'impersonator-user-id',
                workspaceId: 'impersonator-workspace-id',
                user: {
                    id: 'impersonator-user-id',
                    canImpersonate: true
                },
                workspace: {
                    id: 'impersonator-workspace-id',
                    allowImpersonation: true
                },
                twoFactorAuthenticationMethods: [
                    {
                        id: '2fa-method-id',
                        status: _otpconstants.OTPStatus.PENDING,
                        strategy: 'TOTP'
                    }
                ]
            };
            UserWorkspaceFindOneMock.mockResolvedValueOnce(mockToImpersonateUserWorkspace);
            UserWorkspaceFindOneMock.mockResolvedValueOnce(mockImpersonatorUserWorkspace);
            await expect(service.impersonate('target-user-id', 'target-workspace-id', 'impersonator-user-workspace-id')).rejects.toThrow(new _authexception.AuthException('Two-factor authentication is required for server-level impersonation. Please enable 2FA in your workspace settings before attempting to impersonate users.', _authexception.AuthExceptionCode.FORBIDDEN_EXCEPTION));
        });
        it('should allow server-level impersonation without 2FA in development environment', async ()=>{
            TwentyConfigServiceGetMock.mockImplementation((key)=>{
                if (key === 'NODE_ENV') {
                    return _nodeenvironmentinterface.NodeEnvironment.DEVELOPMENT;
                }
                return undefined;
            });
            const mockToImpersonateUserWorkspace = {
                userId: 'target-user-id',
                workspaceId: 'target-workspace-id',
                user: {
                    id: 'target-user-id',
                    email: 'target@example.com'
                },
                workspace: {
                    id: 'target-workspace-id',
                    allowImpersonation: true
                }
            };
            const mockImpersonatorUserWorkspace = {
                id: 'impersonator-user-workspace-id',
                userId: 'impersonator-user-id',
                workspaceId: 'impersonator-workspace-id',
                user: {
                    id: 'impersonator-user-id',
                    canImpersonate: true
                },
                workspace: {
                    id: 'impersonator-workspace-id',
                    allowImpersonation: true
                },
                twoFactorAuthenticationMethods: []
            };
            UserWorkspaceFindOneMock.mockResolvedValueOnce(mockToImpersonateUserWorkspace);
            UserWorkspaceFindOneMock.mockResolvedValueOnce(mockImpersonatorUserWorkspace);
            LoginTokenServiceGenerateLoginTokenMock.mockResolvedValueOnce({
                token: 'mock-login-token',
                expiresAt: new Date()
            });
            const result = await service.impersonate('target-user-id', 'target-workspace-id', 'impersonator-user-workspace-id');
            expect(result).toEqual({
                workspace: {
                    id: 'target-workspace-id',
                    workspaceUrls: {
                        customUrl: undefined,
                        subdomainUrl: 'https://twenty.twenty.com'
                    }
                },
                loginToken: {
                    token: 'mock-login-token',
                    expiresAt: expect.any(Date)
                }
            });
        });
    });
});

//# sourceMappingURL=impersonation.service.spec.js.map