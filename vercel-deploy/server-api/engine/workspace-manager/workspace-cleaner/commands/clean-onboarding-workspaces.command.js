"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CleanOnboardingWorkspacesCommand", {
    enumerable: true,
    get: function() {
        return CleanOnboardingWorkspacesCommand;
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
let CleanOnboardingWorkspacesCommand = class CleanOnboardingWorkspacesCommand extends _migrationcommandrunner.MigrationCommandRunner {
    parseWorkspaceId(val) {
        this.workspaceIds.push(val);
        return this.workspaceIds;
    }
    async fetchOnboardingWorkspaceIds() {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const onboardingWorkspaces = await this.workspaceRepository.find({
            select: [
                'id'
            ],
            where: {
                activationStatus: (0, _typeorm1.In)([
                    _workspace.WorkspaceActivationStatus.PENDING_CREATION,
                    _workspace.WorkspaceActivationStatus.ONGOING_CREATION
                ]),
                createdAt: (0, _typeorm1.LessThan)(sevenDaysAgo)
            },
            withDeleted: true
        });
        return onboardingWorkspaces.map((workspace)=>workspace.id);
    }
    async runMigrationCommand(_passedParams, options) {
        const { dryRun } = options;
        const onboardingWorkspaceIds = this.workspaceIds.length > 0 ? this.workspaceIds : await this.fetchOnboardingWorkspaceIds();
        this.logger.log(`${dryRun ? 'DRY RUN - ' : ''}Cleaning ${onboardingWorkspaceIds.length} onboarding workspaces`);
        await this.cleanerWorkspaceService.batchCleanOnboardingWorkspaces(onboardingWorkspaceIds, dryRun);
    }
    constructor(cleanerWorkspaceService, workspaceRepository){
        super(), this.cleanerWorkspaceService = cleanerWorkspaceService, this.workspaceRepository = workspaceRepository, this.workspaceIds = [];
    }
};
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '-w, --workspace-id [workspace_id]',
        description: 'workspace id. Command runs on all onboarding workspaces if not provided',
        required: false
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Array)
], CleanOnboardingWorkspacesCommand.prototype, "parseWorkspaceId", null);
CleanOnboardingWorkspacesCommand = _ts_decorate([
    (0, _nestcommander.Command)({
        name: 'workspace:clean:onboarding',
        description: 'Clean onboarding workspaces'
    }),
    _ts_param(1, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _cleanerworkspaceservice.CleanerWorkspaceService === "undefined" ? Object : _cleanerworkspaceservice.CleanerWorkspaceService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], CleanOnboardingWorkspacesCommand);

//# sourceMappingURL=clean-onboarding-workspaces.command.js.map