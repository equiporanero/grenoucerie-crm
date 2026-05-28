"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ImapGetAllFoldersService", {
    enumerable: true,
    get: function() {
        return ImapGetAllFoldersService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _shouldcreatefolderbydefaultutil = require("../../../utils/should-create-folder-by-default.util");
const _shouldsyncfolderbydefaultutil = require("../../../utils/should-sync-folder-by-default.util");
const _imapclientprovider = require("../../../../message-import-manager/drivers/imap/providers/imap-client.provider");
const _imapfindsentfolderservice = require("../../../../message-import-manager/drivers/imap/services/imap-find-sent-folder.service");
const _getimapfolderpathutil = require("../../../../message-import-manager/drivers/imap/utils/get-imap-folder-path.util");
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
let ImapGetAllFoldersService = class ImapGetAllFoldersService {
    async getAllMessageFolders(connectedAccount, messageChannel) {
        try {
            const client = await this.imapClientProvider.getClient(connectedAccount.id);
            const mailboxList = await client.list();
            const folders = await this.filterAndMapFolders(client, mailboxList, messageChannel);
            await this.imapClientProvider.closeClient(client);
            return folders;
        } catch (error) {
            this.logger.error(`Failed to get IMAP folders for account ${connectedAccount.handle}:`, error);
            throw error;
        }
    }
    async filterAndMapFolders(client, mailboxList, messageChannel) {
        const folders = [];
        const pathToExternalIdMap = new Map();
        const sentFolder = await this.imapFindSentFolderService.findSentFolder(client);
        const sentMailbox = (0, _utils.isDefined)(sentFolder) ? mailboxList.find((mailbox)=>mailbox.path === sentFolder.path) : undefined;
        if ((0, _utils.isDefined)(sentFolder) && (0, _utils.isDefined)(sentMailbox) && this.isMailboxSelectable(sentMailbox)) {
            const uidValidity = await this.getUidValidity(client, sentMailbox);
            const externalId = uidValidity ? `${sentFolder.path}:${uidValidity.toString()}` : sentFolder.path;
            pathToExternalIdMap.set(sentFolder.path, externalId);
            folders.push({
                externalId,
                name: sentFolder.name,
                isSynced: true,
                isSentFolder: true,
                parentFolderId: sentMailbox?.parentPath || null
            });
        }
        for (const mailbox of mailboxList){
            if (!this.isValidMailbox(mailbox, folders)) {
                if (!pathToExternalIdMap.has(mailbox.path)) {
                    pathToExternalIdMap.set(mailbox.path, mailbox.path);
                }
                continue;
            }
            const uidValidity = await this.getUidValidity(client, mailbox);
            const externalId = uidValidity ? `${mailbox.path}:${uidValidity}` : mailbox.path;
            pathToExternalIdMap.set(mailbox.path, externalId);
            const standardFolder = (0, _getstandardfolderbyregex.getStandardFolderByRegex)(mailbox.name);
            if (!(0, _shouldcreatefolderbydefaultutil.shouldCreateFolderByDefault)(standardFolder)) {
                continue;
            }
            const isSynced = (0, _shouldsyncfolderbydefaultutil.shouldSyncFolderByDefault)(messageChannel.messageFolderImportPolicy);
            folders.push({
                externalId,
                name: mailbox.name,
                isSynced,
                isSentFolder: false,
                parentFolderId: mailbox.parentPath || null
            });
        }
        for (const folder of folders){
            if (folder.parentFolderId) {
                const parentExternalId = pathToExternalIdMap.get(folder.parentFolderId);
                folder.parentFolderId = parentExternalId || null;
            }
        }
        return folders;
    }
    isMailboxSelectable(mailbox) {
        // Per RFC 3501, IMAP attribute names are case-insensitive. Different
        // servers vary the spelling (Dovecot: \Noselect, Stalwart: \NoSelect),
        // so we compare lowercased to avoid attempting SELECT on a virtual
        // namespace placeholder, which the server would reject as NONEXISTENT.
        if (!mailbox.flags) {
            return true;
        }
        for (const flag of mailbox.flags){
            if (flag.toLowerCase() === '\\noselect') {
                return false;
            }
        }
        return true;
    }
    isValidMailbox(mailbox, existingFolders) {
        if (!this.isMailboxSelectable(mailbox)) {
            return false;
        }
        const isDuplicate = existingFolders.some((folder)=>(0, _getimapfolderpathutil.getImapFolderPath)(folder?.externalId) === mailbox.path);
        return !isDuplicate;
    }
    async getUidValidity(client, mailbox) {
        if (mailbox.status?.uidValidity) {
            return mailbox.status.uidValidity;
        }
        try {
            const status = await client.status(mailbox.path, {
                uidValidity: true
            });
            return status.uidValidity ?? null;
        } catch (error) {
            this.logger.warn(`Failed to get uidValidity for folder ${mailbox.path}:`, error);
            return null;
        }
    }
    constructor(imapClientProvider, imapFindSentFolderService){
        this.imapClientProvider = imapClientProvider;
        this.imapFindSentFolderService = imapFindSentFolderService;
        this.logger = new _common.Logger(ImapGetAllFoldersService.name);
    }
};
ImapGetAllFoldersService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _imapclientprovider.ImapClientProvider === "undefined" ? Object : _imapclientprovider.ImapClientProvider,
        typeof _imapfindsentfolderservice.ImapFindSentFolderService === "undefined" ? Object : _imapfindsentfolderservice.ImapFindSentFolderService
    ])
], ImapGetAllFoldersService);

//# sourceMappingURL=imap-get-all-folders.service.js.map