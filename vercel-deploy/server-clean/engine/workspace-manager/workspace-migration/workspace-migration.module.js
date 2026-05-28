"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMigrationModule", {
    enumerable: true,
    get: function() {
        return WorkspaceMigrationModule;
    }
});
const _common = require("@nestjs/common");
const _workspacecachemodule = require("../../workspace-cache/workspace-cache.module");
const _workspacemigrationbuildorchestratorservice = require("./services/workspace-migration-build-orchestrator.service");
const _workspacemigrationvalidatebuildandrunservice = require("./services/workspace-migration-validate-build-and-run-service");
const _workspacemigrationbuildermodule = require("./workspace-migration-builder/workspace-migration-builder.module");
const _workspacemigrationrunnermodule = require("./workspace-migration-runner/workspace-migration-runner.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WorkspaceMigrationModule = class WorkspaceMigrationModule {
};
WorkspaceMigrationModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _workspacemigrationbuildermodule.WorkspaceMigrationBuilderModule,
            _workspacemigrationrunnermodule.WorkspaceMigrationRunnerModule,
            _workspacecachemodule.WorkspaceCacheModule
        ],
        providers: [
            _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
            _workspacemigrationbuildorchestratorservice.WorkspaceMigrationBuildOrchestratorService
        ],
        exports: [
            _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
            _workspacemigrationbuildorchestratorservice.WorkspaceMigrationBuildOrchestratorService
        ]
    })
], WorkspaceMigrationModule);

//# sourceMappingURL=workspace-migration.module.js.map