"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TimelineMessagingResolver", {
    enumerable: true,
    get: function() {
        return TimelineMessagingResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
const _constants = require("twenty-shared/constants");
const _coreresolverdecorator = require("../../api/graphql/graphql-config/decorators/core-resolver.decorator");
const _scalars = require("../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _messagingconstants = require("./constants/messaging.constants");
const _dismissreconnectaccountbannerinput = require("./dtos/dismiss-reconnect-account-banner.input");
const _timelinethreadswithtotaldto = require("./dtos/timeline-threads-with-total.dto");
const _getmessagesservice = require("./services/get-messages.service");
const _userservice = require("../user/services/user.service");
const _workspaceentity = require("../workspace/workspace.entity");
const _authuserdecorator = require("../../decorators/auth/auth-user.decorator");
const _authworkspacedecorator = require("../../decorators/auth/auth-workspace.decorator");
const _custompermissionguard = require("../../guards/custom-permission.guard");
const _userauthguard = require("../../guards/user-auth.guard");
const _settingspermissionguard = require("../../guards/settings-permission.guard");
const _workspaceauthguard = require("../../guards/workspace-auth.guard");
const _accountstoreconnectservice = require("../../../modules/connected-account/services/accounts-to-reconnect.service");
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
let GetTimelineThreadsFromPersonIdArgs = class GetTimelineThreadsFromPersonIdArgs {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], GetTimelineThreadsFromPersonIdArgs.prototype, "personId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int),
    _ts_metadata("design:type", Number)
], GetTimelineThreadsFromPersonIdArgs.prototype, "page", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int),
    (0, _classvalidator.Max)(_messagingconstants.TIMELINE_THREADS_MAX_PAGE_SIZE),
    _ts_metadata("design:type", Number)
], GetTimelineThreadsFromPersonIdArgs.prototype, "pageSize", void 0);
GetTimelineThreadsFromPersonIdArgs = _ts_decorate([
    (0, _graphql.ArgsType)()
], GetTimelineThreadsFromPersonIdArgs);
let GetTimelineThreadsFromCompanyIdArgs = class GetTimelineThreadsFromCompanyIdArgs {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], GetTimelineThreadsFromCompanyIdArgs.prototype, "companyId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int),
    _ts_metadata("design:type", Number)
], GetTimelineThreadsFromCompanyIdArgs.prototype, "page", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int),
    (0, _classvalidator.Max)(_messagingconstants.TIMELINE_THREADS_MAX_PAGE_SIZE),
    _ts_metadata("design:type", Number)
], GetTimelineThreadsFromCompanyIdArgs.prototype, "pageSize", void 0);
GetTimelineThreadsFromCompanyIdArgs = _ts_decorate([
    (0, _graphql.ArgsType)()
], GetTimelineThreadsFromCompanyIdArgs);
let GetTimelineThreadsFromOpportunityIdArgs = class GetTimelineThreadsFromOpportunityIdArgs {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], GetTimelineThreadsFromOpportunityIdArgs.prototype, "opportunityId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int),
    _ts_metadata("design:type", Number)
], GetTimelineThreadsFromOpportunityIdArgs.prototype, "page", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int),
    (0, _classvalidator.Max)(_messagingconstants.TIMELINE_THREADS_MAX_PAGE_SIZE),
    _ts_metadata("design:type", Number)
], GetTimelineThreadsFromOpportunityIdArgs.prototype, "pageSize", void 0);
GetTimelineThreadsFromOpportunityIdArgs = _ts_decorate([
    (0, _graphql.ArgsType)()
], GetTimelineThreadsFromOpportunityIdArgs);
let TimelineMessagingResolver = class TimelineMessagingResolver {
    async getTimelineThreadsFromPersonId(user, workspace, { personId, page, pageSize }) {
        const workspaceMember = await this.userService.loadWorkspaceMember(user, workspace);
        if (!workspaceMember) {
            return;
        }
        const timelineThreads = await this.getMessagesFromPersonIdsService.getMessagesFromPersonIds(workspaceMember.id, [
            personId
        ], workspace.id, page, pageSize);
        return timelineThreads;
    }
    async getTimelineThreadsFromCompanyId(user, workspace, { companyId, page, pageSize }) {
        const workspaceMember = await this.userService.loadWorkspaceMember(user, workspace);
        if (!workspaceMember) {
            return;
        }
        const timelineThreads = await this.getMessagesFromPersonIdsService.getMessagesFromCompanyId(workspaceMember.id, companyId, workspace.id, page, pageSize);
        return timelineThreads;
    }
    async getTimelineThreadsFromOpportunityId(user, workspace, { opportunityId, page, pageSize }) {
        const workspaceMember = await this.userService.loadWorkspaceMember(user, workspace);
        if (!workspaceMember) {
            return;
        }
        const timelineThreads = await this.getMessagesFromPersonIdsService.getMessagesFromOpportunityId(workspaceMember.id, opportunityId, workspace.id, page, pageSize);
        return timelineThreads;
    }
    async dismissReconnectAccountBanner(user, workspace, { connectedAccountId }) {
        await this.accountsToReconnectService.removeAccountToReconnect(user.id, workspace.id, connectedAccountId);
        return true;
    }
    constructor(getMessagesFromPersonIdsService, userService, accountsToReconnectService){
        this.getMessagesFromPersonIdsService = getMessagesFromPersonIdsService;
        this.userService = userService;
        this.accountsToReconnectService = accountsToReconnectService;
    }
};
_ts_decorate([
    (0, _graphql.Query)(()=>_timelinethreadswithtotaldto.TimelineThreadsWithTotalDTO),
    _ts_param(0, (0, _authuserdecorator.AuthUser)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(2, (0, _graphql.Args)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof AuthContextUser === "undefined" ? Object : AuthContextUser,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        typeof GetTimelineThreadsFromPersonIdArgs === "undefined" ? Object : GetTimelineThreadsFromPersonIdArgs
    ]),
    _ts_metadata("design:returntype", Promise)
], TimelineMessagingResolver.prototype, "getTimelineThreadsFromPersonId", null);
_ts_decorate([
    (0, _graphql.Query)(()=>_timelinethreadswithtotaldto.TimelineThreadsWithTotalDTO),
    _ts_param(0, (0, _authuserdecorator.AuthUser)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(2, (0, _graphql.Args)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof AuthContextUser === "undefined" ? Object : AuthContextUser,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        typeof GetTimelineThreadsFromCompanyIdArgs === "undefined" ? Object : GetTimelineThreadsFromCompanyIdArgs
    ]),
    _ts_metadata("design:returntype", Promise)
], TimelineMessagingResolver.prototype, "getTimelineThreadsFromCompanyId", null);
_ts_decorate([
    (0, _graphql.Query)(()=>_timelinethreadswithtotaldto.TimelineThreadsWithTotalDTO),
    _ts_param(0, (0, _authuserdecorator.AuthUser)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(2, (0, _graphql.Args)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof AuthContextUser === "undefined" ? Object : AuthContextUser,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        typeof GetTimelineThreadsFromOpportunityIdArgs === "undefined" ? Object : GetTimelineThreadsFromOpportunityIdArgs
    ]),
    _ts_metadata("design:returntype", Promise)
], TimelineMessagingResolver.prototype, "getTimelineThreadsFromOpportunityId", null);
_ts_decorate([
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.CONNECTED_ACCOUNTS)),
    (0, _graphql.Mutation)(()=>Boolean),
    _ts_param(0, (0, _authuserdecorator.AuthUser)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(2, (0, _graphql.Args)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof AuthContextUser === "undefined" ? Object : AuthContextUser,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        typeof _dismissreconnectaccountbannerinput.DismissReconnectAccountBannerInput === "undefined" ? Object : _dismissreconnectaccountbannerinput.DismissReconnectAccountBannerInput
    ]),
    _ts_metadata("design:returntype", Promise)
], TimelineMessagingResolver.prototype, "dismissReconnectAccountBanner", null);
TimelineMessagingResolver = _ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, _userauthguard.UserAuthGuard, _custompermissionguard.CustomPermissionGuard),
    (0, _coreresolverdecorator.CoreResolver)(()=>_timelinethreadswithtotaldto.TimelineThreadsWithTotalDTO),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _getmessagesservice.GetMessagesService === "undefined" ? Object : _getmessagesservice.GetMessagesService,
        typeof _userservice.UserService === "undefined" ? Object : _userservice.UserService,
        typeof _accountstoreconnectservice.AccountsToReconnectService === "undefined" ? Object : _accountstoreconnectservice.AccountsToReconnectService
    ])
], TimelineMessagingResolver);

//# sourceMappingURL=timeline-messaging.resolver.js.map