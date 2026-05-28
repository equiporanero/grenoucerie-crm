/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RotateSigningKeysCronCommand", {
    enumerable: true,
    get: function() {
        return RotateSigningKeysCronCommand;
    }
});
const _nestcommander = require("nest-commander");
const _rotatesigningkeyscronpatternconstant = require("../../constants/rotate-signing-keys-cron-pattern.constant");
const _rotatesigningkeyscronjob = require("../jobs/rotate-signing-keys.cron.job");
const _messagequeuedecorator = require("../../../message-queue/decorators/message-queue.decorator");
const _messagequeueconstants = require("../../../message-queue/message-queue.constants");
const _messagequeueservice = require("../../../message-queue/services/message-queue.service");
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
let RotateSigningKeysCronCommand = class RotateSigningKeysCronCommand extends _nestcommander.CommandRunner {
    async run() {
        await this.messageQueueService.addCron({
            jobName: _rotatesigningkeyscronjob.RotateSigningKeysCronJob.name,
            data: undefined,
            options: {
                repeat: {
                    pattern: _rotatesigningkeyscronpatternconstant.ROTATE_SIGNING_KEYS_CRON_PATTERN
                }
            }
        });
    }
    constructor(messageQueueService){
        super(), this.messageQueueService = messageQueueService;
    }
};
RotateSigningKeysCronCommand = _ts_decorate([
    (0, _nestcommander.Command)({
        name: 'cron:rotate-signing-keys',
        description: 'Starts a daily cron job that issues a fresh current JWT signing key once SIGNING_KEY_ROTATION_DAYS has elapsed. Enterprise-only.'
    }),
    _ts_param(0, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.cronQueue)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService
    ])
], RotateSigningKeysCronCommand);

//# sourceMappingURL=rotate-signing-keys.cron.command.js.map