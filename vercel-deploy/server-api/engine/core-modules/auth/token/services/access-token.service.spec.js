"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _crypto = require("crypto");
const _workspace = require("twenty-shared/workspace");
const _typeorm1 = require("typeorm");
const _apptokenentity = require("../../../app-token/app-token.entity");
const _authexception = require("../../auth.exception");
const _jwtauthstrategy = require("../../strategies/jwt.auth.strategy");
const _emailservice = require("../../../email/email.service");
const _jwtwrapperservice = require("../../../jwt/services/jwt-wrapper.service");
const _twentyconfigservice = require("../../../twenty-config/twenty-config.service");
const _userworkspaceentity = require("../../../user-workspace/user-workspace.entity");
const _userentity = require("../../../user/user.entity");
const _workspacetype = require("../../../workspace/types/workspace.type");
const _workspaceentity = require("../../../workspace/workspace.entity");
const _globalworkspaceormmanager = require("../../../../twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _accesstokenservice = require("./access-token.service");
describe('AccessTokenService', ()=>{
    let service;
    let jwtWrapperService;
    let twentyConfigService;
    let userRepository;
    let workspaceRepository;
    let globalWorkspaceOrmManager;
    let userWorkspaceRepository;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _accesstokenservice.AccessTokenService,
                {
                    provide: _jwtwrapperservice.JwtWrapperService,
                    useValue: {
                        signAsyncOrThrow: jest.fn(),
                        verifyJwtToken: jest.fn(),
                        decode: jest.fn(),
                        generateAppSecret: jest.fn(),
                        extractJwtFromRequest: jest.fn()
                    }
                },
                {
                    provide: _jwtauthstrategy.JwtAuthStrategy,
                    useValue: {
                        validate: jest.fn()
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
                    useClass: _typeorm1.Repository
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_apptokenentity.AppTokenEntity),
                    useClass: _typeorm1.Repository
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_workspaceentity.WorkspaceEntity),
                    useClass: _typeorm1.Repository
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_userworkspaceentity.UserWorkspaceEntity),
                    useClass: _typeorm1.Repository
                },
                {
                    provide: _emailservice.EmailService,
                    useValue: {}
                },
                {
                    provide: _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
                    useValue: {
                        getRepository: jest.fn(),
                        executeInWorkspaceContext: jest.fn().mockImplementation((fn, _authContext)=>fn())
                    }
                }
            ]
        }).compile();
        service = module.get(_accesstokenservice.AccessTokenService);
        jwtWrapperService = module.get(_jwtwrapperservice.JwtWrapperService);
        twentyConfigService = module.get(_twentyconfigservice.TwentyConfigService);
        userRepository = module.get((0, _typeorm.getRepositoryToken)(_userentity.UserEntity));
        workspaceRepository = module.get((0, _typeorm.getRepositoryToken)(_workspaceentity.WorkspaceEntity));
        globalWorkspaceOrmManager = module.get(_globalworkspaceormmanager.GlobalWorkspaceOrmManager);
        userWorkspaceRepository = module.get((0, _typeorm.getRepositoryToken)(_userworkspaceentity.UserWorkspaceEntity));
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
    describe('generateAccessToken', ()=>{
        it('should generate an access token successfully', async ()=>{
            const userId = (0, _crypto.randomUUID)();
            const workspaceId = (0, _crypto.randomUUID)();
            const mockUser = {
                id: userId
            };
            const mockWorkspace = {
                activationStatus: _workspace.WorkspaceActivationStatus.ACTIVE,
                id: workspaceId
            };
            const mockUserWorkspace = {
                id: (0, _crypto.randomUUID)()
            };
            const mockWorkspaceMember = {
                id: (0, _crypto.randomUUID)()
            };
            const mockToken = 'mock-token';
            jest.spyOn(twentyConfigService, 'get').mockReturnValue('1h');
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);
            jest.spyOn(workspaceRepository, 'findOne').mockResolvedValue(mockWorkspace);
            jest.spyOn(userWorkspaceRepository, 'findOne').mockResolvedValue(mockUserWorkspace);
            jest.spyOn(globalWorkspaceOrmManager, 'getRepository').mockResolvedValue({
                findOne: jest.fn().mockResolvedValue(mockWorkspaceMember)
            });
            jest.spyOn(jwtWrapperService, 'signAsyncOrThrow').mockResolvedValue(mockToken);
            const result = await service.generateAccessToken({
                userId,
                workspaceId,
                authProvider: _workspacetype.AuthProviderEnum.Password
            });
            expect(result).toEqual({
                token: mockToken,
                expiresAt: expect.any(Date)
            });
            expect(jwtWrapperService.signAsyncOrThrow).toHaveBeenCalledWith(expect.objectContaining({
                sub: userId,
                workspaceId: workspaceId,
                workspaceMemberId: mockWorkspaceMember.id
            }), expect.any(Object));
        });
        it('embeds impersonation claims when provided', async ()=>{
            const userId = (0, _crypto.randomUUID)();
            const workspaceId = (0, _crypto.randomUUID)();
            const impersonatorUserWorkspaceId = (0, _crypto.randomUUID)();
            const impersonatedUserWorkspaceId = (0, _crypto.randomUUID)();
            const mockUser = {
                id: userId
            };
            const mockWorkspace = {
                activationStatus: _workspace.WorkspaceActivationStatus.ACTIVE,
                id: workspaceId
            };
            const mockUserWorkspace = {
                id: impersonatedUserWorkspaceId
            };
            const mockWorkspaceMember = {
                id: (0, _crypto.randomUUID)()
            };
            const mockToken = 'mock-token';
            jest.spyOn(twentyConfigService, 'get').mockReturnValue('1h');
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);
            jest.spyOn(workspaceRepository, 'findOne').mockResolvedValue(mockWorkspace);
            jest.spyOn(userWorkspaceRepository, 'findOne').mockResolvedValueOnce(mockUserWorkspace).mockResolvedValueOnce({
                id: impersonatorUserWorkspaceId,
                workspaceId
            }).mockResolvedValueOnce({
                id: impersonatedUserWorkspaceId,
                workspaceId
            });
            jest.spyOn(globalWorkspaceOrmManager, 'getRepository').mockResolvedValue({
                findOne: jest.fn().mockResolvedValue(mockWorkspaceMember)
            });
            const signSpy = jest.spyOn(jwtWrapperService, 'signAsyncOrThrow').mockResolvedValue(mockToken);
            await service.generateAccessToken({
                userId,
                workspaceId,
                authProvider: _workspacetype.AuthProviderEnum.Impersonation,
                isImpersonating: true,
                impersonatorUserWorkspaceId: impersonatorUserWorkspaceId,
                impersonatedUserWorkspaceId: impersonatedUserWorkspaceId
            });
            expect(signSpy).toHaveBeenCalledWith(expect.objectContaining({
                isImpersonating: true,
                impersonatorUserWorkspaceId: impersonatorUserWorkspaceId,
                impersonatedUserWorkspaceId: impersonatedUserWorkspaceId
            }), expect.any(Object));
        });
        it('should throw an error if user is not found', async ()=>{
            jest.spyOn(twentyConfigService, 'get').mockReturnValue('1h');
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
            await expect(service.generateAccessToken({
                userId: 'non-existent-user',
                workspaceId: 'workspace-id',
                authProvider: _workspacetype.AuthProviderEnum.Password
            })).rejects.toThrow(_authexception.AuthException);
        });
    });
    describe('validateToken', ()=>{
        it('should validate a token successfully', async ()=>{
            const mockToken = 'valid-token';
            const mockRequest = {
                headers: {
                    authorization: `Bearer ${mockToken}`
                }
            };
            const mockDecodedToken = {
                sub: 'user-id',
                workspaceId: 'workspace-id'
            };
            const mockAuthContext = {
                user: {
                    id: 'user-id'
                },
                apiKey: null,
                workspace: {
                    id: 'workspace-id'
                },
                workspaceMemberId: 'workspace-member-id'
            };
            jest.spyOn(jwtWrapperService, 'extractJwtFromRequest').mockReturnValue(()=>mockToken);
            jest.spyOn(jwtWrapperService, 'verifyJwtToken').mockResolvedValue(undefined);
            jest.spyOn(jwtWrapperService, 'decode').mockReturnValue(mockDecodedToken);
            jest.spyOn(service['jwtStrategy'], 'validate').mockReturnValue(mockAuthContext);
            const result = await service.validateTokenByRequest(mockRequest);
            expect(result).toEqual(mockAuthContext);
            expect(jwtWrapperService.verifyJwtToken).toHaveBeenCalledWith(mockToken);
            expect(jwtWrapperService.decode).toHaveBeenCalledWith(mockToken);
            expect(service['jwtStrategy'].validate).toHaveBeenCalledWith(mockDecodedToken);
        });
        it('should throw an error if token is missing', async ()=>{
            const mockRequest = {
                headers: {}
            };
            jest.spyOn(jwtWrapperService, 'extractJwtFromRequest').mockReturnValue(()=>null);
            await expect(service.validateTokenByRequest(mockRequest)).rejects.toThrow(_authexception.AuthException);
        });
    });
});

//# sourceMappingURL=access-token.service.spec.js.map