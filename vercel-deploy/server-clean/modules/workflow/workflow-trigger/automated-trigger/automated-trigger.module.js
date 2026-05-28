"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AutomatedTriggerModule", {
    enumerable: true,
    get: function() {
        return AutomatedTriggerModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _cachestoragemodule = require("../../../../engine/core-modules/cache-storage/cache-storage.module");
const _workspaceentity = require("../../../../engine/core-modules/workspace/workspace.entity");
const _workspacedatasourcemodule = require("../../../../engine/workspace-datasource/workspace-datasource.module");
const _workflowcommonmodule = require("../../common/workflow-common.module");
const _automatedtriggerworkspaceservice = require("./automated-trigger.workspace-service");
const _workflowcrontriggercroncommand = require("./crons/commands/workflow-cron-trigger.cron.command");
const _workflowcrontriggercronjob = require("./crons/jobs/workflow-cron-trigger-cron.job");
const _workflowdatabaseeventtriggerlistener = require("./listeners/workflow-database-event-trigger.listener");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AutomatedTriggerModule = class AutomatedTriggerModule {
};
AutomatedTriggerModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _workspaceentity.WorkspaceEntity
            ]),
            _cachestoragemodule.CacheStorageModule,
            _workflowcommonmodule.WorkflowCommonModule,
            _workspacedatasourcemodule.WorkspaceDataSourceModule
        ],
        providers: [
            _automatedtriggerworkspaceservice.AutomatedTriggerWorkspaceService,
            _workflowdatabaseeventtriggerlistener.WorkflowDatabaseEventTriggerListener,
            _workflowcrontriggercronjob.WorkflowCronTriggerCronJob,
            _workflowcrontriggercroncommand.WorkflowCronTriggerCronCommand
        ],
        exports: [
            _automatedtriggerworkspaceservice.AutomatedTriggerWorkspaceService,
            _workflowcrontriggercroncommand.WorkflowCronTriggerCronCommand
        ]
    })
], AutomatedTriggerModule);

//# sourceMappingURL=automated-trigger.module.js.map