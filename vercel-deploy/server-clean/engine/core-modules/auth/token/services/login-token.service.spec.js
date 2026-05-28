"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _jwtwrapperservice = require("../../../jwt/services/jwt-wrapper.service");
const _twentyconfigservice = require("../../../twenty-config/twenty-config.service");
const _workspacetype = require("../../../workspace/types/workspace.type");
const _authcontexttype = require("../../types/auth-context.type");
const _logintokenservice = require("./login-token.service");
describe('LoginTokenService', ()=>{
    let service;
    let jwtWrapperService;
    let twentyConfigService;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _logintokenservice.LoginTokenService,
                {
                    provide: _jwtwrapperservice.JwtWrapperService,
                    useValue: {
                        signAsyncOrThrow: jest.fn(),
                        verifyJwtToken: jest.fn(),
                        decode: jest.fn()
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
        service = module.get(_logintokenservice.LoginTokenService);
        jwtWrapperService = module.get(_jwtwrapperservice.JwtWrapperService);
        twentyConfigService = module.get(_twentyconfigservice.TwentyConfigService);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
    describe('generateLoginToken', ()=>{
        it('should generate a login token successfully', async ()=>{
            const email = 'test@example.com';
            const mockExpiresIn = '1h';
            const mockToken = 'mock-token';
            const workspaceId = 'workspace-id';
            jest.spyOn(twentyConfigService, 'get').mockReturnValue(mockExpiresIn);
            jest.spyOn(jwtWrapperService, 'signAsyncOrThrow').mockResolvedValue(mockToken);
            const result = await service.generateLoginToken(email, workspaceId, _workspacetype.AuthProviderEnum.Password);
            expect(result).toEqual({
                token: mockToken,
                expiresAt: expect.any(Date)
            });
            expect(twentyConfigService.get).toHaveBeenCalledWith('LOGIN_TOKEN_EXPIRES_IN');
            expect(jwtWrapperService.signAsyncOrThrow).toHaveBeenCalledWith({
                sub: email,
                workspaceId,
                type: _authcontexttype.JwtTokenTypeEnum.LOGIN,
                authProvider: _workspacetype.AuthProviderEnum.Password,
                impersonatorUserWorkspaceId: undefined
            }, {
                expiresIn: mockExpiresIn
            });
        });
    });
    describe('generateLoginToken with impersonation', ()=>{
        it('should include impersonatorUserWorkspaceId in JWT payload when using Impersonation auth provider', async ()=>{
            const email = 'test@example.com';
            const mockToken = 'mock-token';
            const workspaceId = 'workspace-id';
            const impersonatorUserWorkspaceId = 'impersonator-id';
            jest.spyOn(twentyConfigService, 'get').mockReturnValue('1h');
            jest.spyOn(jwtWrapperService, 'signAsyncOrThrow').mockResolvedValue(mockToken);
            const result = await service.generateLoginToken(email, workspaceId, _workspacetype.AuthProviderEnum.Impersonation, {
                impersonatorUserWorkspaceId
            });
            expect(result).toEqual({
                token: mockToken,
                expiresAt: expect.any(Date)
            });
            expect(jwtWrapperService.signAsyncOrThrow).toHaveBeenCalledWith({
                sub: email,
                workspaceId,
                type: _authcontexttype.JwtTokenTypeEnum.LOGIN,
                authProvider: _workspacetype.AuthProviderEnum.Impersonation,
                impersonatorUserWorkspaceId
            }, {
                expiresIn: expect.any(String)
            });
        });
    });
    describe('verifyLoginToken', ()=>{
        it('should verify a login token successfully', async ()=>{
            const mockToken = 'valid-token';
            const mockEmail = 'test@example.com';
            jest.spyOn(jwtWrapperService, 'verifyJwtToken').mockResolvedValue(undefined);
            jest.spyOn(jwtWrapperService, 'decode').mockReturnValue({
                sub: mockEmail,
                type: _authcontexttype.JwtTokenTypeEnum.LOGIN
            });
            const result = await service.verifyLoginToken(mockToken);
            expect(result).toEqual({
                sub: mockEmail,
                type: _authcontexttype.JwtTokenTypeEnum.LOGIN
            });
            expect(jwtWrapperService.verifyJwtToken).toHaveBeenCalledWith(mockToken);
            expect(jwtWrapperService.decode).toHaveBeenCalledWith(mockToken, {
                json: true
            });
        });
        it('should throw an error if token verification fails', async ()=>{
            const mockToken = 'invalid-token';
            jest.spyOn(jwtWrapperService, 'verifyJwtToken').mockRejectedValue(new Error('Invalid token'));
            await expect(service.verifyLoginToken(mockToken)).rejects.toThrow();
        });
    });
});

//# sourceMappingURL=login-token.service.spec.js.map