"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BackfillStandardSkillsCommand", {
    enumerable: true,
    get: function() {
        return BackfillStandardSkillsCommand;
    }
});
const _nestcommander = require("nest-commander");
const _utils = require("twenty-shared/utils");
const _activeorsuspendedworkspacecommandrunner = require("../../command-runners/active-or-suspended-workspace.command-runner");
const _workspaceiteratorservice = require("../../command-runners/workspace-iterator.service");
const _registeredworkspacecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-workspace-command.decorator");
const _applicationservice = require("../../../../engine/core-modules/application/application.service");
const _workspacecacheservice = require("../../../../engine/workspace-cache/services/workspace-cache.service");
const _twentystandardapplicationallflatentitymapsconstant = require("../../../../engine/workspace-manager/twenty-standard-application/utils/twenty-standard-application-all-flat-entity-maps.constant");
const _workspacemigrationvalidatebuildandrunservice = require("../../../../engine/workspace-manager/workspace-migration/services/workspace-migration-validate-build-and-run-service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let BackfillStandardSkillsCommand = class BackfillStandardSkillsCommand extends _activeorsuspendedworkspacecommandrunner.ActiveOrSuspendedWorkspaceCommandRunner {
    async runOnWorkspace({ workspaceId, options }) {
        const isDryRun = options.dryRun ?? false;
        this.logger.log(`${isDryRun ? '[DRY RUN] ' : ''}Checking standard skills for workspace ${workspaceId}`);
        const { twentyStandardFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatSkillMaps: existingFlatSkillMaps } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'flatSkillMaps'
        ]);
        const { allFlatEntityMaps: standardAllFlatEntityMaps } = (0, _twentystandardapplicationallflatentitymapsconstant.computeTwentyStandardApplicationAllFlatEntityMaps)({
            now: new Date().toISOString(),
            workspaceId,
            twentyStandardApplicationId: twentyStandardFlatApplication.id
        });
        const standardSkills = Object.values(standardAllFlatEntityMaps.flatSkillMaps.byUniversalIdentifier).filter(_utils.isDefined);
        const skillsToCreate = standardSkills.filter((skill)=>!(0, _utils.isDefined)(existingFlatSkillMaps.byUniversalIdentifier[skill.universalIdentifier]));
        if (skillsToCreate.length === 0) {
            this.logger.log(`All standard skills already exist for workspace ${workspaceId}, skipping`);
            return;
        }
        this.logger.log(`Found ${skillsToCreate.length} missing standard skill(s) for workspace ${workspaceId}: ${skillsToCreate.map((s)=>s.name).join(', ')}`);
        if (isDryRun) {
            this.logger.log(`[DRY RUN] Would create ${skillsToCreate.length} standard skill(s) for workspace ${workspaceId}`);
            return;
        }
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                skill: {
                    flatEntityToCreate: skillsToCreate,
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            applicationUniversalIdentifier: twentyStandardFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            this.logger.error(`Failed to backfill standard skills:\n${JSON.stringify(validateAndBuildResult, null, 2)}`);
            throw new Error(`Failed to backfill standard skills for workspace ${workspaceId}`);
        }
        this.logger.log(`Successfully created ${skillsToCreate.length} standard skill(s) for workspace ${workspaceId}`);
    }
    constructor(workspaceIteratorService, applicationService, workspaceMigrationValidateBuildAndRunService, workspaceCacheService){
        super(workspaceIteratorService), this.workspaceIteratorService = workspaceIteratorService, this.applicationService = applicationService, this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService, this.workspaceCacheService = workspaceCacheService;
    }
};
BackfillStandardSkillsCommand = _ts_decorate([
    (0, _registeredworkspacecommanddecorator.RegisteredWorkspaceCommand)('1.22.0', 1780000002000),
    (0, _nestcommander.Command)({
        name: 'upgrade:1-22:backfill-standard-skills',
        description: 'Backfill standard skills for existing workspaces that were created before skills were added'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceiteratorservice.WorkspaceIteratorService === "undefined" ? Object : _workspaceiteratorservice.WorkspaceIteratorService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService
    ])
], BackfillStandardSkillsCommand);

//# sourceMappingURL=1-22-workspace-command-1780000002000-backfill-standard-skills.command.js.map