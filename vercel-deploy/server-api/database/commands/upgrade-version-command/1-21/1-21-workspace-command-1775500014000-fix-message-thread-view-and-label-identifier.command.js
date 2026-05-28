"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FixMessageThreadViewAndLabelIdentifierCommand", {
    enumerable: true,
    get: function() {
        return FixMessageThreadViewAndLabelIdentifierCommand;
    }
});
const _nestcommander = require("nest-commander");
const _metadata = require("twenty-shared/metadata");
const _utils = require("twenty-shared/utils");
const _activeorsuspendedworkspacecommandrunner = require("../../command-runners/active-or-suspended-workspace.command-runner");
const _workspaceiteratorservice = require("../../command-runners/workspace-iterator.service");
const _applicationservice = require("../../../../engine/core-modules/application/application.service");
const _registeredworkspacecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-workspace-command.decorator");
const _findflatentitybyuniversalidentifierutil = require("../../../../engine/metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
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
const MESSAGE_THREAD_OBJECT_UNIVERSAL_IDENTIFIER = _metadata.STANDARD_OBJECTS.messageThread.universalIdentifier;
const MESSAGE_THREAD_SUBJECT_FIELD_UNIVERSAL_IDENTIFIER = _metadata.STANDARD_OBJECTS.messageThread.fields.subject.universalIdentifier;
const ALL_MESSAGE_THREADS_VIEW_UNIVERSAL_IDENTIFIER = _metadata.STANDARD_OBJECTS.messageThread.views.allMessageThreads.universalIdentifier;
const filterViewFieldsByViewUniversalIdentifier = ({ flatViewFieldMaps, viewUniversalIdentifier })=>Object.values(flatViewFieldMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((viewField)=>viewField.viewUniversalIdentifier === viewUniversalIdentifier);
let FixMessageThreadViewAndLabelIdentifierCommand = class FixMessageThreadViewAndLabelIdentifierCommand extends _activeorsuspendedworkspacecommandrunner.ActiveOrSuspendedWorkspaceCommandRunner {
    async runOnWorkspace({ workspaceId, options }) {
        const isDryRun = options.dryRun ?? false;
        const { twentyStandardFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { allFlatEntityMaps: standardAllFlatEntityMaps } = (0, _twentystandardapplicationallflatentitymapsconstant.computeTwentyStandardApplicationAllFlatEntityMaps)({
            now: new Date().toISOString(),
            workspaceId,
            twentyStandardApplicationId: twentyStandardFlatApplication.id
        });
        const { flatObjectMetadataMaps: existingFlatObjectMetadataMaps, flatFieldMetadataMaps: existingFlatFieldMetadataMaps, flatViewMaps: existingFlatViewMaps, flatViewFieldMaps: existingFlatViewFieldMaps } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'flatObjectMetadataMaps',
            'flatFieldMetadataMaps',
            'flatViewMaps',
            'flatViewFieldMaps'
        ]);
        const existingMessageThreadObjectMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            flatEntityMaps: existingFlatObjectMetadataMaps,
            universalIdentifier: MESSAGE_THREAD_OBJECT_UNIVERSAL_IDENTIFIER
        });
        if (!(0, _utils.isDefined)(existingMessageThreadObjectMetadata)) {
            this.logger.log(`messageThread object metadata not found for workspace ${workspaceId}, skipping`);
            return;
        }
        const viewToCreate = this.computeMessageThreadViewToCreate({
            standardAllFlatEntityMaps,
            existingFlatViewMaps
        });
        const viewFieldsToDelete = this.computeMessageThreadViewFieldsToDelete({
            existingFlatViewFieldMaps
        });
        const viewFieldsToCreate = this.computeMessageThreadViewFieldsToCreate({
            standardAllFlatEntityMaps,
            existingFlatFieldMetadataMaps
        });
        const flatObjectMetadataToUpdate = this.computeMessageThreadObjectMetadataToUpdate({
            existingMessageThreadObjectMetadata,
            existingFlatFieldMetadataMaps
        });
        const hasViewToCreate = (0, _utils.isDefined)(viewToCreate);
        const hasViewFieldChanges = viewFieldsToDelete.length > 0 || viewFieldsToCreate.length > 0;
        const hasObjectMetadataChange = (0, _utils.isDefined)(flatObjectMetadataToUpdate);
        if (!hasViewToCreate && !hasViewFieldChanges && !hasObjectMetadataChange) {
            this.logger.log(`Nothing to fix for messageThread in workspace ${workspaceId}`);
            return;
        }
        this.logger.log(`${isDryRun ? '[DRY RUN] ' : ''}Fixing messageThread in workspace ${workspaceId}: ${hasViewToCreate ? 'creating allMessageThreads view, ' : ''}deleting ${viewFieldsToDelete.length} view fields, creating ${viewFieldsToCreate.length} view fields${hasObjectMetadataChange ? ', repointing labelIdentifierFieldMetadataId to subject' : ''}`);
        if (isDryRun) {
            return;
        }
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                objectMetadata: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: hasObjectMetadataChange ? [
                        flatObjectMetadataToUpdate
                    ] : []
                },
                view: {
                    flatEntityToCreate: hasViewToCreate ? [
                        viewToCreate
                    ] : [],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                },
                viewField: {
                    flatEntityToCreate: viewFieldsToCreate,
                    flatEntityToDelete: viewFieldsToDelete,
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            applicationUniversalIdentifier: twentyStandardFlatApplication.universalIdentifier,
            isSystemBuild: true
        });
        if (validateAndBuildResult.status === 'fail') {
            this.logger.error(`Failed to fix messageThread for workspace ${workspaceId}:\n${JSON.stringify(validateAndBuildResult, null, 2)}`);
            throw new Error(`Failed to fix messageThread for workspace ${workspaceId}`);
        }
        this.logger.log(`Successfully fixed messageThread for workspace ${workspaceId}`);
    }
    // If the allMessageThreads view does not exist in the workspace, return the
    // standard definition so it can be created before its view fields.
    computeMessageThreadViewToCreate({ standardAllFlatEntityMaps, existingFlatViewMaps }) {
        const existingView = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            flatEntityMaps: existingFlatViewMaps,
            universalIdentifier: ALL_MESSAGE_THREADS_VIEW_UNIVERSAL_IDENTIFIER
        });
        if ((0, _utils.isDefined)(existingView)) {
            return undefined;
        }
        const standardView = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            flatEntityMaps: standardAllFlatEntityMaps.flatViewMaps,
            universalIdentifier: ALL_MESSAGE_THREADS_VIEW_UNIVERSAL_IDENTIFIER
        });
        if (!(0, _utils.isDefined)(standardView)) {
            throw new Error('allMessageThreads view not found in standard definition');
        }
        return standardView;
    }
    // Delete every existing view field attached to the standard allMessageThreads view
    // so we can recreate them from the current standard definition in one diff.
    computeMessageThreadViewFieldsToDelete({ existingFlatViewFieldMaps }) {
        return filterViewFieldsByViewUniversalIdentifier({
            flatViewFieldMaps: existingFlatViewFieldMaps,
            viewUniversalIdentifier: ALL_MESSAGE_THREADS_VIEW_UNIVERSAL_IDENTIFIER
        });
    }
    // Recreate view fields from the current standard definition, skipping any that
    // reference a field metadata that does not yet exist in this workspace (defensive
    // guard in case the 1-21 subject backfill command has not been run first).
    computeMessageThreadViewFieldsToCreate({ standardAllFlatEntityMaps, existingFlatFieldMetadataMaps }) {
        return filterViewFieldsByViewUniversalIdentifier({
            flatViewFieldMaps: standardAllFlatEntityMaps.flatViewFieldMaps,
            viewUniversalIdentifier: ALL_MESSAGE_THREADS_VIEW_UNIVERSAL_IDENTIFIER
        }).filter((viewField)=>(0, _utils.isDefined)(existingFlatFieldMetadataMaps.byUniversalIdentifier[viewField.fieldMetadataUniversalIdentifier]));
    }
    // Build the "to" messageThread object metadata with its labelIdentifier repointed
    // to the subject field. Returns undefined if the subject field is missing (the
    // 1-21 subject backfill command must be run first) or if the pointer is already
    // correct, in which case we skip the update to avoid a no-op migration.
    computeMessageThreadObjectMetadataToUpdate({ existingMessageThreadObjectMetadata, existingFlatFieldMetadataMaps }) {
        const existingSubjectField = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            flatEntityMaps: existingFlatFieldMetadataMaps,
            universalIdentifier: MESSAGE_THREAD_SUBJECT_FIELD_UNIVERSAL_IDENTIFIER
        });
        if (!(0, _utils.isDefined)(existingSubjectField)) {
            this.logger.warn(`messageThread.subject field not found in workspace - run upgrade:1-21:backfill-message-thread-subject first`);
            return undefined;
        }
        if (existingMessageThreadObjectMetadata.labelIdentifierFieldMetadataUniversalIdentifier === MESSAGE_THREAD_SUBJECT_FIELD_UNIVERSAL_IDENTIFIER) {
            return undefined;
        }
        return {
            ...existingMessageThreadObjectMetadata,
            labelIdentifierFieldMetadataUniversalIdentifier: MESSAGE_THREAD_SUBJECT_FIELD_UNIVERSAL_IDENTIFIER
        };
    }
    constructor(workspaceIteratorService, applicationService, workspaceCacheService, workspaceMigrationValidateBuildAndRunService){
        super(workspaceIteratorService), this.workspaceIteratorService = workspaceIteratorService, this.applicationService = applicationService, this.workspaceCacheService = workspaceCacheService, this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService;
    }
};
FixMessageThreadViewAndLabelIdentifierCommand = _ts_decorate([
    (0, _registeredworkspacecommanddecorator.RegisteredWorkspaceCommand)('1.21.0', 1775500014000),
    (0, _nestcommander.Command)({
        name: 'upgrade:1-21:fix-message-thread-view-and-label-identifier',
        description: 'Sync the allMessageThreads standard view fields with the current standard definition (adds subject and updatedAt columns) and repoint messageThread.labelIdentifierFieldMetadataId to the subject field. Fixes workspaces upgraded from <1.21 where PR #19351 changes were not applied because the twenty-standard application is not re-synced on existing workspaces.'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceiteratorservice.WorkspaceIteratorService === "undefined" ? Object : _workspaceiteratorservice.WorkspaceIteratorService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService,
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService
    ])
], FixMessageThreadViewAndLabelIdentifierCommand);

//# sourceMappingURL=1-21-workspace-command-1775500014000-fix-message-thread-view-and-label-identifier.command.js.map