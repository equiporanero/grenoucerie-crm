"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SetCalendarEventDescriptionDisplayedMaxRowsCommand", {
    enumerable: true,
    get: function() {
        return SetCalendarEventDescriptionDisplayedMaxRowsCommand;
    }
});
const _nestcommander = require("nest-commander");
const _metadata = require("twenty-shared/metadata");
const _activeorsuspendedworkspacecommandrunner = require("../../command-runners/active-or-suspended-workspace.command-runner");
const _workspaceiteratorservice = require("../../command-runners/workspace-iterator.service");
const _applicationservice = require("../../../../engine/core-modules/application/application.service");
const _registeredworkspacecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-workspace-command.decorator");
const _findflatentitybyuniversalidentifierutil = require("../../../../engine/metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _workspacecacheservice = require("../../../../engine/workspace-cache/services/workspace-cache.service");
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
const DISPLAYED_MAX_ROWS = 99;
let SetCalendarEventDescriptionDisplayedMaxRowsCommand = class SetCalendarEventDescriptionDisplayedMaxRowsCommand extends _activeorsuspendedworkspacecommandrunner.ActiveOrSuspendedWorkspaceCommandRunner {
    async runOnWorkspace({ workspaceId, options }) {
        const isDryRun = options.dryRun ?? false;
        const { flatFieldMetadataMaps } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'flatFieldMetadataMaps'
        ]);
        const descriptionField = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            flatEntityMaps: flatFieldMetadataMaps,
            universalIdentifier: _metadata.STANDARD_OBJECTS.calendarEvent.fields.description.universalIdentifier
        });
        if (!descriptionField) {
            this.logger.log(`calendarEvent.description field not found for workspace ${workspaceId}, skipping`);
            return;
        }
        const textSettings = descriptionField.settings;
        if (textSettings?.displayedMaxRows === DISPLAYED_MAX_ROWS) {
            this.logger.log(`calendarEvent.description displayedMaxRows already set for workspace ${workspaceId}, skipping`);
            return;
        }
        if (isDryRun) {
            this.logger.log(`[DRY RUN] Would set displayedMaxRows on calendarEvent.description for workspace ${workspaceId}`);
            return;
        }
        const { twentyStandardFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const fieldToUpdate = {
            ...descriptionField,
            settings: {
                ...textSettings,
                displayedMaxRows: DISPLAYED_MAX_ROWS
            }
        };
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                fieldMetadata: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: [
                        fieldToUpdate
                    ]
                }
            },
            workspaceId,
            applicationUniversalIdentifier: twentyStandardFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new Error(`Failed to set displayedMaxRows on calendarEvent.description for workspace ${workspaceId}: ${JSON.stringify(validateAndBuildResult, null, 2)}`);
        }
        this.logger.log(`Set displayedMaxRows on calendarEvent.description for workspace ${workspaceId}`);
    }
    constructor(workspaceIteratorService, applicationService, workspaceCacheService, workspaceMigrationValidateBuildAndRunService){
        super(workspaceIteratorService), this.workspaceIteratorService = workspaceIteratorService, this.applicationService = applicationService, this.workspaceCacheService = workspaceCacheService, this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService;
    }
};
SetCalendarEventDescriptionDisplayedMaxRowsCommand = _ts_decorate([
    (0, _registeredworkspacecommanddecorator.RegisteredWorkspaceCommand)('2.2.0', 1786000000000),
    (0, _nestcommander.Command)({
        name: 'upgrade:2-2:set-calendar-event-description-displayed-max-rows',
        description: 'Set displayedMaxRows setting on calendarEvent.description field'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceiteratorservice.WorkspaceIteratorService === "undefined" ? Object : _workspaceiteratorservice.WorkspaceIteratorService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService,
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService
    ])
], SetCalendarEventDescriptionDisplayedMaxRowsCommand);

//# sourceMappingURL=2-2-workspace-command-1786000000000-set-calendar-event-description-displayed-max-rows.command.js.map