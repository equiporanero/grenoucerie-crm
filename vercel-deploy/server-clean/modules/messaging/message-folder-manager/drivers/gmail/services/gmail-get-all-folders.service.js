"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GmailGetAllFoldersService", {
    enumerable: true,
    get: function() {
        return GmailGetAllFoldersService;
    }
});
const _common = require("@nestjs/common");
const _googleapis = require("googleapis");
const _googleoauth2clientprovider = require("../../../../../connected-account/oauth2-client-manager/drivers/google/google-oauth2-client.provider");
const _gmailfolderserrorhandlerservice = require("./gmail-folders-error-handler.service");
const _extractgmailfoldernameutil = require("../utils/extract-gmail-folder-name.util");
const _getgmailfolderparentidutil = require("../utils/get-gmail-folder-parent-id.util");
const _shouldsyncfolderbydefaultutil = require("../../../utils/should-sync-folder-by-default.util");
const _messaginggmaildefaultexcludedlabelsconstant = require("../../../../message-import-manager/drivers/gmail/constants/messaging-gmail-default-excluded-labels.constant");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let GmailGetAllFoldersService = class GmailGetAllFoldersService {
    async getAllMessageFolders(connectedAccount, messageChannel) {
        try {
            const oAuth2Client = await this.googleOAuth2ClientProvider.getClient(connectedAccount.id);
            const gmailClient = _googleapis.google.gmail({
                version: 'v1',
                auth: oAuth2Client
            });
            const response = await gmailClient.users.labels.list({
                userId: 'me'
            }).catch((error)=>{
                this.logger.error(`Connected account ${connectedAccount.id}: Error fetching labels: ${error.message}`);
                this.gmailFoldersErrorHandlerService.handleError(error);
                return {
                    data: {
                        labels: []
                    }
                };
            });
            const labels = response.data.labels || [];
            const folders = [];
            const labelNameToIdMap = new Map();
            for (const label of labels){
                if (!label.name || !label.id) {
                    continue;
                }
                labelNameToIdMap.set(label.name, label.id);
            }
            for (const label of labels){
                if (!label.name || !label.id) {
                    continue;
                }
                if (_messaginggmaildefaultexcludedlabelsconstant.MESSAGING_GMAIL_DEFAULT_EXCLUDED_LABELS.includes(label.id)) {
                    continue;
                }
                const isSentFolder = label.id === 'SENT';
                const folderName = (0, _extractgmailfoldernameutil.extractGmailFolderName)(label.name);
                const parentFolderId = (0, _getgmailfolderparentidutil.getGmailFolderParentId)(label.name, labelNameToIdMap);
                const isSynced = (0, _shouldsyncfolderbydefaultutil.shouldSyncFolderByDefault)(messageChannel.messageFolderImportPolicy);
                folders.push({
                    externalId: label.id,
                    name: folderName,
                    isSynced,
                    isSentFolder,
                    parentFolderId
                });
            }
            this.logger.debug(`Found ${folders.length} folders for Gmail account ${connectedAccount.handle}`);
            return folders;
        } catch (error) {
            this.logger.error(`Failed to get Gmail folders for account ${connectedAccount.handle}:`, error);
            throw error;
        }
    }
    constructor(googleOAuth2ClientProvider, gmailFoldersErrorHandlerService){
        this.googleOAuth2ClientProvider = googleOAuth2ClientProvider;
        this.gmailFoldersErrorHandlerService = gmailFoldersErrorHandlerService;
        this.logger = new _common.Logger(GmailGetAllFoldersService.name);
    }
};
GmailGetAllFoldersService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _googleoauth2clientprovider.GoogleOAuth2ClientProvider === "undefined" ? Object : _googleoauth2clientprovider.GoogleOAuth2ClientProvider,
        typeof _gmailfolderserrorhandlerservice.GmailFoldersErrorHandlerService === "undefined" ? Object : _gmailfolderserrorhandlerservice.GmailFoldersErrorHandlerService
    ])
], GmailGetAllFoldersService);

//# sourceMappingURL=gmail-get-all-folders.service.js.map