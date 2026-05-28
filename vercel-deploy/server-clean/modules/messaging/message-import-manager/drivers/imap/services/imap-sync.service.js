"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ImapSyncService", {
    enumerable: true,
    get: function() {
        return ImapSyncService;
    }
});
const _common = require("@nestjs/common");
const _messageimportdriverexception = require("../../exceptions/message-import-driver.exception");
const _canuseqresyncutil = require("../utils/can-use-qresync.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ImapSyncService = class ImapSyncService {
    async syncFolder(client, folderPath, previousCursor, mailboxState) {
        this.validateUidValidity(previousCursor, mailboxState, folderPath);
        const messageUids = await this.fetchNewMessageUids(client, previousCursor, mailboxState, folderPath);
        return {
            messageUids
        };
    }
    validateUidValidity(previousCursor, mailboxState, folderPath) {
        const previousUidValidity = previousCursor?.uidValidity ?? 0;
        const { uidValidity } = mailboxState;
        if (previousUidValidity !== 0 && previousUidValidity !== uidValidity) {
            this.logger.warn(`UID validity changed from ${previousUidValidity} to ${uidValidity} in ${folderPath}. Full resync required.`);
            throw new _messageimportdriverexception.MessageImportDriverException(`IMAP UID validity changed for folder ${folderPath}`, _messageimportdriverexception.MessageImportDriverExceptionCode.SYNC_CURSOR_ERROR);
        }
    }
    async fetchNewMessageUids(client, previousCursor, mailboxState, folderPath) {
        const lastSyncedUid = previousCursor?.highestUid ?? 0;
        const { maxUid } = mailboxState;
        if ((0, _canuseqresyncutil.canUseQresync)(client, previousCursor, mailboxState)) {
            this.logger.debug(`Using QRESYNC for folder ${folderPath}`);
            try {
                return await this.fetchWithQresync(client, lastSyncedUid, BigInt(previousCursor.modSeq));
            } catch (error) {
                this.logger.warn(`QRESYNC failed for ${folderPath}, falling back to UID range: ${error.message}`);
            }
        }
        this.logger.debug(`Using UID range fetch for folder ${folderPath}`);
        return this.fetchWithUidRange(client, lastSyncedUid, maxUid);
    }
    async fetchWithUidRange(client, lastSyncedUid, highestAvailableUid) {
        if (lastSyncedUid >= highestAvailableUid) {
            return [];
        }
        const uidRange = `${lastSyncedUid + 1}:${highestAvailableUid}`;
        const uids = await client.search({
            uid: uidRange
        }, {
            uid: true
        });
        if (!uids || !Array.isArray(uids)) {
            return [];
        }
        return uids;
    }
    async fetchWithQresync(client, lastSyncedUid, lastModSeq) {
        const uids = await client.search({
            modseq: lastModSeq + BigInt(1),
            uid: `${lastSyncedUid + 1}:*`
        }, {
            uid: true
        });
        if (!uids || !Array.isArray(uids) || !uids.length) {
            return [];
        }
        this.logger.debug(`QRESYNC found ${uids.length} new/modified messages`);
        return uids;
    }
    constructor(){
        this.logger = new _common.Logger(ImapSyncService.name);
    }
};
ImapSyncService = _ts_decorate([
    (0, _common.Injectable)()
], ImapSyncService);

//# sourceMappingURL=imap-sync.service.js.map