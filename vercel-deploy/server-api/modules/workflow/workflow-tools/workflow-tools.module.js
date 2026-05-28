"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowToolsModule", {
    enumerable: true,
    get: function() {
        return WorkflowToolsModule;
    }
});
const _common = require("@nestjs/common");
const _recordpositionmodule = require("../../../engine/core-modules/record-position/record-position.module");
const _workflowtoolservicetoken = require("../../../engine/core-modules/tool-provider/constants/workflow-tool-service.token");
const _workspacemanyorallflatentitymapscachemodule = require("../../../engine/metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _logicfunctionmodule = require("../../../engine/metadata-modules/logic-function/logic-function.module");
const _workflowschemamodule = require("../workflow-builder/workflow-schema/workflow-schema.module");
const _workflowversionedgemodule = require("../workflow-builder/workflow-version-edge/workflow-version-edge.module");
const _workflowversionstepmodule = require("../workflow-builder/workflow-version-step/workflow-version-step.module");
const _workflowversionmodule = require("../workflow-builder/workflow-version/workflow-version.module");
const _workflowtriggermodule = require("../workflow-trigger/workflow-trigger.module");
const _workflowtoolworkspaceservice = require("./services/workflow-tool.workspace-service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WorkflowToolsModule = class WorkflowToolsModule {
};
WorkflowToolsModule = _ts_decorate([
    (0, _common.Global)(),
    (0, _common.Module)({
        imports: [
            _workflowversionstepmodule.WorkflowVersionStepModule,
            _workflowversionedgemodule.WorkflowVersionEdgeModule,
            _workflowversionmodule.WorkflowVersionModule,
            _workflowtriggermodule.WorkflowTriggerModule,
            _workflowschemamodule.WorkflowSchemaModule,
            _recordpositionmodule.RecordPositionModule,
            _logicfunctionmodule.LogicFunctionModule,
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule
        ],
        providers: [
            _workflowtoolworkspaceservice.WorkflowToolWorkspaceService,
            {
                provide: _workflowtoolservicetoken.WORKFLOW_TOOL_SERVICE_TOKEN,
                useExisting: _workflowtoolworkspaceservice.WorkflowToolWorkspaceService
            }
        ],
        exports: [
            _workflowtoolworkspaceservice.WorkflowToolWorkspaceService,
            _workflowtoolservicetoken.WORKFLOW_TOOL_SERVICE_TOKEN
        ]
    })
], WorkflowToolsModule);

//# sourceMappingURL=workflow-tools.module.js.map