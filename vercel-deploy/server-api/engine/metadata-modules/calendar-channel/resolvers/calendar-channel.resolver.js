"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CalendarChannelResolver", {
    enumerable: true,
    get: function() {
        return CalendarChannelResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _metadataresolverdecorator = require("../../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _workspaceentity = require("../../../core-modules/workspace/workspace.entity");
const _authuserworkspaceiddecorator = require("../../../decorators/auth/auth-user-workspace-id.decorator");
const _authworkspacedecorator = require("../../../decorators/auth/auth-workspace.decorator");
const _nopermissionguard = require("../../../guards/no-permission.guard");
const _workspaceauthguard = require("../../../guards/workspace-auth.guard");
const _calendarchannelmetadataservice = require("../calendar-channel-metadata.service");
const _calendarchanneldto = require("../dtos/calendar-channel.dto");
const _updatecalendarchannelinput = require("../dtos/update-calendar-channel.input");
const _calendarchannelgraphqlapiexceptioninterceptor = require("../interceptors/calendar-channel-graphql-api-exception.interceptor");
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
let CalendarChannelResolver = class CalendarChannelResolver {
    async myCalendarChannels(workspace, userWorkspaceId, connectedAccountId) {
        if (connectedAccountId) {
            return this.calendarChannelMetadataService.findByConnectedAccountIdForUser({
                connectedAccountId,
                userWorkspaceId,
                workspaceId: workspace.id
            });
        }
        return this.calendarChannelMetadataService.findByUserWorkspaceId({
            userWorkspaceId,
            workspaceId: workspace.id
        });
    }
    async updateCalendarChannel(input, workspace, userWorkspaceId) {
        await this.calendarChannelMetadataService.verifyOwnership({
            id: input.id,
            userWorkspaceId,
            workspaceId: workspace.id
        });
        return this.calendarChannelMetadataService.update({
            id: input.id,
            workspaceId: workspace.id,
            data: input.update
        });
    }
    constructor(calendarChannelMetadataService){
        this.calendarChannelMetadataService = calendarChannelMetadataService;
    }
};
_ts_decorate([
    (0, _graphql.Query)(()=>[
            _calendarchanneldto.CalendarChannelDTO
        ]),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)()),
    _ts_param(2, (0, _graphql.Args)('connectedAccountId', {
        type: ()=>_scalars.UUIDScalarType,
        nullable: true
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        String,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], CalendarChannelResolver.prototype, "myCalendarChannels", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_calendarchanneldto.CalendarChannelDTO),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(2, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _updatecalendarchannelinput.UpdateCalendarChannelInput === "undefined" ? Object : _updatecalendarchannelinput.UpdateCalendarChannelInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], CalendarChannelResolver.prototype, "updateCalendarChannel", null);
CalendarChannelResolver = _ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard),
    (0, _common.UseInterceptors)(_calendarchannelgraphqlapiexceptioninterceptor.CalendarChannelGraphqlApiExceptionInterceptor),
    (0, _metadataresolverdecorator.MetadataResolver)(()=>_calendarchanneldto.CalendarChannelDTO),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _calendarchannelmetadataservice.CalendarChannelMetadataService === "undefined" ? Object : _calendarchannelmetadataservice.CalendarChannelMetadataService
    ])
], CalendarChannelResolver);

//# sourceMappingURL=calendar-channel.resolver.js.map