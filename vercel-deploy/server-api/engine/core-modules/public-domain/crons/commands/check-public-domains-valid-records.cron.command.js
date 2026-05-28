"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CheckPublicDomainsValidRecordsCronCommand", {
    enumerable: true,
    get: function() {
        return CheckPublicDomainsValidRecordsCronCommand;
    }
});
const _nestcommander = require("nest-commander");
const _messagequeuedecorator = require("../../../message-queue/decorators/message-queue.decorator");
const _messagequeueconstants = require("../../../message-queue/message-queue.constants");
const _messagequeueservice = require("../../../message-queue/services/message-queue.service");
const _checkpublicdomainsvalidrecordscronjob = require("../jobs/check-public-domains-valid-records.cron.job");
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
let CheckPublicDomainsValidRecordsCronCommand = class CheckPublicDomainsValidRecordsCronCommand extends _nestcommander.CommandRunner {
    async run() {
        await this.messageQueueService.addCron({
            jobName: _checkpublicdomainsvalidrecordscronjob.CheckPublicDomainsValidRecordsCronJob.name,
            data: undefined,
            options: {
                repeat: {
                    pattern: _checkpublicdomainsvalidrecordscronjob.CHECK_PUBLIC_DOMAINS_VALID_RECORDS_CRON_PATTERN
                }
            }
        });
    }
    constructor(messageQueueService){
        super(), this.messageQueueService = messageQueueService;
    }
};
CheckPublicDomainsValidRecordsCronCommand = _ts_decorate([
    (0, _nestcommander.Command)({
        name: 'cron:public-domain:check-public-domains-valid-records',
        description: 'Starts a cron job to check workspace public domains valid records hourly'
    }),
    _ts_param(0, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.cronQueue)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService
    ])
], CheckPublicDomainsValidRecordsCronCommand);

//# sourceMappingURL=check-public-domains-valid-records.cron.command.js.map