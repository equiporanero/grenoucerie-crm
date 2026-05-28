"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CleanSuspendedWorkspacesCronCommand", {
    enumerable: true,
    get: function() {
        return CleanSuspendedWorkspacesCronCommand;
    }
});
const _nestcommander = require("nest-commander");
const _messagequeuedecorator = require("../../../core-modules/message-queue/decorators/message-queue.decorator");
const _messagequeueconstants = require("../../../core-modules/message-queue/message-queue.constants");
const _messagequeueservice = require("../../../core-modules/message-queue/services/message-queue.service");
const _cleansuspendedworkspacescronpattern = require("../crons/clean-suspended-workspaces.cron.pattern");
const _cleansuspendedworkspacesjob = require("../crons/clean-suspended-workspaces.job");
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
let CleanSuspendedWorkspacesCronCommand = class CleanSuspendedWorkspacesCronCommand extends _nestcommander.CommandRunner {
    async run() {
        await this.messageQueueService.addCron({
            jobName: _cleansuspendedworkspacesjob.CleanSuspendedWorkspacesJob.name,
            data: undefined,
            options: {
                repeat: {
                    pattern: _cleansuspendedworkspacescronpattern.cleanSuspendedWorkspaceCronPattern
                }
            }
        });
    }
    constructor(messageQueueService){
        super(), this.messageQueueService = messageQueueService;
    }
};
CleanSuspendedWorkspacesCronCommand = _ts_decorate([
    (0, _nestcommander.Command)({
        name: 'cron:clean-suspended-workspaces',
        description: 'Starts a cron job to clean suspended workspaces'
    }),
    _ts_param(0, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.cronQueue)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService
    ])
], CleanSuspendedWorkspacesCronCommand);

//# sourceMappingURL=clean-suspended-workspaces.cron.command.js.map