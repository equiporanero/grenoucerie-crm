"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _applicationentity = require("../../../application/application.entity");
const _applicationexception = require("../../../application/application.exception");
const _authexception = require("../../auth.exception");
const _applicationtokenservice = require("./application-token.service");
const _authcontexttype = require("../../types/auth-context.type");
const _jwtwrapperservice = require("../../../jwt/services/jwt-wrapper.service");
const _twentyconfigservice = require("../../../twenty-config/twenty-config.service");
const _workspaceentity = require("../../../workspace/workspace.entity");
const _workspaceexception = require("../../../workspace/workspace.exception");
describe('ApplicationTokenService', ()=>{
    let service;
    let jwtWrapperService;
    let workspaceRepository;
    let applicationRepository;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _applicationtokenservice.ApplicationTokenService,
                {
                    provide: _jwtwrapperservice.JwtWrapperService,
                    useValue: {
                        signAsyncOrThrow: jest.fn(),
                        verifyJwtToken: jest.fn(),
                        decode: jest.fn(),
                        extractJwtFromRequest: jest.fn()
                    }
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_applicationentity.ApplicationEntity),
                    useClass: _typeorm1.Repository
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_workspaceentity.WorkspaceEntity),
                    useClass: _typeorm1.Repository
                },
                {
                    provide: _twentyconfigservice.TwentyConfigService,
                    useValue: {
                        get: jest.fn().mockReturnValue('1h')
                    }
                }
            ]
        }).compile();
        service = module.get(_applicationtokenservice.ApplicationTokenService);
        jwtWrapperService = module.get(_jwtwrapperservice.JwtWrapperService);
        applicationRepository = module.get((0, _typeorm.getRepositoryToken)(_applicationentity.ApplicationEntity));
        workspaceRepository = module.get((0, _typeorm.getRepositoryToken)(_workspaceentity.WorkspaceEntity));
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
    describe('generateApplicationAccessToken', ()=>{
        it('should generate an application access token successfully', async ()=>{
            const workspaceId = 'workspace-id';
            const applicationId = 'application-id';
            const mockWorkspace = {
                id: workspaceId
            };
            const mockApplication = {
                id: applicationId
            };
            const mockToken = 'mock-token';
            jest.spyOn(workspaceRepository, 'findOne').mockResolvedValue(mockWorkspace);
            jest.spyOn(applicationRepository, 'findOne').mockResolvedValue(mockApplication);
            jest.spyOn(jwtWrapperService, 'signAsyncOrThrow').mockResolvedValue(mockToken);
            const result = await service.generateApplicationAccessToken({
                workspaceId,
                applicationId
            });
            expect(result).toEqual({
                token: mockToken,
                expiresAt: expect.any(Date)
            });
            expect(jwtWrapperService.signAsyncOrThrow).toHaveBeenCalledWith(expect.objectContaining({
                sub: applicationId,
                applicationId
            }), expect.any(Object));
        });
        it('should include optional userWorkspaceId and userId in payload', async ()=>{
            const workspaceId = 'workspace-id';
            const applicationId = 'application-id';
            const userWorkspaceId = 'user-workspace-id';
            const userId = 'user-id';
            const mockWorkspace = {
                id: workspaceId
            };
            const mockApplication = {
                id: applicationId
            };
            const mockToken = 'mock-token';
            jest.spyOn(workspaceRepository, 'findOne').mockResolvedValue(mockWorkspace);
            jest.spyOn(applicationRepository, 'findOne').mockResolvedValue(mockApplication);
            jest.spyOn(jwtWrapperService, 'signAsyncOrThrow').mockResolvedValue(mockToken);
            const result = await service.generateApplicationAccessToken({
                workspaceId,
                applicationId,
                userWorkspaceId,
                userId
            });
            expect(result).toEqual({
                token: mockToken,
                expiresAt: expect.any(Date)
            });
            expect(jwtWrapperService.signAsyncOrThrow).toHaveBeenCalledWith(expect.objectContaining({
                sub: applicationId,
                applicationId,
                workspaceId,
                userWorkspaceId,
                userId
            }), expect.any(Object));
        });
    });
    it('should throw an error if application is not found', async ()=>{
        const workspaceId = 'workspace-id';
        const mockWorkspace = {
            id: workspaceId
        };
        jest.spyOn(applicationRepository, 'findOne').mockResolvedValue(null);
        jest.spyOn(workspaceRepository, 'findOne').mockResolvedValue(mockWorkspace);
        await expect(service.generateApplicationAccessToken({
            applicationId: 'non-existent-application',
            workspaceId: 'workspace-id'
        })).rejects.toThrow(_applicationexception.ApplicationException);
    });
    it('should throw an error if workspace is not found', async ()=>{
        jest.spyOn(workspaceRepository, 'findOne').mockResolvedValue(null);
        await expect(service.generateApplicationAccessToken({
            applicationId: 'application-id',
            workspaceId: 'non-existent-workspace'
        })).rejects.toThrow(_workspaceexception.WorkspaceException);
    });
    describe('validateApplicationRefreshToken', ()=>{
        it('should validate and return payload for a valid refresh token', async ()=>{
            const mockToken = 'valid-refresh-token';
            const mockPayload = {
                sub: 'application-id',
                applicationId: 'application-id',
                workspaceId: 'workspace-id',
                type: _authcontexttype.JwtTokenTypeEnum.APPLICATION_REFRESH
            };
            jest.spyOn(jwtWrapperService, 'verifyJwtToken').mockResolvedValue(undefined);
            jest.spyOn(jwtWrapperService, 'decode').mockReturnValue(mockPayload);
            const result = await service.validateApplicationRefreshToken(mockToken);
            expect(result).toEqual(mockPayload);
            expect(jwtWrapperService.verifyJwtToken).toHaveBeenCalledWith(mockToken);
            expect(jwtWrapperService.decode).toHaveBeenCalledWith(mockToken, {
                json: true
            });
        });
        it('should throw when token type is not APPLICATION_REFRESH', async ()=>{
            const mockToken = 'access-token';
            jest.spyOn(jwtWrapperService, 'verifyJwtToken').mockResolvedValue(undefined);
            jest.spyOn(jwtWrapperService, 'decode').mockReturnValue({
                sub: 'application-id',
                applicationId: 'application-id',
                workspaceId: 'workspace-id',
                type: _authcontexttype.JwtTokenTypeEnum.APPLICATION_ACCESS
            });
            await expect(service.validateApplicationRefreshToken(mockToken)).rejects.toThrow(_authexception.AuthException);
            try {
                await service.validateApplicationRefreshToken(mockToken);
            } catch (error) {
                expect(error.code).toBe(_authexception.AuthExceptionCode.APPLICATION_REFRESH_TOKEN_INVALID_OR_EXPIRED);
            }
        });
        it('should throw dedicated code when token verification fails', async ()=>{
            const mockToken = 'invalid-token';
            jest.spyOn(jwtWrapperService, 'verifyJwtToken').mockImplementation(()=>{
                throw new _authexception.AuthException('Token has expired.', _authexception.AuthExceptionCode.UNAUTHENTICATED);
            });
            await expect(service.validateApplicationRefreshToken(mockToken)).rejects.toThrow(_authexception.AuthException);
            try {
                await service.validateApplicationRefreshToken(mockToken);
            } catch (error) {
                expect(error.code).toBe(_authexception.AuthExceptionCode.APPLICATION_REFRESH_TOKEN_INVALID_OR_EXPIRED);
            }
        });
        it('should rethrow unexpected token verification errors', async ()=>{
            const mockToken = 'invalid-token';
            jest.spyOn(jwtWrapperService, 'verifyJwtToken').mockImplementation(()=>{
                throw new Error('Unexpected verification error');
            });
            await expect(service.validateApplicationRefreshToken(mockToken)).rejects.toThrow('Unexpected verification error');
        });
    });
    describe('generateApplicationTokenPair', ()=>{
        it('should generate both access and refresh tokens', async ()=>{
            const workspaceId = 'workspace-id';
            const applicationId = 'application-id';
            const mockWorkspace = {
                id: workspaceId
            };
            const mockApplication = {
                id: applicationId
            };
            const mockToken = 'mock-token';
            jest.spyOn(workspaceRepository, 'findOne').mockResolvedValue(mockWorkspace);
            jest.spyOn(applicationRepository, 'findOne').mockResolvedValue(mockApplication);
            jest.spyOn(jwtWrapperService, 'signAsyncOrThrow').mockResolvedValue(mockToken);
            const result = await service.generateApplicationTokenPair({
                workspaceId,
                applicationId
            });
            expect(result.applicationAccessToken).toEqual({
                token: mockToken,
                expiresAt: expect.any(Date)
            });
            expect(result.applicationRefreshToken).toEqual({
                token: mockToken,
                expiresAt: expect.any(Date)
            });
            expect(jwtWrapperService.signAsyncOrThrow).toHaveBeenCalledTimes(2);
        });
    });
    describe('renewApplicationTokens', ()=>{
        it('should generate a new token pair from validated payload', async ()=>{
            const workspaceId = 'workspace-id';
            const applicationId = 'application-id';
            const mockWorkspace = {
                id: workspaceId
            };
            const mockApplication = {
                id: applicationId
            };
            const mockToken = 'mock-token';
            jest.spyOn(workspaceRepository, 'findOne').mockResolvedValue(mockWorkspace);
            jest.spyOn(applicationRepository, 'findOne').mockResolvedValue(mockApplication);
            jest.spyOn(jwtWrapperService, 'signAsyncOrThrow').mockResolvedValue(mockToken);
            const result = await service.renewApplicationTokens({
                workspaceId,
                applicationId
            });
            expect(result.applicationAccessToken).toEqual({
                token: mockToken,
                expiresAt: expect.any(Date)
            });
            expect(result.applicationRefreshToken).toEqual({
                token: mockToken,
                expiresAt: expect.any(Date)
            });
        });
    });
});

//# sourceMappingURL=application-token.service.spec.js.map