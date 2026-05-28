"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagingDeleteFolderMessagesService", {
    enumerable: true,
    get: function() {
        return MessagingDeleteFolderMessagesService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _typeorm = require("typeorm");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _messagingmessagecleanerservice = require("../../message-cleaner/services/messaging-message-cleaner.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
const BATCH_SIZE = 200;
let MessagingDeleteFolderMessagesService = class MessagingDeleteFolderMessagesService {
    async deleteFolderMessages(workspaceId, messageChannel, messageFolder) {
        this.logger.log(`WorkspaceId: ${workspaceId}, MessageChannelId: ${messageChannel.id}, FolderId: ${messageFolder.id} - Deleting messages from folder: ${messageFolder.name}`);
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        let totalDeletedCount = 0;
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const messageFolderAssociationRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'messageChannelMessageAssociationMessageFolder');
            const messageChannelMessageAssociationRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'messageChannelMessageAssociation');
            let hasMoreData = true;
            while(hasMoreData){
                const folderAssociations = await messageFolderAssociationRepository.find({
                    where: {
                        messageFolderId: messageFolder.id
                    },
                    take: BATCH_SIZE
                });
                if (folderAssociations.length === 0) {
                    hasMoreData = false;
                    continue;
                }
                const folderAssociationIds = folderAssociations.map((folderAssociation)=>folderAssociation.id);
                const messageChannelMessageAssociationIds = folderAssociations.map((folderAssociation)=>folderAssociation.messageChannelMessageAssociationId);
                const associations = await messageChannelMessageAssociationRepository.find({
                    where: {
                        id: (0, _typeorm.In)(messageChannelMessageAssociationIds),
                        messageChannelId: messageChannel.id
                    }
                });
                const messageExternalIds = associations.map((association)=>association.messageExternalId).filter(_utils.isDefined);
                this.logger.log(`WorkspaceId: ${workspaceId}, MessageChannelId: ${messageChannel.id}, FolderId: ${messageFolder.id} - Deleting ${messageExternalIds.length} messages`);
                if (messageExternalIds.length > 0) {
                    await this.messagingMessageCleanerService.deleteMessagesChannelMessageAssociationsAndRelatedOrphans({
                        workspaceId,
                        messageExternalIds,
                        messageChannelId: messageChannel.id
                    });
                    totalDeletedCount += messageExternalIds.length;
                }
                await messageFolderAssociationRepository.delete({
                    id: (0, _typeorm.In)(folderAssociationIds)
                });
            }
        }, authContext, {
            lite: true
        });
        this.logger.log(`WorkspaceId: ${workspaceId}, MessageChannelId: ${messageChannel.id}, FolderId: ${messageFolder.id} - Completed deleting ${totalDeletedCount} messages from folder: ${messageFolder.name}`);
        return totalDeletedCount;
    }
    constructor(messagingMessageCleanerService, globalWorkspaceOrmManager){
        this.messagingMessageCleanerService = messagingMessageCleanerService;
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.logger = new _common.Logger(MessagingDeleteFolderMessagesService.name);
    }
};
MessagingDeleteFolderMessagesService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _messagingmessagecleanerservice.MessagingMessageCleanerService === "undefined" ? Object : _messagingmessagecleanerservice.MessagingMessageCleanerService,
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager
    ])
], MessagingDeleteFolderMessagesService);

//# sourceMappingURL=messaging-delete-folder-messages.service.js.map