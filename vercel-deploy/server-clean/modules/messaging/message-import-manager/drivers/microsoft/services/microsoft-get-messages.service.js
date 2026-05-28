"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MicrosoftGetMessagesService", {
    enumerable: true,
    get: function() {
        return MicrosoftGetMessagesService;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _messagedirectionenum = require("../../../../common/enums/message-direction.enum");
const _computemessagedirectionutil = require("../../gmail/utils/compute-message-direction.util");
const _microsoftimportdriverexception = require("../exceptions/microsoft-import-driver.exception");
const _formataddressobjectasparticipantsutil = require("../../../utils/format-address-object-as-participants.util");
const _safeparseemailaddressutil = require("../../../utils/safe-parse-email-address.util");
const _microsoftfetchbybatchservice = require("./microsoft-fetch-by-batch.service");
const _microsoftmessagesimporterrorhandlerservice = require("./microsoft-messages-import-error-handler.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let MicrosoftGetMessagesService = class MicrosoftGetMessagesService {
    async getMessages(messageIds, connectedAccount) {
        try {
            const { batchResponses } = await this.microsoftFetchByBatchService.fetchAllByBatches(messageIds, connectedAccount);
            const messages = this.formatBatchResponsesAsMessages(batchResponses, connectedAccount);
            return messages;
        } catch (error) {
            this.microsoftMessagesImportErrorHandler.handleError(error);
            return [];
        }
    }
    formatBatchResponsesAsMessages(batchResponses, connectedAccount) {
        return batchResponses.flatMap((batchResponse)=>{
            return this.formatBatchResponseAsMessages(batchResponse, connectedAccount);
        });
    }
    formatBatchResponseAsMessages(batchResponse, connectedAccount) {
        const parsedResponses = this.parseBatchResponse(batchResponse);
        const messages = parsedResponses.map((response)=>{
            if ('error' in response) {
                throw new _microsoftimportdriverexception.MicrosoftImportDriverException(response.error.message, response.error.code, response.error.statusCode);
            }
            const safeParseFrom = response?.from?.emailAddress ? [
                (0, _safeparseemailaddressutil.safeParseEmailAddress)(response.from.emailAddress)
            ] : [];
            const safeParseTo = response?.toRecipients?.filter(_utils.isDefined).map((recipient)=>(0, _safeparseemailaddressutil.safeParseEmailAddress)(recipient.emailAddress));
            const safeParseCc = response?.ccRecipients?.filter(_utils.isDefined).map((recipient)=>(0, _safeparseemailaddressutil.safeParseEmailAddress)(recipient.emailAddress));
            const safeParseBcc = response?.bccRecipients?.filter(_utils.isDefined).map((recipient)=>(0, _safeparseemailaddressutil.safeParseEmailAddress)(recipient.emailAddress));
            const participants = [
                ...safeParseFrom ? (0, _formataddressobjectasparticipantsutil.formatAddressObjectAsParticipants)(safeParseFrom, _types.MessageParticipantRole.FROM) : [],
                ...safeParseTo ? (0, _formataddressobjectasparticipantsutil.formatAddressObjectAsParticipants)(safeParseTo, _types.MessageParticipantRole.TO) : [],
                ...safeParseCc ? (0, _formataddressobjectasparticipantsutil.formatAddressObjectAsParticipants)(safeParseCc, _types.MessageParticipantRole.CC) : [],
                ...safeParseBcc ? (0, _formataddressobjectasparticipantsutil.formatAddressObjectAsParticipants)(safeParseBcc, _types.MessageParticipantRole.BCC) : []
            ];
            return {
                externalId: response.id,
                subject: response.subject || '',
                receivedAt: new Date(response.receivedDateTime),
                text: response.body?.contentType === 'text' ? response.body?.content : '',
                headerMessageId: response.internetMessageId,
                messageThreadExternalId: response.conversationId,
                direction: response.from ? (0, _computemessagedirectionutil.computeMessageDirection)(response.from.emailAddress.address, connectedAccount) : _messagedirectionenum.MessageDirection.INCOMING,
                participants,
                attachments: [],
                messageFolderExternalIds: response.parentFolderId ? [
                    response.parentFolderId
                ] : []
            };
        });
        return messages.filter(_utils.isDefined);
    }
    parseBatchResponse(batchResponse) {
        if (!batchResponse?.responses) {
            return [];
        }
        // oxlint-disable-next-line @typescripttypescript/no-explicit-any
        return batchResponse.responses.map((response)=>{
            if (response.status === 200) {
                return response.body;
            }
            if (response.status !== 503 && response.status !== 429) {
                this.logger.error(`Microsoft parseBatchResponse error`, response);
            }
            const errorParsed = response?.body?.error ? response.body.error : {
                message: 'Microsoft parseBatchResponse error: no response.body.error'
            };
            return {
                error: {
                    ...errorParsed,
                    statusCode: response?.status
                }
            };
        });
    }
    constructor(microsoftFetchByBatchService, microsoftMessagesImportErrorHandler){
        this.microsoftFetchByBatchService = microsoftFetchByBatchService;
        this.microsoftMessagesImportErrorHandler = microsoftMessagesImportErrorHandler;
        this.logger = new _common.Logger(MicrosoftGetMessagesService.name);
    }
};
MicrosoftGetMessagesService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _microsoftfetchbybatchservice.MicrosoftFetchByBatchService === "undefined" ? Object : _microsoftfetchbybatchservice.MicrosoftFetchByBatchService,
        typeof _microsoftmessagesimporterrorhandlerservice.MicrosoftMessagesImportErrorHandler === "undefined" ? Object : _microsoftmessagesimporterrorhandlerservice.MicrosoftMessagesImportErrorHandler
    ])
], MicrosoftGetMessagesService);

//# sourceMappingURL=microsoft-get-messages.service.js.map