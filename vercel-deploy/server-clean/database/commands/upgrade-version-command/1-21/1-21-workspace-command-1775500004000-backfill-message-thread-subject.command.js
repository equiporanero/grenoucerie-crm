"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BackfillMessageThreadSubjectCommand", {
    enumerable: true,
    get: function() {
        return BackfillMessageThreadSubjectCommand;
    }
});
const _nestcommander = require("nest-commander");
const _metadata = require("twenty-shared/metadata");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _activeorsuspendedworkspacecommandrunner = require("../../command-runners/active-or-suspended-workspace.command-runner");
const _workspaceiteratorservice = require("../../command-runners/workspace-iterator.service");
const _applicationservice = require("../../../../engine/core-modules/application/application.service");
const _registeredworkspacecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-workspace-command.decorator");
const _findflatentitybyuniversalidentifierutil = require("../../../../engine/metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _getdefaultflatfieldmetadatafromcreatefieldinpututil = require("../../../../engine/metadata-modules/flat-field-metadata/utils/get-default-flat-field-metadata-from-create-field-input.util");
const _workspacecacheservice = require("../../../../engine/workspace-cache/services/workspace-cache.service");
const _getworkspaceschemanameutil = require("../../../../engine/workspace-datasource/utils/get-workspace-schema-name.util");
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
let BackfillMessageThreadSubjectCommand = class BackfillMessageThreadSubjectCommand extends _activeorsuspendedworkspacecommandrunner.ActiveOrSuspendedWorkspaceCommandRunner {
    async runOnWorkspace({ workspaceId, dataSource, options }) {
        if (!dataSource) {
            this.logger.log(`No data source for workspace ${workspaceId}, skipping`);
            return;
        }
        await this.ensureSubjectFieldExists({
            workspaceId,
            isDryRun: !!options.dryRun
        });
        if (options.dryRun) {
            this.logger.log(`[DRY RUN] Would backfill messageThread.subject for workspace ${workspaceId}`);
            return;
        }
        const schemaName = (0, _getworkspaceschemanameutil.getWorkspaceSchemaName)(workspaceId);
        const result = await dataSource.query(`UPDATE "${schemaName}"."messageThread" mt
       SET "subject" = sub.subject
       FROM (
         SELECT DISTINCT ON ("messageThreadId") "messageThreadId", "subject"
         FROM "${schemaName}"."message"
         ORDER BY "messageThreadId", "receivedAt" DESC NULLS LAST
       ) sub
       WHERE mt.id = sub."messageThreadId"
         AND mt."subject" IS NULL`, undefined, undefined, {
            shouldBypassPermissionChecks: true
        });
        this.logger.log(`Backfilled subject for ${result?.[1] ?? 0} message threads in workspace ${workspaceId}`);
    }
    findFieldByNameOnObject({ flatFieldMetadataMaps, objectUniversalIdentifier, fieldName }) {
        return Object.values(flatFieldMetadataMaps.byUniversalIdentifier).filter(_utils.isDefined).find((field)=>field.name === fieldName && field.objectMetadataUniversalIdentifier === objectUniversalIdentifier);
    }
    async renameConflictingField({ conflictingField, workspaceId }) {
        const fieldToUpdate = {
            ...conflictingField,
            name: 'subjectOld',
            label: 'Subject (old)'
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
            applicationUniversalIdentifier: conflictingField.applicationUniversalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new Error(`Failed to rename conflicting subject field to subjectOld for workspace ${workspaceId}: ${JSON.stringify(validateAndBuildResult, null, 2)}`);
        }
        this.logger.log(`Renamed conflicting subject field to subjectOld for workspace ${workspaceId}`);
    }
    async ensureSubjectFieldExists({ workspaceId, isDryRun }) {
        const { flatObjectMetadataMaps, flatFieldMetadataMaps } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'flatObjectMetadataMaps',
            'flatFieldMetadataMaps'
        ]);
        const messageThreadObjectMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            flatEntityMaps: flatObjectMetadataMaps,
            universalIdentifier: _metadata.STANDARD_OBJECTS.messageThread.universalIdentifier
        });
        if (!messageThreadObjectMetadata) {
            this.logger.log(`messageThread object metadata not found for workspace ${workspaceId}, skipping`);
            return;
        }
        const existingField = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            flatEntityMaps: flatFieldMetadataMaps,
            universalIdentifier: _metadata.STANDARD_OBJECTS.messageThread.fields.subject.universalIdentifier
        });
        if (existingField) {
            return;
        }
        const conflictingField = this.findFieldByNameOnObject({
            flatFieldMetadataMaps,
            objectUniversalIdentifier: messageThreadObjectMetadata.universalIdentifier,
            fieldName: 'subject'
        });
        if ((0, _utils.isDefined)(conflictingField)) {
            this.logger.log(`Found conflicting field named "subject" (universalIdentifier: ${conflictingField.universalIdentifier}) on messageThread for workspace ${workspaceId}, renaming to subjectOld`);
            if (!isDryRun) {
                await this.renameConflictingField({
                    conflictingField,
                    workspaceId
                });
            }
        }
        if (isDryRun) {
            this.logger.log(`[DRY RUN] Would create messageThread.subject field for workspace ${workspaceId}`);
            return;
        }
        const { twentyStandardFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const flatFieldMetadataToCreate = {
            ...(0, _getdefaultflatfieldmetadatafromcreatefieldinpututil.getDefaultFlatFieldMetadata)({
                createFieldInput: {
                    name: 'subject',
                    type: _types.FieldMetadataType.TEXT,
                    label: 'Subject',
                    description: 'Subject',
                    icon: 'IconMessage',
                    isNullable: true,
                    isUIReadOnly: true,
                    universalIdentifier: _metadata.STANDARD_OBJECTS.messageThread.fields.subject.universalIdentifier
                },
                flatApplication: twentyStandardFlatApplication,
                objectMetadataUniversalIdentifier: messageThreadObjectMetadata.universalIdentifier
            }),
            isCustom: false
        };
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                fieldMetadata: {
                    flatEntityToCreate: [
                        flatFieldMetadataToCreate
                    ],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            applicationUniversalIdentifier: twentyStandardFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new Error(`Failed to create messageThread.subject field for workspace ${workspaceId}: ${JSON.stringify(validateAndBuildResult, null, 2)}`);
        }
        this.logger.log(`Created messageThread.subject field for workspace ${workspaceId}`);
    }
    constructor(workspaceIteratorService, applicationService, workspaceCacheService, workspaceMigrationValidateBuildAndRunService){
        super(workspaceIteratorService), this.workspaceIteratorService = workspaceIteratorService, this.applicationService = applicationService, this.workspaceCacheService = workspaceCacheService, this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService;
    }
};
BackfillMessageThreadSubjectCommand = _ts_decorate([
    (0, _registeredworkspacecommanddecorator.RegisteredWorkspaceCommand)('1.21.0', 1775500004000),
    (0, _nestcommander.Command)({
        name: 'upgrade:1-21:backfill-message-thread-subject',
        description: 'Create the messageThread.subject standard field if missing and backfill it from the most recently received message in each thread'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceiteratorservice.WorkspaceIteratorService === "undefined" ? Object : _workspaceiteratorservice.WorkspaceIteratorService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService,
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService
    ])
], BackfillMessageThreadSubjectCommand);

//# sourceMappingURL=1-21-workspace-command-1775500004000-backfill-message-thread-subject.command.js.map