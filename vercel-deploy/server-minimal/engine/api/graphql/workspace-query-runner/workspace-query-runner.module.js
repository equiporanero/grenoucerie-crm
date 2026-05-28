"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceQueryRunnerModule", {
    enumerable: true,
    get: function() {
        return WorkspaceQueryRunnerModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _telemetrylistener = require("./listeners/telemetry.listener");
const _workspacequeryhookmodule = require("./workspace-query-hook/workspace-query-hook.module");
const _auditmodule = require("../../../core-modules/audit/audit.module");
const _featureflagentity = require("../../../core-modules/feature-flag/feature-flag.entity");
const _filemodule = require("../../../core-modules/file/file.module");
const _recordpositionmodule = require("../../../core-modules/record-position/record-position.module");
const _recordtransformermodule = require("../../../core-modules/record-transformer/record-transformer.module");
const _telemetrymodule = require("../../../core-modules/telemetry/telemetry.module");
const _subscriptionsmodule = require("../../../subscriptions/subscriptions.module");
const _workspacedatasourcemodule = require("../../../workspace-datasource/workspace-datasource.module");
const _entityeventstodblistener = require("./listeners/entity-events-to-db.listener");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WorkspaceQueryRunnerModule = class WorkspaceQueryRunnerModule {
};
WorkspaceQueryRunnerModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _workspacedatasourcemodule.WorkspaceDataSourceModule,
            _workspacequeryhookmodule.WorkspaceQueryHookModule,
            _typeorm.TypeOrmModule.forFeature([
                _featureflagentity.FeatureFlagEntity
            ]),
            _auditmodule.AuditModule,
            _telemetrymodule.TelemetryModule,
            _filemodule.FileModule,
            _recordtransformermodule.RecordTransformerModule,
            _recordpositionmodule.RecordPositionModule,
            _subscriptionsmodule.SubscriptionsModule
        ],
        providers: [
            _entityeventstodblistener.EntityEventsToDbListener,
            _telemetrylistener.TelemetryListener
        ]
    })
], WorkspaceQueryRunnerModule);

//# sourceMappingURL=workspace-query-runner.module.js.map