"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SyncMessageFoldersService", {
    enumerable: true,
    get: function() {
        return SyncMessageFoldersService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _messagefolderentity = require("../../../../engine/metadata-modules/message-folder/entities/message-folder.entity");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _gmailgetallfoldersservice = require("../drivers/gmail/services/gmail-get-all-folders.service");
const _imapgetallfoldersservice = require("../drivers/imap/services/imap-get-all-folders.service");
const _microsoftgetallfoldersservice = require("../drivers/microsoft/services/microsoft-get-all-folders.service");
const _computefolderidstodeleteutil = require("../utils/compute-folder-ids-to-delete.util");
const _computefolderstocreateutil = require("../utils/compute-folders-to-create.util");
const _computefolderstoupdateutil = require("../utils/compute-folders-to-update.util");
const _computeupdatedfoldersutil = require("../utils/compute-updated-folders.util");
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
let SyncMessageFoldersService = class SyncMessageFoldersService {
    async syncMessageFolders({ messageChannel, workspaceId }) {
        const discoveredFolders = await this.discoverAllFolders(messageChannel.connectedAccount, messageChannel);
        const { messageFolders: existingFolders, id: messageChannelId } = messageChannel;
        return this.syncFolderChanges(discoveredFolders, existingFolders, messageChannelId, workspaceId);
    }
    async discoverAllFolders(connectedAccount, messageChannel) {
        switch(connectedAccount.provider){
            case _types.ConnectedAccountProvider.GOOGLE:
                return this.gmailGetAllFoldersService.getAllMessageFolders(connectedAccount, messageChannel);
            case _types.ConnectedAccountProvider.MICROSOFT:
                return this.microsoftGetAllFoldersService.getAllMessageFolders(connectedAccount, messageChannel);
            case _types.ConnectedAccountProvider.IMAP_SMTP_CALDAV:
                return this.imapGetAllFoldersService.getAllMessageFolders(connectedAccount, messageChannel);
            default:
                throw new Error(`Provider ${connectedAccount.provider} is not supported`);
        }
    }
    async syncFolderChanges(discoveredFolders, existingFolders, messageChannelId, workspaceId) {
        const foldersToCreate = (0, _computefolderstocreateutil.computeFoldersToCreate)({
            discoveredFolders,
            existingFolders,
            messageChannelId
        });
        const foldersToUpdate = (0, _computefolderstoupdateutil.computeFoldersToUpdate)({
            discoveredFolders,
            existingFolders
        });
        const folderIdsToDelete = (0, _computefolderidstodeleteutil.computeFolderIdsToDelete)({
            discoveredFolders,
            existingFolders
        });
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            if (folderIdsToDelete.length > 0) {
                await this.messageFolderRepository.update({
                    id: (0, _typeorm1.In)(folderIdsToDelete),
                    workspaceId
                }, {
                    pendingSyncAction: _types.MessageFolderPendingSyncAction.FOLDER_DELETION
                });
            }
            if (foldersToUpdate.size > 0) {
                for (const [id, data] of foldersToUpdate.entries()){
                    await this.messageFolderRepository.update({
                        id,
                        messageChannelId,
                        workspaceId
                    }, data);
                }
            }
            if (foldersToCreate.length > 0) {
                for (const folderToCreate of foldersToCreate){
                    await this.messageFolderRepository.save({
                        ...folderToCreate,
                        workspaceId
                    });
                }
            }
            const createdFolders = foldersToCreate.length > 0 ? await this.messageFolderRepository.find({
                where: {
                    messageChannelId,
                    externalId: (0, _typeorm1.In)(foldersToCreate.map((folder)=>folder.externalId).filter(_utils.isDefined)),
                    workspaceId
                }
            }) : [];
            const updatedExistingFolders = (0, _computeupdatedfoldersutil.computeUpdatedFolders)({
                existingFolders,
                foldersToUpdate,
                folderIdsToDelete
            });
            return [
                ...updatedExistingFolders,
                ...createdFolders
            ];
        }, authContext, {
            lite: true
        });
    }
    constructor(globalWorkspaceOrmManager, messageFolderRepository, gmailGetAllFoldersService, microsoftGetAllFoldersService, imapGetAllFoldersService){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.messageFolderRepository = messageFolderRepository;
        this.gmailGetAllFoldersService = gmailGetAllFoldersService;
        this.microsoftGetAllFoldersService = microsoftGetAllFoldersService;
        this.imapGetAllFoldersService = imapGetAllFoldersService;
    }
};
SyncMessageFoldersService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(1, (0, _typeorm.InjectRepository)(_messagefolderentity.MessageFolderEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _gmailgetallfoldersservice.GmailGetAllFoldersService === "undefined" ? Object : _gmailgetallfoldersservice.GmailGetAllFoldersService,
        typeof _microsoftgetallfoldersservice.MicrosoftGetAllFoldersService === "undefined" ? Object : _microsoftgetallfoldersservice.MicrosoftGetAllFoldersService,
        typeof _imapgetallfoldersservice.ImapGetAllFoldersService === "undefined" ? Object : _imapgetallfoldersservice.ImapGetAllFoldersService
    ])
], SyncMessageFoldersService);

//# sourceMappingURL=sync-message-folders.service.js.map