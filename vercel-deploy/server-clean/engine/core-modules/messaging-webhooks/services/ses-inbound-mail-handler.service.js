"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SesInboundMailHandlerService", {
    enumerable: true,
    get: function() {
        return SesInboundMailHandlerService;
    }
});
const _common = require("@nestjs/common");
const _messagequeuedecorator = require("../../message-queue/decorators/message-queue.decorator");
const _messagequeueconstants = require("../../message-queue/message-queue.constants");
const _messagequeueservice = require("../../message-queue/services/message-queue.service");
const _messaginginboundemailimportjob = require("../../../../modules/messaging/message-import-manager/jobs/messaging-inbound-email-import.job");
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
let SesInboundMailHandlerService = class SesInboundMailHandlerService {
    async handle(notification, snsMessageId) {
        const { receipt } = notification;
        if (receipt?.action?.type !== 'S3') {
            this.logger.warn(`SNS message ${snsMessageId} has unsupported action type ${receipt?.action?.type}`);
            return;
        }
        await this.messageQueueService.add(_messaginginboundemailimportjob.MessagingInboundEmailImportJob.name, {
            s3Key: receipt.action.objectKey,
            envelopeRecipients: receipt.recipients
        });
    }
    constructor(messageQueueService){
        this.messageQueueService = messageQueueService;
        this.logger = new _common.Logger(SesInboundMailHandlerService.name);
    }
};
SesInboundMailHandlerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.messagingQueue)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService
    ])
], SesInboundMailHandlerService);

//# sourceMappingURL=ses-inbound-mail-handler.service.js.map