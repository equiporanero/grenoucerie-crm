"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddComposeEmailCommandMenuItemCommand", {
    enumerable: true,
    get: function() {
        return AddComposeEmailCommandMenuItemCommand;
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
const COMPOSE_EMAIL_UNIVERSAL_IDENTIFIER = _standardcommandmenuitemconstant.STANDARD_COMMAND_MENU_ITEMS.composeEmail.universalIdentifier;
let AddComposeEmailCommandMenuItemCommand = class AddComposeEmailCommandMenuItemCommand extends _activeorsuspendedworkspacecommandrunner.ActiveOrSuspendedWorkspaceCommandRunner {
    async runOnWorkspace({ workspaceId, options }) {
        const isDryRun = options.dryRun ?? false;
        this.logger.log(`${isDryRun ? '[DRY RUN] ' : ''}Checking compose email command for workspace ${workspaceId}`);
        const { twentyStandardFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatCommandMenuItemMaps: existingFlatCommandMenuItemMaps } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'flatCommandMenuItemMaps'
        ]);
        const alreadyExists = (0, _utils.isDefined)(existingFlatCommandMenuItemMaps.byUniversalIdentifier[COMPOSE_EMAIL_UNIVERSAL_IDENTIFIER]);
        if (alreadyExists) {
            this.logger.log(`Compose email command already exists for workspace ${workspaceId}, skipping`);
            return;
        }
        const { allFlatEntityMaps: standardAllFlatEntityMaps } = (0, _twentystandardapplicationallflatentitymapsconstant.computeTwentyStandardApplicationAllFlatEntityMaps)({
            now: new Date().toISOString(),
            workspaceId,
            twentyStandardApplicationId: twentyStandardFlatApplication.id
        });
        const itemToCreate = standardAllFlatEntityMaps.flatCommandMenuItemMaps.byUniversalIdentifier[COMPOSE_EMAIL_UNIVERSAL_IDENTIFIER];
        if (!(0, _utils.isDefined)(itemToCreate)) {
            this.logger.warn(`Compose email command not found in standard application for workspace ${workspaceId}`);
            return;
        }
        if (isDryRun) {
            this.logger.log(`[DRY RUN] Would create compose email command for workspace ${workspaceId}`);
            return;
        }
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                commandMenuItem: {
                    flatEntityToCreate: [
                        itemToCreate
                    ],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            applicationUniversalIdentifier: twentyStandardFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            this.logger.error(`Failed to add compose email command:\n${JSON.stringify(validateAndBuildResult, null, 2)}`);
            throw new Error(`Failed to add compose email command for workspace ${workspaceId}`);
        }
        this.logger.log(`Successfully added compose email command for workspace ${workspaceId}`);
    }
    constructor(workspaceIteratorService, applicationService, workspaceMigrationValidateBuildAndRunService, workspaceCacheService){
        super(workspaceIteratorService), this.workspaceIteratorService = workspaceIteratorService, this.applicationService = applicationService, this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService, this.workspaceCacheService = workspaceCacheService;
    }
};
AddComposeEmailCommandMenuItemCommand = _ts_decorate([
    (0, _registeredworkspacecommanddecorator.RegisteredWorkspaceCommand)('1.21.0', 1775500001000),
    (0, _nestcommander.Command)({
        name: 'upgrade:1-21:add-compose-email-command-menu-item',
        description: 'Add the Compose Email command menu item to existing workspaces'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceiteratorservice.WorkspaceIteratorService === "undefined" ? Object : _workspaceiteratorservice.WorkspaceIteratorService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService
    ])
], AddComposeEmailCommandMenuItemCommand);

//# sourceMappingURL=1-21-workspace-command-1775500001000-add-compose-email-command-menu-item.command.js.map