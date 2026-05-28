"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _datefns = require("date-fns");
const _typeorm1 = require("typeorm");
const _apptokenentity = require("../../app-token/app-token.entity");
const _authexception = require("../auth.exception");
const _workspacedomainsservice = require("../../domain/workspace-domains/services/workspace-domains.service");
const _emailservice = require("../../email/email.service");
const _i18nservice = require("../../i18n/i18n.service");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
const _userservice = require("../../user/services/user.service");
const _workspaceentity = require("../../workspace/workspace.entity");
const _resetpasswordservice = require("./reset-password.service");
jest.mock('@react-email/render', ()=>({
        render: jest.fn().mockImplementation(async (_, options)=>{
            if (options?.plainText) {
                return 'Plain Text Email';
            }
            return '<html><body>HTML email content</body></html>';
        })
    }));
describe('ResetPasswordService', ()=>{
    let service;
    let userService;
    let workspaceRepository;
    let appTokenRepository;
    let emailService;
    let twentyConfigService;
    let workspaceDomainsService;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _resetpasswordservice.ResetPasswordService,
                {
                    provide: _userservice.UserService,
                    useValue: {
                        findUserByEmailOrThrow: jest.fn(),
                        findUserByIdOrThrow: jest.fn()
                    }
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_workspaceentity.WorkspaceEntity),
                    useClass: _typeorm1.Repository
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_apptokenentity.AppTokenEntity),
                    useClass: _typeorm1.Repository
                },
                {
                    provide: _emailservice.EmailService,
                    useValue: {
                        send: jest.fn().mockResolvedValue({
                            success: true
                        })
                    }
                },
                {
                    provide: _workspacedomainsservice.WorkspaceDomainsService,
                    useValue: {
                        buildWorkspaceURL: jest.fn()
                    }
                },
                {
                    provide: _twentyconfigservice.TwentyConfigService,
                    useValue: {
                        get: jest.fn()
                    }
                },
                {
                    provide: _i18nservice.I18nService,
                    useValue: {
                        getI18nInstance: jest.fn().mockReturnValue({
                            _: jest.fn().mockReturnValue('mocked-translation')
                        })
                    }
                }
            ]
        }).compile();
        service = module.get(_resetpasswordservice.ResetPasswordService);
        userService = module.get(_userservice.UserService);
        workspaceRepository = module.get((0, _typeorm.getRepositoryToken)(_workspaceentity.WorkspaceEntity));
        appTokenRepository = module.get((0, _typeorm.getRepositoryToken)(_apptokenentity.AppTokenEntity));
        emailService = module.get(_emailservice.EmailService);
        twentyConfigService = module.get(_twentyconfigservice.TwentyConfigService);
        workspaceDomainsService = module.get(_workspacedomainsservice.WorkspaceDomainsService);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
    describe('generatePasswordResetToken', ()=>{
        it('should generate a password reset token for a valid user', async ()=>{
            const mockUser = {
                id: '1',
                email: 'test@example.com'
            };
            jest.spyOn(userService, 'findUserByEmailOrThrow').mockResolvedValue(mockUser);
            jest.spyOn(appTokenRepository, 'findOne').mockResolvedValue(null);
            jest.spyOn(appTokenRepository, 'save').mockResolvedValue({});
            jest.spyOn(twentyConfigService, 'get').mockReturnValue('1h');
            const result = await service.generatePasswordResetToken('test@example.com', 'workspace-id');
            expect(result.passwordResetToken).toBeDefined();
            expect(result.passwordResetTokenExpiresAt).toBeDefined();
            expect(appTokenRepository.save).toHaveBeenCalledWith(expect.objectContaining({
                userId: '1',
                workspaceId: 'workspace-id',
                type: _apptokenentity.AppTokenType.PasswordResetToken
            }));
        });
        it('should resolve workspace when workspaceId is missing', async ()=>{
            const mockUser = {
                id: '1',
                email: 'test@example.com'
            };
            const mockWorkspace = {
                id: 'resolved-workspace-id'
            };
            jest.spyOn(userService, 'findUserByEmailOrThrow').mockResolvedValue(mockUser);
            jest.spyOn(workspaceRepository, 'findOne').mockResolvedValue(mockWorkspace);
            jest.spyOn(appTokenRepository, 'findOne').mockResolvedValue(null);
            jest.spyOn(appTokenRepository, 'save').mockResolvedValue({});
            jest.spyOn(twentyConfigService, 'get').mockReturnValue('1h');
            const result = await service.generatePasswordResetToken('test@example.com');
            expect(result.workspaceId).toBe('resolved-workspace-id');
            expect(appTokenRepository.save).toHaveBeenCalledWith(expect.objectContaining({
                workspaceId: 'resolved-workspace-id'
            }));
        });
        it('should throw an error if no password auth enabled workspace found', async ()=>{
            const mockUser = {
                id: '1',
                email: 'test@example.com'
            };
            jest.spyOn(userService, 'findUserByEmailOrThrow').mockResolvedValue(mockUser);
            jest.spyOn(workspaceRepository, 'findOne').mockResolvedValue(null);
            jest.spyOn(twentyConfigService, 'get').mockReturnValue('1h');
            await expect(service.generatePasswordResetToken('test@example.com')).rejects.toThrow(_authexception.AuthException);
        });
        it('should throw an error if user is not found', async ()=>{
            jest.spyOn(userService, 'findUserByEmailOrThrow').mockRejectedValue(new _authexception.AuthException('User not found', _authexception.AuthExceptionCode.INVALID_INPUT));
            await expect(service.generatePasswordResetToken('nonexistent@example.com', 'workspace-id')).rejects.toThrow(_authexception.AuthException);
        });
        it('should throw an error if a token already exists', async ()=>{
            const mockUser = {
                id: '1',
                email: 'test@example.com'
            };
            const mockExistingToken = {
                userId: '1',
                type: _apptokenentity.AppTokenType.PasswordResetToken,
                workspaceId: 'workspace-id',
                expiresAt: (0, _datefns.addMilliseconds)(new Date(), 3600000)
            };
            jest.spyOn(userService, 'findUserByEmailOrThrow').mockResolvedValue(mockUser);
            jest.spyOn(appTokenRepository, 'findOne').mockResolvedValue(mockExistingToken);
            jest.spyOn(twentyConfigService, 'get').mockReturnValue('1h');
            await expect(service.generatePasswordResetToken('test@example.com', 'workspace-id')).rejects.toThrow(_authexception.AuthException);
        });
    });
    describe('sendEmailPasswordResetLink', ()=>{
        it('should send a password reset email', async ()=>{
            const mockUser = {
                id: '1',
                email: 'test@example.com'
            };
            const mockToken = {
                workspaceId: 'workspace-id',
                passwordResetToken: 'token123',
                passwordResetTokenExpiresAt: new Date()
            };
            jest.spyOn(userService, 'findUserByEmailOrThrow').mockResolvedValue(mockUser);
            jest.spyOn(workspaceRepository, 'findOneBy').mockResolvedValue({
                id: 'workspace-id'
            });
            jest.spyOn(twentyConfigService, 'get').mockReturnValue('http://localhost:3000');
            jest.spyOn(workspaceDomainsService, 'buildWorkspaceURL').mockReturnValue(new URL('https://subdomain.localhost.com:3000/reset-password/passwordResetToken'));
            const result = await service.sendEmailPasswordResetLink({
                resetToken: mockToken,
                email: 'test@example.com',
                locale: 'en'
            });
            expect(result.success).toBe(true);
            expect(emailService.send).toHaveBeenCalled();
        });
        it('should throw an error if user is not found', async ()=>{
            const mockToken = {
                workspaceId: 'workspace-id',
                passwordResetToken: 'token123',
                passwordResetTokenExpiresAt: new Date()
            };
            jest.spyOn(userService, 'findUserByEmailOrThrow').mockRejectedValue(new _authexception.AuthException('User not found', _authexception.AuthExceptionCode.INVALID_INPUT));
            await expect(service.sendEmailPasswordResetLink({
                resetToken: mockToken,
                email: 'nonexistent@example.com',
                locale: 'en'
            })).rejects.toThrow(_authexception.AuthException);
        });
    });
    describe('validatePasswordResetToken', ()=>{
        it('should validate a correct password reset token', async ()=>{
            const mockToken = {
                userId: '1',
                type: _apptokenentity.AppTokenType.PasswordResetToken,
                expiresAt: (0, _datefns.addMilliseconds)(new Date(), 3600000)
            };
            const mockUser = {
                id: '1',
                email: 'test@example.com'
            };
            jest.spyOn(appTokenRepository, 'findOne').mockResolvedValue(mockToken);
            jest.spyOn(userService, 'findUserByIdOrThrow').mockResolvedValue(mockUser);
            const result = await service.validatePasswordResetToken('validToken');
            expect(result).toEqual({
                id: '1',
                email: 'test@example.com',
                hasPassword: false
            });
        });
        it('should throw an error for an invalid token', async ()=>{
            jest.spyOn(appTokenRepository, 'findOne').mockResolvedValue(null);
            await expect(service.validatePasswordResetToken('invalidToken')).rejects.toThrow(_authexception.AuthException);
        });
    });
    describe('invalidatePasswordResetToken', ()=>{
        it('should invalidate an existing password reset token', async ()=>{
            const mockUser = {
                id: '1',
                email: 'test@example.com'
            };
            jest.spyOn(userService, 'findUserByIdOrThrow').mockResolvedValue(mockUser);
            jest.spyOn(appTokenRepository, 'update').mockResolvedValue({});
            const result = await service.invalidatePasswordResetToken('1');
            expect(result.success).toBe(true);
            expect(appTokenRepository.update).toHaveBeenCalledWith({
                userId: '1',
                type: _apptokenentity.AppTokenType.PasswordResetToken
            }, {
                revokedAt: expect.any(Date)
            });
        });
        it('should throw an error if user is not found', async ()=>{
            jest.spyOn(userService, 'findUserByIdOrThrow').mockRejectedValue(new _authexception.AuthException('User not found', _authexception.AuthExceptionCode.INVALID_INPUT));
            await expect(service.invalidatePasswordResetToken('nonexistent')).rejects.toThrow(_authexception.AuthException);
        });
    });
});

//# sourceMappingURL=reset-password.service.spec.js.map