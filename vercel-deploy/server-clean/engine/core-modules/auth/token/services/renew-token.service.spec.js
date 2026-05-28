"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _apptokenentity = require("../../../app-token/app-token.entity");
const _authexception = require("../../auth.exception");
const _accesstokenservice = require("./access-token.service");
const _refreshtokenservice = require("./refresh-token.service");
const _workspaceagnostictokenservice = require("./workspace-agnostic-token.service");
const _authcontexttype = require("../../types/auth-context.type");
const _workspacetype = require("../../../workspace/types/workspace.type");
const _renewtokenservice = require("./renew-token.service");
describe('RenewTokenService', ()=>{
    let service;
    let appTokenRepository;
    let accessTokenService;
    let refreshTokenService;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _renewtokenservice.RenewTokenService,
                {
                    provide: (0, _typeorm.getRepositoryToken)(_apptokenentity.AppTokenEntity),
                    useClass: _typeorm1.Repository
                },
                {
                    provide: _accesstokenservice.AccessTokenService,
                    useValue: {
                        generateAccessToken: jest.fn()
                    }
                },
                {
                    provide: _workspaceagnostictokenservice.WorkspaceAgnosticTokenService,
                    useValue: {
                        generateWorkspaceAgnosticToken: jest.fn()
                    }
                },
                {
                    provide: _refreshtokenservice.RefreshTokenService,
                    useValue: {
                        verifyRefreshToken: jest.fn(),
                        generateRefreshToken: jest.fn()
                    }
                }
            ]
        }).compile();
        service = module.get(_renewtokenservice.RenewTokenService);
        appTokenRepository = module.get((0, _typeorm.getRepositoryToken)(_apptokenentity.AppTokenEntity));
        accessTokenService = module.get(_accesstokenservice.AccessTokenService);
        refreshTokenService = module.get(_refreshtokenservice.RefreshTokenService);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
    describe('generateTokensFromRefreshToken', ()=>{
        it('should generate new access and refresh tokens', async ()=>{
            const mockRefreshToken = 'valid-refresh-token';
            const mockUser = {
                id: 'user-id'
            };
            const mockWorkspaceId = 'workspace-id';
            const mockTokenId = 'token-id';
            const mockAccessToken = {
                token: 'new-access-token',
                expiresAt: new Date()
            };
            const mockNewRefreshToken = {
                token: 'new-refresh-token',
                expiresAt: new Date(),
                targetedTokenType: _authcontexttype.JwtTokenTypeEnum.ACCESS
            };
            const mockAppToken = {
                id: mockTokenId,
                workspaceId: mockWorkspaceId
            };
            jest.spyOn(refreshTokenService, 'verifyRefreshToken').mockResolvedValue({
                user: mockUser,
                token: mockAppToken,
                authProvider: _workspacetype.AuthProviderEnum.Password,
                targetedTokenType: _authcontexttype.JwtTokenTypeEnum.ACCESS,
                isImpersonating: false,
                impersonatorUserWorkspaceId: undefined,
                impersonatedUserWorkspaceId: undefined
            });
            jest.spyOn(appTokenRepository, 'update').mockResolvedValue({});
            jest.spyOn(accessTokenService, 'generateAccessToken').mockResolvedValue(mockAccessToken);
            jest.spyOn(refreshTokenService, 'generateRefreshToken').mockResolvedValue(mockNewRefreshToken);
            const result = await service.generateTokensFromRefreshToken(mockRefreshToken);
            expect(result).toEqual({
                accessOrWorkspaceAgnosticToken: mockAccessToken,
                refreshToken: mockNewRefreshToken
            });
            expect(refreshTokenService.verifyRefreshToken).toHaveBeenCalledWith(mockRefreshToken);
            expect(appTokenRepository.update).toHaveBeenCalledWith({
                id: mockTokenId,
                revokedAt: (0, _typeorm1.IsNull)()
            }, {
                revokedAt: expect.any(Date)
            });
            expect(accessTokenService.generateAccessToken).toHaveBeenCalledWith(expect.objectContaining({
                userId: mockUser.id,
                workspaceId: mockWorkspaceId,
                authProvider: _workspacetype.AuthProviderEnum.Password
            }));
            expect(refreshTokenService.generateRefreshToken).toHaveBeenCalledWith(expect.objectContaining({
                authProvider: _workspacetype.AuthProviderEnum.Password,
                targetedTokenType: _authcontexttype.JwtTokenTypeEnum.ACCESS,
                userId: mockUser.id,
                workspaceId: mockWorkspaceId
            }));
        });
        it('should propagate impersonation claims when present', async ()=>{
            const mockRefreshToken = 'valid-refresh-token';
            const mockUser = {
                id: 'user-id'
            };
            const mockWorkspaceId = 'workspace-id';
            const mockTokenId = 'token-id';
            const mockAccessToken = {
                token: 'new-access-token',
                expiresAt: new Date()
            };
            const mockNewRefreshToken = {
                token: 'new-refresh-token',
                expiresAt: new Date(),
                targetedTokenType: _authcontexttype.JwtTokenTypeEnum.ACCESS
            };
            const mockAppToken = {
                id: mockTokenId,
                workspaceId: mockWorkspaceId
            };
            jest.spyOn(refreshTokenService, 'verifyRefreshToken').mockResolvedValue({
                user: mockUser,
                token: mockAppToken,
                authProvider: _workspacetype.AuthProviderEnum.Password,
                targetedTokenType: _authcontexttype.JwtTokenTypeEnum.ACCESS,
                isImpersonating: true,
                impersonatorUserWorkspaceId: 'uw-imp',
                impersonatedUserWorkspaceId: 'uw-orig'
            });
            jest.spyOn(appTokenRepository, 'update').mockResolvedValue({});
            const accessSpy = jest.spyOn(accessTokenService, 'generateAccessToken').mockResolvedValue(mockAccessToken);
            const refreshSpy = jest.spyOn(refreshTokenService, 'generateRefreshToken').mockResolvedValue(mockNewRefreshToken);
            await service.generateTokensFromRefreshToken(mockRefreshToken);
            expect(accessSpy).toHaveBeenCalledWith(expect.objectContaining({
                isImpersonating: true,
                impersonatorUserWorkspaceId: 'uw-imp',
                impersonatedUserWorkspaceId: 'uw-orig'
            }));
            expect(refreshSpy).toHaveBeenCalledWith(expect.objectContaining({
                isImpersonating: true,
                impersonatorUserWorkspaceId: 'uw-imp',
                impersonatedUserWorkspaceId: 'uw-orig'
            }));
        });
        it('should throw an error if refresh token is not provided', async ()=>{
            await expect(service.generateTokensFromRefreshToken('')).rejects.toThrow(_authexception.AuthException);
        });
    });
});

//# sourceMappingURL=renew-token.service.spec.js.map