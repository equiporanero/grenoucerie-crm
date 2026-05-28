"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ChannelSyncResolver", {
    enumerable: true,
    get: function() {
        return ChannelSyncResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _constants = require("twenty-shared/constants");
const _scalars = require("../../../engine/api/graphql/workspace-schema-builder/graphql-types/scalars");
const _metadataresolverdecorator = require("../../../engine/api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _authgraphqlapiexceptionfilter = require("../../../engine/core-modules/auth/filters/auth-graphql-api-exception.filter");
const _resolvervalidationpipe = require("../../../engine/core-modules/graphql/pipes/resolver-validation.pipe");
const _workspaceentity = require("../../../engine/core-modules/workspace/workspace.entity");
const _authuserworkspaceiddecorator = require("../../../engine/decorators/auth/auth-user-workspace-id.decorator");
const _authworkspacedecorator = require("../../../engine/decorators/auth/auth-workspace.decorator");
const _settingspermissionguard = require("../../../engine/guards/settings-permission.guard");
const _workspaceauthguard = require("../../../engine/guards/workspace-auth.guard");
const _connectedaccountmetadataservice = require("../../../engine/metadata-modules/connected-account/connected-account-metadata.service");
const _channelsyncsuccessdto = require("./dtos/channel-sync-success.dto");
const _channelsyncservice = require("./services/channel-sync.service");
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
let ChannelSyncResolver = class ChannelSyncResolver {
    async startChannelSync(connectedAccountId, workspace, userWorkspaceId) {
        await this.connectedAccountMetadataService.verifyOwnership({
            id: connectedAccountId,
            userWorkspaceId,
            workspaceId: workspace.id
        });
        await this.channelSyncService.startChannelSync({
            connectedAccountId,
            workspaceId: workspace.id
        });
        return {
            success: true
        };
    }
    constructor(channelSyncService, connectedAccountMetadataService){
        this.channelSyncService = channelSyncService;
        this.connectedAccountMetadataService = connectedAccountMetadataService;
    }
};
_ts_decorate([
    (0, _graphql.Mutation)(()=>_channelsyncsuccessdto.ChannelSyncSuccessDTO),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.CONNECTED_ACCOUNTS)),
    _ts_param(0, (0, _graphql.Args)('connectedAccountId', {
        type: ()=>_scalars.UUIDScalarType
    })),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(2, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], ChannelSyncResolver.prototype, "startChannelSync", null);
ChannelSyncResolver = _ts_decorate([
    (0, _metadataresolverdecorator.MetadataResolver)(),
    (0, _common.UsePipes)(_resolvervalidationpipe.ResolverValidationPipe),
    (0, _common.UseFilters)(_authgraphqlapiexceptionfilter.AuthGraphqlApiExceptionFilter),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _channelsyncservice.ChannelSyncService === "undefined" ? Object : _channelsyncservice.ChannelSyncService,
        typeof _connectedaccountmetadataservice.ConnectedAccountMetadataService === "undefined" ? Object : _connectedaccountmetadataservice.ConnectedAccountMetadataService
    ])
], ChannelSyncResolver);

//# sourceMappingURL=channel-sync.resolver.js.map