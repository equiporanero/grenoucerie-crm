"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CheckCustomDomainValidRecordsCronCommand", {
    enumerable: true,
    get: function() {
        return CheckCustomDomainValidRecordsCronCommand;
    }
});
const _nestcommander = require("nest-commander");
const _messagequeuedecorator = require("../../../message-queue/decorators/message-queue.decorator");
const _messagequeueconstants = require("../../../message-queue/message-queue.constants");
const _messagequeueservice = require("../../../message-queue/services/message-queue.service");
const _checkcustomdomainvalidrecordscronjob = require("../jobs/check-custom-domain-valid-records.cron.job");
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
let CheckCustomDomainValidRecordsCronCommand = class CheckCustomDomainValidRecordsCronCommand extends _nestcommander.CommandRunner {
    async run() {
        await this.messageQueueService.addCron({
            jobName: _checkcustomdomainvalidrecordscronjob.CheckCustomDomainValidRecordsCronJob.name,
            data: undefined,
            options: {
                repeat: {
                    pattern: _checkcustomdomainvalidrecordscronjob.CHECK_CUSTOM_DOMAIN_VALID_RECORDS_CRON_PATTERN
                }
            }
        });
    }
    constructor(messageQueueService){
        super(), this.messageQueueService = messageQueueService;
    }
};
CheckCustomDomainValidRecordsCronCommand = _ts_decorate([
    (0, _nestcommander.Command)({
        name: 'cron:workspace:check-custom-domain-valid-records',
        description: 'Starts a cron job to check workspace custom domain valid records hourly'
    }),
    _ts_param(0, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.cronQueue)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService
    ])
], CheckCustomDomainValidRecordsCronCommand);

//# sourceMappingURL=check-custom-domain-valid-records.cron.command.js.map