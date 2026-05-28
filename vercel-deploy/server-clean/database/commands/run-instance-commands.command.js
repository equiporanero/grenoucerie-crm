"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RunInstanceCommandsCommand", {
    enumerable: true,
    get: function() {
        return RunInstanceCommandsCommand;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _chalk = /*#__PURE__*/ _interop_require_default(require("chalk"));
const _nestcommander = require("nest-commander");
const _typeorm1 = require("typeorm");
const _twentypreviousversionsconstant = require("../../engine/core-modules/upgrade/constants/twenty-previous-versions.constant");
const _instancecommandrunnerservice = require("../../engine/core-modules/upgrade/services/instance-command-runner.service");
const _upgradecommandregistryservice = require("../../engine/core-modules/upgrade/services/upgrade-command-registry.service");
const _upgrademigrationservice = require("../../engine/core-modules/upgrade/services/upgrade-migration.service");
const _upgradesequencereaderservice = require("../../engine/core-modules/upgrade/services/upgrade-sequence-reader.service");
const _workspaceversionservice = require("../../engine/workspace-manager/workspace-version/services/workspace-version.service");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
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
let RunInstanceCommandsCommand = class RunInstanceCommandsCommand extends _nestcommander.CommandRunner {
    parseForce() {
        return true;
    }
    parseIncludeSlow() {
        return true;
    }
    async run(_passedParams, options) {
        try {
            await this.checkWorkspaceVersionSafety(options);
            await this.runLegacyPendingTypeOrmMigrations();
            const activeOrSuspendedWorkspaceIds = await this.workspaceVersionService.getActiveOrSuspendedWorkspaceIds();
            const sequence = this.upgradeSequenceReaderService.getUpgradeSequence();
            for (const step of sequence){
                if (step.kind === 'fast-instance') {
                    const result = await this.instanceUpgradeService.runFastInstanceCommand({
                        command: step.command,
                        name: step.name
                    });
                    if (result.status === 'failed') {
                        throw result.error;
                    }
                }
                if (step.kind === 'slow-instance' && options.includeSlow) {
                    const result = await this.instanceUpgradeService.runSlowInstanceCommand({
                        command: step.command,
                        name: step.name,
                        skipDataMigration: activeOrSuspendedWorkspaceIds.length === 0
                    });
                    if (result.status === 'failed') {
                        throw result.error;
                    }
                }
            }
            this.logger.log(_chalk.default.green('Instance commands completed'));
        } catch (error) {
            this.logger.error(_chalk.default.red(`Instance commands failed: ${error.message}`));
            throw error;
        }
    }
    async checkWorkspaceVersionSafety(options) {
        if (options.force) {
            this.logger.warn(_chalk.default.yellow('Skipping workspace version check (--force flag used)'));
            return;
        }
        const activeOrSuspendedWorkspaceIds = await this.workspaceVersionService.getActiveOrSuspendedWorkspaceIds();
        if (activeOrSuspendedWorkspaceIds.length === 0) {
            return;
        }
        const previousVersion = _twentypreviousversionsconstant.TWENTY_PREVIOUS_VERSIONS[_twentypreviousversionsconstant.TWENTY_PREVIOUS_VERSIONS.length - 1];
        const lastWorkspaceCommand = this.upgradeCommandRegistryService.getLastWorkspaceCommandForVersion(previousVersion);
        if (!lastWorkspaceCommand) {
            return;
        }
        const allAtPreviousVersion = await this.upgradeMigrationService.areAllWorkspacesAtCommand({
            commandName: lastWorkspaceCommand.name,
            workspaceIds: activeOrSuspendedWorkspaceIds
        });
        if (!allAtPreviousVersion) {
            throw new Error('Unable to run instance commands. Some workspace(s) have not completed ' + `the last workspace command for ${previousVersion} ("${lastWorkspaceCommand.name}").\n` + 'Please ensure all workspaces are upgraded to at least the previous version before running migrations.\n' + 'Use --force to bypass this check (not recommended).');
        }
    }
    async runLegacyPendingTypeOrmMigrations() {
        this.logger.log('Running legacy TypeORM migrations...');
        const migrations = await this.dataSource.runMigrations({
            transaction: 'each'
        });
        if (migrations.length === 0) {
            this.logger.log('No pending legacy migrations');
        } else {
            this.logger.log(`Executed ${migrations.length} legacy migration(s): ${migrations.map((migration)=>migration.name).join(', ')}`);
        }
    }
    constructor(dataSource, workspaceVersionService, upgradeCommandRegistryService, upgradeSequenceReaderService, instanceUpgradeService, upgradeMigrationService){
        super(), this.dataSource = dataSource, this.workspaceVersionService = workspaceVersionService, this.upgradeCommandRegistryService = upgradeCommandRegistryService, this.upgradeSequenceReaderService = upgradeSequenceReaderService, this.instanceUpgradeService = instanceUpgradeService, this.upgradeMigrationService = upgradeMigrationService, this.logger = new _common.Logger(RunInstanceCommandsCommand.name);
    }
};
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '-f, --force',
        description: 'Skip workspace version safety check',
        required: false
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Boolean)
], RunInstanceCommandsCommand.prototype, "parseForce", null);
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '--include-slow',
        description: 'Also run slow instance commands (data migration + DDL)',
        required: false
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Boolean)
], RunInstanceCommandsCommand.prototype, "parseIncludeSlow", null);
RunInstanceCommandsCommand = _ts_decorate([
    (0, _nestcommander.Command)({
        name: 'run-instance-commands',
        description: 'Run legacy TypeORM migrations and all registered instance commands'
    }),
    _ts_param(0, (0, _typeorm.InjectDataSource)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.DataSource === "undefined" ? Object : _typeorm1.DataSource,
        typeof _workspaceversionservice.WorkspaceVersionService === "undefined" ? Object : _workspaceversionservice.WorkspaceVersionService,
        typeof _upgradecommandregistryservice.UpgradeCommandRegistryService === "undefined" ? Object : _upgradecommandregistryservice.UpgradeCommandRegistryService,
        typeof _upgradesequencereaderservice.UpgradeSequenceReaderService === "undefined" ? Object : _upgradesequencereaderservice.UpgradeSequenceReaderService,
        typeof _instancecommandrunnerservice.InstanceCommandRunnerService === "undefined" ? Object : _instancecommandrunnerservice.InstanceCommandRunnerService,
        typeof _upgrademigrationservice.UpgradeMigrationService === "undefined" ? Object : _upgrademigrationservice.UpgradeMigrationService
    ])
], RunInstanceCommandsCommand);

//# sourceMappingURL=run-instance-commands.command.js.map