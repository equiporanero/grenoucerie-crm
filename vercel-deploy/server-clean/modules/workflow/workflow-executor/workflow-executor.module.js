"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowExecutorModule", {
    enumerable: true,
    get: function() {
        return WorkflowExecutorModule;
    }
});
const _common = require("@nestjs/common");
const _billingmodule = require("../../../engine/core-modules/billing/billing.module");
const _workspacecachemodule = require("../../../engine/workspace-cache/workspace-cache.module");
const _featureflagmodule = require("../../../engine/core-modules/feature-flag/feature-flag.module");
const _metricsmodule = require("../../../engine/core-modules/metrics/metrics.module");
const _toolmodule = require("../../../engine/core-modules/tool/tool.module");
const _workflowcommonmodule = require("../common/workflow-common.module");
const _workflowactionfactory = require("./factories/workflow-action.factory");
const _aiagentactionmodule = require("./workflow-actions/ai-agent/ai-agent-action.module");
const _codeactionmodule = require("./workflow-actions/code/code-action.module");
const _delayactionmodule = require("./workflow-actions/delay/delay-action.module");
const _emptyactionmodule = require("./workflow-actions/empty/empty-action.module");
const _filteractionmodule = require("./workflow-actions/filter/filter-action.module");
const _formactionmodule = require("./workflow-actions/form/form-action.module");
const _ifelseactionmodule = require("./workflow-actions/if-else/if-else-action.module");
const _iteratoractionmodule = require("./workflow-actions/iterator/iterator-action.module");
const _logicfunctionactionmodule = require("./workflow-actions/logic-function/logic-function-action.module");
const _recordcrudactionmodule = require("./workflow-actions/record-crud/record-crud-action.module");
const _toolexecutorworkflowaction = require("./workflow-actions/tool-executor-workflow-action");
const _workflowexecutorworkspaceservice = require("./workspace-services/workflow-executor.workspace-service");
const _workflowrunmodule = require("../workflow-runner/workflow-run/workflow-run.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WorkflowExecutorModule = class WorkflowExecutorModule {
};
WorkflowExecutorModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _workflowcommonmodule.WorkflowCommonModule,
            _workflowrunmodule.WorkflowRunModule,
            _codeactionmodule.CodeActionModule,
            _logicfunctionactionmodule.LogicFunctionActionModule,
            _delayactionmodule.DelayActionModule,
            _recordcrudactionmodule.RecordCRUDActionModule,
            _formactionmodule.FormActionModule,
            _billingmodule.BillingModule,
            _workspacecachemodule.WorkspaceCacheModule,
            _filteractionmodule.FilterActionModule,
            _ifelseactionmodule.IfElseActionModule,
            _iteratoractionmodule.IteratorActionModule,
            _aiagentactionmodule.AiAgentActionModule,
            _emptyactionmodule.EmptyActionModule,
            _featureflagmodule.FeatureFlagModule,
            _toolmodule.ToolModule,
            _metricsmodule.MetricsModule
        ],
        providers: [
            _workflowexecutorworkspaceservice.WorkflowExecutorWorkspaceService,
            _workflowactionfactory.WorkflowActionFactory,
            _toolexecutorworkflowaction.ToolExecutorWorkflowAction
        ],
        exports: [
            _workflowexecutorworkspaceservice.WorkflowExecutorWorkspaceService
        ]
    })
], WorkflowExecutorModule);

//# sourceMappingURL=workflow-executor.module.js.map