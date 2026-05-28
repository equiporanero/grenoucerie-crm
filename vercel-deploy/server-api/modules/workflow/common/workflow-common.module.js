"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowCommonModule", {
    enumerable: true,
    get: function() {
        return WorkflowCommonModule;
    }
});
const _common = require("@nestjs/common");
const _commandmenuitemmodule = require("../../../engine/metadata-modules/command-menu-item/command-menu-item.module");
const _featureflagmodule = require("../../../engine/core-modules/feature-flag/feature-flag.module");
const _workspacemanyorallflatentitymapscachemodule = require("../../../engine/metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _logicfunctionmodule = require("../../../engine/metadata-modules/logic-function/logic-function.module");
const _workflowqueryhookmodule = require("./query-hooks/workflow-query-hook.module");
const _workflowcommonworkspaceservice = require("./workspace-services/workflow-common.workspace-service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WorkflowCommonModule = class WorkflowCommonModule {
};
WorkflowCommonModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _workflowqueryhookmodule.WorkflowQueryHookModule,
            _logicfunctionmodule.LogicFunctionModule,
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule,
            _commandmenuitemmodule.CommandMenuItemModule,
            _featureflagmodule.FeatureFlagModule
        ],
        providers: [
            _workflowcommonworkspaceservice.WorkflowCommonWorkspaceService
        ],
        exports: [
            _workflowcommonworkspaceservice.WorkflowCommonWorkspaceService
        ]
    })
], WorkflowCommonModule);

//# sourceMappingURL=workflow-common.module.js.map