"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMemberDeleteOnePostQueryHook", {
    enumerable: true,
    get: function() {
        return WorkspaceMemberDeleteOnePostQueryHook;
    }
});
const _typeorm = require("@nestjs/typeorm");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _workspacequeryhookdecorator = require("../../../engine/api/graphql/workspace-query-runner/workspace-query-hook/decorators/workspace-query-hook.decorator");
const _workspacequeryhooktype = require("../../../engine/api/graphql/workspace-query-runner/workspace-query-hook/types/workspace-query-hook.type");
const _userworkspaceentity = require("../../../engine/core-modules/user-workspace/user-workspace.entity");
const _userworkspaceservice = require("../../../engine/core-modules/user-workspace/user-workspace.service");
const _workspaceexception = require("../../../engine/core-modules/workspace/workspace.exception");
const _permissionsexception = require("../../../engine/metadata-modules/permissions/permissions.exception");
const _globalworkspaceormmanager = require("../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let WorkspaceMemberDeleteOnePostQueryHook = class WorkspaceMemberDeleteOnePostQueryHook {
    async execute(authContext, _objectName, payload) {
        if (!payload || payload.length === 0) {
            return;
        }
        const deletedWorkspaceMember = payload[0];
        const targettedWorkspaceMemberId = deletedWorkspaceMember.id;
        const workspace = authContext.workspace;
        (0, _utils.assertIsDefinedOrThrow)(workspace, _workspaceexception.WorkspaceNotFoundDefaultError);
        const workspaceMember = await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workspaceMemberRepository = await this.globalWorkspaceOrmManager.getRepository(workspace.id, 'workspaceMember', {
                shouldBypassPermissionChecks: true
            });
            return workspaceMemberRepository.findOne({
                where: {
                    id: targettedWorkspaceMemberId
                },
                withDeleted: true
            });
        }, authContext);
        if (!(0, _utils.isDefined)(workspaceMember)) {
            throw new _permissionsexception.PermissionsException('Workspace member not found', _permissionsexception.PermissionsExceptionCode.WORKSPACE_MEMBER_NOT_FOUND);
        }
        const userWorkspace = await this.userWorkspaceRepository.findOne({
            where: {
                workspaceId: workspace.id,
                userId: workspaceMember.userId
            }
        });
        if (!(0, _utils.isDefined)(userWorkspace)) {
            throw new _permissionsexception.PermissionsException('User workspace not found', _permissionsexception.PermissionsExceptionCode.USER_WORKSPACE_NOT_FOUND);
        }
        await this.userWorkspaceService.deleteUserWorkspace({
            userWorkspaceId: userWorkspace.id
        });
    }
    constructor(globalWorkspaceOrmManager, userWorkspaceRepository, userWorkspaceService){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.userWorkspaceRepository = userWorkspaceRepository;
        this.userWorkspaceService = userWorkspaceService;
    }
};
WorkspaceMemberDeleteOnePostQueryHook = _ts_decorate([
    (0, _workspacequeryhookdecorator.WorkspaceQueryHook)({
        key: `workspaceMember.deleteOne`,
        type: _workspacequeryhooktype.WorkspaceQueryHookType.POST_HOOK
    }),
    _ts_param(1, (0, _typeorm.InjectRepository)(_userworkspaceentity.UserWorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _userworkspaceservice.UserWorkspaceService === "undefined" ? Object : _userworkspaceservice.UserWorkspaceService
    ])
], WorkspaceMemberDeleteOnePostQueryHook);

//# sourceMappingURL=workspace-member-delete-one.post-query.hook.js.map