"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ImapSmtpMessageOutboundService", {
    enumerable: true,
    get: function() {
        return ImapSmtpMessageOutboundService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _mailcomposer = /*#__PURE__*/ _interop_require_default(require("nodemailer/lib/mail-composer"));
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _messagechannelentity = require("../../../../../../engine/metadata-modules/message-channel/entities/message-channel.entity");
const _messagefolderentity = require("../../../../../../engine/metadata-modules/message-folder/entities/message-folder.entity");
const _imapclientprovider = require("../../../../message-import-manager/drivers/imap/providers/imap-client.provider");
const _imapfinddraftsfolderservice = require("../../../../message-import-manager/drivers/imap/services/imap-find-drafts-folder.service");
const _getimapfolderpathutil = require("../../../../message-import-manager/drivers/imap/utils/get-imap-folder-path.util");
const _smtpclientprovider = require("../../../../message-import-manager/drivers/smtp/providers/smtp-client.provider");
const _extractmessageidfrombufferutil = require("../../../utils/extract-message-id-from-buffer.util");
const _tomailcomposeroptionsutil = require("../../../utils/to-mail-composer-options.util");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
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
let ImapSmtpMessageOutboundService = class ImapSmtpMessageOutboundService {
    async sendMessage(sendMessageInput, connectedAccount) {
        const { handle, connectionParameters } = connectedAccount;
        const smtpClient = await this.smtpClientProvider.getClient(connectedAccount.id);
        this.assertHandleIsDefined(handle);
        const messageBuffer = await this.compileRawMessage(handle, sendMessageInput);
        await smtpClient.sendMail({
            from: handle,
            to: sendMessageInput.to,
            cc: sendMessageInput.cc,
            bcc: sendMessageInput.bcc,
            raw: messageBuffer
        });
        if ((0, _utils.isDefined)(connectionParameters?.IMAP)) {
            const imapClient = await this.imapClientProvider.getClient(connectedAccount.id);
            const messageChannel = await this.messageChannelRepository.findOne({
                where: {
                    connectedAccountId: connectedAccount.id,
                    handle: handle
                }
            });
            let sentFolder = null;
            if ((0, _utils.isDefined)(messageChannel)) {
                sentFolder = await this.messageFolderRepository.findOne({
                    where: {
                        messageChannelId: messageChannel.id,
                        isSentFolder: true
                    }
                });
            }
            const sentFolderPath = (0, _getimapfolderpathutil.getImapFolderPath)(sentFolder?.externalId);
            if ((0, _utils.isDefined)(sentFolderPath)) {
                await imapClient.append(sentFolderPath, messageBuffer);
            }
            await this.imapClientProvider.closeClient(imapClient);
        }
        return {
            headerMessageId: (0, _extractmessageidfrombufferutil.extractMessageIdFromBuffer)(messageBuffer)
        };
    }
    async createDraft(sendMessageInput, connectedAccount) {
        const { handle, connectionParameters } = connectedAccount;
        this.assertHandleIsDefined(handle);
        if (!(0, _utils.isDefined)(connectionParameters?.IMAP)) {
            throw new Error('IMAP connection is required to create drafts');
        }
        const messageBuffer = await this.compileRawMessage(handle, sendMessageInput);
        const imapClient = await this.imapClientProvider.getClient(connectedAccount.id);
        try {
            const draftsFolder = await this.imapFindDraftsFolderService.findOrCreateDraftsFolder(imapClient);
            if (!(0, _utils.isDefined)(draftsFolder)) {
                throw new Error('No drafts folder found and could not create one');
            }
            const DRAFT_FLAG = '\\Draft';
            await imapClient.append(draftsFolder.path, messageBuffer, [
                DRAFT_FLAG
            ]);
        } finally{
            await this.imapClientProvider.closeClient(imapClient);
        }
    }
    async compileRawMessage(from, sendMessageInput) {
        const mail = new _mailcomposer.default((0, _tomailcomposeroptionsutil.toMailComposerOptions)(from, sendMessageInput));
        return mail.compile().build();
    }
    assertHandleIsDefined(handle) {
        if (!(0, _utils.isDefined)(handle)) {
            throw new Error('Handle is required');
        }
    }
    constructor(smtpClientProvider, imapClientProvider, imapFindDraftsFolderService, messageChannelRepository, messageFolderRepository){
        this.smtpClientProvider = smtpClientProvider;
        this.imapClientProvider = imapClientProvider;
        this.imapFindDraftsFolderService = imapFindDraftsFolderService;
        this.messageChannelRepository = messageChannelRepository;
        this.messageFolderRepository = messageFolderRepository;
    }
};
ImapSmtpMessageOutboundService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(3, (0, _typeorm.InjectRepository)(_messagechannelentity.MessageChannelEntity)),
    _ts_param(4, (0, _typeorm.InjectRepository)(_messagefolderentity.MessageFolderEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _smtpclientprovider.SmtpClientProvider === "undefined" ? Object : _smtpclientprovider.SmtpClientProvider,
        typeof _imapclientprovider.ImapClientProvider === "undefined" ? Object : _imapclientprovider.ImapClientProvider,
        typeof _imapfinddraftsfolderservice.ImapFindDraftsFolderService === "undefined" ? Object : _imapfinddraftsfolderservice.ImapFindDraftsFolderService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], ImapSmtpMessageOutboundService);

//# sourceMappingURL=imap-smtp-message-outbound.service.js.map