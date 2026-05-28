"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowRunModule", {
    enumerable: true,
    get: function() {
        return WorkflowRunModule;
    }
});
const _common = require("@nestjs/common");
const _nestjsquerytypeorm = require("@ptc-org/nestjs-query-typeorm");
const _workspaceiteratormodule = require("../../../../database/commands/command-runners/workspace-iterator.module");
const _cachelockmodule = require("../../../../engine/core-modules/cache-lock/cache-lock.module");
const _metricsmodule = require("../../../../engine/core-modules/metrics/metrics.module");
const _recordpositionmodule = require("../../../../engine/core-modules/record-position/record-position.module");
const _workspaceentity = require("../../../../engine/core-modules/workspace/workspace.entity");
const _objectmetadataentity = require("../../../../engine/metadata-modules/object-metadata/object-metadata.entity");
const _workflowcommonmodule = require("../../common/workflow-common.module");
const _deleteworkflowrunscommand = require("./command/delete-workflow-runs.command");
const _workflowrunworkspaceservice = require("./workflow-run.workspace-service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WorkflowRunModule = class WorkflowRunModule {
};
WorkflowRunModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _workflowcommonmodule.WorkflowCommonModule,
            _nestjsquerytypeorm.NestjsQueryTypeOrmModule.forFeature([
                _objectmetadataentity.ObjectMetadataEntity,
                _workspaceentity.WorkspaceEntity
            ]),
            _recordpositionmodule.RecordPositionModule,
            _cachelockmodule.CacheLockModule,
            _metricsmodule.MetricsModule,
            _workspaceiteratormodule.WorkspaceIteratorModule
        ],
        providers: [
            _workflowrunworkspaceservice.WorkflowRunWorkspaceService,
            _deleteworkflowrunscommand.DeleteWorkflowRunsCommand
        ],
        exports: [
            _workflowrunworkspaceservice.WorkflowRunWorkspaceService,
            _deleteworkflowrunscommand.DeleteWorkflowRunsCommand
        ]
    })
], WorkflowRunModule);

//# sourceMappingURL=workflow-run.module.js.map