"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceCommandRunnerService", {
    enumerable: true,
    get: function() {
        return WorkspaceCommandRunnerService;
    }
});
const _common = require("@nestjs/common");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
const _upgrademigrationservice = require("./upgrade-migration.service");
const _upgradestatusservice = require("./upgrade-status.service");
const _formatupgradelogutil = require("../utils/format-upgrade-log.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceCommandRunnerService = class WorkspaceCommandRunnerService {
    async runWorkspaceCommands({ iteratorContext, options, workspaceCommands }) {
        const { workspaceId, index, total } = iteratorContext;
        const dryRunPrefix = options.dryRun ? '(dry run) ' : '';
        this.logger.log((0, _formatupgradelogutil.formatUpgradeLog)({
            humanMessage: `${dryRunPrefix}Upgrading workspace ${workspaceId} ${index + 1}/${total}`,
            event: 'workspace.start',
            logFields: {
                workspaceId,
                index: index + 1,
                total,
                dryRun: options.dryRun ?? false
            }
        }));
        const executedByVersion = this.twentyConfigService.get('APP_VERSION') ?? 'unknown';
        try {
            for (const workspaceCommandEntry of workspaceCommands){
                await this.runSingleWorkspaceCommandOrThrow({
                    workspaceCommandEntry,
                    workspaceId,
                    executedByVersion,
                    options,
                    iteratorContext
                });
            }
            this.logger.log((0, _formatupgradelogutil.formatUpgradeLog)({
                humanMessage: `Upgrade for workspace ${workspaceId} completed.`,
                event: 'workspace.success',
                logFields: {
                    workspaceId,
                    executedByVersion,
                    dryRun: options.dryRun ?? false
                }
            }));
        } finally{
            if (!options.dryRun) {
                await this.safeInvalidateWorkspace(workspaceId);
            }
        }
    }
    async safeInvalidateWorkspace(workspaceId) {
        try {
            await this.upgradeStatusService.invalidateInstanceAndAllWorkspacesStatus();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            this.logger.warn((0, _formatupgradelogutil.formatUpgradeLog)({
                humanMessage: `Failed to invalidate upgrade-status cache (triggered by workspace ${workspaceId}): ${errorMessage}`,
                event: 'cache.invalidate.failed',
                logFields: {
                    scope: 'instance-and-all-workspaces',
                    triggeredByWorkspaceId: workspaceId
                }
            }));
        }
    }
    async runSingleWorkspaceCommandOrThrow({ workspaceCommandEntry, workspaceId, executedByVersion, options, iteratorContext }) {
        const { name, command: workspaceCommand } = workspaceCommandEntry;
        try {
            await workspaceCommand.runOnWorkspace({
                options,
                workspaceId,
                dataSource: iteratorContext.dataSource,
                index: iteratorContext.index,
                total: iteratorContext.total
            });
            if (!options.dryRun) {
                await this.upgradeMigrationService.recordUpgradeMigration({
                    name,
                    workspaceIds: [
                        workspaceId
                    ],
                    isInstance: false,
                    status: 'completed',
                    executedByVersion
                });
            }
        } catch (error) {
            if (!options.dryRun) {
                await this.upgradeMigrationService.recordUpgradeMigration({
                    name,
                    workspaceIds: [
                        workspaceId
                    ],
                    isInstance: false,
                    status: 'failed',
                    executedByVersion,
                    error
                });
            }
            throw error;
        }
    }
    constructor(twentyConfigService, upgradeMigrationService, upgradeStatusService){
        this.twentyConfigService = twentyConfigService;
        this.upgradeMigrationService = upgradeMigrationService;
        this.upgradeStatusService = upgradeStatusService;
        this.logger = new _common.Logger(WorkspaceCommandRunnerService.name);
    }
};
WorkspaceCommandRunnerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _upgrademigrationservice.UpgradeMigrationService === "undefined" ? Object : _upgrademigrationservice.UpgradeMigrationService,
        typeof _upgradestatusservice.UpgradeStatusService === "undefined" ? Object : _upgradestatusservice.UpgradeStatusService
    ])
], WorkspaceCommandRunnerService);

//# sourceMappingURL=workspace-command-runner.service.js.map