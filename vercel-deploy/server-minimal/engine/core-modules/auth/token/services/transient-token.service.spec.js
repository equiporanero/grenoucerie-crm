"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _jwtwrapperservice = require("../../../jwt/services/jwt-wrapper.service");
const _twentyconfigservice = require("../../../twenty-config/twenty-config.service");
const _authcontexttype = require("../../types/auth-context.type");
const _transienttokenservice = require("./transient-token.service");
describe('TransientTokenService', ()=>{
    let service;
    let jwtWrapperService;
    let twentyConfigService;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _transienttokenservice.TransientTokenService,
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
        service = module.get(_transienttokenservice.TransientTokenService);
        jwtWrapperService = module.get(_jwtwrapperservice.JwtWrapperService);
        twentyConfigService = module.get(_twentyconfigservice.TwentyConfigService);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
    describe('generateTransientToken', ()=>{
        it('should generate a transient token successfully', async ()=>{
            const workspaceMemberId = 'workspace-member-id';
            const userId = 'user-id';
            const workspaceId = 'workspace-id';
            const mockExpiresIn = '15m';
            const mockToken = 'mock-token';
            jest.spyOn(twentyConfigService, 'get').mockImplementation((key)=>{
                if (key === 'SHORT_TERM_TOKEN_EXPIRES_IN') return mockExpiresIn;
                return undefined;
            });
            jest.spyOn(jwtWrapperService, 'signAsyncOrThrow').mockResolvedValue(mockToken);
            const result = await service.generateTransientToken({
                workspaceMemberId,
                userId,
                workspaceId
            });
            expect(result).toEqual({
                token: mockToken,
                expiresAt: expect.any(Date)
            });
            expect(twentyConfigService.get).toHaveBeenCalledWith('SHORT_TERM_TOKEN_EXPIRES_IN');
            expect(jwtWrapperService.signAsyncOrThrow).toHaveBeenCalledWith({
                sub: workspaceMemberId,
                type: _authcontexttype.JwtTokenTypeEnum.LOGIN,
                userId,
                workspaceId,
                workspaceMemberId
            }, {
                expiresIn: mockExpiresIn
            });
        });
    });
    describe('verifyTransientToken', ()=>{
        it('should verify a transient token successfully', async ()=>{
            const mockToken = 'valid-token';
            const mockPayload = {
                sub: 'workspace-member-id',
                type: _authcontexttype.JwtTokenTypeEnum.LOGIN,
                userId: 'user-id',
                workspaceId: 'workspace-id',
                workspaceMemberId: 'workspace-member-id'
            };
            jest.spyOn(jwtWrapperService, 'verifyJwtToken').mockResolvedValue(undefined);
            jest.spyOn(jwtWrapperService, 'decode').mockReturnValue(mockPayload);
            const result = await service.verifyTransientToken(mockToken);
            expect(result).toEqual({
                workspaceMemberId: mockPayload.workspaceMemberId,
                sub: mockPayload.sub,
                userId: mockPayload.userId,
                workspaceId: mockPayload.workspaceId
            });
            expect(jwtWrapperService.verifyJwtToken).toHaveBeenCalledWith(mockToken);
            expect(jwtWrapperService.decode).toHaveBeenCalledWith(mockToken);
        });
        it('should throw an error if token verification fails', async ()=>{
            const mockToken = 'invalid-token';
            jest.spyOn(jwtWrapperService, 'verifyJwtToken').mockRejectedValue(new Error('Invalid token'));
            await expect(service.verifyTransientToken(mockToken)).rejects.toThrow();
        });
    });
});

//# sourceMappingURL=transient-token.service.spec.js.map