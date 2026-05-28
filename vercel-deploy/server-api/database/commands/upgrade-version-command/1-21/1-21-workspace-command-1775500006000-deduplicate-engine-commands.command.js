"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DeduplicateEngineCommandsCommand", {
    enumerable: true,
    get: function() {
        return DeduplicateEngineCommandsCommand;
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
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
const OLD_UNIVERSAL_IDENTIFIERS_TO_DELETE = new Set([
    '6652773f-b9a9-4fa3-a52c-e2f2e259e430',
    'cde86f1f-2c13-42b1-812b-f2b2b468cb83',
    '8b3a1cae-3e4d-43c1-a71f-48592b2e47ff',
    '8b740c9d-d99a-45a8-812f-809caaf420ac',
    '44a78417-c394-4bc8-961f-98b503030ddb',
    'c630b3fb-7920-40d1-9906-77d0aa797608',
    'a934ba8a-ac8f-487d-9cd9-06dfdaec1f49',
    'ba339455-f3c2-4ed1-bf77-3e316d7d6a66',
    'f71f68e5-7b6e-4c03-8161-c48434d7777c'
]);
const NEW_UNIVERSAL_IDENTIFIERS = new Set([
    _standardcommandmenuitemconstant.STANDARD_COMMAND_MENU_ITEMS.deleteRecords.universalIdentifier,
    _standardcommandmenuitemconstant.STANDARD_COMMAND_MENU_ITEMS.restoreRecords.universalIdentifier,
    _standardcommandmenuitemconstant.STANDARD_COMMAND_MENU_ITEMS.destroyRecords.universalIdentifier,
    _standardcommandmenuitemconstant.STANDARD_COMMAND_MENU_ITEMS.exportRecords.universalIdentifier
]);
let DeduplicateEngineCommandsCommand = class DeduplicateEngineCommandsCommand extends _activeorsuspendedworkspacecommandrunner.ActiveOrSuspendedWorkspaceCommandRunner {
    async runOnWorkspace({ workspaceId, options }) {
        const isDryRun = options.dryRun ?? false;
        this.logger.log(`${isDryRun ? '[DRY RUN] ' : ''}Starting deduplication of engine commands for workspace ${workspaceId}`);
        const { twentyStandardFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatCommandMenuItemMaps: existingFlatCommandMenuItemMaps } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'flatCommandMenuItemMaps'
        ]);
        const itemsToDelete = Object.values(existingFlatCommandMenuItemMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((item)=>OLD_UNIVERSAL_IDENTIFIERS_TO_DELETE.has(item.universalIdentifier));
        const { allFlatEntityMaps: standardAllFlatEntityMaps } = (0, _twentystandardapplicationallflatentitymapsconstant.computeTwentyStandardApplicationAllFlatEntityMaps)({
            now: new Date().toISOString(),
            workspaceId,
            twentyStandardApplicationId: twentyStandardFlatApplication.id
        });
        const itemsToCreate = Object.values(standardAllFlatEntityMaps.flatCommandMenuItemMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((item)=>NEW_UNIVERSAL_IDENTIFIERS.has(item.universalIdentifier)).filter((item)=>!(0, _utils.isDefined)(existingFlatCommandMenuItemMaps.byUniversalIdentifier[item.universalIdentifier]));
        const totalChanges = itemsToDelete.length + itemsToCreate.length;
        if (totalChanges === 0) {
            this.logger.log(`No engine command deduplication needed for workspace ${workspaceId}`);
            return;
        }
        this.logger.log(`Found ${itemsToDelete.length} old command menu item(s) to delete and ${itemsToCreate.length} unified item(s) to create for workspace ${workspaceId}`);
        if (isDryRun) {
            this.logger.log(`[DRY RUN] Would delete ${itemsToDelete.length} and create ${itemsToCreate.length} command menu item(s) for workspace ${workspaceId}`);
            return;
        }
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                commandMenuItem: {
                    flatEntityToCreate: itemsToCreate,
                    flatEntityToDelete: itemsToDelete,
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            applicationUniversalIdentifier: twentyStandardFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            this.logger.error(`Failed to deduplicate engine commands:\n${JSON.stringify(validateAndBuildResult, null, 2)}`);
            throw new Error(`Failed to deduplicate engine commands for workspace ${workspaceId}`);
        }
        this.logger.log(`Successfully deduplicated engine commands for workspace ${workspaceId} (deleted ${itemsToDelete.length}, created ${itemsToCreate.length})`);
    }
    constructor(workspaceIteratorService, applicationService, workspaceMigrationValidateBuildAndRunService, workspaceCacheService){
        super(workspaceIteratorService), this.workspaceIteratorService = workspaceIteratorService, this.applicationService = applicationService, this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService, this.workspaceCacheService = workspaceCacheService;
    }
};
DeduplicateEngineCommandsCommand = _ts_decorate([
    (0, _registeredworkspacecommanddecorator.RegisteredWorkspaceCommand)('1.21.0', 1775500006000),
    (0, _nestcommander.Command)({
        name: 'upgrade:1-21:deduplicate-engine-commands',
        description: 'Merge single/multiple record engine command menu items into unified commands (delete, restore, destroy, export)'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceiteratorservice.WorkspaceIteratorService === "undefined" ? Object : _workspaceiteratorservice.WorkspaceIteratorService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService
    ])
], DeduplicateEngineCommandsCommand);

//# sourceMappingURL=1-21-workspace-command-1775500006000-deduplicate-engine-commands.command.js.map