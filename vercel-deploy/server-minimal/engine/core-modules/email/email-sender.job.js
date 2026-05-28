"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EmailSenderJob", {
    enumerable: true,
    get: function() {
        return EmailSenderJob;
    }
});
const _nodemailer = require("nodemailer");
const _emailsenderservice = require("./email-sender.service");
const _processdecorator = require("../message-queue/decorators/process.decorator");
const _processordecorator = require("../message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../message-queue/message-queue.constants");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let EmailSenderJob = class EmailSenderJob {
    async handle(data) {
        await this.emailSenderService.send(data);
    }
    constructor(emailSenderService){
        this.emailSenderService = emailSenderService;
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(EmailSenderJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _nodemailer.SendMailOptions === "undefined" ? Object : _nodemailer.SendMailOptions
    ]),
    _ts_metadata("design:returntype", Promise)
], EmailSenderJob.prototype, "handle", null);
EmailSenderJob = _ts_decorate([
    (0, _processordecorator.Processor)(_messagequeueconstants.MessageQueue.emailQueue),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _emailsenderservice.EmailSenderService === "undefined" ? Object : _emailsenderservice.EmailSenderService
    ])
], EmailSenderJob);

//# sourceMappingURL=email-sender.job.js.map