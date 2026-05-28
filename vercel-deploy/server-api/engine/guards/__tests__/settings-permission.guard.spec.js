"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _graphql = require("@nestjs/graphql");
const _workspace = require("twenty-shared/workspace");
const _constants = require("twenty-shared/constants");
const _settingspermissionguard = require("../settings-permission.guard");
const _permissionsexception = require("../../metadata-modules/permissions/permissions.exception");
describe('SettingsPermissionGuard', ()=>{
    let guard;
    let mockPermissionsService;
    let mockExecutionContext;
    let mockGqlContext;
    beforeEach(()=>{
        mockPermissionsService = {
            userHasWorkspaceSettingPermission: jest.fn()
        };
        mockGqlContext = {
            req: {
                workspace: {
                    id: 'workspace-id',
                    activationStatus: _workspace.WorkspaceActivationStatus.ACTIVE
                },
                userWorkspaceId: 'user-workspace-id',
                apiKey: null
            }
        };
        mockExecutionContext = {};
        jest.spyOn(_graphql.GqlExecutionContext, 'create').mockReturnValue({
            getContext: ()=>mockGqlContext
        });
        const GuardClass = (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.WORKSPACE);
        guard = new GuardClass(mockPermissionsService);
    });
    afterEach(()=>{
        jest.restoreAllMocks();
    });
    describe('canActivate', ()=>{
        it('should bypass permission check when workspace is being created', async ()=>{
            mockGqlContext.req.workspace.activationStatus = _workspace.WorkspaceActivationStatus.PENDING_CREATION;
            const result = await guard.canActivate(mockExecutionContext);
            expect(result).toBe(true);
            expect(mockPermissionsService.userHasWorkspaceSettingPermission).not.toHaveBeenCalled();
        });
        it('should return true when user has required permission', async ()=>{
            mockPermissionsService.userHasWorkspaceSettingPermission.mockResolvedValue(true);
            const result = await guard.canActivate(mockExecutionContext);
            expect(result).toBe(true);
            expect(mockPermissionsService.userHasWorkspaceSettingPermission).toHaveBeenCalledWith({
                userWorkspaceId: 'user-workspace-id',
                setting: _constants.PermissionFlagType.WORKSPACE,
                workspaceId: 'workspace-id',
                apiKeyId: undefined
            });
        });
        it('should throw PermissionsException when user lacks permission', async ()=>{
            mockPermissionsService.userHasWorkspaceSettingPermission.mockResolvedValue(false);
            await expect(guard.canActivate(mockExecutionContext)).rejects.toThrow(_permissionsexception.PermissionsException);
        });
    });
});

//# sourceMappingURL=settings-permission.guard.spec.js.map