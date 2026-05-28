"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowApiModule", {
    enumerable: true,
    get: function() {
        return WorkflowApiModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _toolmodule = require("../tool/tool.module");
const _workflowtriggercontroller = require("./controllers/workflow-trigger.controller");
const _workflowbuilderresolver = require("./resolvers/workflow-builder.resolver");
const _workflowtriggerresolver = require("./resolvers/workflow-trigger.resolver");
const _workflowversionedgeresolver = require("./resolvers/workflow-version-edge.resolver");
const _workflowversionstepresolver = require("./resolvers/workflow-version-step.resolver");
const _workflowversionresolver = require("./resolvers/workflow-version.resolver");
const _workspaceentity = require("../workspace/workspace.entity");
const _connectedaccountmetadatamodule = require("../../metadata-modules/connected-account/connected-account-metadata.module");
const _workspacemanyorallflatentitymapscachemodule = require("../../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _logicfunctionmodule = require("../../metadata-modules/logic-function/logic-function.module");
const _permissionsmodule = require("../../metadata-modules/permissions/permissions.module");
const _workflowcommonmodule = require("../../../modules/workflow/common/workflow-common.module");
const _workflowbuildermodule = require("../../../modules/workflow/workflow-builder/workflow-builder.module");
const _codestepbuildmodule = require("../../../modules/workflow/workflow-builder/workflow-version-step/code-step/code-step-build.module");
const _workflowversionmodule = require("../../../modules/workflow/workflow-builder/workflow-version/workflow-version.module");
const _workflowrunmodule = require("../../../modules/workflow/workflow-runner/workflow-run/workflow-run.module");
const _workflowrunnermodule = require("../../../modules/workflow/workflow-runner/workflow-runner.module");
const _workflowtriggermodule = require("../../../modules/workflow/workflow-trigger/workflow-trigger.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WorkflowApiModule = class WorkflowApiModule {
};
WorkflowApiModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _workspaceentity.WorkspaceEntity
            ]),
            _workflowtriggermodule.WorkflowTriggerModule,
            _workflowbuildermodule.WorkflowBuilderModule,
            _workflowcommonmodule.WorkflowCommonModule,
            _workflowversionmodule.WorkflowVersionModule,
            _workflowrunmodule.WorkflowRunModule,
            _workflowrunnermodule.WorkflowRunnerModule,
            _permissionsmodule.PermissionsModule,
            _toolmodule.ToolModule,
            _logicfunctionmodule.LogicFunctionModule,
            _codestepbuildmodule.CodeStepBuildModule,
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule,
            _connectedaccountmetadatamodule.ConnectedAccountMetadataModule
        ],
        controllers: [
            _workflowtriggercontroller.WorkflowTriggerController
        ],
        providers: [
            _workflowtriggerresolver.WorkflowTriggerResolver,
            _workflowbuilderresolver.WorkflowBuilderResolver,
            _workflowversionstepresolver.WorkflowVersionStepResolver,
            _workflowversionedgeresolver.WorkflowVersionEdgeResolver,
            _workflowversionresolver.WorkflowVersionResolver
        ]
    })
], WorkflowApiModule);

//# sourceMappingURL=workflow-api.module.js.map