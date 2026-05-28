"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _crypto = /*#__PURE__*/ _interop_require_default(require("crypto"));
const _typeorm1 = require("typeorm");
const _apptokenentity = require("../../../app-token/app-token.entity");
const _emailverificationexception = require("../../../email-verification/email-verification.exception");
const _twentyconfigservice = require("../../../twenty-config/twenty-config.service");
const _userentity = require("../../../user/user.entity");
const _emailverificationtokenservice = require("./email-verification-token.service");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
describe('EmailVerificationTokenService', ()=>{
    let service;
    let appTokenRepository;
    let userRepository;
    let twentyConfigService;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _emailverificationtokenservice.EmailVerificationTokenService,
                {
                    provide: (0, _typeorm.getRepositoryToken)(_apptokenentity.AppTokenEntity),
                    useClass: _typeorm1.Repository
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_userentity.UserEntity),
                    useValue: {
                        findOne: jest.fn()
                    }
                },
                {
                    provide: _twentyconfigservice.TwentyConfigService,
                    useValue: {
                        get: jest.fn()
                    }
                }
            ]
        }).compile();
        service = module.get(_emailverificationtokenservice.EmailVerificationTokenService);
        appTokenRepository = module.get((0, _typeorm.getRepositoryToken)(_apptokenentity.AppTokenEntity));
        userRepository = module.get((0, _typeorm.getRepositoryToken)(_userentity.UserEntity));
        twentyConfigService = module.get(_twentyconfigservice.TwentyConfigService);
    });
    describe('generateToken', ()=>{
        it('should generate a verification token successfully', async ()=>{
            const userId = 'test-user-id';
            const email = 'test@example.com';
            const mockExpiresIn = '24h';
            jest.spyOn(twentyConfigService, 'get').mockReturnValue(mockExpiresIn);
            jest.spyOn(appTokenRepository, 'create').mockReturnValue({});
            jest.spyOn(appTokenRepository, 'save').mockResolvedValue({});
            const result = await service.generateToken(userId, email);
            expect(result).toHaveProperty('token');
            expect(result).toHaveProperty('expiresAt');
            expect(result.token).toHaveLength(64); // 32 bytes in hex = 64 characters
            expect(appTokenRepository.create).toHaveBeenCalledWith(expect.objectContaining({
                userId,
                type: _apptokenentity.AppTokenType.EmailVerificationToken,
                context: {
                    email
                }
            }));
            expect(appTokenRepository.save).toHaveBeenCalled();
        });
    });
    describe('validateEmailVerificationTokenOrThrow', ()=>{
        it('should validate token successfully and return user', async ()=>{
            const plainToken = 'plain-token';
            const hashedToken = _crypto.default.createHash('sha256').update(plainToken).digest('hex');
            const mockUser = {
                id: 'user-id',
                email: 'test@example.com'
            };
            const mockAppToken = {
                type: _apptokenentity.AppTokenType.EmailVerificationToken,
                expiresAt: new Date(Date.now() + 86400000),
                context: {
                    email: 'test@example.com'
                },
                user: mockUser
            };
            jest.spyOn(appTokenRepository, 'findOne').mockResolvedValue(mockAppToken);
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
            const result = await service.validateEmailVerificationTokenOrThrow({
                emailVerificationToken: plainToken,
                email: 'test@example.com'
            });
            expect(result).toEqual(mockAppToken);
            expect(appTokenRepository.findOne).toHaveBeenCalledWith({
                where: {
                    value: hashedToken,
                    type: _apptokenentity.AppTokenType.EmailVerificationToken
                },
                relations: [
                    'user'
                ]
            });
        });
        it('should throw exception for invalid token', async ()=>{
            jest.spyOn(appTokenRepository, 'findOne').mockResolvedValue(null);
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
            await expect(service.validateEmailVerificationTokenOrThrow({
                emailVerificationToken: 'invalid-token',
                email: 'test@twenty.com'
            })).rejects.toThrow(new _emailverificationexception.EmailVerificationException('Invalid email verification token', _emailverificationexception.EmailVerificationExceptionCode.INVALID_TOKEN));
        });
        it('should throw exception for already validated token', async ()=>{
            const mockUser = {
                id: 'user-id',
                email: 'test@example.com',
                isEmailVerified: true
            };
            jest.spyOn(appTokenRepository, 'findOne').mockResolvedValue(null);
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);
            await expect(service.validateEmailVerificationTokenOrThrow({
                emailVerificationToken: 'invalid-token',
                email: 'test@example.com'
            })).rejects.toThrow(new _emailverificationexception.EmailVerificationException('Email already verified', _emailverificationexception.EmailVerificationExceptionCode.EMAIL_ALREADY_VERIFIED));
        });
        it('should throw exception when email does not match appToken email', async ()=>{
            const mockUser = {
                id: 'user-id',
                email: 'test@example.com',
                isEmailVerified: false
            };
            const mockAppToken = {
                type: _apptokenentity.AppTokenType.EmailVerificationToken,
                expiresAt: new Date(Date.now() + 86400000),
                context: {
                    email: 'other-email@example.com'
                },
                user: {
                    email: 'other-email@example.com'
                }
            };
            jest.spyOn(appTokenRepository, 'findOne').mockResolvedValue(mockAppToken);
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
            await expect(service.validateEmailVerificationTokenOrThrow({
                emailVerificationToken: 'valid-token',
                email: mockUser.email
            })).rejects.toThrow(new _emailverificationexception.EmailVerificationException('Email does not match token', _emailverificationexception.EmailVerificationExceptionCode.INVALID_EMAIL));
        });
        it('should throw exception for wrong token type', async ()=>{
            const mockAppToken = {
                type: _apptokenentity.AppTokenType.PasswordResetToken,
                expiresAt: new Date(Date.now() + 86400000)
            };
            jest.spyOn(appTokenRepository, 'findOne').mockResolvedValue(mockAppToken);
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
            await expect(service.validateEmailVerificationTokenOrThrow({
                emailVerificationToken: 'wrong-type-token',
                email: 'test@example.com'
            })).rejects.toThrow(new _emailverificationexception.EmailVerificationException('Invalid email verification token type', _emailverificationexception.EmailVerificationExceptionCode.INVALID_APP_TOKEN_TYPE));
        });
        it('should throw exception for expired token', async ()=>{
            const mockAppToken = {
                type: _apptokenentity.AppTokenType.EmailVerificationToken,
                expiresAt: new Date(Date.now() - 86400000)
            };
            jest.spyOn(appTokenRepository, 'findOne').mockResolvedValue(mockAppToken);
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
            await expect(service.validateEmailVerificationTokenOrThrow({
                emailVerificationToken: 'expired-token',
                email: 'test@example.com'
            })).rejects.toThrow(new _emailverificationexception.EmailVerificationException('Email verification token expired', _emailverificationexception.EmailVerificationExceptionCode.TOKEN_EXPIRED));
        });
        it('should throw exception when email is missing in context', async ()=>{
            const mockAppToken = {
                type: _apptokenentity.AppTokenType.EmailVerificationToken,
                expiresAt: new Date(Date.now() + 86400000),
                context: {}
            };
            jest.spyOn(appTokenRepository, 'findOne').mockResolvedValue(mockAppToken);
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
            await expect(service.validateEmailVerificationTokenOrThrow({
                emailVerificationToken: 'valid-token',
                email: 'test@example.com'
            })).rejects.toThrow(new _emailverificationexception.EmailVerificationException('Email missing in email verification token context', _emailverificationexception.EmailVerificationExceptionCode.EMAIL_MISSING));
        });
    });
});

//# sourceMappingURL=email-verification-token.service.spec.js.map