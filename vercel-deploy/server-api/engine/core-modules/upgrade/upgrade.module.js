"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpgradeModule", {
    enumerable: true,
    get: function() {
        return UpgradeModule;
    }
});
const _common = require("@nestjs/common");
const _core = require("@nestjs/core");
const _typeorm = require("@nestjs/typeorm");
const _workspaceiteratormodule = require("../../../database/commands/command-runners/workspace-iterator.module");
const _instancecommandprovidermodule = require("../../../database/commands/upgrade-version-command/instance-command-provider.module");
const _workspacecommandprovidermodule = require("../../../database/commands/upgrade-version-command/workspace-command-provider.module");
const _coreentitycachemodule = require("../../core-entity-cache/core-entity-cache.module");
const _metricsmodule = require("../metrics/metrics.module");
const _instancecommandrunnerservice = require("./services/instance-command-runner.service");
const _upgradecommandregistryservice = require("./services/upgrade-command-registry.service");
const _upgrademigrationservice = require("./services/upgrade-migration.service");
const _upgradesequencereaderservice = require("./services/upgrade-sequence-reader.service");
const _upgradesequencerunnerservice = require("./services/upgrade-sequence-runner.service");
const _upgradestatuscacheservice = require("./services/upgrade-status-cache.service");
const _upgradestatusservice = require("./services/upgrade-status.service");
const _workspacecommandrunnerservice = require("./services/workspace-command-runner.service");
const _upgradegaugeservice = require("./upgrade-gauge.service");
const _upgrademigrationentity = require("./upgrade-migration.entity");
const _workspaceentity = require("../workspace/workspace.entity");
const _upgradeawareentitymetadataadapter = require("../../twenty-orm/upgrade-aware/upgrade-aware-entity-metadata.adapter");
const _workspaceversionmodule = require("../../workspace-manager/workspace-version/workspace-version.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let UpgradeModule = class UpgradeModule {
};
UpgradeModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _coreentitycachemodule.CoreEntityCacheModule,
            _core.DiscoveryModule,
            _instancecommandprovidermodule.InstanceCommandProviderModule,
            _metricsmodule.MetricsModule,
            _workspacecommandprovidermodule.WorkspaceCommandProviderModule,
            _workspaceiteratormodule.WorkspaceIteratorModule,
            _workspaceversionmodule.WorkspaceVersionModule,
            _typeorm.TypeOrmModule.forFeature([
                _upgrademigrationentity.UpgradeMigrationEntity,
                _workspaceentity.WorkspaceEntity
            ])
        ],
        providers: [
            _upgrademigrationservice.UpgradeMigrationService,
            _instancecommandrunnerservice.InstanceCommandRunnerService,
            _workspacecommandrunnerservice.WorkspaceCommandRunnerService,
            _upgradecommandregistryservice.UpgradeCommandRegistryService,
            _upgradeawareentitymetadataadapter.UpgradeAwareEntityMetadataAdapter,
            _upgradesequencereaderservice.UpgradeSequenceReaderService,
            _upgradesequencerunnerservice.UpgradeSequenceRunnerService,
            _upgradestatusservice.UpgradeStatusService,
            _upgradestatuscacheservice.UpgradeStatusCacheService,
            _upgradegaugeservice.UpgradeGaugeService
        ],
        exports: [
            _upgrademigrationservice.UpgradeMigrationService,
            _instancecommandrunnerservice.InstanceCommandRunnerService,
            _workspacecommandrunnerservice.WorkspaceCommandRunnerService,
            _upgradecommandregistryservice.UpgradeCommandRegistryService,
            _upgradeawareentitymetadataadapter.UpgradeAwareEntityMetadataAdapter,
            _upgradesequencereaderservice.UpgradeSequenceReaderService,
            _upgradesequencerunnerservice.UpgradeSequenceRunnerService,
            _upgradestatusservice.UpgradeStatusService,
            _upgradestatuscacheservice.UpgradeStatusCacheService
        ]
    })
], UpgradeModule);

//# sourceMappingURL=upgrade.module.js.map