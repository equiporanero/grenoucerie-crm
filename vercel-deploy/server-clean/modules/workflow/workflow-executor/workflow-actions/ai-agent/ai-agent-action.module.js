"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AiAgentActionModule", {
    enumerable: true,
    get: function() {
        return AiAgentActionModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _applicationmodule = require("../../../../../engine/core-modules/application/application.module");
const _userworkspacemodule = require("../../../../../engine/core-modules/user-workspace/user-workspace.module");
const _aiagentexecutionmodule = require("../../../../../engine/metadata-modules/ai/ai-agent-execution/ai-agent-execution.module");
const _agententity = require("../../../../../engine/metadata-modules/ai/ai-agent/entities/agent.entity");
const _rolemodule = require("../../../../../engine/metadata-modules/role/role.module");
const _provideworkspacescopedrepository = require("../../../../../engine/twenty-orm/workspace-scoped-repository/provide-workspace-scoped-repository");
const _userrolemodule = require("../../../../../engine/metadata-modules/user-role/user-role.module");
const _workflowexecutioncontextservice = require("../../services/workflow-execution-context.service");
const _workflowrunmodule = require("../../../workflow-runner/workflow-run/workflow-run.module");
const _aiagentworkflowaction = require("./ai-agent.workflow-action");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AiAgentActionModule = class AiAgentActionModule {
};
AiAgentActionModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _applicationmodule.ApplicationModule,
            _aiagentexecutionmodule.AiAgentExecutionModule,
            _typeorm.TypeOrmModule.forFeature([
                _agententity.AgentEntity
            ]),
            _workflowrunmodule.WorkflowRunModule,
            _userworkspacemodule.UserWorkspaceModule,
            _userrolemodule.UserRoleModule,
            _rolemodule.RoleModule
        ],
        providers: [
            _workflowexecutioncontextservice.WorkflowExecutionContextService,
            _aiagentworkflowaction.AiAgentWorkflowAction,
            (0, _provideworkspacescopedrepository.provideWorkspaceScopedRepository)(_agententity.AgentEntity)
        ],
        exports: [
            _aiagentworkflowaction.AiAgentWorkflowAction
        ]
    })
], AiAgentActionModule);

//# sourceMappingURL=ai-agent-action.module.js.map