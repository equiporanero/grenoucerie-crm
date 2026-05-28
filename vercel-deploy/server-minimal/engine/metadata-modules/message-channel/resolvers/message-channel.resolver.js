"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessageChannelResolver", {
    enumerable: true,
    get: function() {
        return MessageChannelResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _typeorm = require("@nestjs/typeorm");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _metadataresolverdecorator = require("../../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _buildpublicconnectedaccountutil = require("../../connected-account/utils/build-public-connected-account.util");
const _workspaceentity = require("../../../core-modules/workspace/workspace.entity");
const _authuserworkspaceiddecorator = require("../../../decorators/auth/auth-user-workspace-id.decorator");
const _authworkspacedecorator = require("../../../decorators/auth/auth-workspace.decorator");
const _nopermissionguard = require("../../../guards/no-permission.guard");
const _workspaceauthguard = require("../../../guards/workspace-auth.guard");
const _connectedaccountmetadataservice = require("../../connected-account/connected-account-metadata.service");
const _connectedaccountpublicdto = require("../../connected-account/dtos/connected-account-public.dto");
const _createemailgroupchannelinput = require("../dtos/create-email-group-channel.input");
const _createemailgroupchanneloutput = require("../dtos/create-email-group-channel.output");
const _messagechanneldto = require("../dtos/message-channel.dto");
const _updatemessagechannelinput = require("../dtos/update-message-channel.input");
const _messagechannelgraphqlapiexceptioninterceptor = require("../interceptors/message-channel-graphql-api-exception.interceptor");
const _messagechannelmetadataservice = require("../message-channel-metadata.service");
const _messagechannelexception = require("../message-channel.exception");
const _messagefolderentity = require("../../message-folder/entities/message-folder.entity");
const _messagingprocessgroupemailactionsservice = require("../../../../modules/messaging/message-import-manager/services/messaging-process-group-email-actions.service");
const _types = require("twenty-shared/types");
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
let MessageChannelResolver = class MessageChannelResolver {
    async connectedAccount(messageChannel, workspace, userWorkspaceId) {
        if (messageChannel.type === _types.MessageChannelType.EMAIL_GROUP) {
            const account = await this.connectedAccountMetadataService.findById({
                id: messageChannel.connectedAccountId,
                workspaceId: workspace.id
            });
            return (0, _buildpublicconnectedaccountutil.buildPublicConnectedAccount)(account);
        }
        const account = await this.connectedAccountMetadataService.findByIdAndUserWorkspaceId({
            id: messageChannel.connectedAccountId,
            userWorkspaceId,
            workspaceId: workspace.id
        });
        return (0, _buildpublicconnectedaccountutil.buildPublicConnectedAccount)(account);
    }
    async myMessageChannels(workspace, userWorkspaceId, connectedAccountId) {
        if (connectedAccountId) {
            return this.messageChannelMetadataService.findByConnectedAccountIdForUser({
                connectedAccountId,
                userWorkspaceId,
                workspaceId: workspace.id
            });
        }
        return this.messageChannelMetadataService.findByUserWorkspaceId({
            userWorkspaceId,
            workspaceId: workspace.id
        });
    }
    async updateMessageChannel(input, workspace, userWorkspaceId) {
        const messageChannel = await this.messageChannelMetadataService.verifyOwnership({
            id: input.id,
            userWorkspaceId,
            workspaceId: workspace.id
        });
        const isSyncOngoing = messageChannel.syncStage === _types.MessageChannelSyncStage.MESSAGE_LIST_FETCH_ONGOING;
        const foldersWithPendingAction = await this.messageFolderRepository.find({
            where: {
                messageChannelId: messageChannel.id,
                pendingSyncAction: (0, _typeorm1.Not)(_types.MessageFolderPendingSyncAction.NONE),
                workspaceId: workspace.id
            }
        });
        const hasPendingGroupEmailsAction = messageChannel.pendingGroupEmailsAction !== _types.MessageChannelPendingGroupEmailsAction.NONE;
        if (isSyncOngoing && (foldersWithPendingAction.length > 0 || hasPendingGroupEmailsAction)) {
            throw new _messagechannelexception.MessageChannelException('Cannot update message channel while sync is ongoing with pending actions', _messagechannelexception.MessageChannelExceptionCode.INVALID_MESSAGE_CHANNEL_INPUT);
        }
        if (messageChannel.syncStage !== _types.MessageChannelSyncStage.PENDING_CONFIGURATION && (0, _utils.isDefined)(input.update.excludeGroupEmails) && input.update.excludeGroupEmails !== messageChannel.excludeGroupEmails) {
            // Service expects WorkspaceEntity type but only reads .id
            await this.messagingProcessGroupEmailActionsService.markMessageChannelAsPendingGroupEmailsAction(messageChannel, workspace.id, input.update.excludeGroupEmails ? _types.MessageChannelPendingGroupEmailsAction.GROUP_EMAILS_DELETION : _types.MessageChannelPendingGroupEmailsAction.GROUP_EMAILS_IMPORT);
        }
        return this.messageChannelMetadataService.update({
            id: input.id,
            workspaceId: workspace.id,
            data: input.update
        });
    }
    async createEmailGroupChannel(input, workspace, userWorkspaceId) {
        return this.messageChannelMetadataService.createEmailGroupChannel({
            handle: input.handle,
            userWorkspaceId,
            workspaceId: workspace.id
        });
    }
    async deleteEmailGroupChannel(id, workspace, userWorkspaceId) {
        const messageChannel = await this.messageChannelMetadataService.verifyOwnership({
            id,
            userWorkspaceId,
            workspaceId: workspace.id
        });
        if (messageChannel.type !== _types.MessageChannelType.EMAIL_GROUP) {
            throw new _messagechannelexception.MessageChannelException(`Message channel ${id} is not an email group`, _messagechannelexception.MessageChannelExceptionCode.INVALID_MESSAGE_CHANNEL_INPUT);
        }
        await this.connectedAccountMetadataService.delete({
            id: messageChannel.connectedAccountId,
            workspaceId: workspace.id
        });
        return messageChannel;
    }
    constructor(messageChannelMetadataService, connectedAccountMetadataService, messageFolderRepository, messagingProcessGroupEmailActionsService){
        this.messageChannelMetadataService = messageChannelMetadataService;
        this.connectedAccountMetadataService = connectedAccountMetadataService;
        this.messageFolderRepository = messageFolderRepository;
        this.messagingProcessGroupEmailActionsService = messagingProcessGroupEmailActionsService;
    }
};
_ts_decorate([
    (0, _graphql.ResolveField)('connectedAccount', ()=>_connectedaccountpublicdto.ConnectedAccountPublicDTO, {
        nullable: true
    }),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(2, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _messagechanneldto.MessageChannelDTO === "undefined" ? Object : _messagechanneldto.MessageChannelDTO,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], MessageChannelResolver.prototype, "connectedAccount", null);
_ts_decorate([
    (0, _graphql.Query)(()=>[
            _messagechanneldto.MessageChannelDTO
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
], MessageChannelResolver.prototype, "myMessageChannels", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_messagechanneldto.MessageChannelDTO),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(2, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _updatemessagechannelinput.UpdateMessageChannelInput === "undefined" ? Object : _updatemessagechannelinput.UpdateMessageChannelInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], MessageChannelResolver.prototype, "updateMessageChannel", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_createemailgroupchanneloutput.CreateEmailGroupChannelOutput),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(2, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createemailgroupchannelinput.CreateEmailGroupChannelInput === "undefined" ? Object : _createemailgroupchannelinput.CreateEmailGroupChannelInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], MessageChannelResolver.prototype, "createEmailGroupChannel", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_messagechanneldto.MessageChannelDTO),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('id', {
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
], MessageChannelResolver.prototype, "deleteEmailGroupChannel", null);
MessageChannelResolver = _ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard),
    (0, _common.UseInterceptors)(_messagechannelgraphqlapiexceptioninterceptor.MessageChannelGraphqlApiExceptionInterceptor),
    (0, _metadataresolverdecorator.MetadataResolver)(()=>_messagechanneldto.MessageChannelDTO),
    _ts_param(2, (0, _typeorm.InjectRepository)(_messagefolderentity.MessageFolderEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _messagechannelmetadataservice.MessageChannelMetadataService === "undefined" ? Object : _messagechannelmetadataservice.MessageChannelMetadataService,
        typeof _connectedaccountmetadataservice.ConnectedAccountMetadataService === "undefined" ? Object : _connectedaccountmetadataservice.ConnectedAccountMetadataService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _messagingprocessgroupemailactionsservice.MessagingProcessGroupEmailActionsService === "undefined" ? Object : _messagingprocessgroupemailactionsservice.MessagingProcessGroupEmailActionsService
    ])
], MessageChannelResolver);

//# sourceMappingURL=message-channel.resolver.js.map