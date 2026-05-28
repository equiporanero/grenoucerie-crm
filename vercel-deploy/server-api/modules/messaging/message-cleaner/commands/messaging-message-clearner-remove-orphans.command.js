"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagingMessageCleanerRemoveOrphansCommand", {
    enumerable: true,
    get: function() {
        return MessagingMessageCleanerRemoveOrphansCommand;
    }
});
const _nestcommander = require("nest-commander");
const _activeorsuspendedworkspacecommandrunner = require("../../../../database/commands/command-runners/active-or-suspended-workspace.command-runner");
const _workspaceiteratorservice = require("../../../../database/commands/command-runners/workspace-iterator.service");
const _messagingmessagecleanerservice = require("../services/messaging-message-cleaner.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let MessagingMessageCleanerRemoveOrphansCommand = class MessagingMessageCleanerRemoveOrphansCommand extends _activeorsuspendedworkspacecommandrunner.ActiveOrSuspendedWorkspaceCommandRunner {
    async runOnWorkspace({ workspaceId }) {
        try {
            await this.messagingMessageCleanerService.cleanOrphanMessagesAndThreads(workspaceId);
        } catch (error) {
            this.logger.error('Error while deleting workflowRun', error);
        }
    }
    constructor(workspaceIteratorService, messagingMessageCleanerService){
        super(workspaceIteratorService), this.workspaceIteratorService = workspaceIteratorService, this.messagingMessageCleanerService = messagingMessageCleanerService;
    }
};
MessagingMessageCleanerRemoveOrphansCommand = _ts_decorate([
    (0, _nestcommander.Command)({
        name: 'messaging:message-cleaner-remove-orphans',
        description: 'Remove orphan message and threads from messaging'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceiteratorservice.WorkspaceIteratorService === "undefined" ? Object : _workspaceiteratorservice.WorkspaceIteratorService,
        typeof _messagingmessagecleanerservice.MessagingMessageCleanerService === "undefined" ? Object : _messagingmessagecleanerservice.MessagingMessageCleanerService
    ])
], MessagingMessageCleanerRemoveOrphansCommand);

//# sourceMappingURL=messaging-message-clearner-remove-orphans.command.js.map