"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CleanSuspendedWorkspacesCommand", {
    enumerable: true,
    get: function() {
        return CleanSuspendedWorkspacesCommand;
    }
});
const _typeorm = require("@nestjs/typeorm");
const _nestcommander = require("nest-commander");
const _workspace = require("twenty-shared/workspace");
const _typeorm1 = require("typeorm");
const _migrationcommandrunner = require("../../../../database/commands/command-runners/migration.command-runner");
const _workspaceentity = require("../../../core-modules/workspace/workspace.entity");
const _cleanerworkspaceservice = require("../services/cleaner.workspace-service");
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
let CleanSuspendedWorkspacesCommand = class CleanSuspendedWorkspacesCommand extends _migrationcommandrunner.MigrationCommandRunner {
    parseWorkspaceId(val) {
        this.workspaceIds.push(val);
        return this.workspaceIds;
    }
    parseIgnoreDestroyGracePeriod() {
        return true;
    }
    parseOnlyOperation(val) {
        return val;
    }
    async fetchSuspendedWorkspaceIds() {
        const suspendedWorkspaces = await this.workspaceRepository.find({
            where: {
                activationStatus: (0, _typeorm1.In)([
                    _workspace.WorkspaceActivationStatus.SUSPENDED
                ]),
                ...this.workspaceIds.length > 0 ? {
                    id: (0, _typeorm1.In)(this.workspaceIds)
                } : {}
            },
            withDeleted: true
        });
        return suspendedWorkspaces.map((workspace)=>workspace.id);
    }
    async runMigrationCommand(_passedParams, options) {
        const { dryRun, ignoreDestroyGracePeriod, onlyOperation } = options;
        const suspendedWorkspaceIds = await this.fetchSuspendedWorkspaceIds();
        const operationLabel = onlyOperation ? `ONLY ${onlyOperation.toUpperCase()} - ` : '';
        this.logger.log(`${dryRun ? 'DRY RUN - ' : ''}${ignoreDestroyGracePeriod ? 'IGNORING GRACE PERIOD - ' : ''}${operationLabel}Cleaning ${suspendedWorkspaceIds.length} suspended workspaces`);
        await this.cleanerWorkspaceService.batchWarnOrCleanSuspendedWorkspaces({
            workspaceIds: suspendedWorkspaceIds,
            dryRun,
            ignoreDestroyGracePeriod,
            onlyOperation
        });
    }
    constructor(cleanerWorkspaceService, workspaceRepository){
        super(), this.cleanerWorkspaceService = cleanerWorkspaceService, this.workspaceRepository = workspaceRepository, this.workspaceIds = [];
    }
};
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '-w, --workspace-id [workspace_id]',
        description: 'workspace id. Command runs on all suspended workspaces if not provided',
        required: false
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Array)
], CleanSuspendedWorkspacesCommand.prototype, "parseWorkspaceId", null);
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '--ignore-destroy-grace-period',
        description: 'Ignore the grace period and hard delete soft-deleted workspaces immediately',
        required: false
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Boolean)
], CleanSuspendedWorkspacesCommand.prototype, "parseIgnoreDestroyGracePeriod", null);
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '--only-operation <operation>',
        description: 'Run only a specific operation: warn, destroy (hard delete), or soft-delete',
        required: false,
        choices: [
            ..._cleanerworkspaceservice.CLEAN_SUSPENDED_WORKSPACES_OPERATIONS
        ]
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", typeof _cleanerworkspaceservice.CleanSuspendedWorkspacesOperation === "undefined" ? Object : _cleanerworkspaceservice.CleanSuspendedWorkspacesOperation)
], CleanSuspendedWorkspacesCommand.prototype, "parseOnlyOperation", null);
CleanSuspendedWorkspacesCommand = _ts_decorate([
    (0, _nestcommander.Command)({
        name: 'workspace:clean',
        description: 'Clean suspended workspace'
    }),
    _ts_param(1, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _cleanerworkspaceservice.CleanerWorkspaceService === "undefined" ? Object : _cleanerworkspaceservice.CleanerWorkspaceService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], CleanSuspendedWorkspacesCommand);

//# sourceMappingURL=clean-suspended-workspaces.command.js.map