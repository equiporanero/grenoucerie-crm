"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "InboundEmailImportService", {
    enumerable: true,
    get: function() {
        return InboundEmailImportService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _types = require("twenty-shared/types");
const _typeorm1 = require("typeorm");
const _connectedaccountentity = require("../../../../../../engine/metadata-modules/connected-account/entities/connected-account.entity");
const _messagechannelentity = require("../../../../../../engine/metadata-modules/message-channel/entities/message-channel.entity");
const _globalworkspaceormmanager = require("../../../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _inboundemails3clientprovider = require("../providers/inbound-email-s3-client.provider");
const _inboundemailparserservice = require("./inbound-email-parser.service");
const _inboundemailstorageservice = require("./inbound-email-storage.service");
const _messagingsavemessagesandenqueuecontactcreationservice = require("../../../services/messaging-save-messages-and-enqueue-contact-creation.service");
const _utils = require("twenty-shared/utils");
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
let InboundEmailImportService = class InboundEmailImportService {
    async importInboundMessage(params) {
        const { s3Key, envelopeRecipients } = params;
        if (!this.inboundEmailS3ClientProvider.isConfigured()) {
            this.logger.warn(`Skipping inbound email import for ${s3Key}: email group is not configured.`);
            return {
                kind: 'unconfigured'
            };
        }
        const inboundEmailDomain = this.inboundEmailS3ClientProvider.getDomain();
        const recipient = this.matchInboundRecipient(envelopeRecipients, inboundEmailDomain);
        if (!(0, _utils.isDefined)(recipient)) {
            this.logger.warn(`No recipient at ${inboundEmailDomain} in SNS payload for ${s3Key}`);
            return {
                kind: 'unmatched',
                recipient: null
            };
        }
        const messageChannel = await this.messageChannelRepository.findOne({
            where: {
                handle: recipient,
                type: _types.MessageChannelType.EMAIL_GROUP
            }
        });
        if (!(0, _utils.isDefined)(messageChannel)) {
            this.logger.warn(`No email group channel matches recipient ${recipient} (key ${s3Key})`);
            return {
                kind: 'unmatched',
                recipient
            };
        }
        const rawMessage = await this.inboundEmailStorageService.getRawMessage(s3Key);
        const parsedInboundMessage = await this.inboundEmailParserService.parse(rawMessage, s3Key);
        const { workspaceId } = messageChannel;
        const connectedAccount = await this.connectedAccountRepository.findOne({
            where: {
                id: messageChannel.connectedAccountId,
                workspaceId
            }
        });
        if (!(0, _utils.isDefined)(connectedAccount)) {
            throw new Error(`Email group channel ${messageChannel.id} has no connected account`);
        }
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            await this.messagingSaveMessagesAndEnqueueContactCreationService.saveMessagesAndEnqueueContactCreation([
                parsedInboundMessage.message
            ], messageChannel, connectedAccount, workspaceId);
        }, (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId), {
            lite: true
        });
        await this.inboundEmailStorageService.deleteRawMessage(s3Key);
        return {
            kind: 'imported',
            workspaceId,
            messageChannelId: messageChannel.id
        };
    }
    matchInboundRecipient(envelopeRecipients, inboundEmailDomain) {
        const normalizedDomain = inboundEmailDomain.toLowerCase();
        return envelopeRecipients.map((address)=>address.toLowerCase()).find((address)=>address.endsWith(`@${normalizedDomain}`)) ?? null;
    }
    constructor(inboundEmailS3ClientProvider, inboundEmailStorageService, inboundEmailParserService, globalWorkspaceOrmManager, messagingSaveMessagesAndEnqueueContactCreationService, messageChannelRepository, connectedAccountRepository){
        this.inboundEmailS3ClientProvider = inboundEmailS3ClientProvider;
        this.inboundEmailStorageService = inboundEmailStorageService;
        this.inboundEmailParserService = inboundEmailParserService;
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.messagingSaveMessagesAndEnqueueContactCreationService = messagingSaveMessagesAndEnqueueContactCreationService;
        this.messageChannelRepository = messageChannelRepository;
        this.connectedAccountRepository = connectedAccountRepository;
        this.logger = new _common.Logger(InboundEmailImportService.name);
    }
};
InboundEmailImportService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(5, (0, _typeorm.InjectRepository)(_messagechannelentity.MessageChannelEntity)),
    _ts_param(6, (0, _typeorm.InjectRepository)(_connectedaccountentity.ConnectedAccountEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _inboundemails3clientprovider.InboundEmailS3ClientProvider === "undefined" ? Object : _inboundemails3clientprovider.InboundEmailS3ClientProvider,
        typeof _inboundemailstorageservice.InboundEmailStorageService === "undefined" ? Object : _inboundemailstorageservice.InboundEmailStorageService,
        typeof _inboundemailparserservice.InboundEmailParserService === "undefined" ? Object : _inboundemailparserservice.InboundEmailParserService,
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _messagingsavemessagesandenqueuecontactcreationservice.MessagingSaveMessagesAndEnqueueContactCreationService === "undefined" ? Object : _messagingsavemessagesandenqueuecontactcreationservice.MessagingSaveMessagesAndEnqueueContactCreationService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], InboundEmailImportService);

//# sourceMappingURL=inbound-email-import.service.js.map