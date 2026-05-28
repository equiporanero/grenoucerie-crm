"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _authssoservice = require("./auth-sso.service");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
const _workspaceentity = require("../../workspace/workspace.entity");
const _workspacetype = require("../../workspace/types/workspace.type");
describe('AuthSsoService', ()=>{
    let authSsoService;
    let workspaceRepository;
    let twentyConfigService;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _authssoservice.AuthSsoService,
                {
                    provide: (0, _typeorm.getRepositoryToken)(_workspaceentity.WorkspaceEntity),
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
        authSsoService = module.get(_authssoservice.AuthSsoService);
        workspaceRepository = module.get((0, _typeorm.getRepositoryToken)(_workspaceentity.WorkspaceEntity));
        twentyConfigService = module.get(_twentyconfigservice.TwentyConfigService);
    });
    describe('findWorkspaceFromWorkspaceIdOrAuthProvider', ()=>{
        it('should return a workspace by workspaceId', async ()=>{
            const workspaceId = 'workspace-id-123';
            const mockWorkspace = {
                id: workspaceId
            };
            jest.spyOn(workspaceRepository, 'findOne').mockResolvedValue(mockWorkspace);
            const result = await authSsoService.findWorkspaceFromWorkspaceIdOrAuthProvider({
                authProvider: _workspacetype.AuthProviderEnum.Google,
                email: 'test@example.com'
            }, workspaceId);
            expect(result).toEqual(mockWorkspace);
            expect(workspaceRepository.findOne).toHaveBeenCalledWith({
                where: {
                    id: workspaceId
                },
                relations: [
                    'approvedAccessDomains'
                ]
            });
        });
        it('should return a workspace from authProvider and email when multi-workspace mode is enabled', async ()=>{
            const authProvider = _workspacetype.AuthProviderEnum.Google;
            const email = 'test@example.com';
            const mockWorkspace = {
                id: 'workspace-id-456'
            };
            jest.spyOn(twentyConfigService, 'get').mockReturnValue(true);
            jest.spyOn(workspaceRepository, 'findOne').mockResolvedValue(mockWorkspace);
            const result = await authSsoService.findWorkspaceFromWorkspaceIdOrAuthProvider({
                authProvider,
                email
            });
            expect(result).toEqual(mockWorkspace);
            expect(workspaceRepository.findOne).toHaveBeenCalledWith({
                where: {
                    isGoogleAuthEnabled: true,
                    workspaceUsers: {
                        user: {
                            email
                        }
                    }
                },
                relations: [
                    'workspaceUsers',
                    'workspaceUsers.user',
                    'approvedAccessDomains'
                ]
            });
        });
        it('should return undefined if no workspace is found when multi-workspace mode is enabled', async ()=>{
            jest.spyOn(twentyConfigService, 'get').mockReturnValue(true);
            jest.spyOn(workspaceRepository, 'findOne').mockResolvedValue(null);
            const result = await authSsoService.findWorkspaceFromWorkspaceIdOrAuthProvider({
                authProvider: _workspacetype.AuthProviderEnum.Google,
                email: 'notfound@example.com'
            });
            expect(result).toBeUndefined();
        });
        it('should throw an error for an invalid authProvider', async ()=>{
            jest.spyOn(twentyConfigService, 'get').mockReturnValue(true);
            await expect(authSsoService.findWorkspaceFromWorkspaceIdOrAuthProvider({
                authProvider: 'invalid-provider',
                email: 'test@example.com'
            })).rejects.toThrow('invalid-provider is not a valid auth provider.');
        });
    });
});

//# sourceMappingURL=auth-sso.spec.js.map