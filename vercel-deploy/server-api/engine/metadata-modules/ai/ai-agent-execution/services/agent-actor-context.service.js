"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AgentActorContextService", {
    enumerable: true,
    get: function() {
        return AgentActorContextService;
    }
});
const _common = require("@nestjs/common");
const _buildcreatedbyfromfullnamemetadatautil = require("../../../../core-modules/actor/utils/build-created-by-from-full-name-metadata.util");
const _userworkspaceservice = require("../../../../core-modules/user-workspace/user-workspace.service");
const _aiexception = require("../../ai.exception");
const _userroleservice = require("../../../user-role/user-role.service");
const _globalworkspaceormmanager = require("../../../../twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../twenty-orm/utils/build-system-auth-context.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AgentActorContextService = class AgentActorContextService {
    async buildUserAndAgentActorContext(userWorkspaceId, workspaceId) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        const userWorkspace = await this.userWorkspaceService.findById(userWorkspaceId);
        if (!userWorkspace) {
            throw new _aiexception.AiException('User workspace not found', _aiexception.AiExceptionCode.AGENT_EXECUTION_FAILED);
        }
        const workspaceMember = await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workspaceMemberRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workspaceMember', {
                shouldBypassPermissionChecks: true
            });
            return workspaceMemberRepository.findOne({
                where: {
                    userId: userWorkspace.userId
                }
            });
        }, authContext);
        if (!workspaceMember) {
            throw new _aiexception.AiException('Workspace member not found for user', _aiexception.AiExceptionCode.AGENT_EXECUTION_FAILED);
        }
        const roleId = await this.userRoleService.getRoleIdForUserWorkspace({
            userWorkspaceId,
            workspaceId
        });
        if (!roleId) {
            throw new _aiexception.AiException('User role not found', _aiexception.AiExceptionCode.AGENT_EXECUTION_FAILED);
        }
        const actorContext = (0, _buildcreatedbyfromfullnamemetadatautil.buildCreatedByFromFullNameMetadata)({
            fullNameMetadata: workspaceMember.name,
            workspaceMemberId: workspaceMember.id
        });
        const userContext = {
            firstName: workspaceMember.name?.firstName ?? '',
            lastName: workspaceMember.name?.lastName ?? '',
            locale: userWorkspace.locale,
            timezone: workspaceMember.timeZone ?? null
        };
        return {
            actorContext,
            roleId,
            userId: userWorkspace.userId,
            userWorkspaceId,
            userContext
        };
    }
    constructor(userWorkspaceService, userRoleService, globalWorkspaceOrmManager){
        this.userWorkspaceService = userWorkspaceService;
        this.userRoleService = userRoleService;
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
    }
};
AgentActorContextService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _userworkspaceservice.UserWorkspaceService === "undefined" ? Object : _userworkspaceservice.UserWorkspaceService,
        typeof _userroleservice.UserRoleService === "undefined" ? Object : _userroleservice.UserRoleService,
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager
    ])
], AgentActorContextService);

//# sourceMappingURL=agent-actor-context.service.js.map