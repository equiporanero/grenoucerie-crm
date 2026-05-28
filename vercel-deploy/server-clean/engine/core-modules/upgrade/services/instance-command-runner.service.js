"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "InstanceCommandRunnerService", {
    enumerable: true,
    get: function() {
        return InstanceCommandRunnerService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
const _upgrademigrationservice = require("./upgrade-migration.service");
const _upgradestatusservice = require("./upgrade-status.service");
const _workspaceversionservice = require("../../../workspace-manager/workspace-version/services/workspace-version.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let InstanceCommandRunnerService = class InstanceCommandRunnerService {
    async runFastInstanceCommand({ command, name }) {
        const executedByVersion = this.twentyConfigService.get('APP_VERSION') ?? 'unknown';
        const isAlreadyCompleted = await this.upgradeMigrationService.isLastAttemptCompleted({
            name,
            workspaceId: null
        });
        if (isAlreadyCompleted) {
            this.logger.log(`${name} already executed, skipping`);
            return {
                status: 'already-executed'
            };
        }
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
            await command.up(queryRunner);
            const workspaceIds = await this.workspaceVersionService.getActiveOrSuspendedWorkspaceIds({
                queryRunner
            });
            await this.upgradeMigrationService.recordUpgradeMigration({
                name,
                workspaceIds,
                isInstance: true,
                status: 'completed',
                executedByVersion,
                queryRunner
            });
            await queryRunner.commitTransaction();
            this.logger.log(`${name} executed successfully`);
            return {
                status: 'success'
            };
        } catch (error) {
            if (queryRunner.isTransactionActive) {
                await queryRunner.rollbackTransaction();
            }
            const workspaceIds = await this.workspaceVersionService.getActiveOrSuspendedWorkspaceIds();
            await this.upgradeMigrationService.recordUpgradeMigration({
                name,
                workspaceIds,
                isInstance: true,
                status: 'failed',
                executedByVersion,
                error
            });
            this.logger.error(`${name} failed`, error instanceof Error ? error.stack : String(error));
            return {
                status: 'failed',
                error
            };
        } finally{
            await queryRunner.release();
            await this.safeInvalidateUpgradeStatusCache();
        }
    }
    async safeInvalidateUpgradeStatusCache() {
        try {
            await this.upgradeStatusService.invalidateInstanceAndAllWorkspacesStatus();
        } catch (error) {
            this.logger.warn(`Failed to invalidate upgrade-status cache: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async runSlowInstanceCommand({ command, name, skipDataMigration }) {
        const isAlreadyCompleted = await this.upgradeMigrationService.isLastAttemptCompleted({
            name,
            workspaceId: null
        });
        if (isAlreadyCompleted) {
            this.logger.log(`${name} already executed, skipping`);
            return {
                status: 'already-executed'
            };
        }
        if (!skipDataMigration) {
            const executedByVersion = this.twentyConfigService.get('APP_VERSION') ?? 'unknown';
            try {
                this.logger.log(`${name} starting data migration...`);
                await command.runDataMigration(this.dataSource);
                this.logger.log(`${name} data migration completed`);
            } catch (error) {
                const workspaceIds = await this.workspaceVersionService.getActiveOrSuspendedWorkspaceIds();
                await this.upgradeMigrationService.recordUpgradeMigration({
                    name,
                    workspaceIds,
                    isInstance: true,
                    status: 'failed',
                    executedByVersion,
                    error
                });
                this.logger.error(`${name} data migration failed`, error instanceof Error ? error.stack : String(error));
                await this.safeInvalidateUpgradeStatusCache();
                return {
                    status: 'failed',
                    error
                };
            }
        }
        return this.runFastInstanceCommand({
            command,
            name
        });
    }
    constructor(dataSource, twentyConfigService, upgradeMigrationService, workspaceVersionService, upgradeStatusService){
        this.dataSource = dataSource;
        this.twentyConfigService = twentyConfigService;
        this.upgradeMigrationService = upgradeMigrationService;
        this.workspaceVersionService = workspaceVersionService;
        this.upgradeStatusService = upgradeStatusService;
        this.logger = new _common.Logger(InstanceCommandRunnerService.name);
    }
};
InstanceCommandRunnerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectDataSource)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.DataSource === "undefined" ? Object : _typeorm1.DataSource,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _upgrademigrationservice.UpgradeMigrationService === "undefined" ? Object : _upgrademigrationservice.UpgradeMigrationService,
        typeof _workspaceversionservice.WorkspaceVersionService === "undefined" ? Object : _workspaceversionservice.WorkspaceVersionService,
        typeof _upgradestatusservice.UpgradeStatusService === "undefined" ? Object : _upgradestatusservice.UpgradeStatusService
    ])
], InstanceCommandRunnerService);

//# sourceMappingURL=instance-command-runner.service.js.map