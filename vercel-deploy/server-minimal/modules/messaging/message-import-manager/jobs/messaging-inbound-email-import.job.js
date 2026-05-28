"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagingInboundEmailImportJob", {
    enumerable: true,
    get: function() {
        return MessagingInboundEmailImportJob;
    }
});
const _common = require("@nestjs/common");
const _processdecorator = require("../../../../engine/core-modules/message-queue/decorators/process.decorator");
const _processordecorator = require("../../../../engine/core-modules/message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../../engine/core-modules/message-queue/message-queue.constants");
const _inboundemailimportservice = require("../drivers/inbound-email/services/inbound-email-import.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let MessagingInboundEmailImportJob = class MessagingInboundEmailImportJob {
    async handle(data) {
        const { s3Key, envelopeRecipients } = data;
        const outcome = await this.inboundEmailImportService.importInboundMessage({
            s3Key,
            envelopeRecipients
        });
        this.logger.log(`Inbound email import outcome for ${s3Key}: ${outcome.kind}`);
    }
    constructor(inboundEmailImportService){
        this.inboundEmailImportService = inboundEmailImportService;
        this.logger = new _common.Logger(MessagingInboundEmailImportJob.name);
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(MessagingInboundEmailImportJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof MessagingInboundEmailImportJobData === "undefined" ? Object : MessagingInboundEmailImportJobData
    ]),
    _ts_metadata("design:returntype", Promise)
], MessagingInboundEmailImportJob.prototype, "handle", null);
MessagingInboundEmailImportJob = _ts_decorate([
    (0, _processordecorator.Processor)({
        queueName: _messagequeueconstants.MessageQueue.messagingQueue,
        scope: _common.Scope.REQUEST
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _inboundemailimportservice.InboundEmailImportService === "undefined" ? Object : _inboundemailimportservice.InboundEmailImportService
    ])
], MessagingInboundEmailImportJob);

//# sourceMappingURL=messaging-inbound-email-import.job.js.map