"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DelayActionModule", {
    enumerable: true,
    get: function() {
        return DelayActionModule;
    }
});
const _common = require("@nestjs/common");
const _delayworkflowaction = require("./delay.workflow-action");
const _resumedelayedworkflowjob = require("./jobs/resume-delayed-workflow.job");
const _workflowrunqueuemodule = require("../../../workflow-runner/workflow-run-queue/workflow-run-queue.module");
const _workflowrunmodule = require("../../../workflow-runner/workflow-run/workflow-run.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let DelayActionModule = class DelayActionModule {
};
DelayActionModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _workflowrunmodule.WorkflowRunModule,
            _workflowrunqueuemodule.WorkflowRunQueueModule
        ],
        providers: [
            _delayworkflowaction.DelayWorkflowAction,
            _resumedelayedworkflowjob.ResumeDelayedWorkflowJob
        ],
        exports: [
            _delayworkflowaction.DelayWorkflowAction
        ]
    })
], DelayActionModule);

//# sourceMappingURL=delay-action.module.js.map