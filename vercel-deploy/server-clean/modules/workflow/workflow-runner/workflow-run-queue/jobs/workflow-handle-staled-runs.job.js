"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowHandleStaledRunsJob", {
    enumerable: true,
    get: function() {
        return WorkflowHandleStaledRunsJob;
    }
});
const _common = require("@nestjs/common");
const _processdecorator = require("../../../../../engine/core-modules/message-queue/decorators/process.decorator");
const _processordecorator = require("../../../../../engine/core-modules/message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../../../engine/core-modules/message-queue/message-queue.constants");
const _workflowhandlestaledrunsworkspaceservice = require("../workspace-services/workflow-handle-staled-runs.workspace-service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkflowHandleStaledRunsJob = class WorkflowHandleStaledRunsJob {
    async handle({ workspaceId }) {
        await this.workflowHandleStaledRunsWorkspaceService.handleStaledRunsForWorkspace(workspaceId);
    }
    constructor(workflowHandleStaledRunsWorkspaceService){
        this.workflowHandleStaledRunsWorkspaceService = workflowHandleStaledRunsWorkspaceService;
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(WorkflowHandleStaledRunsJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof WorkflowHandleStaledRunsJobData === "undefined" ? Object : WorkflowHandleStaledRunsJobData
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkflowHandleStaledRunsJob.prototype, "handle", null);
WorkflowHandleStaledRunsJob = _ts_decorate([
    (0, _processordecorator.Processor)({
        queueName: _messagequeueconstants.MessageQueue.workflowQueue,
        scope: _common.Scope.REQUEST
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workflowhandlestaledrunsworkspaceservice.WorkflowHandleStaledRunsWorkspaceService === "undefined" ? Object : _workflowhandlestaledrunsworkspaceservice.WorkflowHandleStaledRunsWorkspaceService
    ])
], WorkflowHandleStaledRunsJob);

//# sourceMappingURL=workflow-handle-staled-runs.job.js.map