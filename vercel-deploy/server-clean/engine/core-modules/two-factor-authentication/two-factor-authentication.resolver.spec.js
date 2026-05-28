"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _getworkspacescopedrepositorytokenutil = require("../../twenty-orm/workspace-scoped-repository/get-workspace-scoped-repository-token.util");
const _authexception = require("../auth/auth.exception");
const _logintokenservice = require("../auth/token/services/login-token.service");
const _workspacedomainsservice = require("../domain/workspace-domains/services/workspace-domains.service");
const _userservice = require("../user/services/user.service");
const _twofactorauthenticationresolver = require("./two-factor-authentication.resolver");
const _twofactorauthenticationservice = require("./two-factor-authentication.service");
const _twofactorauthenticationmethodentity = require("./entities/two-factor-authentication-method.entity");
const createMockRepository = ()=>({
        findOne: jest.fn(),
        delete: jest.fn()
    });
const createMockTwoFactorAuthenticationService = ()=>({
        initiateStrategyConfiguration: jest.fn(),
        verifyTwoFactorAuthenticationMethodForAuthenticatedUser: jest.fn()
    });
const createMockLoginTokenService = ()=>({
        verifyLoginToken: jest.fn()
    });
const createMockUserService = ()=>({
        findUserByEmailOrThrow: jest.fn()
    });
const createMockWorkspaceDomainsService = ()=>({
        getWorkspaceByOriginOrDefaultWorkspace: jest.fn()
    });
describe('TwoFactorAuthenticationResolver', ()=>{
    let resolver;
    let twoFactorAuthenticationService;
    let loginTokenService;
    let userService;
    let workspaceDomainsService;
    let repository;
    const MOCK_USER_ISO = '2024-01-01T00:00:00.000Z';
    const mockUser = {
        id: 'user-123',
        firstName: '',
        lastName: '',
        email: 'test@example.com',
        isEmailVerified: true,
        disabled: false,
        canImpersonate: false,
        canAccessFullAdminPanel: false,
        createdAt: MOCK_USER_ISO,
        updatedAt: MOCK_USER_ISO,
        deletedAt: null,
        locale: 'en'
    };
    const mockWorkspace = {
        id: 'workspace-123',
        displayName: 'Test Workspace'
    };
    const mockTwoFactorMethod = {
        id: '2fa-method-123',
        userWorkspace: {
            userId: 'user-123',
            workspaceId: 'workspace-123'
        }
    };
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _twofactorauthenticationresolver.TwoFactorAuthenticationResolver,
                {
                    provide: _twofactorauthenticationservice.TwoFactorAuthenticationService,
                    useFactory: createMockTwoFactorAuthenticationService
                },
                {
                    provide: _logintokenservice.LoginTokenService,
                    useFactory: createMockLoginTokenService
                },
                {
                    provide: _userservice.UserService,
                    useFactory: createMockUserService
                },
                {
                    provide: _workspacedomainsservice.WorkspaceDomainsService,
                    useFactory: createMockWorkspaceDomainsService
                },
                {
                    provide: (0, _getworkspacescopedrepositorytokenutil.getWorkspaceScopedRepositoryToken)(_twofactorauthenticationmethodentity.TwoFactorAuthenticationMethodEntity),
                    useFactory: createMockRepository
                }
            ]
        }).compile();
        resolver = module.get(_twofactorauthenticationresolver.TwoFactorAuthenticationResolver);
        twoFactorAuthenticationService = module.get(_twofactorauthenticationservice.TwoFactorAuthenticationService);
        loginTokenService = module.get(_logintokenservice.LoginTokenService);
        userService = module.get(_userservice.UserService);
        workspaceDomainsService = module.get(_workspacedomainsservice.WorkspaceDomainsService);
        repository = module.get((0, _getworkspacescopedrepositorytokenutil.getWorkspaceScopedRepositoryToken)(_twofactorauthenticationmethodentity.TwoFactorAuthenticationMethodEntity));
    });
    afterEach(()=>{
        jest.clearAllMocks();
    });
    it('should be defined', ()=>{
        expect(resolver).toBeDefined();
    });
    describe('initiateOTPProvisioning', ()=>{
        const mockInput = {
            loginToken: 'valid-login-token'
        };
        const origin = 'https://app.twenty.com';
        beforeEach(()=>{
            loginTokenService.verifyLoginToken.mockResolvedValue({
                sub: mockUser.email,
                workspaceId: mockWorkspace.id
            });
            workspaceDomainsService.getWorkspaceByOriginOrDefaultWorkspace.mockResolvedValue(mockWorkspace);
            userService.findUserByEmailOrThrow.mockResolvedValue(mockUser);
            twoFactorAuthenticationService.initiateStrategyConfiguration.mockResolvedValue('otpauth://totp/Twenty:test@example.com?secret=SECRETKEY&issuer=Twenty');
        });
        it('should successfully initiate OTP provisioning', async ()=>{
            const result = await resolver.initiateOTPProvisioning(mockInput, origin);
            expect(result).toEqual({
                uri: 'otpauth://totp/Twenty:test@example.com?secret=SECRETKEY&issuer=Twenty'
            });
            expect(loginTokenService.verifyLoginToken).toHaveBeenCalledWith(mockInput.loginToken);
            expect(workspaceDomainsService.getWorkspaceByOriginOrDefaultWorkspace).toHaveBeenCalledWith(origin);
            expect(userService.findUserByEmailOrThrow).toHaveBeenCalledWith(mockUser.email);
            expect(twoFactorAuthenticationService.initiateStrategyConfiguration).toHaveBeenCalledWith(mockUser.id, mockUser.email, mockWorkspace.id, mockWorkspace.displayName);
        });
        it('should throw WORKSPACE_NOT_FOUND when workspace is not found', async ()=>{
            workspaceDomainsService.getWorkspaceByOriginOrDefaultWorkspace.mockResolvedValue(null);
            await expect(resolver.initiateOTPProvisioning(mockInput, origin)).rejects.toThrow(new _authexception.AuthException('Workspace not found', _authexception.AuthExceptionCode.WORKSPACE_NOT_FOUND));
        });
        it('should throw FORBIDDEN_EXCEPTION when token workspace does not match', async ()=>{
            loginTokenService.verifyLoginToken.mockResolvedValue({
                sub: mockUser.email,
                workspaceId: 'different-workspace-id'
            });
            await expect(resolver.initiateOTPProvisioning(mockInput, origin)).rejects.toThrow(new _authexception.AuthException('Token is not valid for this workspace', _authexception.AuthExceptionCode.FORBIDDEN_EXCEPTION));
        });
        it('should throw INTERNAL_SERVER_ERROR when URI is missing', async ()=>{
            twoFactorAuthenticationService.initiateStrategyConfiguration.mockResolvedValue(undefined);
            await expect(resolver.initiateOTPProvisioning(mockInput, origin)).rejects.toThrow(new _authexception.AuthException('OTP Auth URL missing', _authexception.AuthExceptionCode.INTERNAL_SERVER_ERROR));
        });
    });
    describe('initiateOTPProvisioningForAuthenticatedUser', ()=>{
        beforeEach(()=>{
            twoFactorAuthenticationService.initiateStrategyConfiguration.mockResolvedValue('otpauth://totp/Twenty:test@example.com?secret=SECRETKEY&issuer=Twenty');
        });
        it('should successfully initiate OTP provisioning for authenticated user', async ()=>{
            const result = await resolver.initiateOTPProvisioningForAuthenticatedUser(mockUser, mockWorkspace);
            expect(result).toEqual({
                uri: 'otpauth://totp/Twenty:test@example.com?secret=SECRETKEY&issuer=Twenty'
            });
            expect(twoFactorAuthenticationService.initiateStrategyConfiguration).toHaveBeenCalledWith(mockUser.id, mockUser.email, mockWorkspace.id, mockWorkspace.displayName);
        });
        it('should throw INTERNAL_SERVER_ERROR when URI is missing', async ()=>{
            twoFactorAuthenticationService.initiateStrategyConfiguration.mockResolvedValue(undefined);
            await expect(resolver.initiateOTPProvisioningForAuthenticatedUser(mockUser, mockWorkspace)).rejects.toThrow(new _authexception.AuthException('OTP Auth URL missing', _authexception.AuthExceptionCode.INTERNAL_SERVER_ERROR));
        });
    });
    describe('deleteTwoFactorAuthenticationMethod', ()=>{
        const mockInput = {
            twoFactorAuthenticationMethodId: '2fa-method-123'
        };
        beforeEach(()=>{
            repository.findOne.mockResolvedValue(mockTwoFactorMethod);
            repository.delete.mockResolvedValue({
                affected: 1
            });
        });
        it('should successfully delete two-factor authentication method', async ()=>{
            const result = await resolver.deleteTwoFactorAuthenticationMethod(mockInput, mockWorkspace, mockUser);
            expect(result).toEqual({
                success: true
            });
            expect(repository.findOne).toHaveBeenCalledWith(mockWorkspace.id, {
                where: {
                    id: mockInput.twoFactorAuthenticationMethodId
                },
                relations: [
                    'userWorkspace'
                ]
            });
            expect(repository.delete).toHaveBeenCalledWith(mockWorkspace.id, {
                id: mockInput.twoFactorAuthenticationMethodId
            });
        });
        it('should throw INVALID_INPUT when method is not found', async ()=>{
            repository.findOne.mockResolvedValue(null);
            await expect(resolver.deleteTwoFactorAuthenticationMethod(mockInput, mockWorkspace, mockUser)).rejects.toThrow(new _authexception.AuthException('Two-factor authentication method not found', _authexception.AuthExceptionCode.INVALID_INPUT));
        });
        it('should throw FORBIDDEN_EXCEPTION when user does not own the method', async ()=>{
            const wrongUserMethod = {
                ...mockTwoFactorMethod,
                userWorkspace: {
                    userId: 'different-user-id',
                    workspaceId: mockWorkspace.id
                }
            };
            repository.findOne.mockResolvedValue(wrongUserMethod);
            await expect(resolver.deleteTwoFactorAuthenticationMethod(mockInput, mockWorkspace, mockUser)).rejects.toThrow(new _authexception.AuthException('You can only delete your own two-factor authentication methods', _authexception.AuthExceptionCode.FORBIDDEN_EXCEPTION));
        });
    });
    describe('verifyTwoFactorAuthenticationMethodForAuthenticatedUser', ()=>{
        const mockInput = {
            otp: '123456'
        };
        beforeEach(()=>{
            twoFactorAuthenticationService.verifyTwoFactorAuthenticationMethodForAuthenticatedUser.mockResolvedValue({
                success: true
            });
        });
        it('should successfully verify two-factor authentication method', async ()=>{
            const result = await resolver.verifyTwoFactorAuthenticationMethodForAuthenticatedUser(mockInput, mockWorkspace, mockUser);
            expect(result).toEqual({
                success: true
            });
            expect(twoFactorAuthenticationService.verifyTwoFactorAuthenticationMethodForAuthenticatedUser).toHaveBeenCalledWith(mockUser.id, mockInput.otp, mockWorkspace.id);
        });
        it('should propagate service errors', async ()=>{
            const serviceError = new Error('Invalid OTP');
            twoFactorAuthenticationService.verifyTwoFactorAuthenticationMethodForAuthenticatedUser.mockRejectedValue(serviceError);
            await expect(resolver.verifyTwoFactorAuthenticationMethodForAuthenticatedUser(mockInput, mockWorkspace, mockUser)).rejects.toThrow(serviceError);
        });
    });
});

//# sourceMappingURL=two-factor-authentication.resolver.spec.js.map