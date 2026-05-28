"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ImapGetMessagesService", {
    enumerable: true,
    get: function() {
        return ImapGetMessagesService;
    }
});
const _common = require("@nestjs/common");
const _computemessagedirectionutil = require("../../gmail/utils/compute-message-direction.util");
const _imapclientprovider = require("../providers/imap-client.provider");
const _imapmessageparserservice = require("./imap-message-parser.service");
const _imapmessagetextextractorservice = require("./imap-message-text-extractor.service");
const _imapmessagesimporterrorhandlerservice = require("./imap-messages-import-error-handler.service");
const _parsemessageidutil = require("../utils/parse-message-id.util");
const _extractaddressesfromparsedemailutil = require("../../../utils/extract-addresses-from-parsed-email.util");
const _extractparticipantsfromparsedemailutil = require("../../../utils/extract-participants-from-parsed-email.util");
const _extractthreadidfromparsedemailutil = require("../../../utils/extract-thread-id-from-parsed-email.util");
const _sanitizestringutil = require("../../../utils/sanitize-string.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ImapGetMessagesService = class ImapGetMessagesService {
    async getMessages(messageExternalIds, connectedAccount) {
        if (!messageExternalIds.length) {
            return [];
        }
        const messagesByFolder = this.groupByFolder(messageExternalIds);
        const client = await this.imapClientProvider.getClient(connectedAccount.id);
        try {
            return await this.fetchFromAllFolders(messagesByFolder, client, connectedAccount);
        } finally{
            await this.imapClientProvider.closeClient(client);
        }
    }
    groupByFolder(messageExternalIds) {
        const messagesByFolder = new Map();
        for (const externalId of messageExternalIds){
            const parsed = (0, _parsemessageidutil.parseMessageId)(externalId);
            if (!parsed) {
                this.logger.warn(`Invalid message external ID format: ${externalId}`);
                continue;
            }
            const uids = messagesByFolder.get(parsed.folder) ?? [];
            uids.push(parsed.uid);
            messagesByFolder.set(parsed.folder, uids);
        }
        return messagesByFolder;
    }
    async fetchFromAllFolders(messagesByFolder, client, connectedAccount) {
        const allMessages = [];
        for (const [folderPath, messageUids] of messagesByFolder){
            if (!messageUids.length) {
                continue;
            }
            const folderMessages = await this.fetchFromFolder(folderPath, messageUids, client, connectedAccount);
            allMessages.push(...folderMessages);
        }
        return allMessages;
    }
    async fetchFromFolder(folderPath, messageUids, client, connectedAccount) {
        this.logger.debug(`Fetching ${messageUids.length} messages from ${folderPath}`);
        const startTime = Date.now();
        const { messages: results, uidValidity } = await this.messageParser.parseMessagesFromFolder(messageUids, folderPath, client);
        const folderExternalId = uidValidity ? `${folderPath}:${uidValidity}` : folderPath;
        const messages = [];
        for (const result of results){
            if (result.error) {
                this.errorHandler.handleError(result.error, `${folderPath}:${result.uid}`);
                continue;
            }
            if (!result.parsed) {
                this.logger.warn(`Message UID ${result.uid} could not be parsed - likely deleted`);
                continue;
            }
            messages.push(this.buildMessage(result.parsed, result.uid, folderPath, folderExternalId, connectedAccount));
        }
        this.logger.debug(`Parsed ${messages.length}/${results.length} messages from ${folderPath} in ${Date.now() - startTime}ms`);
        return messages;
    }
    buildMessage(parsed, uid, folderPath, folderExternalId, connectedAccount) {
        const fromAddresses = (0, _extractaddressesfromparsedemailutil.extractAddressesFromParsedEmail)(parsed.from);
        const senderAddress = fromAddresses[0]?.address ?? '';
        const text = (0, _sanitizestringutil.sanitizeString)(this.textExtractor.extractTextWithoutReplyQuotations(parsed));
        return {
            externalId: `${folderPath}:${uid}`,
            messageThreadExternalId: (0, _extractthreadidfromparsedemailutil.extractThreadIdFromParsedEmail)(parsed),
            headerMessageId: parsed.messageId || String(uid),
            subject: (0, _sanitizestringutil.sanitizeString)(parsed.subject || ''),
            text,
            receivedAt: parsed.date ? new Date(parsed.date) : null,
            direction: (0, _computemessagedirectionutil.computeMessageDirection)(senderAddress, connectedAccount),
            attachments: (parsed.attachments || []).map((attachment)=>({
                    filename: attachment.filename || 'unnamed-attachment'
                })),
            participants: (0, _extractparticipantsfromparsedemailutil.extractParticipantsFromParsedEmail)(parsed),
            messageFolderExternalIds: [
                folderExternalId
            ]
        };
    }
    constructor(imapClientProvider, messageParser, textExtractor, errorHandler){
        this.imapClientProvider = imapClientProvider;
        this.messageParser = messageParser;
        this.textExtractor = textExtractor;
        this.errorHandler = errorHandler;
        this.logger = new _common.Logger(ImapGetMessagesService.name);
    }
};
ImapGetMessagesService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _imapclientprovider.ImapClientProvider === "undefined" ? Object : _imapclientprovider.ImapClientProvider,
        typeof _imapmessageparserservice.ImapMessageParserService === "undefined" ? Object : _imapmessageparserservice.ImapMessageParserService,
        typeof _imapmessagetextextractorservice.ImapMessageTextExtractorService === "undefined" ? Object : _imapmessagetextextractorservice.ImapMessageTextExtractorService,
        typeof _imapmessagesimporterrorhandlerservice.ImapMessagesImportErrorHandler === "undefined" ? Object : _imapmessagesimporterrorhandlerservice.ImapMessagesImportErrorHandler
    ])
], ImapGetMessagesService);

//# sourceMappingURL=imap-get-messages.service.js.map