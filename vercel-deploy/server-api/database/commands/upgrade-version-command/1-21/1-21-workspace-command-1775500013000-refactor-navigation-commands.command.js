"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RefactorNavigationCommandsCommand", {
    enumerable: true,
    get: function() {
        return RefactorNavigationCommandsCommand;
    }
});
const _typeorm = require("@nestjs/typeorm");
const _nestcommander = require("nest-commander");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _uuid = require("uuid");
const _activeorsuspendedworkspacecommandrunner = require("../../command-runners/active-or-suspended-workspace.command-runner");
const _workspaceiteratorservice = require("../../command-runners/workspace-iterator.service");
const _1775129635528addpayloadtocommandmenuitemutil = require("../../../typeorm/core/migrations/utils/1775129635528-add-payload-to-command-menu-item.util");
const _applicationservice = require("../../../../engine/core-modules/application/application.service");
const _registeredworkspacecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-workspace-command.decorator");
const _enginecomponentkeyenum = require("../../../../engine/metadata-modules/command-menu-item/enums/engine-component-key.enum");
const _isobjectmetadatacommandmenuitempayloadutil = require("../../../../engine/metadata-modules/command-menu-item/utils/is-object-metadata-command-menu-item-payload.util");
const _buildnavigationflatcommandmenuitemutil = require("../../../../engine/metadata-modules/flat-command-menu-item/utils/build-navigation-flat-command-menu-item.util");
const _seedcompareobjectmetadatafornavigationpositionutil = require("../../../../engine/metadata-modules/flat-command-menu-item/utils/seed-compare-object-metadata-for-navigation-position.util");
const _workspacecacheservice = require("../../../../engine/workspace-cache/services/workspace-cache.service");
const _standardcommandmenuitemconstant = require("../../../../engine/workspace-manager/twenty-standard-application/constants/standard-command-menu-item.constant");
const _twentystandardapplications = require("../../../../engine/workspace-manager/twenty-standard-application/constants/twenty-standard-applications");
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
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
const GO_TO_ENGINE_KEYS = [
    'GO_TO_PEOPLE',
    'GO_TO_COMPANIES',
    'GO_TO_DASHBOARDS',
    'GO_TO_OPPORTUNITIES',
    'GO_TO_SETTINGS',
    'GO_TO_TASKS',
    'GO_TO_NOTES',
    'GO_TO_WORKFLOWS',
    'GO_TO_RUNS'
];
const SETTINGS_NAVIGATION_ITEM_KEYS = [
    'goToSettings',
    'goToSettingsExperience',
    'goToSettingsAccounts',
    'goToSettingsAccountsEmails',
    'goToSettingsAccountsCalendars',
    'goToSettingsGeneral',
    'goToSettingsObjects',
    'goToSettingsMembers',
    'goToSettingsRoles',
    'goToSettingsDomains',
    'goToSettingsBilling',
    'goToSettingsApiWebhooks',
    'goToSettingsApplications',
    'goToSettingsAI',
    'goToSettingsSecurity',
    'goToSettingsAdminPanel',
    'goToSettingsUpdates'
];
let RefactorNavigationCommandsCommand = class RefactorNavigationCommandsCommand extends _activeorsuspendedworkspacecommandrunner.ActiveOrSuspendedWorkspaceCommandRunner {
    async run(passedParams, options) {
        await super.run(passedParams, options);
        if (options.workspaceId && options.workspaceId.size > 0) {
            this.logger.log('Skipping CHECK constraint application: command was not launched for all workspaces');
            return;
        }
        if (options.dryRun) {
            this.logger.log('[DRY RUN] Would apply CHK_CMD_MENU_ITEM_ENGINE_KEY_COHERENCE');
            return;
        }
        const queryRunner = this.coreDataSource.createQueryRunner();
        await queryRunner.connect();
        try {
            await (0, _1775129635528addpayloadtocommandmenuitemutil.addPayloadCheckConstraintToCommandMenuItem)(queryRunner);
            this.logger.log('Successfully applied CHK_CMD_MENU_ITEM_ENGINE_KEY_COHERENCE');
        } finally{
            await queryRunner.release();
        }
    }
    async runOnWorkspace({ workspaceId, options }) {
        const isDryRun = options.dryRun ?? false;
        this.logger.log(`${isDryRun ? '[DRY RUN] ' : ''}Refactoring navigation commands for workspace ${workspaceId}`);
        const { twentyStandardFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatCommandMenuItemMaps, flatObjectMetadataMaps } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'flatCommandMenuItemMaps',
            'flatObjectMetadataMaps'
        ]);
        const allCommandMenuItems = Object.values(flatCommandMenuItemMaps.byUniversalIdentifier).filter(_utils.isDefined);
        const standardAppCommandMenuItems = allCommandMenuItems.filter((item)=>item.applicationId === twentyStandardFlatApplication.id);
        const goToItemsToDelete = standardAppCommandMenuItems.filter((item)=>GO_TO_ENGINE_KEYS.includes(item.engineComponentKey));
        this.logger.log(`${isDryRun ? '[DRY RUN] Would delete' : 'Deleting'} ${goToItemsToDelete.length} old GO_TO_* command(s) for workspace ${workspaceId}`);
        const existingNavigationUniversalIdentifiers = new Set(allCommandMenuItems.filter((item)=>item.engineComponentKey === _enginecomponentkeyenum.EngineComponentKey.NAVIGATION).map((item)=>item.universalIdentifier));
        const activeObjects = Object.values(flatObjectMetadataMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((objectMetadata)=>objectMetadata.isActive).sort(_seedcompareobjectmetadatafornavigationpositionutil.seedCompareObjectMetadataForNavigationPosition);
        this.logger.log(`Found ${activeObjects.length} active object(s) for workspace ${workspaceId}`);
        const nonGoToItems = allCommandMenuItems.filter((item)=>!GO_TO_ENGINE_KEYS.includes(item.engineComponentKey));
        let nextPosition = nonGoToItems.reduce((max, item)=>Math.max(max, item.position), -1) + 1;
        const now = new Date().toISOString();
        const flatCommandMenuItemsToCreate = [];
        for (const objectMetadata of activeObjects){
            const universalIdentifier = (0, _uuid.v5)(objectMetadata.universalIdentifier, _buildnavigationflatcommandmenuitemutil.NAVIGATION_COMMAND_UUID_NAMESPACE);
            if (existingNavigationUniversalIdentifiers.has(universalIdentifier)) {
                continue;
            }
            flatCommandMenuItemsToCreate.push((0, _buildnavigationflatcommandmenuitemutil.buildNavigationFlatCommandMenuItem)({
                objectMetadata,
                commandMenuItemId: (0, _uuid.v4)(),
                applicationId: twentyStandardFlatApplication.id,
                workspaceId,
                position: nextPosition++,
                now
            }));
        }
        for (const settingsItemKey of SETTINGS_NAVIGATION_ITEM_KEYS){
            const commandMenuItem = _standardcommandmenuitemconstant.STANDARD_COMMAND_MENU_ITEMS[settingsItemKey];
            if (existingNavigationUniversalIdentifiers.has(commandMenuItem.universalIdentifier)) {
                continue;
            }
            flatCommandMenuItemsToCreate.push({
                id: (0, _uuid.v4)(),
                universalIdentifier: commandMenuItem.universalIdentifier,
                applicationId: twentyStandardFlatApplication.id,
                applicationUniversalIdentifier: _twentystandardapplications.TWENTY_STANDARD_APPLICATION.universalIdentifier,
                workspaceId,
                label: commandMenuItem.label,
                shortLabel: commandMenuItem.shortLabel,
                icon: commandMenuItem.icon,
                position: nextPosition++,
                isPinned: commandMenuItem.isPinned,
                availabilityType: commandMenuItem.availabilityType,
                conditionalAvailabilityExpression: commandMenuItem.conditionalAvailabilityExpression ?? null,
                frontComponentId: null,
                frontComponentUniversalIdentifier: null,
                engineComponentKey: _enginecomponentkeyenum.EngineComponentKey.NAVIGATION,
                payload: {
                    ...commandMenuItem.payload
                },
                hotKeys: commandMenuItem.hotKeys ? [
                    ...commandMenuItem.hotKeys
                ] : null,
                workflowVersionId: null,
                availabilityObjectMetadataId: null,
                availabilityObjectMetadataUniversalIdentifier: null,
                pageLayoutId: null,
                pageLayoutUniversalIdentifier: null,
                createdAt: now,
                updatedAt: now
            });
        }
        const staleNavigationItemsToUpdate = allCommandMenuItems.filter((item)=>item.engineComponentKey === _enginecomponentkeyenum.EngineComponentKey.NAVIGATION && (0, _isobjectmetadatacommandmenuitempayloadutil.isObjectMetadataCommandMenuItemPayload)(item.payload) && (item.label !== _buildnavigationflatcommandmenuitemutil.NAVIGATION_INTERPOLATED_LABEL || item.shortLabel !== _buildnavigationflatcommandmenuitemutil.NAVIGATION_INTERPOLATED_SHORT_LABEL || item.icon !== _buildnavigationflatcommandmenuitemutil.NAVIGATION_INTERPOLATED_ICON)).map((item)=>({
                ...item,
                label: _buildnavigationflatcommandmenuitemutil.NAVIGATION_INTERPOLATED_LABEL,
                shortLabel: _buildnavigationflatcommandmenuitemutil.NAVIGATION_INTERPOLATED_SHORT_LABEL,
                icon: _buildnavigationflatcommandmenuitemutil.NAVIGATION_INTERPOLATED_ICON,
                updatedAt: now
            }));
        if (goToItemsToDelete.length === 0 && flatCommandMenuItemsToCreate.length === 0 && staleNavigationItemsToUpdate.length === 0) {
            this.logger.log(`All NAVIGATION commands already exist and use interpolation for workspace ${workspaceId}, skipping`);
            return;
        }
        this.logger.log(`${isDryRun ? '[DRY RUN] Would create' : 'Creating'} ${flatCommandMenuItemsToCreate.length} NAVIGATION command(s) ` + `and update ${staleNavigationItemsToUpdate.length} stale item(s) for workspace ${workspaceId}`);
        if (isDryRun) {
            return;
        }
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                commandMenuItem: {
                    flatEntityToCreate: flatCommandMenuItemsToCreate,
                    flatEntityToDelete: goToItemsToDelete,
                    flatEntityToUpdate: staleNavigationItemsToUpdate
                }
            },
            workspaceId,
            applicationUniversalIdentifier: twentyStandardFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            this.logger.error(`Failed to refactor navigation commands:\n${JSON.stringify(validateAndBuildResult, null, 2)}`);
            throw new Error(`Failed to refactor navigation commands for workspace ${workspaceId}`);
        }
        this.logger.log(`Successfully refactored navigation commands for workspace ${workspaceId}`);
    }
    constructor(workspaceIteratorService, coreDataSource, applicationService, workspaceMigrationValidateBuildAndRunService, workspaceCacheService){
        super(workspaceIteratorService), this.workspaceIteratorService = workspaceIteratorService, this.coreDataSource = coreDataSource, this.applicationService = applicationService, this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService, this.workspaceCacheService = workspaceCacheService;
    }
};
RefactorNavigationCommandsCommand = _ts_decorate([
    (0, _registeredworkspacecommanddecorator.RegisteredWorkspaceCommand)('1.21.0', 1775500013000),
    (0, _nestcommander.Command)({
        name: 'upgrade:1-21:refactor-navigation-commands',
        description: 'Replace GO_TO_* command menu items with unified NAVIGATION engine key and payload'
    }),
    _ts_param(1, (0, _typeorm.InjectDataSource)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceiteratorservice.WorkspaceIteratorService === "undefined" ? Object : _workspaceiteratorservice.WorkspaceIteratorService,
        typeof _typeorm1.DataSource === "undefined" ? Object : _typeorm1.DataSource,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService
    ])
], RefactorNavigationCommandsCommand);

//# sourceMappingURL=1-21-workspace-command-1775500013000-refactor-navigation-commands.command.js.map