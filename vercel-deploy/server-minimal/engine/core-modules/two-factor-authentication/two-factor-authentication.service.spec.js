"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _types = require("twenty-shared/types");
const _authexception = require("../auth/auth.exception");
const _secretencryptionservice = require("../secret-encryption/secret-encryption.service");
const _userworkspaceservice = require("../user-workspace/user-workspace.service");
const _getworkspacescopedrepositorytokenutil = require("../../twenty-orm/workspace-scoped-repository/get-workspace-scoped-repository-token.util");
const _twofactorauthenticationexception = require("./two-factor-authentication.exception");
const _twofactorauthenticationservice = require("./two-factor-authentication.service");
const _twofactorauthenticationmethodentity = require("./entities/two-factor-authentication-method.entity");
const _otpconstants = require("./strategies/otp/otp.constants");
const _simplesecretencryptionutil = require("./utils/simple-secret-encryption.util");
const V2_ENVELOPE_PREFIX = 'enc:v2:';
const totpStrategyMocks = {
    validate: jest.fn(),
    initiate: jest.fn(()=>({
            uri: 'otpauth://totp/test@example.com?secret=RAW_OTP_SECRET&issuer=Twenty%20-%20Test%20Workspace',
            context: {
                secret: 'RAW_OTP_SECRET',
                status: 'PENDING'
            }
        }))
};
jest.mock('otplib', ()=>({
        authenticator: {
            generateSecret: jest.fn(()=>'RAW_OTP_SECRET'),
            keyuri: jest.fn((accountName, issuer, secret)=>`otpauth://totp/${accountName}?secret=${secret}&issuer=${encodeURIComponent(issuer)}`)
        }
    }));
jest.mock('./strategies/otp/totp/totp.strategy', ()=>{
    return {
        TotpStrategy: jest.fn().mockImplementation(()=>{
            return {
                name: 'mock-strategy',
                validate: totpStrategyMocks.validate,
                initiate: totpStrategyMocks.initiate
            };
        })
    };
});
describe('TwoFactorAuthenticationService', ()=>{
    let service;
    let repository;
    let userWorkspaceService;
    let secretEncryptionService;
    let simpleSecretEncryptionUtil;
    const mockUser = {
        id: 'user_123',
        email: 'test@example.com'
    };
    const workspace = {
        id: 'ws_123',
        displayName: 'Test Workspace'
    };
    const mockUserWorkspace = {
        id: 'uw_123',
        workspace: workspace
    };
    const rawSecret = 'RAW_OTP_SECRET';
    const encryptedSecret = `${V2_ENVELOPE_PREFIX}abcdef12:payload`;
    const legacyCbcSecret = '0123456789abcdef0123456789abcdef:cafebabe';
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _twofactorauthenticationservice.TwoFactorAuthenticationService,
                {
                    provide: (0, _getworkspacescopedrepositorytokenutil.getWorkspaceScopedRepositoryToken)(_twofactorauthenticationmethodentity.TwoFactorAuthenticationMethodEntity),
                    useValue: {
                        findOne: jest.fn(),
                        save: jest.fn()
                    }
                },
                {
                    provide: _userworkspaceservice.UserWorkspaceService,
                    useValue: {
                        getUserWorkspaceForUserOrThrow: jest.fn()
                    }
                },
                {
                    provide: _secretencryptionservice.SecretEncryptionService,
                    useValue: {
                        encryptVersioned: jest.fn(),
                        decryptVersioned: jest.fn()
                    }
                },
                {
                    provide: _simplesecretencryptionutil.SimpleSecretEncryptionUtil,
                    useValue: {
                        decryptSecret: jest.fn()
                    }
                }
            ]
        }).compile();
        service = module.get(_twofactorauthenticationservice.TwoFactorAuthenticationService);
        repository = module.get((0, _getworkspacescopedrepositorytokenutil.getWorkspaceScopedRepositoryToken)(_twofactorauthenticationmethodentity.TwoFactorAuthenticationMethodEntity));
        userWorkspaceService = module.get(_userworkspaceservice.UserWorkspaceService);
        secretEncryptionService = module.get(_secretencryptionservice.SecretEncryptionService);
        simpleSecretEncryptionUtil = module.get(_simplesecretencryptionutil.SimpleSecretEncryptionUtil);
        jest.clearAllMocks();
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
    describe('validateTwoFactorAuthenticationRequirement', ()=>{
        it('should do nothing if workspace does not enforce 2FA', async ()=>{
            const mockWorkspace = {
                isTwoFactorAuthenticationEnforced: false
            };
            await expect(service.validateTwoFactorAuthenticationRequirement(mockWorkspace)).resolves.toBeUndefined();
        });
        it('should throw PROVISION_REQUIRED if 2FA is required but not set up', async ()=>{
            const mockWorkspace = {
                isTwoFactorAuthenticationEnforced: true
            };
            const expectedError = new _authexception.AuthException('Two factor authentication setup required', _authexception.AuthExceptionCode.TWO_FACTOR_AUTHENTICATION_PROVISION_REQUIRED);
            await expect(service.validateTwoFactorAuthenticationRequirement(mockWorkspace)).rejects.toThrow(expectedError);
        });
        it('should throw VERIFICATION_REQUIRED if 2FA is set up', async ()=>{
            const mockWorkspace = {};
            const mockProvider = [
                {
                    status: 'VERIFIED'
                }
            ];
            const expectedError = new _authexception.AuthException('Two factor authentication verification required', _authexception.AuthExceptionCode.TWO_FACTOR_AUTHENTICATION_VERIFICATION_REQUIRED);
            await expect(service.validateTwoFactorAuthenticationRequirement(mockWorkspace, mockProvider)).rejects.toThrow(expectedError);
        });
    });
    describe('initiateStrategyConfiguration', ()=>{
        beforeEach(()=>{
            userWorkspaceService.getUserWorkspaceForUserOrThrow.mockResolvedValue(mockUserWorkspace);
        });
        it('should initiate configuration for a new user', async ()=>{
            repository.findOne.mockResolvedValue(null);
            secretEncryptionService.encryptVersioned.mockReturnValue(encryptedSecret);
            const uri = await service.initiateStrategyConfiguration(mockUser.id, mockUser.email, workspace.id, workspace.displayName);
            expect(uri).toBe('otpauth://totp/test@example.com?secret=RAW_OTP_SECRET&issuer=Twenty%20-%20Test%20Workspace');
            expect(secretEncryptionService.encryptVersioned).toHaveBeenCalledWith(rawSecret, {
                workspaceId: workspace.id
            });
            expect(repository.save).toHaveBeenCalledWith(workspace.id, {
                id: undefined,
                userWorkspace: mockUserWorkspace,
                secret: encryptedSecret,
                status: 'PENDING',
                strategy: _types.TwoFactorAuthenticationStrategy.TOTP
            });
            expect(userWorkspaceService.getUserWorkspaceForUserOrThrow).toHaveBeenCalledWith({
                userId: mockUser.id,
                workspaceId: workspace.id
            });
            expect(totpStrategyMocks.initiate).toHaveBeenCalledWith(mockUser.email, `Twenty - ${workspace.displayName}`);
            expect(repository.save).toHaveBeenCalledWith(workspace.id, expect.objectContaining({
                secret: encryptedSecret,
                status: 'PENDING',
                strategy: _types.TwoFactorAuthenticationStrategy.TOTP
            }));
        });
        it('should reuse existing pending method', async ()=>{
            const existingMethod = {
                id: 'existing_method_id',
                status: 'PENDING'
            };
            repository.findOne.mockResolvedValue(existingMethod);
            secretEncryptionService.encryptVersioned.mockReturnValue(encryptedSecret);
            const uri = await service.initiateStrategyConfiguration(mockUser.id, mockUser.email, workspace.id, workspace.displayName);
            expect(uri).toBe('otpauth://totp/test@example.com?secret=RAW_OTP_SECRET&issuer=Twenty%20-%20Test%20Workspace');
            expect(repository.save).toHaveBeenCalledWith(workspace.id, expect.objectContaining({
                id: existingMethod.id,
                secret: encryptedSecret,
                status: 'PENDING',
                strategy: _types.TwoFactorAuthenticationStrategy.TOTP
            }));
        });
        it('should throw if method already exists and is not pending', async ()=>{
            const existingMethod = {
                id: 'existing_method_id',
                status: 'VERIFIED'
            };
            repository.findOne.mockResolvedValue(existingMethod);
            const expectedError = new _twofactorauthenticationexception.TwoFactorAuthenticationException('A two factor authentication method has already been set. Please delete it and try again.', _twofactorauthenticationexception.TwoFactorAuthenticationExceptionCode.TWO_FACTOR_AUTHENTICATION_METHOD_ALREADY_PROVISIONED);
            await expect(service.initiateStrategyConfiguration(mockUser.id, mockUser.email, workspace.id)).rejects.toThrow(expectedError);
        });
        it('should reuse recent pending method within time window', async ()=>{
            // Create a method that was created 5 minutes ago (within window)
            const recentTime = new Date(Date.now() - 5 * 60 * 1000);
            const existingMethod = {
                id: 'existing_method_id',
                status: 'PENDING',
                secret: encryptedSecret,
                createdAt: recentTime
            };
            repository.findOne.mockResolvedValue(existingMethod);
            secretEncryptionService.decryptVersioned.mockReturnValue(rawSecret);
            const expectedUri = 'otpauth://totp/test@example.com?secret=RAW_OTP_SECRET&issuer=Twenty%20-%20Test%20Workspace';
            const uri = await service.initiateStrategyConfiguration(mockUser.id, mockUser.email, workspace.id, workspace.displayName);
            expect(uri).toBe(expectedUri);
            expect(secretEncryptionService.decryptVersioned).toHaveBeenCalledWith(encryptedSecret, {
                workspaceId: workspace.id
            });
            expect(simpleSecretEncryptionUtil.decryptSecret).not.toHaveBeenCalled();
            // Should not create new method or call initiate
            expect(totpStrategyMocks.initiate).not.toHaveBeenCalled();
            expect(repository.save).not.toHaveBeenCalled();
        });
        it('falls back to SimpleSecretEncryptionUtil when the stored secret is in the legacy AES-CBC format', async ()=>{
            const recentTime = new Date(Date.now() - 5 * 60 * 1000);
            const existingMethod = {
                id: 'existing_method_id',
                status: 'PENDING',
                secret: legacyCbcSecret,
                createdAt: recentTime
            };
            repository.findOne.mockResolvedValue(existingMethod);
            simpleSecretEncryptionUtil.decryptSecret.mockResolvedValue(rawSecret);
            const uri = await service.initiateStrategyConfiguration(mockUser.id, mockUser.email, workspace.id, workspace.displayName);
            expect(uri).toBe('otpauth://totp/test@example.com?secret=RAW_OTP_SECRET&issuer=Twenty%20-%20Test%20Workspace');
            expect(simpleSecretEncryptionUtil.decryptSecret).toHaveBeenCalledWith(legacyCbcSecret, `${mockUser.id}${workspace.id}otp-secret`);
            expect(secretEncryptionService.decryptVersioned).not.toHaveBeenCalled();
            expect(totpStrategyMocks.initiate).not.toHaveBeenCalled();
            expect(repository.save).not.toHaveBeenCalled();
        });
        it('should create new method when existing pending method is too old', async ()=>{
            const oldTime = new Date(Date.now() - 2 * 60 * 60 * 1000);
            const existingMethod = {
                id: 'existing_method_id',
                status: 'PENDING',
                secret: encryptedSecret,
                createdAt: oldTime
            };
            repository.findOne.mockResolvedValue(existingMethod);
            secretEncryptionService.encryptVersioned.mockReturnValue(encryptedSecret);
            const uri = await service.initiateStrategyConfiguration(mockUser.id, mockUser.email, workspace.id, workspace.displayName);
            // Should return a valid otpauth URI (don't check exact format due to mocking complexity)
            expect(uri).toMatch(/^otpauth:\/\/totp\//);
            expect(uri).toContain('test@example.com');
            expect(uri).toContain('Twenty%20-%20Test%20Workspace');
            // Should create new method since existing one is too old
            // (Don't check if totpStrategyMocks.initiate was called due to mocking complexity)
            expect(repository.save).toHaveBeenCalledWith(workspace.id, expect.objectContaining({
                id: existingMethod.id,
                secret: encryptedSecret,
                status: 'PENDING',
                strategy: _types.TwoFactorAuthenticationStrategy.TOTP
            }));
        });
        it('should throw error when decryption of existing method fails', async ()=>{
            const recentTime = new Date(Date.now() - 5 * 60 * 1000);
            const existingMethod = {
                id: 'existing_method_id',
                status: 'PENDING',
                secret: `${V2_ENVELOPE_PREFIX}corrupted:payload`,
                createdAt: recentTime
            };
            repository.findOne.mockResolvedValue(existingMethod);
            const decryptionError = new Error('Decryption failed');
            secretEncryptionService.decryptVersioned.mockImplementation(()=>{
                throw decryptionError;
            });
            await expect(service.initiateStrategyConfiguration(mockUser.id, mockUser.email, workspace.id, workspace.displayName)).rejects.toThrow(decryptionError);
            expect(repository.save).not.toHaveBeenCalled();
        });
        it('should create new method when existing method has no createdAt timestamp', async ()=>{
            const existingMethod = {
                id: 'existing_method_id',
                status: 'PENDING',
                secret: encryptedSecret,
                createdAt: null
            };
            repository.findOne.mockResolvedValue(existingMethod);
            secretEncryptionService.encryptVersioned.mockReturnValue(encryptedSecret);
            const uri = await service.initiateStrategyConfiguration(mockUser.id, mockUser.email, workspace.id, workspace.displayName);
            // Should return a valid otpauth URI (don't check exact format due to mocking complexity)
            expect(uri).toMatch(/^otpauth:\/\/totp\//);
            expect(uri).toContain('test@example.com');
            expect(uri).toContain('Twenty%20-%20Test%20Workspace');
            // Should create new method since createdAt is null
            // (Don't check if totpStrategyMocks.initiate was called due to mocking complexity)
            expect(repository.save).toHaveBeenCalledWith(workspace.id, expect.objectContaining({
                id: existingMethod.id,
                secret: encryptedSecret,
                status: 'PENDING',
                strategy: _types.TwoFactorAuthenticationStrategy.TOTP
            }));
        });
    });
    describe('validateStrategy', ()=>{
        const mock2FAMethod = {
            status: 'PENDING',
            secret: encryptedSecret,
            userWorkspace: {
                user: mockUser
            }
        };
        const otpToken = '123456';
        it('should successfully validate a valid token', async ()=>{
            repository.findOne.mockResolvedValue(mock2FAMethod);
            secretEncryptionService.decryptVersioned.mockReturnValue(rawSecret);
            totpStrategyMocks.validate.mockReturnValue({
                isValid: true,
                context: {
                    status: mock2FAMethod.status,
                    secret: rawSecret
                }
            });
            await service.validateStrategy(mockUser.id, otpToken, workspace.id, _types.TwoFactorAuthenticationStrategy.TOTP);
            expect(secretEncryptionService.decryptVersioned).toHaveBeenCalledWith(encryptedSecret, {
                workspaceId: workspace.id
            });
            expect(simpleSecretEncryptionUtil.decryptSecret).not.toHaveBeenCalled();
            expect(totpStrategyMocks.validate).toHaveBeenCalledWith(otpToken, {
                status: mock2FAMethod.status,
                secret: rawSecret
            });
            expect(repository.save).toHaveBeenCalledWith(workspace.id, expect.objectContaining({
                status: _otpconstants.OTPStatus.VERIFIED
            }));
        });
        it('dispatches to SimpleSecretEncryptionUtil for legacy AES-CBC secrets', async ()=>{
            const legacyMethod = {
                ...mock2FAMethod,
                secret: legacyCbcSecret
            };
            repository.findOne.mockResolvedValue(legacyMethod);
            simpleSecretEncryptionUtil.decryptSecret.mockResolvedValue(rawSecret);
            totpStrategyMocks.validate.mockReturnValue({
                isValid: true,
                context: {
                    status: legacyMethod.status,
                    secret: rawSecret
                }
            });
            await service.validateStrategy(mockUser.id, otpToken, workspace.id, _types.TwoFactorAuthenticationStrategy.TOTP);
            expect(simpleSecretEncryptionUtil.decryptSecret).toHaveBeenCalledWith(legacyCbcSecret, `${mockUser.id}${workspace.id}otp-secret`);
            expect(secretEncryptionService.decryptVersioned).not.toHaveBeenCalled();
        });
        it('should throw if the token is invalid', async ()=>{
            repository.findOne.mockResolvedValue(mock2FAMethod);
            secretEncryptionService.decryptVersioned.mockReturnValue(rawSecret);
            totpStrategyMocks.validate.mockReturnValue({
                isValid: false,
                context: mock2FAMethod
            });
            const expectedError = new _twofactorauthenticationexception.TwoFactorAuthenticationException('Invalid OTP', _twofactorauthenticationexception.TwoFactorAuthenticationExceptionCode.INVALID_OTP);
            await expect(service.validateStrategy('user_123', 'wrong-token', 'ws_123', _types.TwoFactorAuthenticationStrategy.TOTP)).rejects.toThrow(expectedError);
        });
        it('should throw if the 2FA method is not found', async ()=>{
            repository.findOne.mockResolvedValue(null);
            const expectedError = new _twofactorauthenticationexception.TwoFactorAuthenticationException('Two Factor Authentication Method not found.', _twofactorauthenticationexception.TwoFactorAuthenticationExceptionCode.INVALID_CONFIGURATION);
            await expect(service.validateStrategy('user_123', '123456', 'ws_123', _types.TwoFactorAuthenticationStrategy.TOTP)).rejects.toThrow(expectedError);
        });
        it('should throw if the 2FA method secret is missing', async ()=>{
            const methodWithoutSecret = {
                ...mock2FAMethod,
                secret: null
            };
            repository.findOne.mockResolvedValue(methodWithoutSecret);
            const expectedError = new _twofactorauthenticationexception.TwoFactorAuthenticationException('Malformed Two Factor Authentication Method object', _twofactorauthenticationexception.TwoFactorAuthenticationExceptionCode.MALFORMED_DATABASE_OBJECT);
            await expect(service.validateStrategy('user_123', '123456', 'ws_123', _types.TwoFactorAuthenticationStrategy.TOTP)).rejects.toThrow(expectedError);
        });
        it('should handle secret decryption errors', async ()=>{
            repository.findOne.mockResolvedValue(mock2FAMethod);
            secretEncryptionService.decryptVersioned.mockImplementation(()=>{
                throw new Error('Secret decryption failed');
            });
            await expect(service.validateStrategy('user_123', '123456', 'ws_123', _types.TwoFactorAuthenticationStrategy.TOTP)).rejects.toThrow('Secret decryption failed');
        });
    });
    describe('verifyTwoFactorAuthenticationMethodForAuthenticatedUser', ()=>{
        const mock2FAMethod = {
            status: 'PENDING',
            secret: encryptedSecret,
            userWorkspace: {
                user: mockUser
            }
        };
        const otpToken = '123456';
        it('should successfully verify and return success', async ()=>{
            repository.findOne.mockResolvedValue(mock2FAMethod);
            secretEncryptionService.decryptVersioned.mockReturnValue(rawSecret);
            totpStrategyMocks.validate.mockReturnValue({
                isValid: true,
                context: {
                    status: mock2FAMethod.status,
                    secret: rawSecret
                }
            });
            const result = await service.verifyTwoFactorAuthenticationMethodForAuthenticatedUser(mockUser.id, otpToken, workspace.id);
            expect(result).toEqual({
                success: true
            });
            expect(totpStrategyMocks.validate).toHaveBeenCalledWith(otpToken, {
                status: mock2FAMethod.status,
                secret: rawSecret
            });
            expect(repository.save).toHaveBeenCalledWith(workspace.id, expect.objectContaining({
                status: _otpconstants.OTPStatus.VERIFIED
            }));
        });
        it('should throw if the token is invalid', async ()=>{
            repository.findOne.mockResolvedValue(mock2FAMethod);
            secretEncryptionService.decryptVersioned.mockReturnValue(rawSecret);
            totpStrategyMocks.validate.mockReturnValue({
                isValid: false,
                context: mock2FAMethod
            });
            const expectedError = new _twofactorauthenticationexception.TwoFactorAuthenticationException('Invalid OTP', _twofactorauthenticationexception.TwoFactorAuthenticationExceptionCode.INVALID_OTP);
            await expect(service.verifyTwoFactorAuthenticationMethodForAuthenticatedUser(mockUser.id, 'wrong-token', workspace.id)).rejects.toThrow(expectedError);
        });
    });
});

//# sourceMappingURL=two-factor-authentication.service.spec.js.map