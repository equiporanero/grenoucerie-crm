"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MicrosoftGetAllFoldersService", {
    enumerable: true,
    get: function() {
        return MicrosoftGetAllFoldersService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _microsoftoauth2clientprovider = require("../../../../../connected-account/oauth2-client-manager/drivers/microsoft/microsoft-oauth2-client.provider");
const _shouldcreatefolderbydefaultutil = require("../../../utils/should-create-folder-by-default.util");
const _shouldsyncfolderbydefaultutil = require("../../../utils/should-sync-folder-by-default.util");
const _microsoftmessagelistfetcherrorhandlerservice = require("../../../../message-import-manager/drivers/microsoft/services/microsoft-message-list-fetch-error-handler.service");
const _standardfolder = require("../../../../message-import-manager/drivers/types/standard-folder");
const _getstandardfolderbyregex = require("../../../../message-import-manager/drivers/utils/get-standard-folder-by-regex");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
const MESSAGING_MICROSOFT_MAIL_FOLDERS_LIST_MAX_RESULT = 999;
let MicrosoftGetAllFoldersService = class MicrosoftGetAllFoldersService {
    async getAllMessageFolders(connectedAccount, messageChannel) {
        try {
            const microsoftClient = await this.microsoftOAuth2ClientProvider.getClient(connectedAccount.id);
            const response = await microsoftClient.api('/me/mailFolders').version('beta').top(MESSAGING_MICROSOFT_MAIL_FOLDERS_LIST_MAX_RESULT).get().catch((error)=>{
                this.logger.error(`Connected account ${connectedAccount.id}: Error fetching folders: ${error.message}`);
                this.microsoftMessageListFetchErrorHandler.handleError(error);
                return {
                    value: []
                };
            });
            const folders = response.value || [];
            const rootFolderId = this.getRootFolderId(folders);
            const folderInfos = [];
            for (const folder of folders){
                if (!folder.displayName) {
                    continue;
                }
                const standardFolder = folder.wellKnownName ? (0, _getstandardfolderbyregex.getStandardFolderByRegex)(folder.wellKnownName) : null;
                if (!(0, _shouldcreatefolderbydefaultutil.shouldCreateFolderByDefault)(standardFolder)) {
                    continue;
                }
                const isSentFolder = this.isSentFolder(standardFolder);
                const isSynced = (0, _shouldsyncfolderbydefaultutil.shouldSyncFolderByDefault)(messageChannel.messageFolderImportPolicy);
                folderInfos.push({
                    externalId: folder.id,
                    name: folder.displayName,
                    isSynced,
                    isSentFolder,
                    parentFolderId: this.getParentFolderId(folder.parentFolderId, rootFolderId)
                });
            }
            this.logger.debug(`Found ${folderInfos.length} folders for Microsoft account ${connectedAccount.handle}`);
            return folderInfos;
        } catch (error) {
            this.logger.error(`Failed to get Microsoft folders for account ${connectedAccount.handle}:`, error);
            throw error;
        }
    }
    isSentFolder(standardFolder) {
        return standardFolder === _standardfolder.StandardFolder.SENT;
    }
    /*
   * All Microsoft folders have a parentFolderId including the standard folders
   * which point to root node which doesn't exits in the API response.
   * We remove this to simplify the folder hierarchy on frontend.
   */ getRootFolderId(folders) {
        for (const folder of folders){
            if ((0, _utils.isDefined)(folder.wellKnownName) && (0, _utils.isDefined)(folder.parentFolderId)) {
                return folder.parentFolderId;
            }
        }
        return null;
    }
    getParentFolderId(parentFolderId, rootFolderId) {
        if (!(0, _utils.isDefined)(parentFolderId)) {
            return null;
        }
        if (parentFolderId === rootFolderId) {
            return null;
        }
        return parentFolderId;
    }
    constructor(microsoftOAuth2ClientProvider, microsoftMessageListFetchErrorHandler){
        this.microsoftOAuth2ClientProvider = microsoftOAuth2ClientProvider;
        this.microsoftMessageListFetchErrorHandler = microsoftMessageListFetchErrorHandler;
        this.logger = new _common.Logger(MicrosoftGetAllFoldersService.name);
    }
};
MicrosoftGetAllFoldersService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _microsoftoauth2clientprovider.MicrosoftOAuth2ClientProvider === "undefined" ? Object : _microsoftoauth2clientprovider.MicrosoftOAuth2ClientProvider,
        typeof _microsoftmessagelistfetcherrorhandlerservice.MicrosoftMessageListFetchErrorHandler === "undefined" ? Object : _microsoftmessagelistfetcherrorhandlerservice.MicrosoftMessageListFetchErrorHandler
    ])
], MicrosoftGetAllFoldersService);

//# sourceMappingURL=microsoft-get-all-folders.service.js.map