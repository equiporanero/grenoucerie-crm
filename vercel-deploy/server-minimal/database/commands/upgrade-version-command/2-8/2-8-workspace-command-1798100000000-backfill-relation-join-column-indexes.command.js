"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BackfillRelationJoinColumnIndexesCommand", {
    enumerable: true,
    get: function() {
        return BackfillRelationJoinColumnIndexesCommand;
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
const _computemorphorrelationfieldjoincolumnnameutil = require("../../../../engine/metadata-modules/field-metadata/utils/compute-morph-or-relation-field-join-column-name.util");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../../../engine/metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _generateindexforflatfieldmetadatautil = require("../../../../engine/metadata-modules/flat-field-metadata/utils/generate-index-for-flat-field-metadata.util");
const _ismorphorrelationflatfieldmetadatautil = require("../../../../engine/metadata-modules/flat-field-metadata/utils/is-morph-or-relation-flat-field-metadata.util");
const _workspaceschemamanagerservice = require("../../../../engine/twenty-orm/workspace-schema-manager/workspace-schema-manager.service");
const _workspacecacheservice = require("../../../../engine/workspace-cache/services/workspace-cache.service");
const _getworkspaceschemacontextformigrationutil = require("../../../../engine/workspace-manager/workspace-migration/workspace-migration-runner/utils/get-workspace-schema-context-for-migration.util");
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
const POLYMORPHIC_STANDARD_OBJECT_NAMES_SINGULAR = new Set(_metadata.DEFAULT_RELATIONS_OBJECTS_STANDARD_IDS);
let BackfillRelationJoinColumnIndexesCommand = class BackfillRelationJoinColumnIndexesCommand extends _activeorsuspendedworkspacecommandrunner.ActiveOrSuspendedWorkspaceCommandRunner {
    async runOnWorkspace({ workspaceId, dataSource, options }) {
        const isDryRun = options.dryRun ?? false;
        if (!dataSource) {
            this.logger.log(`No data source for workspace ${workspaceId}, skipping`);
            return;
        }
        const { flatObjectMetadataMaps, flatFieldMetadataMaps, flatIndexMaps } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'flatObjectMetadataMaps',
            'flatFieldMetadataMaps',
            'flatIndexMaps'
        ]);
        const polymorphicStandardObjectIds = new Set(Object.values(flatObjectMetadataMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((flatObject)=>POLYMORPHIC_STANDARD_OBJECT_NAMES_SINGULAR.has(flatObject.nameSingular)).map((flatObject)=>flatObject.id));
        if (polymorphicStandardObjectIds.size === 0) {
            this.logger.log(`No polymorphic standard objects found for workspace ${workspaceId}, skipping`);
            return;
        }
        const indexedFieldIds = new Set();
        for (const flatIndex of Object.values(flatIndexMaps.byUniversalIdentifier)){
            if (!(0, _utils.isDefined)(flatIndex)) {
                continue;
            }
            for (const indexField of flatIndex.flatIndexFieldMetadatas){
                indexedFieldIds.add(indexField.fieldMetadataId);
            }
        }
        const fieldsNeedingIndex = Object.values(flatFieldMetadataMaps.byUniversalIdentifier).filter(_utils.isDefined).filter(_ismorphorrelationflatfieldmetadatautil.isMorphOrRelationFlatFieldMetadata).filter((flatField)=>polymorphicStandardObjectIds.has(flatField.objectMetadataId)).filter((flatField)=>flatField.settings?.relationType === _types.RelationType.MANY_TO_ONE).filter((flatField)=>!indexedFieldIds.has(flatField.id));
        if (fieldsNeedingIndex.length === 0) {
            this.logger.log(`No missing relation join column indexes for workspace ${workspaceId}, skipping`);
            return;
        }
        const flatIndexBuildPlans = fieldsNeedingIndex.map((flatField)=>{
            const flatObjectMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
                flatEntityId: flatField.objectMetadataId,
                flatEntityMaps: flatObjectMetadataMaps
            });
            const universalFlatIndexMetadata = (0, _generateindexforflatfieldmetadatautil.generateIndexForFlatFieldMetadata)({
                flatFieldMetadata: flatField,
                flatObjectMetadata
            });
            const joinColumnName = (0, _computemorphorrelationfieldjoincolumnnameutil.computeMorphOrRelationFieldJoinColumnName)({
                name: flatField.name
            });
            return {
                flatObjectMetadata,
                universalFlatIndexMetadata,
                joinColumnName
            };
        });
        this.logger.log(`${isDryRun ? '[DRY RUN] ' : ''}Found ${flatIndexBuildPlans.length} missing relation join column index(es) for workspace ${workspaceId}: ${flatIndexBuildPlans.map(({ universalFlatIndexMetadata })=>universalFlatIndexMetadata.name).join(', ')}`);
        if (isDryRun) {
            return;
        }
        const queryRunner = dataSource.createQueryRunner();
        let isQueryRunnerConnected = false;
        try {
            await queryRunner.connect();
            isQueryRunnerConnected = true;
            for (const { flatObjectMetadata, universalFlatIndexMetadata, joinColumnName } of flatIndexBuildPlans){
                const { schemaName, tableName } = (0, _getworkspaceschemacontextformigrationutil.getWorkspaceSchemaContextForMigration)({
                    workspaceId,
                    objectMetadata: flatObjectMetadata
                });
                await this.workspaceSchemaManagerService.indexManager.createIndex({
                    queryRunner,
                    schemaName,
                    tableName,
                    index: {
                        name: universalFlatIndexMetadata.name,
                        columns: [
                            joinColumnName
                        ],
                        isUnique: universalFlatIndexMetadata.isUnique,
                        type: universalFlatIndexMetadata.indexType,
                        where: universalFlatIndexMetadata.indexWhereClause ?? undefined
                    },
                    concurrently: true
                });
                this.logger.log(`Created index ${universalFlatIndexMetadata.name} on workspace ${workspaceId}`);
            }
        } finally{
            if (isQueryRunnerConnected) {
                await queryRunner.release();
            }
        }
        const { twentyStandardFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            isSystemBuild: true,
            allFlatEntityOperationByMetadataName: {
                index: {
                    flatEntityToCreate: flatIndexBuildPlans.map(({ universalFlatIndexMetadata })=>universalFlatIndexMetadata),
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            applicationUniversalIdentifier: twentyStandardFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            this.logger.error(`Failed to persist relation join column index metadata:\n${JSON.stringify(validateAndBuildResult, null, 2)}`);
            throw new Error(`Failed to persist relation join column index metadata for workspace ${workspaceId}`);
        }
        this.logger.log(`Successfully backfilled ${flatIndexBuildPlans.length} relation join column index(es) for workspace ${workspaceId}`);
    }
    constructor(workspaceIteratorService, applicationService, workspaceMigrationValidateBuildAndRunService, workspaceCacheService, workspaceSchemaManagerService){
        super(workspaceIteratorService), this.workspaceIteratorService = workspaceIteratorService, this.applicationService = applicationService, this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService, this.workspaceCacheService = workspaceCacheService, this.workspaceSchemaManagerService = workspaceSchemaManagerService;
    }
};
BackfillRelationJoinColumnIndexesCommand = _ts_decorate([
    (0, _registeredworkspacecommanddecorator.RegisteredWorkspaceCommand)('2.8.0', 1798100000000),
    (0, _nestcommander.Command)({
        name: 'upgrade:2-8:backfill-relation-join-column-indexes',
        description: 'Backfill missing BTREE indexes on target<X>Id join columns added to polymorphic standard objects (timelineActivity, attachment, noteTarget, taskTarget) when custom objects were created before the auto-index fix. Indexes are created with CONCURRENTLY so writes are not blocked.'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceiteratorservice.WorkspaceIteratorService === "undefined" ? Object : _workspaceiteratorservice.WorkspaceIteratorService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService,
        typeof _workspaceschemamanagerservice.WorkspaceSchemaManagerService === "undefined" ? Object : _workspaceschemamanagerservice.WorkspaceSchemaManagerService
    ])
], BackfillRelationJoinColumnIndexesCommand);

//# sourceMappingURL=2-8-workspace-command-1798100000000-backfill-relation-join-column-indexes.command.js.map