"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowExecutionContextService", {
    enumerable: true,
    get: function() {
        return WorkflowExecutionContextService;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _applicationservice = require("../../../../engine/core-modules/application/application.service");
const _buildapplicationauthcontextutil = require("../../../../engine/core-modules/auth/utils/build-application-auth-context.util");
const _builduserauthcontextutil = require("../../../../engine/core-modules/auth/utils/build-user-auth-context.util");
const _fromuserentitytoflatutil = require("../../../../engine/core-modules/user/utils/from-user-entity-to-flat.util");
const _fromworkspaceentitytoflatutil = require("../../../../engine/core-modules/workspace/utils/from-workspace-entity-to-flat.util");
const _userworkspaceservice = require("../../../../engine/core-modules/user-workspace/user-workspace.service");
const _roleservice = require("../../../../engine/metadata-modules/role/role.service");
const _userroleservice = require("../../../../engine/metadata-modules/user-role/user-role.service");
const _standardroleconstant = require("../../../../engine/workspace-manager/twenty-standard-application/constants/standard-role.constant");
const _workflowrunworkspaceservice = require("../../workflow-runner/workflow-run/workflow-run.workspace-service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkflowExecutionContextService = class WorkflowExecutionContextService {
    async getExecutionContext(runInfo) {
        const workflowRun = await this.workflowRunService.getWorkflowRunOrFail({
            workflowRunId: runInfo.workflowRunId,
            workspaceId: runInfo.workspaceId
        });
        const isActingOnBehalfOfUser = workflowRun.createdBy.source === _types.FieldActorSource.MANUAL && (0, _utils.isDefined)(workflowRun.createdBy.workspaceMemberId);
        if (isActingOnBehalfOfUser) {
            return this.buildUserExecutionContext(workflowRun, runInfo.workspaceId);
        }
        return this.buildApplicationExecutionContext(workflowRun, runInfo.workspaceId);
    }
    async buildUserExecutionContext(workflowRun, workspaceId) {
        const workspaceMember = await this.userWorkspaceService.getWorkspaceMemberOrThrow({
            workspaceMemberId: workflowRun.createdBy.workspaceMemberId,
            workspaceId
        });
        const userWorkspace = await this.userWorkspaceService.getUserWorkspaceForUserOrThrow({
            userId: workspaceMember.userId,
            workspaceId,
            relations: [
                'workspace',
                'user'
            ]
        });
        const roleId = await this.userRoleService.getRoleIdForUserWorkspace({
            userWorkspaceId: userWorkspace.id,
            workspaceId
        });
        const authContext = (0, _builduserauthcontextutil.buildUserAuthContext)({
            workspace: (0, _fromworkspaceentitytoflatutil.fromWorkspaceEntityToFlat)(userWorkspace.workspace),
            userWorkspaceId: userWorkspace.id,
            user: (0, _fromuserentitytoflatutil.fromUserEntityToFlat)(userWorkspace.user),
            workspaceMemberId: workspaceMember.id,
            workspaceMember
        });
        return {
            isActingOnBehalfOfUser: true,
            initiator: workflowRun.createdBy,
            rolePermissionConfig: {
                unionOf: [
                    roleId
                ]
            },
            authContext
        };
    }
    async buildApplicationExecutionContext(workflowRun, workspaceId) {
        const { application, workspace } = await this.applicationService.findTwentyStandardApplicationOrThrow(workspaceId);
        // Use the application's role if set, otherwise fall back to admin role
        // In the future we should probably assign the Admin role to the Standard Application
        let roleId = application.defaultRoleId;
        if (!(0, _utils.isDefined)(roleId)) {
            // Fallback: Look up admin role for existing workspaces without defaultRoleId
            const adminRole = await this.roleService.getRoleByUniversalIdentifier({
                universalIdentifier: _standardroleconstant.STANDARD_ROLE.admin.universalIdentifier,
                workspaceId
            });
            roleId = adminRole?.id ?? null;
        }
        const rolePermissionConfig = (0, _utils.isDefined)(roleId) ? {
            unionOf: [
                roleId
            ]
        } : {
            shouldBypassPermissionChecks: true
        };
        const authContext = (0, _buildapplicationauthcontextutil.buildApplicationAuthContext)({
            workspace: (0, _fromworkspaceentitytoflatutil.fromWorkspaceEntityToFlat)(workspace),
            application: {
                ...application,
                defaultRoleId: roleId
            }
        });
        return {
            isActingOnBehalfOfUser: false,
            initiator: workflowRun.createdBy,
            rolePermissionConfig,
            authContext
        };
    }
    constructor(workflowRunService, userWorkspaceService, userRoleService, applicationService, roleService){
        this.workflowRunService = workflowRunService;
        this.userWorkspaceService = userWorkspaceService;
        this.userRoleService = userRoleService;
        this.applicationService = applicationService;
        this.roleService = roleService;
    }
};
WorkflowExecutionContextService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workflowrunworkspaceservice.WorkflowRunWorkspaceService === "undefined" ? Object : _workflowrunworkspaceservice.WorkflowRunWorkspaceService,
        typeof _userworkspaceservice.UserWorkspaceService === "undefined" ? Object : _userworkspaceservice.UserWorkspaceService,
        typeof _userroleservice.UserRoleService === "undefined" ? Object : _userroleservice.UserRoleService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _roleservice.RoleService === "undefined" ? Object : _roleservice.RoleService
    ])
], WorkflowExecutionContextService);

//# sourceMappingURL=workflow-execution-context.service.js.map