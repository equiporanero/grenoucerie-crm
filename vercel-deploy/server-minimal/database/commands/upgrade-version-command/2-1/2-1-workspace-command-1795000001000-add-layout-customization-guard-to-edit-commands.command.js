"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddLayoutCustomizationGuardToEditCommandsCommand", {
    enumerable: true,
    get: function() {
        return AddLayoutCustomizationGuardToEditCommandsCommand;
    }
});
const _nestcommander = require("nest-commander");
const _utils = require("twenty-shared/utils");
const _activeorsuspendedworkspacecommandrunner = require("../../command-runners/active-or-suspended-workspace.command-runner");
const _workspaceiteratorservice = require("../../command-runners/workspace-iterator.service");
const _registeredworkspacecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-workspace-command.decorator");
const _applicationservice = require("../../../../engine/core-modules/application/application.service");
const _workspacecacheservice = require("../../../../engine/workspace-cache/services/workspace-cache.service");
const _standardcommandmenuitemconstant = require("../../../../engine/workspace-manager/twenty-standard-application/constants/standard-command-menu-item.constant");
const _twentystandardapplicationallflatentitymapsconstant = require("../../../../engine/workspace-manager/twenty-standard-application/utils/twenty-standard-application-all-flat-entity-maps.constant");
const _workspacemigrationvalidatebuildandrunservice = require("../../../../engine/workspace-manager/workspace-migration/services/workspace-migration-validate-build-and-run-service");
const _replacelegacypageeditmodeidentifierutil = require("./utils/replace-legacy-page-edit-mode-identifier.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
const UNIVERSAL_IDENTIFIERS_TO_UPDATE = new Set([
    _standardcommandmenuitemconstant.STANDARD_COMMAND_MENU_ITEMS.editRecordPageLayout.universalIdentifier,
    _standardcommandmenuitemconstant.STANDARD_COMMAND_MENU_ITEMS.editDashboardLayout.universalIdentifier,
    _standardcommandmenuitemconstant.STANDARD_COMMAND_MENU_ITEMS.saveDashboardLayout.universalIdentifier,
    _standardcommandmenuitemconstant.STANDARD_COMMAND_MENU_ITEMS.cancelDashboardLayout.universalIdentifier
]);
let AddLayoutCustomizationGuardToEditCommandsCommand = class AddLayoutCustomizationGuardToEditCommandsCommand extends _activeorsuspendedworkspacecommandrunner.ActiveOrSuspendedWorkspaceCommandRunner {
    async runOnWorkspace({ workspaceId, options }) {
        const isDryRun = options.dryRun ?? false;
        this.logger.log(`${isDryRun ? '[DRY RUN] ' : ''}Starting Edit command availability expression update for workspace ${workspaceId}`);
        const { twentyStandardFlatApplication, workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
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
        const updatedAt = new Date().toISOString();
        const itemsToUpdateById = {};
        for (const universalIdentifier of UNIVERSAL_IDENTIFIERS_TO_UPDATE){
            const standardItem = standardAllFlatEntityMaps.flatCommandMenuItemMaps.byUniversalIdentifier[universalIdentifier];
            const existingItem = existingFlatCommandMenuItemMaps.byUniversalIdentifier[universalIdentifier];
            if (!(0, _utils.isDefined)(standardItem) || !(0, _utils.isDefined)(existingItem) || existingItem.conditionalAvailabilityExpression === standardItem.conditionalAvailabilityExpression) {
                continue;
            }
            itemsToUpdateById[existingItem.id] = {
                ...existingItem,
                conditionalAvailabilityExpression: standardItem.conditionalAvailabilityExpression,
                updatedAt
            };
        }
        for (const existingItem of Object.values(existingFlatCommandMenuItemMaps.byUniversalIdentifier).filter(_utils.isDefined)){
            if (UNIVERSAL_IDENTIFIERS_TO_UPDATE.has(existingItem.universalIdentifier)) {
                continue;
            }
            const currentConditionalAvailabilityExpression = existingItem.conditionalAvailabilityExpression;
            const nextConditionalAvailabilityExpression = (0, _replacelegacypageeditmodeidentifierutil.replaceLegacyPageEditModeIdentifier)(currentConditionalAvailabilityExpression);
            if (nextConditionalAvailabilityExpression === currentConditionalAvailabilityExpression) {
                continue;
            }
            itemsToUpdateById[existingItem.id] = {
                ...existingItem,
                conditionalAvailabilityExpression: nextConditionalAvailabilityExpression,
                updatedAt
            };
        }
        const itemsToUpdate = Object.values(itemsToUpdateById);
        if (itemsToUpdate.length === 0) {
            this.logger.log(`Edit command availability expressions already up to date for workspace ${workspaceId}`);
            return;
        }
        this.logger.log(`Found ${itemsToUpdate.length} command menu item(s) to update for workspace ${workspaceId}`);
        if (isDryRun) {
            this.logger.log(`[DRY RUN] Would update ${itemsToUpdate.length} Edit command availability expression(s) for workspace ${workspaceId}`);
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
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            this.logger.error(`Failed to update Edit command availability expressions:\n${JSON.stringify(validateAndBuildResult, null, 2)}`);
            throw new Error(`Failed to update Edit command availability expressions for workspace ${workspaceId}`);
        }
        this.logger.log(`Successfully updated ${itemsToUpdate.length} Edit command availability expression(s) for workspace ${workspaceId}`);
    }
    constructor(workspaceIteratorService, applicationService, workspaceMigrationValidateBuildAndRunService, workspaceCacheService){
        super(workspaceIteratorService), this.workspaceIteratorService = workspaceIteratorService, this.applicationService = applicationService, this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService, this.workspaceCacheService = workspaceCacheService;
    }
};
AddLayoutCustomizationGuardToEditCommandsCommand = _ts_decorate([
    (0, _registeredworkspacecommanddecorator.RegisteredWorkspaceCommand)('2.1.0', 1795000001000),
    (0, _nestcommander.Command)({
        name: 'upgrade:2-1:add-layout-customization-guard-to-edit-commands',
        description: 'Guard layout edit commands and migrate legacy page edit-mode expressions'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceiteratorservice.WorkspaceIteratorService === "undefined" ? Object : _workspaceiteratorservice.WorkspaceIteratorService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService
    ])
], AddLayoutCustomizationGuardToEditCommandsCommand);

//# sourceMappingURL=2-1-workspace-command-1795000001000-add-layout-customization-guard-to-edit-commands.command.js.map