"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _authexception = require("../auth.exception");
const _workspacetype = require("../../workspace/types/workspace.type");
const _signinupservice = require("./sign-in-up.service");
const mockPartialUserPayload = {
    email: 'first.user@acme.dev',
    firstName: 'First',
    lastName: 'User',
    locale: 'en',
    isEmailAlreadyVerified: true
};
const createSignInUpServiceForTests = ()=>{
    const mockUserRepository = {
        create: jest.fn((user)=>user),
        save: jest.fn(async (user)=>({
                id: 'saved-user-id',
                ...user
            })),
        count: jest.fn()
    };
    const mockWorkspaceRepository = {
        count: jest.fn(),
        create: jest.fn()
    };
    const mockConfigurationValues = {
        IS_MULTIWORKSPACE_ENABLED: true,
        IS_WORKSPACE_CREATION_LIMITED_TO_SERVER_ADMINS: false,
        SERVER_URL: 'http://localhost:3000'
    };
    const mockTwentyConfigService = {
        get: jest.fn((configKey)=>mockConfigurationValues[configKey])
    };
    const queryRunnerMock = {
        manager: {
            save: jest.fn()
        },
        connect: jest.fn(),
        startTransaction: jest.fn(),
        commitTransaction: jest.fn(),
        rollbackTransaction: jest.fn(),
        release: jest.fn()
    };
    const service = new _signinupservice.SignInUpService(mockUserRepository, mockWorkspaceRepository, {
        validatePersonalInvitation: jest.fn(),
        invalidateWorkspaceInvitation: jest.fn()
    }, {
        create: jest.fn(),
        checkUserWorkspaceExists: jest.fn()
    }, {
        setOnboardingCreateProfilePending: jest.fn(),
        setOnboardingInviteTeamPending: jest.fn(),
        createOnboardingStatusForWorkspaceMember: jest.fn()
    }, {
        emitCustomBatchEvent: jest.fn()
    }, mockTwentyConfigService, {
        generateSubdomain: jest.fn()
    }, {
        findUserByEmail: jest.fn(),
        findByEmail: jest.fn(),
        markEmailAsVerified: jest.fn()
    }, {
        incrementCounterForEvent: jest.fn()
    }, {
        invalidateAndRecompute: jest.fn()
    }, {
        createWorkspaceCustomApplication: jest.fn()
    }, {
        uploadWorkspaceLogoFromUrl: jest.fn()
    }, {
        isValid: jest.fn().mockReturnValue(false)
    }, {
        createContext: jest.fn().mockReturnValue({
            insertWorkspaceEvent: jest.fn()
        })
    }, {
        createQueryRunner: jest.fn(()=>queryRunnerMock)
    });
    return {
        service,
        mockUserRepository,
        mockWorkspaceRepository,
        mockConfigurationValues
    };
};
describe('SignInUpService workspace-creation policy', ()=>{
    it('grants bootstrap owner server permissions when multi-workspace is enabled and unrestricted', async ()=>{
        const { service, mockUserRepository, mockWorkspaceRepository, mockConfigurationValues } = createSignInUpServiceForTests();
        mockConfigurationValues.IS_MULTIWORKSPACE_ENABLED = true;
        mockConfigurationValues.IS_WORKSPACE_CREATION_LIMITED_TO_SERVER_ADMINS = false;
        mockWorkspaceRepository.count.mockResolvedValue(0);
        mockUserRepository.count.mockResolvedValue(0);
        jest.spyOn(service.userService, 'findUserByEmail').mockResolvedValue(null);
        await service.signUpWithoutWorkspace(mockPartialUserPayload, {
            provider: _workspacetype.AuthProviderEnum.Google
        });
        expect(mockUserRepository.create).toHaveBeenCalledWith(expect.objectContaining({
            canImpersonate: true,
            canAccessFullAdminPanel: true
        }));
    });
    it('grants bootstrap owner server permissions when multi-workspace is enabled and restricted', async ()=>{
        const { service, mockUserRepository, mockWorkspaceRepository, mockConfigurationValues } = createSignInUpServiceForTests();
        mockConfigurationValues.IS_MULTIWORKSPACE_ENABLED = true;
        mockConfigurationValues.IS_WORKSPACE_CREATION_LIMITED_TO_SERVER_ADMINS = true;
        mockWorkspaceRepository.count.mockResolvedValue(0);
        mockUserRepository.count.mockResolvedValue(0);
        jest.spyOn(service.userService, 'findUserByEmail').mockResolvedValue(null);
        await service.signUpWithoutWorkspace(mockPartialUserPayload, {
            provider: _workspacetype.AuthProviderEnum.Google
        });
        expect(mockUserRepository.create).toHaveBeenCalledWith(expect.objectContaining({
            canImpersonate: true,
            canAccessFullAdminPanel: true
        }));
    });
    it('assigns default non-admin permissions after bootstrap in multi-workspace mode', async ()=>{
        const { service, mockUserRepository, mockWorkspaceRepository, mockConfigurationValues } = createSignInUpServiceForTests();
        mockConfigurationValues.IS_MULTIWORKSPACE_ENABLED = true;
        mockConfigurationValues.IS_WORKSPACE_CREATION_LIMITED_TO_SERVER_ADMINS = false;
        mockWorkspaceRepository.count.mockResolvedValue(1);
        mockUserRepository.count.mockResolvedValue(1);
        jest.spyOn(service.userService, 'findUserByEmail').mockResolvedValue(null);
        await service.signUpWithoutWorkspace(mockPartialUserPayload, {
            provider: _workspacetype.AuthProviderEnum.Google
        });
        expect(mockUserRepository.create).toHaveBeenCalledWith(expect.objectContaining({
            canImpersonate: false,
            canAccessFullAdminPanel: false
        }));
    });
    it('does not grant admin to second user signing up before any workspace exists', async ()=>{
        const { service, mockUserRepository, mockWorkspaceRepository, mockConfigurationValues } = createSignInUpServiceForTests();
        mockConfigurationValues.IS_MULTIWORKSPACE_ENABLED = true;
        mockConfigurationValues.IS_WORKSPACE_CREATION_LIMITED_TO_SERVER_ADMINS = false;
        mockWorkspaceRepository.count.mockResolvedValue(0);
        mockUserRepository.count.mockResolvedValue(1);
        jest.spyOn(service.userService, 'findUserByEmail').mockResolvedValue(null);
        await service.signUpWithoutWorkspace(mockPartialUserPayload, {
            provider: _workspacetype.AuthProviderEnum.Google
        });
        expect(mockUserRepository.create).toHaveBeenCalledWith(expect.objectContaining({
            canImpersonate: false,
            canAccessFullAdminPanel: false
        }));
    });
    it('throws forbidden when a non-admin existing user creates workspace in restricted mode after bootstrap', async ()=>{
        const { service, mockWorkspaceRepository, mockConfigurationValues } = createSignInUpServiceForTests();
        mockConfigurationValues.IS_MULTIWORKSPACE_ENABLED = true;
        mockConfigurationValues.IS_WORKSPACE_CREATION_LIMITED_TO_SERVER_ADMINS = true;
        mockWorkspaceRepository.count.mockResolvedValue(1);
        const nonAdminExistingUser = {
            id: 'existing-user-id',
            email: 'existing.user@acme.dev',
            canAccessFullAdminPanel: false
        };
        await expect(service.signUpOnNewWorkspace({
            type: 'existingUser',
            existingUser: nonAdminExistingUser
        })).rejects.toMatchObject({
            code: _authexception.AuthExceptionCode.FORBIDDEN_EXCEPTION
        });
    });
    it('throws SIGNUP_DISABLED when creating workspace in single-workspace mode after bootstrap', async ()=>{
        const { service, mockWorkspaceRepository, mockConfigurationValues } = createSignInUpServiceForTests();
        mockConfigurationValues.IS_MULTIWORKSPACE_ENABLED = false;
        mockConfigurationValues.IS_WORKSPACE_CREATION_LIMITED_TO_SERVER_ADMINS = false;
        mockWorkspaceRepository.count.mockResolvedValue(1);
        await expect(service.signUpOnNewWorkspace({
            type: 'existingUser',
            existingUser: {
                id: 'existing-user-id',
                email: 'existing.user@acme.dev',
                canAccessFullAdminPanel: true
            }
        })).rejects.toMatchObject({
            code: _authexception.AuthExceptionCode.SIGNUP_DISABLED
        });
    });
    it('keeps single-workspace SIGNUP_DISABLED behavior after first workspace exists', async ()=>{
        const { service, mockWorkspaceRepository, mockConfigurationValues } = createSignInUpServiceForTests();
        mockConfigurationValues.IS_MULTIWORKSPACE_ENABLED = false;
        mockConfigurationValues.IS_WORKSPACE_CREATION_LIMITED_TO_SERVER_ADMINS = false;
        mockWorkspaceRepository.count.mockResolvedValue(1);
        jest.spyOn(service.userService, 'findUserByEmail').mockResolvedValue(null);
        await expect(service.signUpWithoutWorkspace(mockPartialUserPayload, {
            provider: _workspacetype.AuthProviderEnum.Google
        })).rejects.toBeInstanceOf(_authexception.AuthException);
        await expect(service.signUpWithoutWorkspace(mockPartialUserPayload, {
            provider: _workspacetype.AuthProviderEnum.Google
        })).rejects.toMatchObject({
            code: _authexception.AuthExceptionCode.SIGNUP_DISABLED
        });
    });
});

//# sourceMappingURL=sign-in-up.service.spec.js.map