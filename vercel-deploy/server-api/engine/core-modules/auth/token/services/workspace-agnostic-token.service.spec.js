"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _authexception = require("../../auth.exception");
const _jwtwrapperservice = require("../../../jwt/services/jwt-wrapper.service");
const _twentyconfigservice = require("../../../twenty-config/twenty-config.service");
const _userentity = require("../../../user/user.entity");
const _workspaceagnostictokenservice = require("./workspace-agnostic-token.service");
const _workspacetype = require("../../../workspace/types/workspace.type");
const _authcontexttype = require("../../types/auth-context.type");
describe('WorkspaceAgnosticToken', ()=>{
    let service;
    let jwtWrapperService;
    let twentyConfigService;
    let userRepository;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _workspaceagnostictokenservice.WorkspaceAgnosticTokenService,
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
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_userentity.UserEntity),
                    useValue: {
                        findOne: jest.fn()
                    }
                }
            ]
        }).compile();
        service = module.get(_workspaceagnostictokenservice.WorkspaceAgnosticTokenService);
        jwtWrapperService = module.get(_jwtwrapperservice.JwtWrapperService);
        twentyConfigService = module.get(_twentyconfigservice.TwentyConfigService);
        userRepository = module.get((0, _typeorm.getRepositoryToken)(_userentity.UserEntity));
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
    describe('generateWorkspaceAgnosticToken', ()=>{
        it('should generate a workspace agnostic token successfully', async ()=>{
            const userId = 'user-id';
            const mockExpiresIn = '15m';
            const mockToken = 'mock-token';
            const mockUser = {
                id: userId
            };
            jest.spyOn(twentyConfigService, 'get').mockImplementation((key)=>{
                if (key === 'WORKSPACE_AGNOSTIC_TOKEN_EXPIRES_IN') return mockExpiresIn;
                return undefined;
            });
            jest.spyOn(jwtWrapperService, 'signAsyncOrThrow').mockResolvedValue(mockToken);
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);
            const result = await service.generateWorkspaceAgnosticToken({
                userId,
                authProvider: _workspacetype.AuthProviderEnum.Password
            });
            expect(result).toEqual({
                token: mockToken,
                expiresAt: expect.any(Date)
            });
            expect(twentyConfigService.get).toHaveBeenCalledWith('WORKSPACE_AGNOSTIC_TOKEN_EXPIRES_IN');
            expect(userRepository.findOne).toHaveBeenCalledWith({
                where: {
                    id: userId
                }
            });
            expect(jwtWrapperService.signAsyncOrThrow).toHaveBeenCalledWith({
                authProvider: _workspacetype.AuthProviderEnum.Password,
                sub: userId,
                userId: userId,
                type: _authcontexttype.JwtTokenTypeEnum.WORKSPACE_AGNOSTIC
            }, {
                expiresIn: mockExpiresIn
            });
        });
        it('should throw an error if user is not found', async ()=>{
            const userId = 'non-existent-user-id';
            const mockExpiresIn = '15m';
            jest.spyOn(twentyConfigService, 'get').mockImplementation((key)=>{
                if (key === 'WORKSPACE_AGNOSTIC_TOKEN_EXPIRES_IN') return mockExpiresIn;
                return undefined;
            });
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
            await expect(service.generateWorkspaceAgnosticToken({
                userId,
                authProvider: _workspacetype.AuthProviderEnum.Password
            })).rejects.toThrow(_authexception.AuthException);
        });
    });
    describe('validateToken', ()=>{
        it('should validate a token successfully', async ()=>{
            const mockToken = 'valid-token';
            const userId = 'user-id';
            const mockPayload = {
                sub: userId,
                userId: userId,
                type: _authcontexttype.JwtTokenTypeEnum.WORKSPACE_AGNOSTIC
            };
            const mockUser = {
                id: userId,
                createdAt: new Date('2024-01-01'),
                updatedAt: new Date('2024-01-01'),
                deletedAt: null
            };
            jest.spyOn(jwtWrapperService, 'decode').mockReturnValue(mockPayload);
            jest.spyOn(jwtWrapperService, 'verifyJwtToken').mockResolvedValue(mockPayload);
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);
            const result = await service.validateToken(mockToken);
            expect(result.user).toMatchObject({
                id: userId
            });
            expect(jwtWrapperService.verifyJwtToken).toHaveBeenCalledWith(mockToken);
            expect(jwtWrapperService.decode).toHaveBeenCalledWith(mockToken);
            expect(userRepository.findOne).toHaveBeenCalledWith({
                where: {
                    id: userId
                }
            });
        });
        it('should throw an error if token verification fails', async ()=>{
            const mockToken = 'invalid-token';
            jest.spyOn(jwtWrapperService, 'verifyJwtToken').mockRejectedValue(new Error('Invalid token'));
            await expect(service.validateToken(mockToken)).rejects.toThrow(_authexception.AuthException);
        });
        it('should throw an error if user is not found', async ()=>{
            const mockToken = 'valid-token';
            const userId = 'user-id';
            const mockPayload = {
                sub: userId,
                userId: userId,
                type: _authcontexttype.JwtTokenTypeEnum.WORKSPACE_AGNOSTIC
            };
            jest.spyOn(jwtWrapperService, 'decode').mockReturnValue(mockPayload);
            jest.spyOn(jwtWrapperService, 'verifyJwtToken').mockResolvedValue(mockPayload);
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
            await expect(service.validateToken(mockToken)).rejects.toThrow(_authexception.AuthException);
        });
        it('should reject a valid token that is not of WORKSPACE_AGNOSTIC type', async ()=>{
            const mockToken = 'valid-but-wrong-type-token';
            const userId = 'user-id';
            const mockPayload = {
                sub: userId,
                userId: userId,
                type: _authcontexttype.JwtTokenTypeEnum.ACCESS
            };
            jest.spyOn(jwtWrapperService, 'decode').mockReturnValue(mockPayload);
            jest.spyOn(jwtWrapperService, 'verifyJwtToken').mockResolvedValue(mockPayload);
            await expect(service.validateToken(mockToken)).rejects.toThrow(_authexception.AuthException);
        });
    });
});

//# sourceMappingURL=workspace-agnostic-token.service.spec.js.map