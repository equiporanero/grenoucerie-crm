"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplicationVersionCheckCronCommand", {
    enumerable: true,
    get: function() {
        return ApplicationVersionCheckCronCommand;
    }
});
const _nestcommander = require("nest-commander");
const _applicationversioncheckcronjob = require("../application-version-check.cron.job");
const _applicationversioncheckcronpatternconstant = require("../constants/application-version-check-cron-pattern.constant");
const _messagequeuedecorator = require("../../../../message-queue/decorators/message-queue.decorator");
const _messagequeueconstants = require("../../../../message-queue/message-queue.constants");
const _messagequeueservice = require("../../../../message-queue/services/message-queue.service");
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
let ApplicationVersionCheckCronCommand = class ApplicationVersionCheckCronCommand extends _nestcommander.CommandRunner {
    async run() {
        await this.messageQueueService.addCron({
            jobName: _applicationversioncheckcronjob.ApplicationVersionCheckCronJob.name,
            data: undefined,
            options: {
                repeat: {
                    pattern: _applicationversioncheckcronpatternconstant.APPLICATION_VERSION_CHECK_CRON_PATTERN
                }
            }
        });
    }
    constructor(messageQueueService){
        super(), this.messageQueueService = messageQueueService;
    }
};
ApplicationVersionCheckCronCommand = _ts_decorate([
    (0, _nestcommander.Command)({
        name: 'cron:app-version-check',
        description: 'Starts a cron job to check for app version updates on npm registries'
    }),
    _ts_param(0, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.cronQueue)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService
    ])
], ApplicationVersionCheckCronCommand);

//# sourceMappingURL=application-version-check.cron.command.js.map