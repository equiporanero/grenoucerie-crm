"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowRunEnqueueJob", {
    enumerable: true,
    get: function() {
        return WorkflowRunEnqueueJob;
    }
});
const _common = require("@nestjs/common");
const _processdecorator = require("../../../../../engine/core-modules/message-queue/decorators/process.decorator");
const _processordecorator = require("../../../../../engine/core-modules/message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../../../engine/core-modules/message-queue/message-queue.constants");
const _workflowrunenqueueworkspaceservice = require("../workspace-services/workflow-run-enqueue.workspace-service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkflowRunEnqueueJob = class WorkflowRunEnqueueJob {
    async handle({ workspaceId, isCacheMode }) {
        await this.WorkflowRunEnqueueWorkspaceService.enqueueRunsForWorkspace({
            workspaceId,
            isCacheMode
        });
    }
    constructor(WorkflowRunEnqueueWorkspaceService){
        this.WorkflowRunEnqueueWorkspaceService = WorkflowRunEnqueueWorkspaceService;
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(WorkflowRunEnqueueJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof WorkflowRunEnqueueJobData === "undefined" ? Object : WorkflowRunEnqueueJobData
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkflowRunEnqueueJob.prototype, "handle", null);
WorkflowRunEnqueueJob = _ts_decorate([
    (0, _processordecorator.Processor)({
        queueName: _messagequeueconstants.MessageQueue.workflowQueue,
        scope: _common.Scope.REQUEST
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workflowrunenqueueworkspaceservice.WorkflowRunEnqueueWorkspaceService === "undefined" ? Object : _workflowrunenqueueworkspaceservice.WorkflowRunEnqueueWorkspaceService
    ])
], WorkflowRunEnqueueJob);

//# sourceMappingURL=workflow-run-enqueue.job.js.map