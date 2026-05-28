"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DestroyWorkspaceCommand", {
    enumerable: true,
    get: function() {
        return DestroyWorkspaceCommand;
    }
});
const _nestcommander = require("nest-commander");
const _migrationcommandrunner = require("../../../../database/commands/command-runners/migration.command-runner");
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
let DestroyWorkspaceCommand = class DestroyWorkspaceCommand extends _migrationcommandrunner.MigrationCommandRunner {
    parseWorkspaceId(val) {
        this.workspaceIds.push(val);
        return this.workspaceIds;
    }
    async runMigrationCommand(_passedParams, options) {
        const { dryRun } = options;
        this.logger.log(`${dryRun ? 'DRY RUN - ' : ''}Destroy ${this.workspaceIds.length} workspaces : ${this.workspaceIds.join(', ')}`);
        await this.cleanerWorkspaceService.destroyBillingDeactivatedAndSoftDeletedWorkspaces(this.workspaceIds, dryRun);
    }
    constructor(cleanerWorkspaceService){
        super(), this.cleanerWorkspaceService = cleanerWorkspaceService, this.workspaceIds = [];
    }
};
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '-w, --workspace-id <workspace_id>',
        description: 'workspace id - mandatory',
        required: true
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Array)
], DestroyWorkspaceCommand.prototype, "parseWorkspaceId", null);
DestroyWorkspaceCommand = _ts_decorate([
    (0, _nestcommander.Command)({
        name: 'workspace:destroy',
        description: 'Destroy workspace'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _cleanerworkspaceservice.CleanerWorkspaceService === "undefined" ? Object : _cleanerworkspaceservice.CleanerWorkspaceService
    ])
], DestroyWorkspaceCommand);

//# sourceMappingURL=destroy-workspace.command.js.map