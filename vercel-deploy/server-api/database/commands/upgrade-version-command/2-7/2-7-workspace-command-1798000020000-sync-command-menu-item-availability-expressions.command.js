"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SyncCommandMenuItemAvailabilityExpressionsCommand", {
    enumerable: true,
    get: function() {
        return SyncCommandMenuItemAvailabilityExpressionsCommand;
    }
});
const _nestcommander = require("nest-commander");
const _utils = require("twenty-shared/utils");
const _activeorsuspendedworkspacecommandrunner = require("../../command-runners/active-or-suspended-workspace.command-runner");
const _workspaceiteratorservice = require("../../command-runners/workspace-iterator.service");
const _applicationservice = require("../../../../engine/core-modules/application/application.service");
const _registeredworkspacecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-workspace-command.decorator");
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
let SyncCommandMenuItemAvailabilityExpressionsCommand = class SyncCommandMenuItemAvailabilityExpressionsCommand extends _activeorsuspendedworkspacecommandrunner.ActiveOrSuspendedWorkspaceCommandRunner {
    async runOnWorkspace({ workspaceId, options }) {
        const isDryRun = options.dryRun ?? false;
        this.logger.log(`${isDryRun ? '[DRY RUN] ' : ''}Syncing command menu item availability expressions for workspace ${workspaceId}`);
        const { twentyStandardFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatCommandMenuItemMaps: existingFlatCommandMenuItemMaps } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'flatCommandMenuItemMaps'
        ]);
        const { allFlatEntityMaps: standardAllFlatEntityMaps } = (0, _twentystandardapplicationallflatentitymapsconstant.computeTwentyStandardApplicationAllFlatEntityMaps)({
            now: new Date().toISOString(),
            workspaceId,
            twentyStandardApplicationId: twentyStandardFlatApplication.id
        });
        const itemsToUpdate = Object.values(standardAllFlatEntityMaps.flatCommandMenuItemMaps.byUniversalIdentifier).filter(_utils.isDefined).map((standardItem)=>{
            const existingItem = existingFlatCommandMenuItemMaps.byUniversalIdentifier[standardItem.universalIdentifier];
            if (!(0, _utils.isDefined)(existingItem) || existingItem.conditionalAvailabilityExpression === standardItem.conditionalAvailabilityExpression) {
                return undefined;
            }
            return {
                ...existingItem,
                conditionalAvailabilityExpression: standardItem.conditionalAvailabilityExpression,
                updatedAt: new Date().toISOString()
            };
        }).filter(_utils.isDefined);
        if (itemsToUpdate.length === 0) {
            this.logger.log(`Command menu item availability expressions already up to date for workspace ${workspaceId}`);
            return;
        }
        this.logger.log(`Found ${itemsToUpdate.length} command menu item(s) with drifted availability expressions for workspace ${workspaceId}`);
        if (isDryRun) {
            this.logger.log(`[DRY RUN] Would sync ${itemsToUpdate.length} command menu item availability expression(s) for workspace ${workspaceId}`);
            return;
        }
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                commandMenuItem: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: itemsToUpdate
                }
            },
            workspaceId,
            applicationUniversalIdentifier: twentyStandardFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            this.logger.error(`Failed to sync command menu item availability expressions:\n${JSON.stringify(validateAndBuildResult, null, 2)}`);
            throw new Error(`Failed to sync command menu item availability expressions for workspace ${workspaceId}`);
        }
        this.logger.log(`Successfully synced ${itemsToUpdate.length} command menu item availability expression(s) for workspace ${workspaceId}`);
    }
    constructor(workspaceIteratorService, applicationService, workspaceMigrationValidateBuildAndRunService, workspaceCacheService){
        super(workspaceIteratorService), this.workspaceIteratorService = workspaceIteratorService, this.applicationService = applicationService, this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService, this.workspaceCacheService = workspaceCacheService;
    }
};
SyncCommandMenuItemAvailabilityExpressionsCommand = _ts_decorate([
    (0, _registeredworkspacecommanddecorator.RegisteredWorkspaceCommand)('2.7.0', 1798000020000),
    (0, _nestcommander.Command)({
        name: 'upgrade:2-7:sync-command-menu-item-availability-expressions',
        description: 'Re-sync conditionalAvailabilityExpression on all standard command menu items in existing workspaces (heals drift between source-of-truth constant and workspace DB)'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceiteratorservice.WorkspaceIteratorService === "undefined" ? Object : _workspaceiteratorservice.WorkspaceIteratorService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService
    ])
], SyncCommandMenuItemAvailabilityExpressionsCommand);

//# sourceMappingURL=2-7-workspace-command-1798000020000-sync-command-menu-item-availability-expressions.command.js.map