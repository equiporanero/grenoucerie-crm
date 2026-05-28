"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateSearchCommandMenuItemLabelsCommand", {
    enumerable: true,
    get: function() {
        return UpdateSearchCommandMenuItemLabelsCommand;
    }
});
const _nestcommander = require("nest-commander");
const _utils = require("twenty-shared/utils");
const _activeorsuspendedworkspacecommandrunner = require("../../command-runners/active-or-suspended-workspace.command-runner");
const _workspaceiteratorservice = require("../../command-runners/workspace-iterator.service");
const _applicationservice = require("../../../../engine/core-modules/application/application.service");
const _registeredworkspacecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-workspace-command.decorator");
const _workspacecacheservice = require("../../../../engine/workspace-cache/services/workspace-cache.service");
const _standardcommandmenuitemconstant = require("../../../../engine/workspace-manager/twenty-standard-application/constants/standard-command-menu-item.constant");
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
const UNIVERSAL_IDENTIFIERS_TO_FIX = new Set([
    _standardcommandmenuitemconstant.STANDARD_COMMAND_MENU_ITEMS.searchRecords.universalIdentifier,
    _standardcommandmenuitemconstant.STANDARD_COMMAND_MENU_ITEMS.searchRecordsFallback.universalIdentifier
]);
let UpdateSearchCommandMenuItemLabelsCommand = class UpdateSearchCommandMenuItemLabelsCommand extends _activeorsuspendedworkspacecommandrunner.ActiveOrSuspendedWorkspaceCommandRunner {
    async runOnWorkspace({ workspaceId, options }) {
        const isDryRun = options.dryRun ?? false;
        this.logger.log(`${isDryRun ? '[DRY RUN] ' : ''}Starting search label update for workspace ${workspaceId}`);
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
        const itemsToUpdate = [
            ...UNIVERSAL_IDENTIFIERS_TO_FIX
        ].map((universalIdentifier)=>{
            const standardItem = standardAllFlatEntityMaps.flatCommandMenuItemMaps.byUniversalIdentifier[universalIdentifier];
            const existingItem = existingFlatCommandMenuItemMaps.byUniversalIdentifier[universalIdentifier];
            if (!(0, _utils.isDefined)(standardItem) || !(0, _utils.isDefined)(existingItem) || existingItem.label === standardItem.label) {
                return undefined;
            }
            return {
                ...existingItem,
                label: standardItem.label,
                updatedAt: new Date().toISOString()
            };
        }).filter(_utils.isDefined);
        if (itemsToUpdate.length === 0) {
            this.logger.log(`Search command menu item labels already up to date for workspace ${workspaceId}`);
            return;
        }
        this.logger.log(`Found ${itemsToUpdate.length} search command menu item(s) to update for workspace ${workspaceId}`);
        if (isDryRun) {
            this.logger.log(`[DRY RUN] Would update ${itemsToUpdate.length} search command menu item label(s) for workspace ${workspaceId}`);
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
            this.logger.error(`Failed to update search labels:\n${JSON.stringify(validateAndBuildResult, null, 2)}`);
            throw new Error(`Failed to update search command menu item labels for workspace ${workspaceId}`);
        }
        this.logger.log(`Successfully updated ${itemsToUpdate.length} search command menu item label(s) for workspace ${workspaceId}`);
    }
    constructor(workspaceIteratorService, applicationService, workspaceMigrationValidateBuildAndRunService, workspaceCacheService){
        super(workspaceIteratorService), this.workspaceIteratorService = workspaceIteratorService, this.applicationService = applicationService, this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService, this.workspaceCacheService = workspaceCacheService;
    }
};
UpdateSearchCommandMenuItemLabelsCommand = _ts_decorate([
    (0, _registeredworkspacecommanddecorator.RegisteredWorkspaceCommand)('1.21.0', 1775500015000),
    (0, _nestcommander.Command)({
        name: 'upgrade:1-21:update-search-command-menu-item-labels',
        description: 'Update search command menu item labels to remove objectMetadata name'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceiteratorservice.WorkspaceIteratorService === "undefined" ? Object : _workspaceiteratorservice.WorkspaceIteratorService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService
    ])
], UpdateSearchCommandMenuItemLabelsCommand);

//# sourceMappingURL=1-21-workspace-command-1775500015000-update-search-command-menu-item-labels.command.js.map