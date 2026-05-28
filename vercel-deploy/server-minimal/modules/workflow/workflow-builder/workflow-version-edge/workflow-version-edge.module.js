"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowVersionEdgeModule", {
    enumerable: true,
    get: function() {
        return WorkflowVersionEdgeModule;
    }
});
const _common = require("@nestjs/common");
const _workflowcommonmodule = require("../../common/workflow-common.module");
const _workflowversionedgeworkspaceservice = require("./workflow-version-edge.workspace-service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WorkflowVersionEdgeModule = class WorkflowVersionEdgeModule {
};
WorkflowVersionEdgeModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _workflowcommonmodule.WorkflowCommonModule
        ],
        providers: [
            _workflowversionedgeworkspaceservice.WorkflowVersionEdgeWorkspaceService
        ],
        exports: [
            _workflowversionedgeworkspaceservice.WorkflowVersionEdgeWorkspaceService
        ]
    })
], WorkflowVersionEdgeModule);

//# sourceMappingURL=workflow-version-edge.module.js.map