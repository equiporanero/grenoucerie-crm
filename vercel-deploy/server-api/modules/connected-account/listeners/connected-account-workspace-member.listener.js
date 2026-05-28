"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ConnectedAccountWorkspaceMemberListener", {
    enumerable: true,
    get: function() {
        return ConnectedAccountWorkspaceMemberListener;
    }
});
const _common = require("@nestjs/common");
const _ondatabasebatcheventdecorator = require("../../../engine/api/graphql/graphql-query-runner/decorators/on-database-batch-event.decorator");
const _databaseeventaction = require("../../../engine/api/graphql/graphql-query-runner/enums/database-event-action");
const _messagequeuedecorator = require("../../../engine/core-modules/message-queue/decorators/message-queue.decorator");
const _messagequeueconstants = require("../../../engine/core-modules/message-queue/message-queue.constants");
const _messagequeueservice = require("../../../engine/core-modules/message-queue/services/message-queue.service");
const _workspaceeventbatchtype = require("../../../engine/workspace-event-emitter/types/workspace-event-batch.type");
const _deleteworkspacememberconnectedaccountsjob = require("../jobs/delete-workspace-member-connected-accounts.job");
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
let ConnectedAccountWorkspaceMemberListener = class ConnectedAccountWorkspaceMemberListener {
    async handleWorkspaceMemberRemovalEvent(payload) {
        await Promise.all(payload.events.map((eventPayload)=>this.messageQueueService.add(_deleteworkspacememberconnectedaccountsjob.DeleteWorkspaceMemberConnectedAccountsCleanupJob.name, {
                workspaceId: payload.workspaceId,
                workspaceMemberId: eventPayload.recordId
            })));
    }
    constructor(messageQueueService){
        this.messageQueueService = messageQueueService;
    }
};
_ts_decorate([
    (0, _ondatabasebatcheventdecorator.OnDatabaseBatchEvent)('workspaceMember', _databaseeventaction.DatabaseEventAction.DESTROYED),
    (0, _ondatabasebatcheventdecorator.OnDatabaseBatchEvent)('workspaceMember', _databaseeventaction.DatabaseEventAction.DELETED),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceeventbatchtype.WorkspaceEventBatch === "undefined" ? Object : _workspaceeventbatchtype.WorkspaceEventBatch
    ]),
    _ts_metadata("design:returntype", Promise)
], ConnectedAccountWorkspaceMemberListener.prototype, "handleWorkspaceMemberRemovalEvent", null);
ConnectedAccountWorkspaceMemberListener = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.deleteCascadeQueue)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService
    ])
], ConnectedAccountWorkspaceMemberListener);

//# sourceMappingURL=connected-account-workspace-member.listener.js.map