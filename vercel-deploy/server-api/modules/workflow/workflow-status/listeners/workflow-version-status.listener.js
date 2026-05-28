"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowVersionStatusListener", {
    enumerable: true,
    get: function() {
        return WorkflowVersionStatusListener;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _messagequeuedecorator = require("../../../../engine/core-modules/message-queue/decorators/message-queue.decorator");
const _messagequeueconstants = require("../../../../engine/core-modules/message-queue/message-queue.constants");
const _messagequeueservice = require("../../../../engine/core-modules/message-queue/services/message-queue.service");
const _workflowversionworkspaceentity = require("../../common/standard-objects/workflow-version.workspace-entity");
const _workflowstatusesupdatejob = require("../jobs/workflow-statuses-update.job");
const _ondatabasebatcheventdecorator = require("../../../../engine/api/graphql/graphql-query-runner/decorators/on-database-batch-event.decorator");
const _databaseeventaction = require("../../../../engine/api/graphql/graphql-query-runner/enums/database-event-action");
const _workflowversionstatusupdatedconstants = require("../constants/workflow-version-status-updated.constants");
const _oncustombatcheventdecorator = require("../../../../engine/api/graphql/graphql-query-runner/decorators/on-custom-batch-event.decorator");
const _customworkspacebatcheventtype = require("../../../../engine/workspace-event-emitter/types/custom-workspace-batch-event.type");
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
let WorkflowVersionStatusListener = class WorkflowVersionStatusListener {
    async handleWorkflowVersionCreated(batchEvent) {
        if (!(0, _utils.isDefined)(batchEvent.workspaceId)) {
            return;
        }
        const workflowIds = batchEvent.events.filter((event)=>!event.properties.after.status || event.properties.after.status === _workflowversionworkspaceentity.WorkflowVersionStatus.DRAFT).map((event)=>event.properties.after.workflowId);
        if (workflowIds.length === 0) {
            return;
        }
        await this.messageQueueService.add(_workflowstatusesupdatejob.WorkflowStatusesUpdateJob.name, {
            type: _workflowstatusesupdatejob.WorkflowVersionEventType.CREATE,
            workspaceId: batchEvent.workspaceId,
            workflowIds
        });
    }
    async handleWorkflowVersionUpdated(batchEvent) {
        if (!(0, _utils.isDefined)(batchEvent.workspaceId)) {
            return;
        }
        await this.messageQueueService.add(_workflowstatusesupdatejob.WorkflowStatusesUpdateJob.name, {
            type: _workflowstatusesupdatejob.WorkflowVersionEventType.STATUS_UPDATE,
            workspaceId: batchEvent.workspaceId,
            statusUpdates: batchEvent.events
        });
    }
    async handleWorkflowVersionDeleted(batchEvent) {
        if (!(0, _utils.isDefined)(batchEvent.workspaceId)) {
            return;
        }
        const workflowIds = batchEvent.events.filter((event)=>event.properties.before.status === _workflowversionworkspaceentity.WorkflowVersionStatus.DRAFT).map((event)=>event.properties.before.workflowId);
        if (workflowIds.length === 0) {
            return;
        }
        await this.messageQueueService.add(_workflowstatusesupdatejob.WorkflowStatusesUpdateJob.name, {
            type: _workflowstatusesupdatejob.WorkflowVersionEventType.DELETE,
            workspaceId: batchEvent.workspaceId,
            workflowIds
        });
    }
    constructor(messageQueueService){
        this.messageQueueService = messageQueueService;
    }
};
_ts_decorate([
    (0, _ondatabasebatcheventdecorator.OnDatabaseBatchEvent)('workflowVersion', _databaseeventaction.DatabaseEventAction.CREATED),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _customworkspacebatcheventtype.CustomWorkspaceEventBatch === "undefined" ? Object : _customworkspacebatcheventtype.CustomWorkspaceEventBatch
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkflowVersionStatusListener.prototype, "handleWorkflowVersionCreated", null);
_ts_decorate([
    (0, _oncustombatcheventdecorator.OnCustomBatchEvent)(_workflowversionstatusupdatedconstants.WORKFLOW_VERSION_STATUS_UPDATED),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _customworkspacebatcheventtype.CustomWorkspaceEventBatch === "undefined" ? Object : _customworkspacebatcheventtype.CustomWorkspaceEventBatch
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkflowVersionStatusListener.prototype, "handleWorkflowVersionUpdated", null);
_ts_decorate([
    (0, _ondatabasebatcheventdecorator.OnDatabaseBatchEvent)('workflowVersion', _databaseeventaction.DatabaseEventAction.DELETED),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _customworkspacebatcheventtype.CustomWorkspaceEventBatch === "undefined" ? Object : _customworkspacebatcheventtype.CustomWorkspaceEventBatch
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkflowVersionStatusListener.prototype, "handleWorkflowVersionDeleted", null);
WorkflowVersionStatusListener = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.workflowQueue)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService
    ])
], WorkflowVersionStatusListener);

//# sourceMappingURL=workflow-version-status.listener.js.map