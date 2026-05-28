/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingWorkspaceMemberListener", {
    enumerable: true,
    get: function() {
        return BillingWorkspaceMemberListener;
    }
});
const _common = require("@nestjs/common");
const _ondatabasebatcheventdecorator = require("../../../api/graphql/graphql-query-runner/decorators/on-database-batch-event.decorator");
const _databaseeventaction = require("../../../api/graphql/graphql-query-runner/enums/database-event-action");
const _updatesubscriptionquantityjob = require("../jobs/update-subscription-quantity.job");
const _messagequeuedecorator = require("../../message-queue/decorators/message-queue.decorator");
const _messagequeueconstants = require("../../message-queue/message-queue.constants");
const _messagequeueservice = require("../../message-queue/services/message-queue.service");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
const _workspaceeventbatchtype = require("../../../workspace-event-emitter/types/workspace-event-batch.type");
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
let BillingWorkspaceMemberListener = class BillingWorkspaceMemberListener {
    async handleCreateOrDeleteEvent(payload) {
        if (!this.twentyConfigService.get('IS_BILLING_ENABLED')) {
            return;
        }
        await this.messageQueueService.add(_updatesubscriptionquantityjob.UpdateSubscriptionQuantityJob.name, {
            workspaceId: payload.workspaceId
        });
    }
    constructor(messageQueueService, twentyConfigService){
        this.messageQueueService = messageQueueService;
        this.twentyConfigService = twentyConfigService;
    }
};
_ts_decorate([
    (0, _ondatabasebatcheventdecorator.OnDatabaseBatchEvent)('workspaceMember', _databaseeventaction.DatabaseEventAction.CREATED),
    (0, _ondatabasebatcheventdecorator.OnDatabaseBatchEvent)('workspaceMember', _databaseeventaction.DatabaseEventAction.DELETED),
    (0, _ondatabasebatcheventdecorator.OnDatabaseBatchEvent)('workspaceMember', _databaseeventaction.DatabaseEventAction.DESTROYED),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceeventbatchtype.WorkspaceEventBatch === "undefined" ? Object : _workspaceeventbatchtype.WorkspaceEventBatch
    ]),
    _ts_metadata("design:returntype", Promise)
], BillingWorkspaceMemberListener.prototype, "handleCreateOrDeleteEvent", null);
BillingWorkspaceMemberListener = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.billingQueue)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], BillingWorkspaceMemberListener);

//# sourceMappingURL=billing-workspace-member.listener.js.map