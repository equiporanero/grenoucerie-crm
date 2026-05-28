"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowRunnerModule", {
    enumerable: true,
    get: function() {
        return WorkflowRunnerModule;
    }
});
const _common = require("@nestjs/common");
const _billingmodule = require("../../../engine/core-modules/billing/billing.module");
const _metricsmodule = require("../../../engine/core-modules/metrics/metrics.module");
const _workflowcommonmodule = require("../common/workflow-common.module");
const _codestepbuildmodule = require("../workflow-builder/workflow-version-step/code-step/code-step-build.module");
const _workflowversionstepmodule = require("../workflow-builder/workflow-version-step/workflow-version-step.module");
const _workflowexecutormodule = require("../workflow-executor/workflow-executor.module");
const _runworkflowjob = require("./jobs/run-workflow.job");
const _workflowrunqueuemodule = require("./workflow-run-queue/workflow-run-queue.module");
const _workflowrunmodule = require("./workflow-run/workflow-run.module");
const _workflowrunnerworkspaceservice = require("./workspace-services/workflow-runner.workspace-service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WorkflowRunnerModule = class WorkflowRunnerModule {
};
WorkflowRunnerModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _workflowcommonmodule.WorkflowCommonModule,
            _workflowexecutormodule.WorkflowExecutorModule,
            _billingmodule.BillingModule,
            _workflowrunmodule.WorkflowRunModule,
            _metricsmodule.MetricsModule,
            _workflowrunqueuemodule.WorkflowRunQueueModule,
            _workflowversionstepmodule.WorkflowVersionStepModule,
            _codestepbuildmodule.CodeStepBuildModule
        ],
        providers: [
            _workflowrunnerworkspaceservice.WorkflowRunnerWorkspaceService,
            _runworkflowjob.RunWorkflowJob
        ],
        exports: [
            _workflowrunnerworkspaceservice.WorkflowRunnerWorkspaceService
        ]
    })
], WorkflowRunnerModule);

//# sourceMappingURL=workflow-runner.module.js.map