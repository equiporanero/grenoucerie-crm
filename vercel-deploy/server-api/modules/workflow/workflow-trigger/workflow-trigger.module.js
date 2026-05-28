"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowTriggerModule", {
    enumerable: true,
    get: function() {
        return WorkflowTriggerModule;
    }
});
const _common = require("@nestjs/common");
const _nestjsquerytypeorm = require("@ptc-org/nestjs-query-typeorm");
const _cachestoragemodule = require("../../../engine/core-modules/cache-storage/cache-storage.module");
const _featureflagmodule = require("../../../engine/core-modules/feature-flag/feature-flag.module");
const _commandmenuitemmodule = require("../../../engine/metadata-modules/command-menu-item/command-menu-item.module");
const _logicfunctionmodule = require("../../../engine/metadata-modules/logic-function/logic-function.module");
const _objectmetadataentity = require("../../../engine/metadata-modules/object-metadata/object-metadata.entity");
const _workflowcommonmodule = require("../common/workflow-common.module");
const _codestepbuildmodule = require("../workflow-builder/workflow-version-step/code-step/code-step-build.module");
const _workflowrunnermodule = require("../workflow-runner/workflow-runner.module");
const _automatedtriggermodule = require("./automated-trigger/automated-trigger.module");
const _workflowtriggerjob = require("./jobs/workflow-trigger.job");
const _workflowtriggerworkspaceservice = require("./workspace-services/workflow-trigger.workspace-service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WorkflowTriggerModule = class WorkflowTriggerModule {
};
WorkflowTriggerModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _workflowcommonmodule.WorkflowCommonModule,
            _codestepbuildmodule.CodeStepBuildModule,
            _workflowrunnermodule.WorkflowRunnerModule,
            _automatedtriggermodule.AutomatedTriggerModule,
            _cachestoragemodule.CacheStorageModule,
            _commandmenuitemmodule.CommandMenuItemModule,
            _featureflagmodule.FeatureFlagModule,
            _nestjsquerytypeorm.NestjsQueryTypeOrmModule.forFeature([
                _objectmetadataentity.ObjectMetadataEntity
            ]),
            _logicfunctionmodule.LogicFunctionModule
        ],
        providers: [
            _workflowtriggerworkspaceservice.WorkflowTriggerWorkspaceService,
            _workflowtriggerjob.WorkflowTriggerJob
        ],
        exports: [
            _workflowtriggerworkspaceservice.WorkflowTriggerWorkspaceService
        ]
    })
], WorkflowTriggerModule);

//# sourceMappingURL=workflow-trigger.module.js.map