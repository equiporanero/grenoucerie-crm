"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceInvitationResolver", {
    enumerable: true,
    get: function() {
        return WorkspaceInvitationResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _constants = require("twenty-shared/constants");
const _metadataresolverdecorator = require("../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _preventnesttoautologgraphqlerrorsfilter = require("../graphql/filters/prevent-nest-to-auto-log-graphql-errors.filter");
const _resolvervalidationpipe = require("../graphql/pipes/resolver-validation.pipe");
const _sendinvitationsdto = require("./dtos/send-invitations.dto");
const _workspaceinvitationdto = require("./dtos/workspace-invitation.dto");
const _workspaceinvitationservice = require("./services/workspace-invitation.service");
const _workspaceentity = require("../workspace/workspace.entity");
const _authuserdecorator = require("../../decorators/auth/auth-user.decorator");
const _authworkspacedecorator = require("../../decorators/auth/auth-workspace.decorator");
const _settingspermissionguard = require("../../guards/settings-permission.guard");
const _userauthguard = require("../../guards/user-auth.guard");
const _workspaceauthguard = require("../../guards/workspace-auth.guard");
const _permissionsgraphqlapiexceptionfilter = require("../../metadata-modules/permissions/utils/permissions-graphql-api-exception.filter");
const _globalworkspaceormmanager = require("../../twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../twenty-orm/utils/build-system-auth-context.util");
const _sendinvitationsinput = require("./dtos/send-invitations.input");
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
let WorkspaceInvitationResolver = class WorkspaceInvitationResolver {
    async deleteWorkspaceInvitation(appTokenId, { id: workspaceId }) {
        return this.workspaceInvitationService.deleteWorkspaceInvitation(appTokenId, workspaceId);
    }
    async resendWorkspaceInvitation(appTokenId, workspace, user) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspace.id);
        const workspaceMember = await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workspaceMemberRepository = await this.globalWorkspaceOrmManager.getRepository(workspace.id, 'workspaceMember', {
                shouldBypassPermissionChecks: true
            });
            return workspaceMemberRepository.findOneOrFail({
                where: {
                    userId: user.id
                }
            });
        }, authContext);
        return this.workspaceInvitationService.resendWorkspaceInvitation(appTokenId, workspace, workspaceMember);
    }
    async findWorkspaceInvitations(workspace) {
        return this.workspaceInvitationService.loadWorkspaceInvitations(workspace);
    }
    async sendInvitations(sendInviteLinkInput, user, workspace) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspace.id);
        const workspaceMember = await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workspaceMemberRepository = await this.globalWorkspaceOrmManager.getRepository(workspace.id, 'workspaceMember', {
                shouldBypassPermissionChecks: true
            });
            return workspaceMemberRepository.findOneOrFail({
                where: {
                    userId: user.id
                }
            });
        }, authContext);
        return await this.workspaceInvitationService.sendInvitations(sendInviteLinkInput.emails, workspace, workspaceMember, sendInviteLinkInput.roleId ?? undefined);
    }
    constructor(globalWorkspaceOrmManager, workspaceInvitationService){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.workspaceInvitationService = workspaceInvitationService;
    }
};
_ts_decorate([
    (0, _graphql.Mutation)(()=>String),
    _ts_param(0, (0, _graphql.Args)('appTokenId')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkspaceInvitationResolver.prototype, "deleteWorkspaceInvitation", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_sendinvitationsdto.SendInvitationsDTO),
    (0, _common.UseGuards)(_userauthguard.UserAuthGuard),
    _ts_param(0, (0, _graphql.Args)('appTokenId')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(2, (0, _authuserdecorator.AuthUser)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        typeof AuthContextUser === "undefined" ? Object : AuthContextUser
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkspaceInvitationResolver.prototype, "resendWorkspaceInvitation", null);
_ts_decorate([
    (0, _graphql.Query)(()=>[
            _workspaceinvitationdto.WorkspaceInvitation
        ]),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkspaceInvitationResolver.prototype, "findWorkspaceInvitations", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_sendinvitationsdto.SendInvitationsDTO),
    (0, _common.UseGuards)(_userauthguard.UserAuthGuard),
    _ts_param(0, (0, _graphql.Args)()),
    _ts_param(1, (0, _authuserdecorator.AuthUser)()),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _sendinvitationsinput.SendInvitationsInput === "undefined" ? Object : _sendinvitationsinput.SendInvitationsInput,
        typeof AuthContextUser === "undefined" ? Object : AuthContextUser,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkspaceInvitationResolver.prototype, "sendInvitations", null);
WorkspaceInvitationResolver = _ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.WORKSPACE_MEMBERS)),
    (0, _common.UsePipes)(_resolvervalidationpipe.ResolverValidationPipe),
    (0, _common.UseFilters)(_permissionsgraphqlapiexceptionfilter.PermissionsGraphqlApiExceptionFilter, _preventnesttoautologgraphqlerrorsfilter.PreventNestToAutoLogGraphqlErrorsFilter),
    (0, _metadataresolverdecorator.MetadataResolver)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _workspaceinvitationservice.WorkspaceInvitationService === "undefined" ? Object : _workspaceinvitationservice.WorkspaceInvitationService
    ])
], WorkspaceInvitationResolver);

//# sourceMappingURL=workspace-invitation.resolver.js.map