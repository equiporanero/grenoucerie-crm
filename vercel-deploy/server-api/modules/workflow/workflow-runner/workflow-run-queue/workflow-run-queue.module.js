"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowRunQueueModule", {
    enumerable: true,
    get: function() {
        return WorkflowRunQueueModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _cachestoragemodule = require("../../../../engine/core-modules/cache-storage/cache-storage.module");
const _messagequeuemodule = require("../../../../engine/core-modules/message-queue/message-queue.module");
const _metricsmodule = require("../../../../engine/core-modules/metrics/metrics.module");
const _throttlermodule = require("../../../../engine/core-modules/throttler/throttler.module");
const _workspaceentity = require("../../../../engine/core-modules/workspace/workspace.entity");
const _workspacedatasourcemodule = require("../../../../engine/workspace-datasource/workspace-datasource.module");
const _workflowhandlestaledrunscommand = require("./command/workflow-handle-staled-runs.command");
const _workflowcleanworkflowrunscroncommand = require("./cron/command/workflow-clean-workflow-runs.cron.command");
const _workflowhandlestaledrunscroncommand = require("./cron/command/workflow-handle-staled-runs.cron.command");
const _workflowrunenqueuecroncommand = require("./cron/command/workflow-run-enqueue.cron.command");
const _workflowcleanworkflowrunscronjob = require("./cron/jobs/workflow-clean-workflow-runs.cron.job");
const _workflowhandlestaledrunscronjob = require("./cron/jobs/workflow-handle-staled-runs.cron.job");
const _workflowrunenqueuecronjob = require("./cron/jobs/workflow-run-enqueue.cron.job");
const _workflowcleanworkflowrunsjob = require("./jobs/workflow-clean-workflow-runs.job");
const _workflowhandlestaledrunsjob = require("./jobs/workflow-handle-staled-runs.job");
const _workflowrunenqueuejob = require("./jobs/workflow-run-enqueue.job");
const _workflowhandlestaledrunsworkspaceservice = require("./workspace-services/workflow-handle-staled-runs.workspace-service");
const _workflowrunenqueueworkspaceservice = require("./workspace-services/workflow-run-enqueue.workspace-service");
const _workflowthrottlingworkspaceservice = require("./workspace-services/workflow-throttling.workspace-service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WorkflowRunQueueModule = class WorkflowRunQueueModule {
};
WorkflowRunQueueModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _cachestoragemodule.CacheStorageModule,
            _typeorm.TypeOrmModule.forFeature([
                _workspaceentity.WorkspaceEntity
            ]),
            _messagequeuemodule.MessageQueueModule,
            _workspacedatasourcemodule.WorkspaceDataSourceModule,
            _metricsmodule.MetricsModule,
            _throttlermodule.ThrottlerModule
        ],
        providers: [
            _workflowthrottlingworkspaceservice.WorkflowThrottlingWorkspaceService,
            _workflowrunenqueuecronjob.WorkflowRunEnqueueCronJob,
            _workflowrunenqueuecroncommand.WorkflowRunEnqueueCronCommand,
            _workflowrunenqueueworkspaceservice.WorkflowRunEnqueueWorkspaceService,
            _workflowrunenqueuejob.WorkflowRunEnqueueJob,
            _workflowhandlestaledrunsworkspaceservice.WorkflowHandleStaledRunsWorkspaceService,
            _workflowhandlestaledrunscroncommand.WorkflowHandleStaledRunsCronCommand,
            _workflowhandlestaledrunscommand.WorkflowHandleStaledRunsCommand,
            _workflowhandlestaledrunscronjob.WorkflowHandleStaledRunsCronJob,
            _workflowhandlestaledrunsjob.WorkflowHandleStaledRunsJob,
            _workflowcleanworkflowrunscronjob.WorkflowCleanWorkflowRunsCronJob,
            _workflowcleanworkflowrunsjob.WorkflowCleanWorkflowRunsJob,
            _workflowcleanworkflowrunscroncommand.WorkflowCleanWorkflowRunsCronCommand
        ],
        exports: [
            _workflowthrottlingworkspaceservice.WorkflowThrottlingWorkspaceService,
            _workflowrunenqueuejob.WorkflowRunEnqueueJob,
            _workflowrunenqueuecronjob.WorkflowRunEnqueueCronJob,
            _workflowrunenqueuecroncommand.WorkflowRunEnqueueCronCommand,
            _workflowhandlestaledrunscronjob.WorkflowHandleStaledRunsCronJob,
            _workflowhandlestaledrunscroncommand.WorkflowHandleStaledRunsCronCommand,
            _workflowhandlestaledrunscommand.WorkflowHandleStaledRunsCommand,
            _workflowcleanworkflowrunscronjob.WorkflowCleanWorkflowRunsCronJob,
            _workflowcleanworkflowrunscroncommand.WorkflowCleanWorkflowRunsCronCommand
        ]
    })
], WorkflowRunQueueModule);

//# sourceMappingURL=workflow-run-queue.module.js.map