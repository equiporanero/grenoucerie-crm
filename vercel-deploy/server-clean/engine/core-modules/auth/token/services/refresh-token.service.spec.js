"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _apptokenentity = require("../../../app-token/app-token.entity");
const _authexception = require("../../auth.exception");
const _authcontexttype = require("../../types/auth-context.type");
const _jwtwrapperservice = require("../../../jwt/services/jwt-wrapper.service");
const _twentyconfigservice = require("../../../twenty-config/twenty-config.service");
const _userentity = require("../../../user/user.entity");
const _refreshtokenservice = require("./refresh-token.service");
describe('RefreshTokenService', ()=>{
    let service;
    let jwtWrapperService;
    let twentyConfigService;
    let appTokenRepository;
    let userRepository;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _refreshtokenservice.RefreshTokenService,
                {
                    provide: _jwtwrapperservice.JwtWrapperService,
                    useValue: {
                        verifyJwtToken: jest.fn(),
                        decode: jest.fn(),
                        signAsyncOrThrow: jest.fn(),
                        generateAppSecret: jest.fn()
                    }
                },
                {
                    provide: _twentyconfigservice.TwentyConfigService,
                    useValue: {
                        get: jest.fn()
                    }
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_apptokenentity.AppTokenEntity),
                    useClass: _typeorm1.Repository
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_userentity.UserEntity),
                    useClass: _typeorm1.Repository
                }
            ]
        }).compile();
        service = module.get(_refreshtokenservice.RefreshTokenService);
        jwtWrapperService = module.get(_jwtwrapperservice.JwtWrapperService);
        twentyConfigService = module.get(_twentyconfigservice.TwentyConfigService);
        appTokenRepository = module.get((0, _typeorm.getRepositoryToken)(_apptokenentity.AppTokenEntity));
        userRepository = module.get((0, _typeorm.getRepositoryToken)(_userentity.UserEntity));
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
    describe('verifyRefreshToken', ()=>{
        it('should verify a refresh token successfully', async ()=>{
            const mockToken = 'valid-refresh-token';
            const mockJwtPayload = {
                jti: 'token-id',
                sub: 'user-id',
                type: _authcontexttype.JwtTokenTypeEnum.REFRESH
            };
            const mockAppToken = {
                id: 'token-id',
                workspaceId: 'workspace-id',
                revokedAt: null
            };
            const mockUser = {
                id: 'some-id',
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com'
            };
            jest.spyOn(jwtWrapperService, 'verifyJwtToken').mockResolvedValue(undefined);
            jest.spyOn(jwtWrapperService, 'decode').mockReturnValue(mockJwtPayload);
            jest.spyOn(appTokenRepository, 'findOneBy').mockResolvedValue(mockAppToken);
            jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(mockUser);
            jest.spyOn(twentyConfigService, 'get').mockReturnValue('1h');
            const result = await service.verifyRefreshToken(mockToken);
            expect(result).toEqual({
                user: mockUser,
                token: mockAppToken
            });
            expect(jwtWrapperService.verifyJwtToken).toHaveBeenCalledWith(mockToken);
        });
        it('should throw an error if the token is malformed', async ()=>{
            const mockToken = 'invalid-token';
            jest.spyOn(jwtWrapperService, 'verifyJwtToken').mockResolvedValue(undefined);
            jest.spyOn(jwtWrapperService, 'decode').mockReturnValue({});
            await expect(service.verifyRefreshToken(mockToken)).rejects.toThrow(_authexception.AuthException);
        });
    });
    describe('generateRefreshToken', ()=>{
        it('should generate a refresh token successfully', async ()=>{
            const userId = 'user-id';
            const workspaceId = 'workspace-id';
            const mockToken = 'mock-refresh-token';
            const mockExpiresIn = '7d';
            jest.spyOn(twentyConfigService, 'get').mockReturnValue(mockExpiresIn);
            jest.spyOn(jwtWrapperService, 'signAsyncOrThrow').mockResolvedValue(mockToken);
            jest.spyOn(appTokenRepository, 'create').mockReturnValue({
                id: 'new-token-id'
            });
            jest.spyOn(appTokenRepository, 'save').mockResolvedValue({
                id: 'new-token-id'
            });
            const result = await service.generateRefreshToken({
                userId,
                workspaceId,
                targetedTokenType: _authcontexttype.JwtTokenTypeEnum.ACCESS
            });
            expect(result).toEqual({
                token: mockToken,
                expiresAt: expect.any(Date)
            });
            expect(appTokenRepository.save).toHaveBeenCalled();
            expect(jwtWrapperService.signAsyncOrThrow).toHaveBeenCalledWith({
                sub: userId,
                workspaceId,
                type: _authcontexttype.JwtTokenTypeEnum.REFRESH,
                userId: 'user-id',
                targetedTokenType: _authcontexttype.JwtTokenTypeEnum.ACCESS
            }, expect.objectContaining({
                expiresIn: mockExpiresIn,
                jwtid: 'new-token-id'
            }));
        });
        it('should throw an error if expiration time is not set', async ()=>{
            jest.spyOn(twentyConfigService, 'get').mockReturnValue(undefined);
            await expect(service.generateRefreshToken({
                userId: 'user-id',
                workspaceId: 'workspace-id',
                targetedTokenType: _authcontexttype.JwtTokenTypeEnum.ACCESS
            })).rejects.toThrow(_authexception.AuthException);
        });
    });
    it('returns impersonation claims from verified refresh token', async ()=>{
        const refreshToken = 'rtok';
        const userId = 'user-id';
        const tokenId = 'token-id';
        jwtWrapperService.verifyJwtToken.mockResolvedValue(undefined);
        jwtWrapperService.decode.mockReturnValue({
            sub: userId,
            jti: tokenId,
            type: _authcontexttype.JwtTokenTypeEnum.REFRESH,
            targetedTokenType: _authcontexttype.JwtTokenTypeEnum.ACCESS,
            isImpersonating: true,
            impersonatorUserWorkspaceId: 'uw-imp',
            impersonatedUserWorkspaceId: 'uw-orig'
        });
        const token = {
            id: tokenId,
            type: _apptokenentity.AppTokenType.RefreshToken
        };
        jest.spyOn(appTokenRepository, 'findOneBy').mockResolvedValue(token);
        const user = {
            id: userId
        };
        jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(user);
        const out = await service.verifyRefreshToken(refreshToken);
        expect(out.isImpersonating).toBe(true);
        expect(out.impersonatorUserWorkspaceId).toBe('uw-imp');
        expect(out.impersonatedUserWorkspaceId).toBe('uw-orig');
    });
    it('throws on malformed refresh token', async ()=>{
        jwtWrapperService.verifyJwtToken.mockResolvedValue(undefined);
        jwtWrapperService.decode.mockReturnValue({});
        await expect(service.verifyRefreshToken('rtok')).rejects.toThrow(_authexception.AuthException);
    });
});

//# sourceMappingURL=refresh-token.service.spec.js.map