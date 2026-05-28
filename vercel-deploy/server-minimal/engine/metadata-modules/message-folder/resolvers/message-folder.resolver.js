"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessageFolderResolver", {
    enumerable: true,
    get: function() {
        return MessageFolderResolver;
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
const _messagefolderdto = require("../dtos/message-folder.dto");
const _updatemessagefolderinput = require("../dtos/update-message-folder.input");
const _messagefoldergraphqlapiexceptioninterceptor = require("../interceptors/message-folder-graphql-api-exception.interceptor");
const _messagefoldermetadataservice = require("../message-folder-metadata.service");
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
let MessageFolderResolver = class MessageFolderResolver {
    async myMessageFolders(workspace, userWorkspaceId, messageChannelId) {
        if (messageChannelId) {
            return this.messageFolderMetadataService.findByMessageChannelIdForUser({
                messageChannelId,
                userWorkspaceId,
                workspaceId: workspace.id
            });
        }
        return this.messageFolderMetadataService.findByUserWorkspaceId({
            userWorkspaceId,
            workspaceId: workspace.id
        });
    }
    async updateMessageFolder(input, workspace, userWorkspaceId) {
        await this.messageFolderMetadataService.verifyOwnership({
            id: input.id,
            userWorkspaceId,
            workspaceId: workspace.id
        });
        return this.messageFolderMetadataService.update({
            id: input.id,
            workspaceId: workspace.id,
            data: input.update
        });
    }
    async updateMessageFolders(input, workspace, userWorkspaceId) {
        await Promise.all(input.ids.map((id)=>this.messageFolderMetadataService.verifyOwnership({
                id,
                userWorkspaceId,
                workspaceId: workspace.id
            })));
        return this.messageFolderMetadataService.updateMany({
            ids: input.ids,
            workspaceId: workspace.id,
            data: input.update
        });
    }
    constructor(messageFolderMetadataService){
        this.messageFolderMetadataService = messageFolderMetadataService;
    }
};
_ts_decorate([
    (0, _graphql.Query)(()=>[
            _messagefolderdto.MessageFolderDTO
        ]),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)()),
    _ts_param(2, (0, _graphql.Args)('messageChannelId', {
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
], MessageFolderResolver.prototype, "myMessageFolders", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_messagefolderdto.MessageFolderDTO),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(2, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _updatemessagefolderinput.UpdateMessageFolderInput === "undefined" ? Object : _updatemessagefolderinput.UpdateMessageFolderInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], MessageFolderResolver.prototype, "updateMessageFolder", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>[
            _messagefolderdto.MessageFolderDTO
        ]),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(2, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _updatemessagefolderinput.UpdateMessageFoldersInput === "undefined" ? Object : _updatemessagefolderinput.UpdateMessageFoldersInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], MessageFolderResolver.prototype, "updateMessageFolders", null);
MessageFolderResolver = _ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard),
    (0, _common.UseInterceptors)(_messagefoldergraphqlapiexceptioninterceptor.MessageFolderGraphqlApiExceptionInterceptor),
    (0, _metadataresolverdecorator.MetadataResolver)(()=>_messagefolderdto.MessageFolderDTO),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _messagefoldermetadataservice.MessageFolderMetadataService === "undefined" ? Object : _messagefoldermetadataservice.MessageFolderMetadataService
    ])
], MessageFolderResolver);

//# sourceMappingURL=message-folder.resolver.js.map